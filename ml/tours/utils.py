from enum import Enum

# Функция преобразования вложенных объектов взаимодействий пользователя в список
def process_users(users_mongo_raw):
    result = []

    for user in users_mongo_raw:
        result.append(user["_id"])

    return result


def process_events(events_mongo_raw):
    result = []

    for event in events_mongo_raw:
        result.append(event["_id"])

    return result


def get_user_likes(users_mongo_raw):
    result = []
    users_mongo_raw.rewind()

    for user in users_mongo_raw:
        if "likes" in user:
            result.append(user["likes"])

    return result


def get_user_cluster_dict(user_mongo_raw):
    cluster_dict = {}
    if "traveler_type" in user_mongo_raw:
        cluster_dict.update({"traveler_type": user_mongo_raw["traveler_type"]})

    if "traveler_wealth" in user_mongo_raw:
        cluster_dict.update({"traveler_wealth": user_mongo_raw["traveler_wealth"]})

    return cluster_dict

class TravelerType(Enum):
    popular = 1
    advanced = 2


class TravelerWealth(Enum):
    econom = 1
    medium = 2
    vip = 3



