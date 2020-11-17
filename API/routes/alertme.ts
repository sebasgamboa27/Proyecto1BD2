import * as express from 'express' 
import e = require('express')
import { Logger } from '../common' 
import {MongoDriver, Vigilantee} from '../controllers'
const app = express() 
const router = express.Router();

//Request principal
app.get('/log/:guid/:lat/:lng/:Canton/:Provice/:status/:feedback?', async (req, res) => {
  Vigilantee.alertMe(req.params.guid,+req.params.lat,+req.params.lng,req.params.Canton,req.params.Province,req.params.status,req.params.feedback).then(()=>{
      res.json({ok:1})
    })
  }
)

app.get('/info/getDaily/:day', async (req, res) => {
  Vigilantee.getDailyActivity(+req.params.day)        // '+' operator casts the string parameter into number type
  .then( 
    (result) => {
      res.send(result)
    }
  )
}
)


app.get('/info/getWeekly', async (req, res) => {
  Vigilantee.getWeeklyActivity()        // '+' operator casts the string parameter into number type
  .then( 
    (result) => {
      res.send(result)
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