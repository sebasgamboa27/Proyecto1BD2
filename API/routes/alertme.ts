import * as express from 'express' 
import e = require('express')
import { Logger } from '../common' 
import {Vigilantee} from '../controllers'
const app = express() 
const router = express.Router();

//Request principal
app.post('/log/:guid/:location/:status/:feedback?', async (req, res) => {
    Vigilantee.alertMe(req.params.guid, req.params.location, req.params.status,req.params.feedback)
  }
)

export default app 