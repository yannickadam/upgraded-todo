/**
 * Cors Module
 * 
 */
import * as Koa from 'koa';                
import {config} from '../utilities/configuration';
import {logger} from '../utilities/logger';

/**
 * 
 */
export async function Cors(ctx:Koa.Context, next:any) {

  ctx.set('Access-Control-Allow-Origin', "*");
  ctx.set('Access-Control-Allow-Methods', "POST, GET, DELETE, PATCH, OPTIONS");
  ctx.set('Access-Control-Allow-Headers', "Accept, Content-Type, token");

  if( ctx.method === "OPTIONS" ) {
    ctx.response.status = 200;
    ctx.body = "CORS allowed";
    return;
  }

  await next();
}