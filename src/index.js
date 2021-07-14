// make bluebird default Promise
Promise = require('bluebird');
// Get ENV Config
const { port, env } = require('./config');

// Initialize the server
const server = require('./server');
// Initialize the database
// Initialize the Socket.io

// listen to requests
server.listen(port, () => {
    console.log(`server started on port ${port} (${env})`)
});

/**
 * Exports express
 * @public
 */
module.exports = server;