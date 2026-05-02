import bcrypt from 'bcrypt';
import User from '../models/User.js';

export class AuthService {
  // puissance du hachage (10)
  private static saltRounds = 10;

  /**
   * Logique d'inscription : Hachage + Création en DB
   */
  static async registerUser(userData: any) {
    const { username, email, password, nom, prenom } = userData;

    // 1. Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);

    // 2. Création de l'utilisateur dans la base Supabase
    return await User.create({
      username,
      email,
      password: hashedPassword, 
      nom,
      prenom
    });
  }

  /**
   * Logique de connexion : Vérification de l'email et du mot de passe
   */
  static async loginUser(email: string, password: string) {
    
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Mot de passe incorrect');
    }

    return user;
  }
}