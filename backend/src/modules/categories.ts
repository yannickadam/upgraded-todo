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

/**
 * Creates a new category in Database
 */
export async function Create(ctx:Koa.Context, next:any) {
    const request:any = ctx.request;
    const data:any = request.body;
    logger.info("Received:", data);

    // Extract and verify token
    if( !data.token ) {
        ctx.response.status = 403;
        ctx.body = "Missing token";
        return;
    }

    if( !jwt.verify( data.token, config.get("secret") ) ) {
        ctx.response.status = 403;
        ctx.body = "Invalid signature. IP Address logged.";
        return;
    }

    const token = jwt.decode( data.token );
    logger.info("Decoded:", token);

    try {
        let category = await Category.create({name:data.name, userId:token.id});
        ctx.response.status = 201;
        ctx.body = category;
    } catch(e) {
        ctx.response.status = 400;
        ctx.body = e;
    }
    
}
 
/**
 * Authenticates a user and returns a JSON Web Token (JWT)
 * 
 */
export async function Read(ctx:Koa.Context, next:any) {
   
    // Extract & log request data
    const request:any = ctx.request;
    const data:any = request.body;
    logger.info("Received:", data);

    // Prepare response
    let response:any = {};
/*
    // Find user in Database
    let user:any = await User.findOne( { where: { email: data.email} }); 

    // Check password match
    if( user && bcrypt.compareSync( data.password, user.password ) ) {
        // Create Token
        const token = jwt.sign({id:data.id}, config.get("secret") );
        response.token = token;
    } else {
        response.error = "Unable to authenticate user.";
        ctx.response.status = 401;
    }    

    ctx.body = response;  */
}

export var Categories = { create: Create, read: Read };