import {MongoDriver} from '.'
import {Logger} from '../common'

export class Vigilantee {
    
    public static async alertMe(pGUID : any, pLocation : any,pCanton : any , pProvice : any, pStatus : any, pFeedback : any) {
        let mongoDriver = MongoDriver.getInstance()

        let timeStamp = new Date()
    
        let log = {
            GUID      : pGUID,
            Location  : pLocation,
            Canton: pCanton,
            Province : pProvice,
            TimeStamp : timeStamp,
            Status    : pStatus,
            Feedback  : pFeedback
        }

        mongoDriver.write("AlertMe", "Logs", log)

    }

}