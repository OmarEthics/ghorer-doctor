const sequelize = require('./config/db');
const Doctor = require('./models/Doctor');

const seed = async () => {
  await sequelize.sync({ force: true });
  await Doctor.bulkCreate([
    {
      name: 'ডাঃ অজয় দাস',
      qualification: 'MBBS, MD',
      specialization: 'কার্ডিওলজি',
      district: 'কলকাতা',
      block: 'বারাসাত',
    },
    {
      name: 'ডাঃ মিতা সেন',
      qualification: 'MBBS',
      specialization: 'সাধারণ চিকিৎসা',
      district: 'কলকাতা',
      block: 'বেলিয়াঘাটা',
    },
  ]);
  console.log('Database seeded');
};

seed();