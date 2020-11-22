import {MongoDriver} from '.'
import {Constants, Logger} from '../common'
const request = require('request')
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
        this.getIntersections()
    }

    public static getActivity(){
        
        let mongoDriver = MongoDriver.getInstance()

        let query =      
        [
            {
              $project:
              {
                hour: { $hour: "$TimeStamp" },
                weekDay:         
                {
                  $switch:
                  {
                    branches: [
                      {
                        case: { $eq : [ { $dayOfWeek : "$TimeStamp" }, 1 ] },
                        then: "Domingo"
                      },
                      {
                        case: { $eq : [ { $dayOfWeek : "$TimeStamp" }, 2 ] },
                        then: "Lunes"
                      },
                      {
                        case: { $eq : [ { $dayOfWeek : "$TimeStamp" }, 3 ] },
                        then: "Martes"
                      },
                      {
                        case: { $eq : [ { $dayOfWeek : "$TimeStamp" }, 4 ] },
                        then: "Miércoles"
                      },
                      {
                        case: { $eq : [ { $dayOfWeek : "$TimeStamp" }, 5 ] },
                        then: "Jueves"
                      },
                      {
                        case: { $eq : [ { $dayOfWeek : "$TimeStamp" }, 6 ] },
                        then: "Viernes"
                      },
                      {
                        case: { $eq : [ { $dayOfWeek : "$TimeStamp" }, 7 ] },
                        then: "Sábado"
                      },                                                                                    
                    ],
                    default: { $dayOfWeek : "$TimeStamp" }
                  }
                }
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
              $project:
              {
                weekDay: "$_id.weekDay",
                hour: "$_id.hour",
                count: "$count"
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
                mongoDriver.find("AlertMe","Logs","").then( 
                  (logs : any) =>
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
                                    $group : {_id : null, count : { $sum : 1 }}
                                },
                                {
                                    "$match": {"count":{"$gte":Constants.GEOPOSITIONAL_INTERSECTION_MINIMUM} } 
                                } 
                            ]
                            MongoDriver.getInstance().aggregate("AlertMe","Logs",getIntersect).then((inter:any)=>
                            {
                                let result= inter[Constants.GEOPOSITIONAL_INDEX_RESULT]
                                if((result))
                                {
                                    let numIntersec= result.count
            
                                        let PowerBiData= [{'lat':currentCoordinates[1], 'long':currentCoordinates[0], "intersections":numIntersec}]
                                        var stringifiedPowerBiData= JSON.stringify(PowerBiData)
                                        const powerBiRequest = request.post(Constants.POWERBI_HOST, stringifiedPowerBiData,
                                        (error : any, res : any, body : any) => {
                                        });
                                        powerBiRequest.on('error', (e : any) => {
                                            console.log(Constants.POWERBI_DATAPUSH_ERROR_MSG);
                                        });
                                        powerBiRequest.write(stringifiedPowerBiData);
                                        powerBiRequest.end;
                                        intersections.push([currentCoordinates,numIntersec])
                                    
                                }  
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