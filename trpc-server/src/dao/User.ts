import { Sequelize, DataTypes, Model  } from 'sequelize'
import {sequelize} from '../env/db'

class User extends Model{

}
User.init({
   id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
   },
   username: {
      type: DataTypes.STRING,
   },
   password:{
      type: DataTypes.STRING,
   },
   age: {
      type: DataTypes.INTEGER,
   },
   realName:{
      type: DataTypes.STRING,
   },

},{
   sequelize
});


export default User