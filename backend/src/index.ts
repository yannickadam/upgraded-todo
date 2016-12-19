/**
 * Koa2 Starter pack with MongoDB and user authentication 
 *
 */
import * as Koa from 'koa';                 // Koa Framework
import * as Parser from 'koa-bodyparser';   
import {config} from './utilities/configuration';
import {logger, koaLogger} from './utilities/logger';
import {koaRoutes} from './routes';
import {Check} from './utilities/token';
import {Cors} from './utilities/cors';
import {prepare} from './models/prepare_db';

(async ()=> {

    try {
        // Prepare Database
        prepare();

        // Initialize Koa
        const app = new Koa();

        // First middleware to inject should be the logger
        app.use( koaLogger );

        // Enable CORS requests
        app.use( Cors );

        // Parse body params and expose on context.
        app.use( Parser() );

        // Check tokens for relevant routes.
        app.use ( Check );

        // Apply Routes
        app.use( koaRoutes );

        app.use( (ctx:Koa.Context)=>{
            ctx.response.status = 404;
            ctx.body="Not sure what you are looking for";
        })

        // Start listening
        logger.info(`Starting server on port ${config.get("port")}.`);
        await app.listen( config.get("port") );
        logger.info(`Server Started.`);

    } catch(err) {        
        logger.error(err);
    }
    
})();