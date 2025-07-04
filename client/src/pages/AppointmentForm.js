import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';

const AppointmentForm = ({ doctor }) => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [phone, setPhone] = useState('');
  const [prescription, setPrescription] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    const fetchAvailability = async () => {
      const res = await axios.get('http://localhost:5000/api/availability', {
        params: { doctorId: doctor.id, date },
      });
      setAvailableSlots(res.data);
    };
    if (date) fetchAvailability();
  }, [date, doctor.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let prescriptionBase64 = null;
    if (prescription) {
      const reader = new FileReader();
      reader.readAsDataURL(prescription);
      reader.onloadend = async () => {
        prescriptionBase64 = reader.result.split(',')[1];
        await axios.post('http://localhost:5000/api/appointments', {
          userId: user.uid,
          doctorId: doctor.id,
          date,
          time,
          phone,
          prescription: prescriptionBase64,
        });
        alert(t('confirm_booking'));
      };
    } else {
      await axios.post('http://localhost:5000/api/appointments', {
        userId: user.uid,
        doctorId: doctor.id,
        date,
        time,
        phone,
      });
      alert(t('confirm_booking'));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">{t('book_appointment')}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full"
        />
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">{t('select_time')}</option>
          {availableSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          className="border p-2 w-full"
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPrescription(e.target.files[0])}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          {t('confirm_booking')}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;