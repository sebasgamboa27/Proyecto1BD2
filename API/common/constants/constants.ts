export class Constants {

    // API constants

    public static SERVER_PORT = 3000
    
    public static WRONG_ROUTE_MESSAGE = "Route error."

    public static WELCOME_MESSAGE = "API listening..."

    // Mongo connection constants

    public static SOCKET_TIMEOUT = 2000

    public static CONNECTION_ERROR_MSG = "Unable to connect to mongo."

    public static POWERBI_DATAPUSH_ERROR_MSG = "Couldn't connect to the PowerBi service"

    public static CONNECTED_MSG = "Mongo connection stablished."

    public static CONNECTION_CLOSED = "Mongo connection closed."

    public static POOL_SIZE = 20
    
    public static GEOPOSITIONAL_INTERSECTION_MINIMUM = 2

    public static GEOPOSITIONAL_INDEX_RESULT = 0

    public static POWERBI_HOST = "https://api.powerbi.com/beta/bfcf1d9d-93ea-43b1-b902-1daa68a64248/datasets/944fde71-3483-4da4-8358-d0fec27d9439/rows?key=1EyHXwtzUeZNkBg0IvqrL%2F2HJeDZWAa4HyGFosfwLO2S5jhZmu925bc4W69e1l8XjLSvcwTwk%2B7%2FjGocBmLOLw%3D%3D"

    // SIMULATION CONSTANTS

    public static NARANJO_REFERENCE_LAT  = 10.098653036952612
    public static NARANJO_REFERENCE_LONG = -84.38096523693127

    public static CURRIDABAT_REFERENCE_LAT  = 9.916807618997785
    public static CURRIDABAT_REFERENCE_LONG = -84.03475174367235

    public static ZAPOTE_REFERENCE_LAT  = 9.92108221025653
    public static ZAPOTE_REFERENCE_LONG = -84.06008716251051

    public static RADIUS_PER_CANTON = 10

    public static DANGER_HOUR_BEGIN = 21
    public static DANGER_HOUR_DURATION = 6
    public static NON_DANGER_PROBABILITY = 30

    public static ACTIVITY_DAYS_BEGIN    = 6
    public static ACTIVITY_DAYS_DURATION = 2
    public static NON_ACTIVITY_PROBABILITY = 30


}
