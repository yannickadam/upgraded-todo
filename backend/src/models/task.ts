/**
 *  
 *
 */
import * as Sequelize from 'sequelize';
import {db} from '../database';

export interface TaskAttribute {
    id?:string;
    name:string;
    categoryId:string;
}

export interface TaskInstance extends Sequelize.Instance<TaskAttribute>, TaskAttribute { }

const definition = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoryId: {
        type: Sequelize.INTEGER,
        allowNull:false
    }
}

const options = {
    tableName: "task", 
    timestamps: false,    
}

export const Task = db.define<TaskInstance, TaskAttribute>("Task", definition, options);


