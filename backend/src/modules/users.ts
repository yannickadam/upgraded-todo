/**
 * 
 * 
 */
import * as Koa from 'koa';
import * as bcrypt from 'bcrypt-nodejs';
import * as jwt from 'jsonwebtoken';

import {logger} from '../utilities/logger';
import {config} from '../utilities/configuration';

import {User, UserInstance} from '../models/user';

/**
 * Creates a new user in Database
 */
export async function Create (ctx:Koa.Context, next:any) {    
    const data = ctx.request.body;
    logger.info("Received:", data);

    var hash = bcrypt.hashSync(data.password);

    try {
        let user:UserInstance = await User.create( { email: data.email, password: hash } );        
        ctx.response.status = 201;
        ctx.body = { data: {token: jwt.sign({id:user.id}, config.get("secret") ) }};
    } catch (e) {
        ctx.response.status = 400;
        ctx.body = { error: e.errors };
    }
    
}
 
/**
 * Authenticates a user and returns a JSON Web Token (JWT)
 * 
 */
export async function Login(ctx:Koa.Context, next:any) { 
    // Extract & log request data
    const data = ctx.request.body;
    logger.info("Received:", data);

    // Prepare response
    let response:any = {};

    // Find user in Database
    let user:UserInstance = await User.findOne( { where: { email: data.email} }); 

    // Check password match
    if( user && bcrypt.compareSync( data.password, user.password ) ) {
        // Create Token
        const token = jwt.sign({id:user.id}, config.get("secret") );
        response.data = { token: token} ;
    } else {
        response.error = { error: "Unable to authenticate user." };
        ctx.response.status = 401;
    }    

    ctx.body = response; 
}

export var Users = { login: Login, create: Create };