import {MongoDriver} from '.'
import {Logger} from '../common'

export class Vigilantee {
    
    public static async alertMe(pGUID : any, pLocation : any, pStatus : any, pFeedback : any) {
        let mongoDriver = MongoDriver.getInstance()

        let timeStamp = new Date()
    
        let log = {
            GUID      : pGUID,
            Location  : pLocation,
            TimeStamp : timeStamp,
            Status    : pStatus,
            Feedback  : pFeedback
        }

        mongoDriver.write("AlertMe", "Logs", log)

    }

}