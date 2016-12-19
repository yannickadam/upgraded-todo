/**
 * Token check Module
 * 
 */
import * as Koa from 'koa';                
import * as jwt from 'jsonwebtoken';
import {config} from '../utilities/configuration';
import {logger} from '../utilities/logger';

const EXCLUDE = ["/users", "/users/login"];

/**
 * 
 */
export async function Check(ctx:Koa.Context, next:any) {

  if( !EXCLUDE.includes(ctx.request.url) ) {
    // Extract and verify token
    if( !ctx.request.header.token ) {
      ctx.response.status = 403;
      ctx.body = "Missing token";
      return;
    }

    try {    
      if( !jwt.verify( ctx.request.header.token, config.get("secret") ) ) {
        throw("Invalid token");
      }
    } catch(e) {
      ctx.response.status = 403;
      ctx.body = "Invalid signature. IP Address logged.";
      logger.info(`TOKEN: Invalid signature (${ctx.request.ip})`);
      return;
    }

    const token = jwt.decode( ctx.request.header.token );
    logger.info("Decoded:", token);

    // Expose on request
    ctx.request.token = token;
  }

  await next();
}