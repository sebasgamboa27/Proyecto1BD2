import {MongoDriver} from '.'
import {Logger} from '../common'

export class Vigilantee {
    
    public static async alertMe(pGUID : any, pLocation : any,pCanton : any , pProvice : any, pStatus : any, pFeedback : any) {
        let mongoDriver = MongoDriver.getInstance()

        let timeStamp = new Date()
    
        let log = {
            GUID      : pGUID,
            Location  : pLocation,
            Canton    : pCanton,
            Province  : pProvice,
            TimeStamp : timeStamp,
            Status    : pStatus,
            Feedback  : pFeedback
        }
        mongoDriver.write("AlertMe", "Logs", log)
    }

    public static getDailyActivity(weekday : number){
        
        let mongoDriver = MongoDriver.getInstance()

        let query =      
        [
            {
                $project:
                    {
                    hour: { $hour: "$TimeStamp" },
                    weekDay: { $dayOfWeek: "$TimeStamp" }
                    }
            },
            {
                $match:
                {
                    weekDay : weekday
                }
            },
            {
                $group:
                {
                    _id: { hour : "$hour" },
                    count:{ $sum : 1 }
                }
            },
            {
                $sort : 
                { 
                    "_id.time" : 1
                }
            }
        
        ]

        let dailyActivity = new Promise(
            (resolve, reject) => 
            {
                try
                {
                    resolve(mongoDriver.aggregate('AlertMe', 'Logs', query))
                }
                catch (error)
                {
                    reject(error)
                }
                
            }
        );

        return dailyActivity

    }
    
    public static getWeeklyActivity(){

        let mongoDriver = MongoDriver.getInstance()

        let query =
        [
            {
            $project:
                {
                dayOfWeek: { $dayOfWeek: "$TimeStamp" }
                }
            },
            {
                $group: 
                { 
                _id:   {weekDay:"$dayOfWeek"}, 
                count: { $sum: 1 }
                } 
            },     
            {
                $sort : 
                { 
                "_id.weekDay" : 1
                }
            }
        ]

        let dailyActivity = new Promise(
            (resolve, reject) => 
            {
                try
                {
                    resolve(mongoDriver.aggregate('AlertMe', 'Logs', query))
                }
                catch (error)
                {
                    reject(error)
                }
                
            }
        );

        return dailyActivity
    }
    
    public static async getIntersections(){

    }

}