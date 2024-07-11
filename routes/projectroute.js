
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectcontroller');


router.post('/projects', projectController.createProject);

router.get('/projects', projectController.getProjects);

router.put('/projects/status', projectController.updatestatus);

router.get('/projects/counter', projectController.counterproject );

router.get('/projects/counter/delay',projectController.delaycounterproject);

router.get('/projects/chartdata', projectController.chartProject);

module.exports = router;

