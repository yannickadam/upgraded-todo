import * as Sequelize from 'sequelize';
import {db} from '../database';

export interface UserHasCategoryAttribute {
    userId:number;
    categoryId:number;
}

export interface UserHasCategoryInstance extends Sequelize.Instance<UserHasCategoryAttribute>, UserHasCategoryAttribute { }

const definition = {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    categoryId: {    
        type: Sequelize.INTEGER,
        allowNull: false
    }
}

const options = {
    tableName: "userHasCategory",
    timestamps: false
}

export const UserHasCategory = db.define( "UserHasCategory", definition, options );