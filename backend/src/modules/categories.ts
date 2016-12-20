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
import {db} from '../database';

/**
 * Creates a new category in Database
 */
export async function Create(ctx:Koa.Context, next:any) {
    const data = ctx.request.body;
    const token = ctx.request.token;
    logger.info("Received:", data);

    let trx = await db.transaction();
    try {        
        let category = await Category.create({name:data.name}, {transaction:trx});
        let assoc = await UserHasCategory.create({userId:token.id, categoryId:category.id}, {transaction:trx});
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
 * Retrieves categories for a User.
 * 
 */
export async function Read(ctx:Koa.Context, next:any) {
   
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


export var Categories = { create: Create, read: Read, delete: Delete };