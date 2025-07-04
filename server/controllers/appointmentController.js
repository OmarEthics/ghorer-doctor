const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const admin = require('../config/firebase');
const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

exports.bookAppointment = async (req, res) => {
  try {
    const { userId, doctorId, date, time, phone, prescription } = req.body;

    const appointment = await Appointment.create({
      userId,
      doctorId,
      date,
      time,
      status: 'confirmed',
    });

    const doctor = await Doctor.findByPk(doctorId);

    // Upload prescription to Firebase Storage
    if (prescription) {
      const bucket = admin.storage().bucket();
      const file = bucket.file(`prescriptions/${appointment.id}.pdf`);
      await file.save(Buffer.from(prescription, 'base64'), {
        contentType: 'application/pdf',
      });
    }

    // Send SMS in Bengali
    const message = `আপনার ডাক্তার ${doctor.name} এর সাথে ${date} তারিখে ${time} বাজে অ্যাপয়েন্টমেন্ট নিশ্চিত হয়েছে।`;
    await twilio.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to: phone,
    });

    res.json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};