import { Request, Response } from 'express';
import Quizz from '../models/quizz.js';

export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    //récupération des questions depuis la base de données
    const questions = await Quizz.findAll();
    
    res.status(200).json(questions);
  } catch (error) {
    console.error("Erreur Quizz:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des questions" });
  }
};