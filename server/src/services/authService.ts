import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export class AuthService {
  // Méthode d'inscription
  static async registerUser(userData: any) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await User.create({
      ...userData,
      password: hashedPassword,
    });
    return newUser.get({ plain: true });
  }

  // Méthode de connexion
  static async loginUser(email: string, pass: string) {
    const userInstance = await User.findOne({ where: { email } });

    if (!userInstance) {
      throw new Error("Identifiants incorrects");
    }

    const userData = userInstance.get({ plain: true });

    if (!userData.password) {
      throw new Error("Erreur interne : mot de passe absent en base.");
    }

    const isMatch = await bcrypt.compare(pass, userData.password);
    if (!isMatch) {
      throw new Error("Identifiants incorrects");
    }

    const token = jwt.sign(
      { id: userData.id, email: userData.email },
      process.env.JWT_ACCESS_SECRET as string,
      { expiresIn: '2h' }
    );

    return { 
      user: { id: userData.id, username: userData.username }, 
      token 
    };
  }
}