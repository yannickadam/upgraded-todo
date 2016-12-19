/**
 * Koa2 Starter pack with MongoDB and user authentication 
 *
 */
import * as Koa from 'koa';                 // Koa Framework
import * as Parser from 'koa-bodyparser';   
import {config} from './utilities/configuration';
import {logger, koaLogger} from './utilities/logger';
import {koaRoutes} from './routes';
import {db} from './database';

(async ()=> {

    try {
        // Initialize Koa
        const app = new Koa();

        // First middleware to inject should be the logger
        app.use( koaLogger );

        // 
        app.use( Parser() );

        // Apply Routes
        app.use( koaRoutes );

        app.use( (ctx:Koa.Context)=>{
            ctx.body="Hello";
        })

        // Start listening
        logger.info(`Starting server on port ${config.get("port")}.`);
        await app.listen( config.get("port") );
        logger.info(`Server Started.`);

    } catch(err) {        
        logger.error(err);
    }
    
})();