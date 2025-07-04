import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      search: 'Search',
      book_appointment: 'Book Appointment',
      district: 'District',
      block: 'Block',
      specialization: 'Specialization',
      select_doctor: 'Select a Doctor',
      upload_prescription: 'Upload Prescription (PDF)',
      confirm_booking: 'Confirm Booking',
    },
  },
  bn: {
    translation: {
      search: 'অনুসন্ধান',
      book_appointment: 'অ্যাপয়েন্টমেন্ট বুক করুন',
      district: 'জেলা',
      block: 'ব্লক',
      specialization: 'বিশেষীকরণ',
      select_doctor: 'ডাক্তার নির্বাচন করুন',
      upload_prescription: 'প্রেসক্রিপশন আপলোড করুন (PDF)',
      confirm_booking: 'বুকিং নিশ্চিত করুন',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;