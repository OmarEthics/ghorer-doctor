import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorCard from '../components/DoctorCard';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  const [doctors, setDoctors] = useState([]);
  const [district, setDistrict] = useState('');
  const [block, setBlock] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      const res = await axios.get('http://localhost:5000/api/doctors', {
        params: { district, block, specialization },
      });
      setDoctors(res.data);
    };
    fetchDoctors();
  }, [district, block, specialization]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <select onChange={(e) => setDistrict(e.target.value)} className="border p-2">
          <option value="">{t('district')}</option>
          <option value="কলকাতা">কলকাতা</option>
        </select>
        <select onChange={(e) => setBlock(e.target.value)} className="border p-2">
          <option value="">{t('block')}</option>
          <option value="বারাসাত">বারাসাত</option>
          <option value="বেলিয়াঘাটা">বেলিয়াঘাটা</option>
        </select>
        <select onChange={(e) => setSpecialization(e.target.value)} className="border p-2">
          <option value="">{t('specialization')}</option>
          <option value="কার্ডিওলজি">কার্ডিওলজি</option>
          <option value="সাধারণ চিকিৎসা">সাধারণ চিকিৎসা</option>
        </select>
        <button onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'bn' : 'en')} className="bg-gray-200 p-2">
          {i18n.language === 'en' ? 'বাংলা' : 'English'}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} onSelect={setSelectedDoctor} />
        ))}
      </div>
    </div>
  );
};

export default Home;