import { Request, Response } from 'express';
import { AuthService } from '../services/authService.js';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const user = await AuthService.registerUser(req.body);
      res.status(201).json({ message: 'Utilisateur créé avec succès !', user });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      
      const result = await AuthService.loginUser(email, password);

      res.status(200).json({
        message: 'Connexion réussie !',
        token: result.token,
        user: result.user
      });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }
}