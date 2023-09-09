require('dotenv').config();

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/mestodb',
  jwtSecret: process.env.JWT_SECRET || '',
};

module.exports = config;
