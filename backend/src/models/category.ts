/**
 *  
 *
 */
import * as Sequelize from 'sequelize';
import {db} from '../database';


export interface CategoryAttribute {
    id?:string;
    name:string;
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
    }
};

const options = {
    tableName: "category",
    timestamps: false  
};

export const Category = db.define<CategoryInstance, CategoryAttribute>("Category", definition, options);