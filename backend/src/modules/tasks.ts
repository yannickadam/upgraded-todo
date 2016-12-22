/**
 * 
 * 
 */
import * as Koa from 'koa';
import * as bcrypt from 'bcrypt-nodejs';

import {logger} from '../utilities/logger';
import {config} from '../utilities/configuration';

import {Task} from '../models/task';

/**
 * Creates a new task in Database
 */
export async function Create(ctx:Koa.Context, next:any) {
    const data = ctx.request.body;
    const token = ctx.request.token;
    logger.info("Received:", data);
    
    // TODO: Check params ID

    try {
        let task = await Task.create({name:data.name, categoryId:ctx.params.id});
        ctx.response.status = 201;
        ctx.body = task;
    } catch(e) {
        ctx.response.status = 400;
        ctx.body = e;
    }   
}

/**
 * Retrieves categories for a User.
 * 
 */
export async function Read(ctx:Koa.Context, next:any) {
    const data = ctx.request.body;
    const token = ctx.request.token;
    logger.info("Received:", ctx.params);

    try {
        let task = await Task.findById( ctx.params.id );
        if( task ) {
          ctx.body = task;
        } else {
          ctx.response.status = 404;
        }        
    } catch(e) {
        ctx.body = e;
    } 
}

/**
 * Deletes a task
 * TODO: Check that we have the rights to delete the task
 */
export async function Delete(ctx:Koa.Context, next:any) {
    const data = ctx.request.body;
    const token = ctx.request.token;
    logger.info("Received:", data);

    try {
        await Task.destroy({where:{id:ctx.params.id}});
        ctx.response.status = 204;
        ctx.body = "DELETE SUCCESSFUL";
    } catch(e) {
        ctx.body = e;
    } 
}

/**
 * 
 */
export async function Update(ctx:Koa.Context, next:any) {
    const data = ctx.request.body;
    const token = ctx.request.token;
    logger.info("Received:", data);
    
    try {        
        let task = await Task.findById(ctx.params.id);
        task = await task.update({completed:data.completed});
        ctx.response.status = 200;
        ctx.body = task;
    } catch(e) {
        ctx.response.status = 400;
        ctx.body = e;
    }   
}

export var Tasks = { create: Create, read: Read, delete: Delete, update: Update };