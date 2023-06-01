import numpy as np
from scipy import sparse as sp


# Функция преобразования вложенных объектов взаимодействий пользователя в список
def process_likes(interactions_data):
    result = []

    for item in interactions_data:
        # if hasattr(item, 'likes'): 
        for like in item['likes']:
            result.append([item["_id"], like, 1])

    return result


class UserEncoder:
    def __init__(self, interactions_df):

        # fill product part
        self.user_idx = {}
        self.user_oid = {}

        for idx, row in enumerate(interactions_df.itertuples()):
            oid = row.user_id
            self.user_idx[oid] = idx
            self.user_oid[idx] = oid

    def to_idx(self, x):
        if type(x) == str:
            oid = x
            return self.user_idx[oid]
        return [self.user_idx[oid] for oid in x]

    def to_oid(self, x):
        if type(x) == int:
            idx = x
            return self.user_oid[idx]
        return [self.user_oid[idx] for idx in x]

    @property
    def num_products(self):
        return len(self.user_idx)



# Функция преобразования вложенных объектов взаимодействий пользователя в матрицу
def interactions_to_matrix(interactions_data):
    result = []
    cols = []
    rows = []

    for item in interactions_data:
        cols.append(item["_id"])
        # if hasattr(item, 'likes'):
        for like in item['likes']:
            rows.append(like)
            result.append([item["_id"], like, 1])

    return sp.coo_matrix(1, (np.array(rows), np.array(cols)))


