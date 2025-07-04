const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const appointmentController = require('../controllers/appointmentController');

router.get('/doctors', doctorController.getDoctors);
router.get('/availability', doctorController.getAvailability);
router.post('/appointments', appointmentController.bookAppointment);

module.exports = router;