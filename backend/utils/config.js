require('dotenv').config();

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  databaseUrl: process.env.DATABASE_URL || 'mongodb://158.160.46.184/mestodb',
  jwtSecret: process.env.JWT_SECRET || '',
};

module.exports = config;
