import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Score extends Model {}

Score.init({
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  points: { type: DataTypes.INTEGER, allowNull: false },
  time_taken: { type: DataTypes.INTEGER, allowNull: false }
}, {
  sequelize,
  modelName: 'Score',
  tableName: 'scores',
  timestamps: false
});

export default Score;