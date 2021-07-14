const https   = require('https');
const shortid = require('shortid');

// Container for all the helpers
var helpers = {};

// Parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = (str) => {
    try{
        var obj = JSON.parse(str);
        return obj;
    } catch(e){
        return {};
    }
};

// Generate short uuid
helpers.generateUUID = () => {
    return shortid.generate();
};

// Get titles from lorem faker
helpers.getLoremFaker = (qty, callback) => {
    // Configure the request url
    var url = 'https://lorem-faker.vercel.app/api?quantity=' + qty;

    // Instantiate the request object
    var req = https.get(url, (res) => {
        let data = '';

        // A chunk of data has been received.
        res.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received.
        res.on('end', () => {
            return callback(JSON.parse(data), false);
        });

        // If there is an error with the request
        res.on('error', (e) => {
            return callback(e, true);
        });
    });

    // Bind to the error event so it doesn't get thrown
    req.on('error',function(e){
        return callback(e, true);
    });

    // End the request
    req.end();
};

// Export the module
module.exports = helpers;