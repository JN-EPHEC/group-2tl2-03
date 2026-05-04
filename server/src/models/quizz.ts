import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js'; 

class Quizz extends Model {}

Quizz.init({
  question: { type: DataTypes.TEXT, allowNull: false },
  option_a: { type: DataTypes.STRING, allowNull: false },
  option_b: { type: DataTypes.STRING, allowNull: false },
  option_c: { type: DataTypes.STRING, allowNull: false },
  option_d: { type: DataTypes.STRING, allowNull: false },
  correct_answer: { type: DataTypes.STRING(1), allowNull: false },
  difficulty: { type: DataTypes.STRING, defaultValue: 'facile' }
}, {
  sequelize,
  modelName: 'Quizz',
  tableName: 'quizzes',
  timestamps: false
});

export default Quizz;