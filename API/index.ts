import App from './app';
import * as http from 'http';
import { Logger, Constants } from './common';
import { MongoDriver } from './controllers';
const cors = require('cors')
const port = Constants.SERVER_PORT;
const cron = require('node-cron')
var os = require('os');
var cpuStats = require('cpu-stats')
const request = require('request')
App.set('port', port);
const server = http.createServer(App);
server.listen(port);
App.use(cors());
MongoDriver.getInstance()

server.on('listening', function(): void {
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    Logger.info(`Pocket Vigilantee server API running on port${bind}`);
});


//Metric update
cron.schedule('*/5 * * * * *', function() {
    cpuStats(1500, function(error, result) {
        if(error) return console.error('Oh noes!', error) // actually this will never happen
        let averageCPU=0
        for(let i = 0 ; i<Constants.CPU_CORE_COUNT;i++)
        {
            averageCPU+=result[i].cpu
        }
        averageCPU= Math.round((averageCPU/Constants.CPU_CORE_COUNT)*Constants.ROUNDING_FACTOR)/Constants.ROUNDING_FACTOR
        var usedMemory =Math.round((os.totalmem()-os.freemem())/(Constants.BYTES_TO_GIGABYTES_DIVISION)*Constants.ROUNDING_FACTOR)/Constants.ROUNDING_FACTOR;
        let PowerBiData= [{"CPU":averageCPU,"RAM":usedMemory,"Max Cpu":100,"Max Ram":Constants.HOST_MACHINE_RAM,"Min Cpu":0,"Min RAM":0}]
        var stringifiedPowerBiData= JSON.stringify(PowerBiData)
        const powerBiRequest = request.post(Constants.POWERBI_HOST_METRICS, stringifiedPowerBiData,
        (error, res, body) => {
        });
        powerBiRequest.on('error', (e) => {
            console.log(Constants.POWERBI_DATAPUSH_ERROR_MSG);
        });
        powerBiRequest.write(stringifiedPowerBiData);
        powerBiRequest.end;
        

        
  });
});
  
module.exports = App;