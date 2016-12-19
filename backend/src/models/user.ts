/**
 *  
 *
 */
import * as Sequelize from 'sequelize';
import {db} from '../database';

export interface UserAttribute {
    id?:string;
    name?:string;
    email?:string;
    password?:string;
}

export interface UserInstance extends Sequelize.Instance<UserAttribute>, UserAttribute { }

export const User = db.define<UserInstance, UserAttribute>("User", {
                "id": {
                    "type": Sequelize.INTEGER,
                    autoIncrement: true,
                    "primaryKey": true
                },
                "firstname": {
                    "type": Sequelize.STRING(40),
                    "allowNull": true
                },
                "lastname" : {
                    "type": Sequelize.STRING(40),
                    "allowNull": true                  
                },
                "email": {
                    "type": Sequelize.STRING(128),
                    "allowNull": false,
                    "unique": true,
                    "validate": {
                        "isEmail": true
                    }
                },
                "password": {
                    "type": Sequelize.STRING(128),
                    "allowNull": false
                }
            },
            {
                "tableName": "user"
            });

User.sync();