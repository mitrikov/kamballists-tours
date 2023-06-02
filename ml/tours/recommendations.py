import numpy as np
import pandas as pd
from scipy import sparse as sp
from sklearn.preprocessing import normalize
from pymongo import MongoClient
import implicit
from .utils import process_users, process_events, interactions_to_matrix, get_user_likes
from django.conf import settings


def get_recommendations_for_user(user_oid):

    mongo_client = MongoClient(settings.DB_URI)
    db = mongo_client.tours

    # Запрос events из бд
    users_raw = db.users.find({}, {"_id": {"$toString": "$_id"}, "likes": "$likes.events"})
    events_raw = db.events.find({}, {"_id": {"$toString": "$_id"}})

    # Преобразование в нужный нам формат для датафрейма

    users = process_users(users_raw)
    events = process_events(events_raw)

    # Генерация датафрейма
    users_df = pd.DataFrame(data=users, columns=['user_id'])
    events_df = pd.DataFrame(data=events, columns=['event_id'])

    def get_user_row_by_oid(oid):
        return users_df.index[users_df['user_id'] == oid]

    def get_event_col_by_oid(oid):
        return events_df.index[events_df['event_id'] == oid][0]

    users_rows = np.array(users_df.values[:, 0])
    events_cols = np.array(events_df.values[:, 0])

    # Вычисляем координаты лайков в матрице
    users_raw.rewind()

    likes_row_pos = []
    likes_col_pos = []
    likes_data = []

    for user in users_raw:
        # if likes in user:
        like_row = get_user_row_by_oid(user["_id"])[0]
        if "likes" in user:
            for event in user["likes"]:
                like_col = get_event_col_by_oid(event)
                likes_row_pos.append(like_row)
                likes_col_pos.append(like_col)
                likes_data.append(1)

    # Создание разреженной матрицы данных
    sparse_matrix = sp.csr_matrix((likes_data, (likes_row_pos, likes_col_pos)), shape=(len(users), len(events)))
    sparse_matrix_t = sparse_matrix


    # # Факторизация матрицы ALS
    model = implicit.als.AlternatingLeastSquares(factors=6, regularization=0.0, iterations=5)
    model.fit(sparse_matrix_t)

    sparse_user_row = sparse_matrix.getrow(get_user_row_by_oid(user_oid)[0])
    sparse_user_row_t = sparse_user_row.T
    recommends_raw = model.recommend(0, sparse_user_row, N=12, filter_already_liked_items=True, recalculate_user=True)

    recommended_items_idx = np.unique(recommends_raw[0])
    #
    # # Выборка предметов, с которыми пользователь взаимодействовал
    # user_liked_items = np.array(interactions_events_df.loc[interactions_events_df.user_id == user_oid])[:, 1]
    # user_idx = interactions_events_df.loc[interactions_events_df.user_id == user_oid].index[0]
    # print(user_idx)
    # # Построение рекомендаций
    #
    # recommended_items_idx = np.unique(recommends_raw[0])
    # print(interactions_events_df)

    recommended_items = []
    for idx in recommended_items_idx:
        recommended_items.append(events_df.iloc[idx][0])

    print(recommended_items_idx)

    return recommended_items
