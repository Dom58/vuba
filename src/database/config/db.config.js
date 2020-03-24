import 'dotenv/config';

const config = {
  development: {
    use_env_variable: 'DATABASE_URL_DEV',
    username: process.env.DB_USER_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: process.env.DB_NAME_DEV,
    host: process.env.DB_HOST_DEV,
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
  test: {
    use_env_variable: 'DATABASE_URL_TEST',
    username: process.env.DB_USER_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST_TEST,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    logging: false,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    username: process.env.DB_USER_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: process.env.DB_NAME_DEV,
    host: process.env.DB_HOST_DEV,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    logging: false,
  },
};

module.exports = config;
