/**
 *  
 *
 */
import * as Sequelize from 'sequelize';
import {db} from '../database';

export interface TaskAttribute {
    id?:string;
}

export interface TaskInstance extends Sequelize.Instance<TaskAttribute>, TaskAttribute { }

export const Task = db.define<TaskInstance, TaskAttribute>("Task", {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                }
            },
            {
                tableName: "task", 
                timestamps: false,
            });

Task.sync();