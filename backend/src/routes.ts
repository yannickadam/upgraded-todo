/**
 * Routes configuration
 * 
 * Declare all routes here
 *
 */
import * as Koa from 'koa';                 // Required for definitions
import * as Router from 'koa-router';

// Import modules here
import {Users} from './modules/users';
import {Categories} from './modules/categories';

// Initialize router
const router = new Router();

// Declare routes below
router.post('/users', Users.create);
router.post('/users/login', Users.login);

router.post('/categories', Categories.create);
router.get('categories', Categories.read);

// 
export var koaRoutes = router.routes();