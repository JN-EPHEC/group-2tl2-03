import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js'; 

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }, 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    nom: {
      type: DataTypes.STRING,
    },
    prenom: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'User',
  },
);

export default User;