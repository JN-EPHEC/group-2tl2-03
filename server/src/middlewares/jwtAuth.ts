import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const jwtAuth = (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // Le format attendu est "Bearer <TOKEN>"
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Accès refusé. Token manquant." });
    }

    // On récupère le token après "Bearer " (7 caractères)
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
        req.user = decoded; // On attache les infos de l'utilisateur à la requête
        next();
    } catch (err) {
        return res.status(403).json({ message: "Token invalide ou expiré." });
    }
};