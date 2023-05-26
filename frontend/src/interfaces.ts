export interface IEvent {
    _id: String
    ictionary_data : {
        title: String
        city: String
        description: String
        duration: Number
        event_type: String
        duration_hours: Number
        link_source: String
        place: {}
        region: {}
    }
}

export enum TravelerType {
    popular = "popular",
    advanced = "advanced"
}

export enum TravelerWealth {
    econom = "econom",
    medium = "medium",
    vip = "vip"
}

export enum Interests {
    architecture = "architecture",
    culture = "culture",
    tourism = "tourism",
    excursions = "excursions",
    nature = "nature",
    kids = "kids",
    relaxation = "relaxation",
    night = "night",
    shopping = "shopping",
    adventure = "adventure",
    sport = "sport",
    photo = "photo"
}

export enum Cuisines {
    europe = "europe",
    japan = "japan",
    india = "india",
    italia = "italia",
    georgian = "georgian",
    fastFood = "fast-food",
    russian = "russian",
    chinese = "chinese"
}
