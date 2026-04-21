import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export class Order extends Model {
  public id!: number;
  public customerName!: string;
  public productName!: string;
  public quantity!: number;
  public totalPrice!: number;
}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'orders', // Nom de la table dans MariaDB
});

export default Order;