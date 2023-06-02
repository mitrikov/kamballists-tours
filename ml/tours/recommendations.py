import numpy as np
import pandas as pd
from scipy import sparse as sp
from sklearn.preprocessing import normalize
from pymongo import MongoClient
import implicit
from .utils import process_likes, interactions_to_matrix, UserEncoder
from django.conf import settings


def get_recommendations_for_user(user_oid):

    mongo_client = MongoClient(settings.DB_URI)
    db = mongo_client.tours

    # user_oid = '647397f8c6af21d0b1fd6d5b'

    # Запрос events из бд
    interactions_data_events_raw = db.users.find({}, {"_id": {"$toString": "$_id"}, "likes": "$likes.events"})

    # Преобразование в нужный нам формат для датафрейма
    interactions_data_events = process_likes(interactions_data_events_raw)
    
    #if len(interactions_data_events) == 0:
    #    return

    # Генерация датафрейма
    interactions_events_df = pd.DataFrame(data=interactions_data_events, columns=['user_id', 'event_id', 'like'], )
    #print(interactions_events_df)
    # Определение столбцов, рядов для матрицы данных
    rows, r_pos = np.unique(interactions_events_df.values[:, 0], return_inverse=True)  # Users
    cols, c_pos = np.unique(interactions_events_df.values[:, 1], return_inverse=True)  # Items
    data = np.array(interactions_events_df.values[:, 2], dtype=int)

    # Создание разреженной матрицы данных
    sparse_matrix = sp.csr_matrix((data, (r_pos, c_pos)))
    sparse_matrix_t = sparse_matrix.transpose(copy=True).tocsr()

    # Факторизация матрицы ALS
    model = implicit.als.AlternatingLeastSquares(factors=12, regularization=1.0, iterations=16)
    model.fit(sparse_matrix_t)

    # Выборка предметов, с которыми пользователь взаимодействовал
    user_liked_items = np.array(interactions_events_df.loc[interactions_events_df.user_id == user_oid])[:, 1]
    user_idx = interactions_events_df.loc[interactions_events_df.user_id == user_oid].index[0]
    print(user_idx)
    # Построение рекомендаций
    recommends_raw = model.recommend(0, sparse_matrix_t[1], N=10, filter_already_liked_items=True, recalculate_user=True)
    recommended_items_idx = np.unique(recommends_raw[0])
    print(interactions_events_df)
    recommended_items = []
    for idx in recommended_items_idx:
        recommended_items.append(cols[idx])

    return recommended_items
