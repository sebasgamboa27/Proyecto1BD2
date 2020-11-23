import * as express from 'express' 
import e = require('express')
import { Constants, Logger } from '../common' 
import {MongoDriver, Vigilantee} from '../controllers'
import { SimulationController } from '../controllers/SimulationController'
const app = express() 
const request = require('request')
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

app.get('/intersections',(req,res)=>
{
  Vigilantee.getIntersections().then(intersecciones=>
    {
      let powerbiArray = []
      for (let i = 0;true;i++)
      {
        let interseccion = intersecciones[i]    
        if(!interseccion)
        {
          break;
        } 
        let PowerBiData= {'lat':interseccion[0][1], 'long':interseccion[0][0], "intersections":interseccion[1]}
        powerbiArray.push(PowerBiData)
        
      }
      var stringifiedPowerBiData= JSON.stringify(powerbiArray)
      const powerBiRequest = request.post(Constants.POWERBI_HOST, stringifiedPowerBiData,
      (error : any, res : any, body : any) => {
        console.log(    res.statusCode);
     
      });
      powerBiRequest.on('error', (e : any) => {
          console.log(Constants.POWERBI_DATAPUSH_ERROR_MSG);
      });
      powerBiRequest.write(stringifiedPowerBiData);
      powerBiRequest.end;
      }
      
      
    )
})
app.get('/uses',(req,res)=>
{
  let powerbiArray = []
  Vigilantee.getActivity().then(ResultadoSemanal=>
    {
      for (let i = 0;true;i++)
      {
        let ResultadoDiario = ResultadoSemanal[i]    
        if(!ResultadoDiario)
        {
          break;
        } 
        let PowerBiData= {'weekDay':ResultadoDiario.weekDay, 'hour':ResultadoDiario.hour, "count":ResultadoDiario.count}
        powerbiArray.push(PowerBiData)
      }
      var stringifiedPowerBiData= JSON.stringify(powerbiArray)
      const powerBiRequest = request.post(Constants.POWERBI_HOST_WEEKLY, stringifiedPowerBiData,
      (error : any, res : any, body : any) => {
      console.log(res.statusCode);

      });
      powerBiRequest.on('error', (e : any) => {
      console.log(Constants.POWERBI_DATAPUSH_ERROR_MSG);
      });
      powerBiRequest.write(stringifiedPowerBiData);
      powerBiRequest.end; 
    });
})

export default app 