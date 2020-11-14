import * as express from 'express' 
import e = require('express')
import { Logger } from '../common' 
import {MongoDriver, Vigilantee} from '../controllers'
const app = express() 
const router = express.Router();

//Request principal
app.post('/log/:guid/:location/:Canton/:Provice/:status/:feedback?', async (req, res) => {
    Vigilantee.alertMe(req.params.guid, req.params.location,req.params.Canton,req.params.Province,req.params.status,req.params.feedback)
    .then( 
      () => {
        res.send("hola mundo")
      }
    )
  }
)


// Test query - fully functioning
app.get('/info/test', async (req, res) => {
  
    MongoDriver.getInstance().find('AlertMe', 'Logs', { Canton : "Naranjo"})
    .then
    (
      (result : any)=>
      {
        res.send(result)
      }
    )
    .catch
    (
      (error) =>
      {
        Logger.error("en route")
        Logger.error(error)
      }
    )
  }
)

export default app 