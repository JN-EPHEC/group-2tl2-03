import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';



class User extends Model {}

User.init(
  {
    // Model attributes are defined here
    nom: {
      type: DataTypes.STRING,
    },
    prenom: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
  },
);

// the defined model is the class itself
console.log(User === sequelize.models.User); // true
export default User;