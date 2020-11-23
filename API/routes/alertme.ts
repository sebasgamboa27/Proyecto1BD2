import * as express from 'express' 
import e = require('express')
import { Logger } from '../common' 
import {MongoDriver, Vigilantee} from '../controllers'
import { SimulationController } from '../controllers/SimulationController'
const app = express() 
const router = express.Router();

//Request principal
app.post('/log/:guid/:lat/:lng/:Canton/:Provice/:status/:feedback?',
  async (req, res) => {
    Vigilantee.alertMe(req.params)
    .then(
      ()=>{
        res.json({ok:1})
      }
    )
  }
)

app.post('/simulate', 
async (req, res) => {
  SimulationController.simulateLog()
  .then(
    ()=>{
      res.json({ok:1})
    }
  )
}
)

export default app 