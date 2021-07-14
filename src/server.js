const express       = require('express');
const bodyParser    = require('body-parser');
const compress      = require('compression');
const cors          = require('cors');
const routes        = require('./routes');

/**
 * Express instance
 * @public
 */
const server = express();

// parse body params and attache them to req.body
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
server.use(compress());

// enable CORS - Cross Origin Resource Sharing
server.use(cors());

// Set the healthcheck URL
server.use('/healthcheck', (req, res) => res.send('Ok'));
// mount api routes
server.use('/api', routes);

module.exports = server;