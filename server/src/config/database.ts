import { Sequelize } from "sequelize";
import 'dotenv/config'; 


if (!process.env.DATABASE_URL) {
  throw new Error("ERREUR : DATABASE_URL est manquante dans le fichier .env");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
  logging: false, 
});

export default sequelize;