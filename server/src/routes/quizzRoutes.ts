import { Router } from 'express';
import { getAllQuestions } from '../controllers/quizzController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { saveScore } from '../controllers/scoreController.js';

const router = Router();

// On protège la route : il faut être connecté pour voir les questions
router.get('/', authenticateToken, getAllQuestions);
// Route pour enregistrer le score d'un utilisateur après un quiz
router.post('/score', authenticateToken, saveScore);

export default router;