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
   age: {
      type: DataTypes.INTEGER,
   },
},{
   sequelize
});


export default User