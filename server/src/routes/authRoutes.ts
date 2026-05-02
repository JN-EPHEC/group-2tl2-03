import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Route pour l'inscription : POST http://localhost:3000/api/auth/register
router.post('/register', AuthController.register);

// Route pour la connexion : POST http://localhost:3000/api/auth/login
router.post('/login', AuthController.login);
router.get('/profile', authenticateToken, (req, res) => {
  res.json({
    message: "Bienvenue sur votre profil sécurisé !",
    user: (req as any).user 
  });
});

export default router;