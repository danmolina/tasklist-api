const express       = require('express');
const controller    = require('./controller');

const router = express.Router();

// GET Tasks
router.get('/', (req, res) => {
    return controller.getTasks(req, res);
});

// PUT Task
router.put('/:uuid', (req, res) => {
    // Get the uuid from the URL
    let uuid = req.params.uuid;
    return controller.completeTask(uuid, req, res);
});

module.exports = router;