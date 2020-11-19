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

    public static CPU_CORE_COUNT = 4

    public static BYTES_TO_GIGABYTES_DIVISION = 10**9

    public static ROUNDING_FACTOR = 10 ;

    public static HOST_MACHINE_RAM =16

    public static POWERBI_HOST = "https://api.powerbi.com/beta/bfcf1d9d-93ea-43b1-b902-1daa68a64248/datasets/944fde71-3483-4da4-8358-d0fec27d9439/rows?key=1EyHXwtzUeZNkBg0IvqrL%2F2HJeDZWAa4HyGFosfwLO2S5jhZmu925bc4W69e1l8XjLSvcwTwk%2B7%2FjGocBmLOLw%3D%3D"

    public static POWERBI_HOST_WEEKLY = "https://api.powerbi.com/beta/bfcf1d9d-93ea-43b1-b902-1daa68a64248/datasets/47a17bad-12a4-4706-898d-de573e818597/rows?key=7WDclL28ASI8YzPlx9e%2B%2FYt2LgKHv%2BYWPrWXqzswQqt2eS%2FLu4DWGsspCUD160MTYnfTjdmnP6G2kTkV0su7kg%3D%3D"

    public static POWERBI_HOST_METRICS = "https://api.powerbi.com/beta/bfcf1d9d-93ea-43b1-b902-1daa68a64248/datasets/3215c633-98f4-4934-8085-e2452eeb418e/rows?key=TCXCUxegxnumttDGOdqeHBx3zMQSrd36mr3sYFuqavgUl4dMQrovga%2BhkDwgAADbEd7UA5r9AIj7qRTjGC1igA%3D%3D"
}