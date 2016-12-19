/**
 *  
 *
 */
import * as Sequelize from 'sequelize';
import {db} from '../database';

export interface CategoryAttribute {
    id?:string;
    name:string;
    userId:string;
}

export interface CategoryInstance extends Sequelize.Instance<CategoryAttribute>, CategoryAttribute { }

export const Category = db.define<CategoryInstance, CategoryAttribute>("Category", {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                userId: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                }
            },
            {
                tableName: "category",
                timestamps: false,
            });

Category.sync();