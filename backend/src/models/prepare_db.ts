// Import models
import {User} from './user';
import {Category} from './category';
import {Task} from './task';
import {UserHasCategory} from './userhascategory';
import {db} from '../database';

export async function prepare() {
  Category.belongsToMany(User, {through: "UserHasCategory", foreignKey:"categoryId", otherKey:"userId"} );  
  User.belongsToMany(Category, {as:'Categories', through: "UserHasCategory", foreignKey:"userId", otherKey:"categoryId"} );
  
  Category.hasMany(Task, {as:'tasks', foreignKey:"categoryId"});
  Category.hasMany(Category, {as:'subs', foreignKey:"parentId"});

  await db.query("SET FOREIGN_KEY_CHECKS = 0");
  await db.sync(/*{force:true}*/);
  await db.query("SET FOREIGN_KEY_CHECKS = 1");
}
