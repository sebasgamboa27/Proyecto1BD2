import * as express from 'express' 
import e = require('express')
import { Logger } from '../common' 

const app = express() 
const router = express.Router();

//Request principal
app.post('/log/:mongodbLog', async (req, res) => {
    res.send(req.params.mongodbLog)
  }
)

export default app 