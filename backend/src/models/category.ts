/**
 *  
 *
 */
import * as Sequelize from 'sequelize';
import {db} from '../database';


export interface CategoryAttribute {
    id?:number;
    name:string;
    parentId?:number;
}

export interface CategoryInstance extends Sequelize.Instance<CategoryAttribute>, CategoryAttribute { }

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
    parentId: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
};

const options = {
    tableName: "category",
    timestamps: false  
};

export const Category = db.define<CategoryInstance, CategoryAttribute>("Category", definition, options);