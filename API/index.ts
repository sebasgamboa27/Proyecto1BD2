import App from './app';
import * as http from 'http';
import { Logger, Constants } from './common';
import { MongoDriver } from './controllers';
const cors = require('cors')
const port = Constants.SERVER_PORT;

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

module.exports = App;