const express = require('express');
const cookieParser = require('cookie-parser'); //se utiliza para guardar informacion del usuario, ahora se usa "sesiones"
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

require('./db.js'); //para que la ejecuto?? sino la  guardo en ninguna variable

const server = express();

server.name = 'API'; //cambia el nombre del servidor, pero no se con que fin??

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
//Extended false utiliza la librería querystring mientras que true la librería qs. 
//La sintaxis de extended:true permite el uso de otras características como rich objects y 
//arreglos codificados dentro del formato URL-encoded.
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
