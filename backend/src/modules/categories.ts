/**
 * 
 * 
 */
import * as Koa from 'koa';
import * as bcrypt from 'bcrypt-nodejs';
import * as jwt from 'jsonwebtoken';

import {logger} from '../utilities/logger';
import {config} from '../utilities/configuration';

import {Category} from '../models/category';
import {UserHasCategory} from '../models/userhascategory';
import {User} from '../models/user';
import {Task} from '../models/task';
import {db} from '../database';

/**
 * Creates a new category in Database
 * TODO: Verify we own parent Category
 */
export async function Create(ctx:Koa.Context, next:any) {
    const data = ctx.request.body;
    const token = ctx.request.token;
    logger.info("Received:", data);

    let trx = await db.transaction();
    try {        
        //TODO: I believe Sequelize should handle this and sanitize the value
        let parentId = data.parentId?parseInt(data.parentId):null;        

        let category = await Category.create({name:data.name, parentId: parentId}, {transaction:trx});
        
        // Only associate root categories to user. (if parentId is null)
        if( !category.parentId ) {
            await UserHasCategory.create({userId:token.id, categoryId:category.id}, {transaction:trx});
        }        
        await trx.commit();
        ctx.response.status = 201;
        ctx.body = category;
    } catch(e) {
        await trx.rollback();
        ctx.response.status = 400;
        ctx.body = e;
    }   
}

/**
 * Retrieves root categories for a User.
 * 
 */
export async function ReadAll(ctx:Koa.Context, next:any) {
   
    // Extract & log request data
    const data = ctx.request.body;
    const token = ctx.request.token;
    logger.info("Received:", data);

    try {
        let user = await User.findById( token.id );
        let categories = await user.getCategories();
        ctx.body = categories;
        ctx.response.status = 200;
    } catch(e) {
        ctx.body = e;
    } 
}

/**
 * Retrieves a single category, including tasks and sub-categories
 * TODO: Check that it belongs to the user...
 */
export async function Read(ctx:Koa.Context, next:any) {
   
    // Extract & log request data
    const data = ctx.request.body;
    const token = ctx.request.token;
    logger.info("Received:", data);

    try {
        let category = await Category.findById(ctx.params.id, {include: ['tasks', 'subs']});
        ctx.body = category;
        ctx.response.status = 200;
    } catch(e) {
        ctx.body = e;
    } 
}

/**
 * Deletes a category
 */
export async function Delete(ctx:Koa.Context, next:any) {
    const data = ctx.request.body;
    const token = ctx.request.token;
    logger.info("Received:", data);

    try {
        await Category.destroy({where:{id:ctx.params.id}});
        ctx.response.status = 204;
        ctx.body = "DELETE SUCCESSFUL";
    } catch(e) {
        ctx.body = e;
    } 
}


export var Categories = { create: Create, readAll: ReadAll, read: Read, delete: Delete };