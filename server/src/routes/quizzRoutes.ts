import { Router } from 'express';
import { getAllQuestions } from '../controllers/quizzController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();

// On protège la route : il faut être connecté pour voir les questions
router.get('/', authenticateToken, getAllQuestions);

export default router;