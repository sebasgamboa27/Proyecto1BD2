import {MongoDriver} from '.'
import {Constants, Logger} from '../common'

export class Vigilantee {
    
    public static async alertMe(pGUID : any, pLat : any,pLng : any ,pCanton : any , pProvice : any, pStatus : any, pFeedback : any) {
        let mongoDriver = MongoDriver.getInstance()

        let timeStamp = new Date()
    
        let log = {
            GUID      : pGUID,
            Location  : {type:"Point",coordinates:[pLng, pLat]},
            Canton    : pCanton,
            Province  : pProvice,
            TimeStamp : timeStamp,
            Status    : pStatus,
            Feedback  : pFeedback
        }
        mongoDriver.write("AlertMe", "Logs", log)
    }

    public static getActivity(){
        
        let mongoDriver = MongoDriver.getInstance()

        let query =      
        [
            {
                $project:
                {
                    hour: { $hour: "$date" },
                    weekDay: { $dayOfWeek: "$date" }
                }
            },
            {
                $group:
                {
                    _id: { weekDay: "$weekDay", hour : "$hour" },
                    count:{ $sum : 1 }
                }
            },
            {
                $sort : 
                { 
                    "_id.weekDay" : 1,
                    "_id.hour" : 1,
                }
            }
        ]

        let activity = new Promise(
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

        return activity

    }

    public static async getIntersections(){
        let mongoDriver = MongoDriver.getInstance();
        let commonIntersections = new Promise(
            (resolve, reject) => 
            {
                let intersections: any = [];
                try
                {
                mongoDriver.find("AlertMe","Logs","").then(logs=>
                    {
                        let keys = Object.keys(logs);
                        keys.forEach(key => {
                            let currentCoordinates= logs[key].Location.coordinates
                            let getIntersect =
                            [
                                {
                                    $geoNear:
                                    {
                                        near:{coordinates:currentCoordinates},
                                        distanceField: "calcDistance",
                                        maxDistance:5
                                    }  
                                },
                                {
                                    $group : {_id:null,count:{$sum:1}}
                                },
                                {
                                    "$match": {"count":{"$gte":Constants.GEOPOSITIONAL_INTERSECTION_MINIMUM} } 
                                } 
                            ]
                              MongoDriver.getInstance().aggregate("AlertMe","Logs",getIntersect).then((inter:any)=>
                                {
                                  intersections.push([currentCoordinates,inter.count])
                                })
                            });
                        resolve(intersections)
                    }
                )
                }
                catch(error)
                {
                    reject(error)
                }

            }
        )
    }
}