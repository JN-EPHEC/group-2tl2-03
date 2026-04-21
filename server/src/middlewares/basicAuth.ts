import { Request, Response, NextFunction } from 'express';

export const basicAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        // Si pas de header, on renvoie l'en-tête spécial pour dire au navigateur d'afficher la popup
        res.setHeader('WWW-Authenticate', 'Basic realm="Zone Admin"');
        return res.status(401).json({ message: 'Authentification requise' });
    }

    // 1. Extraire la partie Base64 (après "Basic ")
    const base64String = authHeader.split(' ')[1];

    // 2. Décoder le Base64
    const credentials = Buffer.from(base64String, 'base64').toString('utf-8');
    
    // 3. Séparer l'utilisateur et le mot de passe (format "user:pass")
    const [username, password] = credentials.split(':');

    // 4. Vérification des identifiants (en dur pour l'exercice)
    if (username === 'admin' && password === 'supersecret') {
        next(); // Tout est bon, on passe à la route
    } else {
        res.setHeader('WWW-Authenticate', 'Basic realm="Zone Admin"');
        res.status(401).json({ message: 'Identifiants invalides' });
    }
};