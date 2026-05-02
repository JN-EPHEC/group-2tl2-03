import express from 'express';
import sequelize from './config/database.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { requestLogger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import { jwtAuth } from './middlewares/jwtAuth.js';

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Middlewares de base ---
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

// --- Documentation Swagger ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
        url: "/api-docs/swagger.json",
    },
    customSiteTitle: "Quiz Game API Docs" 
}));

app.get('/api-docs/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// --- Routes API ---
app.use('/api/auth', authRoutes);


app.get('/api/profile', jwtAuth, (req: any, res) => {
    res.json({ 
        message: "Bienvenue sur votre profil sécurisé", 
        user: req.user 
    });
});

// --- Gestion des erreurs ---
app.use(errorHandler);

// --- Synchronisation Base de données & Lancement ---
sequelize.sync({ alter: true }) 
    .then(() => {
        console.log('✅ Connexion à Supabase réussie et modèles synchronisés');
        
        app.listen(PORT, HOST, () => {
            console.log(`🚀 Serveur Quiz lancé sur http://${HOST}:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ Impossible de se connecter à la base de données :', err);
    });