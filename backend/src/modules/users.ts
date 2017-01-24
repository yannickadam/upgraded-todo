/**
 * 
 * 
 */
import * as Koa from 'koa';
import * as bcrypt from 'bcrypt-nodejs';
import * as jwt from 'jsonwebtoken';
import * as rp from 'request-promise';

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

/**
 * Login with Google
 */
export async function Google(ctx:Koa.Context, next:any) {
    
    const accessTokenUrl = 'https://www.googleapis.com/oauth2/v3/token';
    const peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    const params = {
        code: ctx.request.body.code,
        client_id: ctx.request.body.clientId,
        client_secret: "bXzRKRIZbkYGII2Hth97JXmP",
        redirect_uri: ctx.request.body.redirectUri,
        grant_type: 'authorization_code'
    };

    // Step 1. Exchange authorization code for access token.
    const {access_token} = await rp.post(accessTokenUrl, {json: true, form: params});
    const headers = {Authorization: 'Bearer ' + access_token};
    
    // Step 2. Retrieve profile information about the current user.
    const profile: any = await rp.get({url: peopleApiUrl, json: true, headers});
    
    // Check if we have this user in DB
    let user:UserInstance = await User.findOne( { where: { email: profile.email} }); 

    // User does not exist, create him.
    if( !user ) {        
        user = await User.create( { email: profile.email, firstname: profile.given_name, lastname: profile.family_name, picture_url: profile.picture.replace('?sz=50', '') } );
        ctx.response.status = 201;        
    }

    ctx.body = { data: {token: jwt.sign({id:user.id}, config.get("secret") ), 
                        firstname: user.firstname,
                        lastname: user.lastname,
                        picture_url: user.picture_url }}; 

    /*
    // Step 3a. Link user account.

    {"kind":"plus#personOpenIdConnect","gender":"male","sub":"112823959385411043726","name":"Yannick Adam","given_name":"Yannick","family_name":"Adam","profile":"https://plus.google.com/112823959385411043726","picture":"https://lh5.googleusercontent.com/-Bfz7GWCEfRg/AAAAAAAAAAI/AAAAAAAACzI/JGD-g2a-Pjc/photo.jpg?sz=50","email":"yannick.adam@gmail.com","email_verified":"true","locale":"en"}
https://lh5.googleusercontent.com/-Bfz7GWCEfRg/AAAAAAAAAAI/AAAAAAAACzI/JGD-g2a-Pjc/photo.jpg?sz=50
    if (req.user) {
        if (await dbGoogleIdExists(profile.sub)) {
            return res.status(409).send('Google profile already linked');
        }
        const user = await dbUpdateUser(req.user.username, {
            google: profile.sub,
            picture: profile.picture.replace('sz=50', 'sz=200'),
            displayName: req.user.displayName || profile.name
        });
        return await sendTokenAsync(res, toTokenUser(user));
    }
    // Step 3b. Create a new user account
    const googleIdExists = await dbGoogleIdExists(profile.sub);
    if (!googleIdExists) {
        const user = await dbSaveUser({
            username: profile.email,
            google: profile.sub,
            picture: profile.picture.replace('sz=50', 'sz=200'),
            displayName: profile.name
        });
        return await sendTokenAsync(res, toTokenUser(user));
    }
    // 3c. return an existing user
    const user = await dbGetUserByGoogle(profile.sub);
    */
    
}

export var Users = { login: Login, create: Create, google: Google };