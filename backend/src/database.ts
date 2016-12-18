/**
 *
 */
import * as Sequelize from 'sequelize';
import {config} from './utilities/configuration';

const db = config


export const sequelize = new Sequelize(config.get("database_name"), config.get("database_user"), config.get("database_password"), {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
