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

    public static POWERBI_HOST_WEEKLY = "https://api.powerbi.com/beta/bfcf1d9d-93ea-43b1-b902-1daa68a64248/datasets/77a00366-3abc-4cc7-8c5e-a3a69df851eb/rows?key=pH%2BqlIx8PCTJCGs4ILuBHJM1Ffzk7RwsuLEAeQEQz9qanxu3MKCIo%2FmEBgWX7DmH9xaMO0HO4ncOBkX%2FS2JS8w%3D%3D"

    public static POWERBI_HOST_METRICS = "https://api.powerbi.com/beta/bfcf1d9d-93ea-43b1-b902-1daa68a64248/datasets/3215c633-98f4-4934-8085-e2452eeb418e/rows?key=TCXCUxegxnumttDGOdqeHBx3zMQSrd36mr3sYFuqavgUl4dMQrovga%2BhkDwgAADbEd7UA5r9AIj7qRTjGC1igA%3D%3D"

    // SIMULATION CONSTANTS

    public static NARANJO_REFERENCE_LAT  = 10.098653036952612
    public static NARANJO_REFERENCE_LONG = -84.38096523693127

    public static NARANJO_REFERENCE_LAT_2  = 10.108316
    public static NARANJO_REFERENCE_LONG_2 = -84.361839
  
    public static NARANJO_REFERENCE_LAT_3  = 10.069147
    public static NARANJO_REFERENCE_LONG_3 = -84.362484

    public static CURRIDABAT_REFERENCE_LAT  = 9.916807618997785
    public static CURRIDABAT_REFERENCE_LONG = -84.03475174367235

    public static CURRIDABAT_REFERENCE_LAT_2  =   9.912296
    public static CURRIDABAT_REFERENCE_LONG_2 = -84.039414

    public static CURRIDABAT_REFERENCE_LAT_3  =  9.908586
    public static CURRIDABAT_REFERENCE_LONG_3 = -84.043902
  
    public static ZAPOTE_REFERENCE_LAT  = 9.92108221025653
    public static ZAPOTE_REFERENCE_LONG = -84.06008716251051
    
    public static ZAPOTE_REFERENCE_LAT_2  = 9.921294
    public static ZAPOTE_REFERENCE_LONG_2 = -84.068488

    public static ZAPOTE_REFERENCE_LAT_3  = 9.922809
    public static ZAPOTE_REFERENCE_LONG_3 = -84.072333

    public static RADIUS_PER_CANTON = 100 * 10

    public static DANGER_HOUR_BEGIN = 21
    public static DANGER_HOUR_DURATION = 6
    public static NON_DANGER_PROBABILITY = 30

    public static ACTIVITY_DAYS_BEGIN    = 6
    public static ACTIVITY_DAYS_DURATION = 2
    public static NON_ACTIVITY_PROBABILITY = 30


}
