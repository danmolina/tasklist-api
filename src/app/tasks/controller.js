/**
 * This file is part of the Custom API Application.
 * (c) 2021 Dan Michael Molina <danmichaelmolina@gmail.com>
 */
const model     = require('./model');
const helpers   = require('../../helpers');

// Return the tasks
exports.getTasks = (req, res) => {
    var quantity = 3;
    if (req.query.quantity) {
        // If the quantity is set in the query string
        // Override the default quantity
        quantity = req.query.quantity;
    }

    // Get the lorem faker from the API
    helpers.getLoremFaker(quantity, (data, err) => {
        // If there is no error
        if (!err) {
            let tasks = [];
            let count = 1;
            data.forEach((title) => {
                // Generate the UUID
                let uuid = helpers.generateUUID();
                // Push the object
                tasks.push({
                    id: count,
                    uuid: uuid,
                    title: title,
                    status: 'PENDING'
                });

                count++;
            });

            // Create the data from the lorem faker
            model.create(tasks, (err) => {
                // If there is no error
                if (!err) {
                    return getListOfTasks(req, res);
                } else {
                    // otherwise, return the error
                    return res.status(400).json(err);
                }
            });
        } else {
            // otherwise, return the error
            return res.status(400).json(data);
        }
    });
};

// Complete the task by uuid
exports.completeTask = (uuid, req, res) => {
    model.read((err, tasks) => {
        // If there is no error
        if (!err) {
            let hasError = false;
            // Loop through the tasks
            tasks.forEach((obj) => {
                // If the uuid matches
                if (obj.uuid == uuid) {
                    // If the status is not PENDING
                    if (obj.status != 'PENDING') {
                        hasError = true;
                    } else {
                        // Set the status to complete
                        obj.status = 'COMPLETE';

                        console.log(`Updated the status of UUID ${obj.uuid} from PENDING to COMPLETE`);
                    }
                }
            });

            if (hasError) {
                return res.status(400).json('Task cannot be updated because it has been completed already.');
            } else {
                // Update the tasks
                model.update(tasks, (err) => {
                    // If there is no error
                    if (!err) {
                        return res.json('Ok');
                    } else {
                        // otherwise, return the error
                        return res.status(400).json(err);
                    }
                });
            }
        } else {
            // otherwise, return the error
            return res.status(400).json(err);
        }
    });
};

const getListOfTasks = (req, res) => {
    // Read the task json file
    model.read((err, data) => {
        // If there is no error
        if (!err) {
            return res.json(data);
        } else {
            // otherwise, return the error
            return res.status(400).json(err);
        }
    });
};