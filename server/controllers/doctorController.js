const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

exports.getDoctors = async (req, res) => {
  try {
    const { district, block, specialization } = req.query;
    const where = {};
    if (district) where.district = district;
    if (block) where.block = block;
    if (specialization) where.specialization = specialization;

    const doctors = await Doctor.findAll({ where });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAvailability = async (req, res) => {
  try {
    const { doctorId, date } = req.query;
    const appointments = await Appointment.findAll({
      where: { doctorId, date: new Date(date) },
    });

    const bookedSlots = appointments.map((appt) => appt.time);
    const allSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'];
    const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));

    res.json(availableSlots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};