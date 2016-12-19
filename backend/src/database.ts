/**
 * Single instance of Sequelize for the application
 */
import * as sqlib from 'sequelize';
import {config} from './utilities/configuration';

export const db = new sqlib(config.get("database_name"), config.get("database_user"), config.get("database_password"), {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

export const Sequelize = sqlib;

