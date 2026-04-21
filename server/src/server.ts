import express from 'express'
import './models/Order.js'; // Déjà présent, c'est parfait
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import sequelize from './config/database.js';
import User from './models/User.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { requestLogger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import cors from 'cors';
import orderRoutes from './routes/orderRoutes.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import { jwtAuth } from './middlewares/jwtAuth.js';

const app=express();
const PORT=3000;
const HOST = '0.0.0.0';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
        url: "/api-docs/swagger.json", // Force le chemin du JSON
    },
    customSiteTitle: "WoodyToys API Docs"
}));
app.get('/api-docs/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());
app.use(adminRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/order', orderRoutes);
app.use(errorHandler);

// MODIFICATION : Utiliser 'alter: true' au lieu de 'force: false' 
// 'alter' permet de mettre à jour les tables existantes sans supprimer tes données
sequelize.sync({ alter: true }) 
    .then(() => {
        console.log('Connexion à la base de données réussie et modèles synchronisés');
        
        app.listen(PORT, HOST, () => { // Ajout de HOST pour être sûr que Docker écoute partout
            console.log(`Serveur lancé sur http://${HOST}:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Impossible de se connecter à la base de données :', err);
    });

app.get('/api/data',(req,res)=>{
    const etudiants = [
        { id: 1, nom: "Dupont", prenom: "Jean" },
        { id: 2, nom: "Martin", prenom: "Sophie" },
        { id: 3, nom: "Doe", prenom: "John" },
    ];
    res.json(etudiants);
});

app.get('/api/hello/:name',(req,res)=>{
    const nom = req.params.name;
    const timestamp = new Date().toISOString();
    res.json({ "message": `Bonjour ${nom}`, "timestamp": timestamp });
});
app.get('/api/profile', jwtAuth, (req: any, res) => {
    res.json({ 
        message: "Bienvenue sur votre profil sécurisé", 
        user: req.user 
    });
});