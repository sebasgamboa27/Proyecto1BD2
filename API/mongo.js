const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(3000, function () {
  console.log('Mongo Server API running on port 3000');
});


//Aqui es donde va todo lo del API, en esta carpeta y en este archivo, y ahi le vamos agregando mas archivos con mas cosas