import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

// Utilisateur fictif pour l'exercice
const demoUser = { 
    id: 1, 
    username: "student", 
    password: "password123", 
    role: "admin" 
};

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    // 1. Vérification des identifiants
    if (username !== demoUser.username || password !== demoUser.password) {
        return res.status(401).json({ message: "Identifiants invalides" });
    }

    // 2. Génération de l'Access Token (15 min)
    const accessToken = jwt.sign(
        { id: demoUser.id, username: demoUser.username, role: demoUser.role },
        process.env.JWT_ACCESS_SECRET!,
        { expiresIn: "15m" }
    );

    // 3. Génération du Refresh Token (7 jours)
    const refreshToken = jwt.sign(
        { id: demoUser.id },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: "7d" }
    );

    // 4. Envoi du Refresh Token dans un cookie sécurisé
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true, // Empêche le JS côté client de lire le cookie (sécurité contre XSS)
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours en millisecondes
    });

    // 5. Réponse avec l'Access Token
    res.json({ accessToken });
});
router.post("/refresh", (req, res) => {
    // 1. Récupérer le Refresh Token dans le corps de la requête
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh Token manquant" });
    }

    try {
        // 2. Vérifier la validité du Refresh Token
        const decoded: any = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);

        // 3. Si valide, générer un NOUVEL Access Token (15m)
        // On reprend les infos du Payload (id, username, role)
        const newAccessToken = jwt.sign(
            { id: decoded.id, username: "student", role: "admin" }, // Idéalement, on irait chercher ces infos en DB
            process.env.JWT_ACCESS_SECRET!,
            { expiresIn: "15m" }
        );

        // 4. Renvoyer le nouveau token
        res.json({ accessToken: newAccessToken });
    } catch (err) {
        return res.status(403).json({ message: "Refresh Token invalide ou expiré" });
    }
});
export default router;