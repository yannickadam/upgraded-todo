/**
 *  
 *
 */
import * as Sequelize from 'sequelize';
import {db} from '../database';

export interface TaskAttribute {
    id?:number;
    name:string;
    categoryId:number;
    completed?:boolean;
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
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
}

const options = {
    tableName: "task", 
    timestamps: false,    
}

export const Task = db.define<TaskInstance, TaskAttribute>("Task", definition, options);


