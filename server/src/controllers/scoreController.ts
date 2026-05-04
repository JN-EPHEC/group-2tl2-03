import { Request, Response } from 'express';
import Score from '../models/score.js';

export const saveScore = async (req: any, res: Response) => {
  try {
    const { points, time_taken } = req.body;
    const userId = req.user.id; 

    const newScore = await Score.create({
      user_id: userId,
      points,
      time_taken
    });

    res.status(201).json({ message: "Score enregistré !", score: newScore });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'enregistrement du score" });
  }
};