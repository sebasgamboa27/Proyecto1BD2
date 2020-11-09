import {Constants, Logger} from '../common'
import * as mongoose from 'mongoose';

/**
 * Class in charge of handling all the requests to mongodb
 */
export class MongooseController{

  private static instance : MongooseController 

  private db : any 

  private constructor()
  {
        try
        {
            mongoose.connect('mongodb://25.11.234.208:27022/AlertMe,25.10.118.245:27022/AlertMe,25.9.119.89:27022/AlertMe',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                socketTimeoutMS: Constants.SOCKET_TIMEOUT
            }) 
            this.db = mongoose.connection 

            this.db.on('error', () => {
              Logger.error(Constants.CONNECTION_ERROR_MSG)
            }) 

            this.db.once('open', ()=> {
              Logger.info(Constants.CONNECTED_MSG)
            }) 
        } catch (e)
        {
          Logger.error(e) 
        }
  }
  /**
   * Returns an instance of the class
   */
  public static getInstance() : MongooseController
  {
    if(!this.instance)
    {
      this.instance = new MongooseController() 
    }
    return this.instance
  }
}






