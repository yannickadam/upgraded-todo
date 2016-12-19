/**
 *  
 *
 */
import * as Sequelize from 'sequelize';
import {db} from '../database';
import {CategoryInstance} from './category';

export interface UserAttribute {
    id?:string;
    name?:string;
    email?:string;
    password?:string;
}

export interface UserInstance extends Sequelize.Instance<UserAttribute>, UserAttribute { 
    getCategories: Sequelize.BelongsToManyGetAssociationsMixin<CategoryInstance>;
}

const definition = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstname: {    
        type: Sequelize.STRING(40),
        allowNull: true
    },
    lastname : {
        type: Sequelize.STRING(40),
        allowNull: true
    },
    email: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING(128),
        allowNull: false
    }
}

const options = {
    tableName: "user"
}

export const User = db.define<UserInstance, UserAttribute>("User", definition, options);