import React from 'react';
import { useTranslation } from 'react-i18next';

const DoctorCard = ({ doctor, onSelect }) => {
  const { t } = useTranslation();

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold">{doctor.name}</h3>
      <p>{doctor.qualification}</p>
      <p>{doctor.specialization}</p>
      <p>
        {doctor.district}, {doctor.block}
      </p>
      <button
        onClick={() => onSelect(doctor)}
        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
      >
        {t('book_appointment')}
      </button>
    </div>
  );
};

export default DoctorCard;