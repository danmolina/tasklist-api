var fs          = require('fs');
var path        = require('path');
const helpers   = require('../../helpers');

var model = {};

// Base directory of data folder
model.baseDir = path.join(__dirname,'/../../../.data/');

// Write the data to a file
model.create = (data, callback) => {
    let flag = 'wx';
    if (fs.existsSync(model.baseDir + '/tasks.json')) {
        flag = 'r+';
    }

    // Open the file for writing
    fs.open(model.baseDir + '/tasks.json', flag, (err, fileDescriptor) => {
        if(!err && fileDescriptor) {
            // Convert data to string
            var stringData = JSON.stringify(data);

            // Truncate the file
            fs.ftruncate(fileDescriptor, (err) => {
                if(!err) {
                    // Write to file and close it
                    fs.writeFile(fileDescriptor, stringData, (err) => {
                        if(!err) {
                            fs.close(fileDescriptor, (err) => {
                                if(!err) {
                                    callback(false);
                                } else {
                                    callback('Error closing existing file');
                                }
                            });
                        } else {
                            callback('Error writing to existing file');
                        }
                    });
                } else {
                    callback('Error truncating file');
                }
            });
        } else {
            callback('Could not create new file, it may already exist');
        }
    });
};

// Read data from a file
model.read = (callback) => {
    fs.readFile(model.baseDir + '/tasks.json', 'utf8',  (err, data) => {
        // If there is no error and there is data
        if(!err && data) {
            var parsedData = helpers.parseJsonToObject(data);

            callback(false, parsedData);
        } else {
            callback(true, err);
        }
    });
};

// Find data from a file using uuid
model.findUUID = (uuid, callback) => {
    fs.readFile(model.baseDir + '/tasks.json', 'utf8',  (err, data) => {
        // If there is no error and there is data
        if(!err && data) {
            var parsedData = helpers.parseJsonToObject(data);

            let task = null;
            parsedData.forEach((obj) => {
                if (obj.uuid == uuid) {
                    task = obj;
                }
            });

            if (task) {
                callback(false, task);
            } else {
                callback(true, 'UUID does not exist');
            }
        } else {
            callback(true, err);
        }
    });
};

// Update task
model.update = (data, callback) => {
    // Open the file for writing
    fs.open(model.baseDir + '/tasks.json', 'r+', (err, fileDescriptor) => {
        if(!err && fileDescriptor) {
            // Convert data to string
            var stringData = JSON.stringify(data);

            // Truncate the file
            fs.ftruncate(fileDescriptor, (err) => {
                if(!err) {
                    // Write to file and close it
                    fs.writeFile(fileDescriptor, stringData, (err) => {
                        if(!err) {
                            fs.close(fileDescriptor, (err) => {
                                if(!err) {
                                    callback(false);
                                } else {
                                    callback('Error closing existing file');
                                }
                            });
                        } else {
                            callback('Error writing to existing file');
                        }
                    });
                } else {
                    callback('Error truncating file');
                }
            });
        } else {
            callback('Could not open file for updating, it may not exist yet');
        }
    });
};

// Export the module
module.exports = model;