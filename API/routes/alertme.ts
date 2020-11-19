import * as express from 'express' 
import e = require('express')
import { Logger } from '../common' 
import {MongoDriver, Vigilantee} from '../controllers'
const app = express() 
const router = express.Router();

//Request principal
app.post('/log/:guid/:lat/:lng/:Canton/:Provice/:status/:feedback?', async (req, res) => {
  Vigilantee.alertMe(req.params.guid,+req.params.lat,+req.params.lng,req.params.Canton,req.params.Province,req.params.status,req.params.feedback).then(()=>{
      res.json({ok:1})
    })
  }
)

export default app 