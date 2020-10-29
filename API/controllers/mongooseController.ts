import {Logger} from '../common'
import * as mongoose from 'mongoose';

/**
 * Class in charge of handling all the requests to mongodb
 */
export class MongooseController{

  private static instance : MongooseController 
  private log : Logger 
  private db : any 
  private constructor()
  {
    this.log = new Logger() 
        try
        {
            mongoose.connect('mongodb://host.docker.internal:27017/Case5',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                socketTimeoutMS: 2000
            }) 
            this.db = mongoose.connection 

            this.db.on('error', () => {
                this.log.error("No puedo conectar a mongo")
            }) 

            this.db.once('open', ()=> {
                this.log.info("Conectado a mongo")
            }) 
        } catch (e)
        {
            this.log.error(e) 
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






