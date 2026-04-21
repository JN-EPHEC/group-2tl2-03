import { Router } from 'express';
import { basicAuth } from '../middlewares/basicAuth.js';
import httpAuth from 'http-auth';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const httpAuthConnect = require('http-auth-connect');

const router = Router();
const authProvider: any = (httpAuth as any).default || httpAuth;

const digest = authProvider.digest({
    realm: "api",
    algorithm: "MD5" // En majuscules pour être identique à ce que Curl attend
}, (username, callback) => {
    console.log(`[DIGEST] Tentative pour : ${username}`);
    
    if (username === "mufasa") {
        // Hachage MD5 EXACT pour mufasa:api:simba123
        // C'est la valeur magique qui manquait :
        callback("915b8643b0bedfa5bae377de08425989");
    } else {
        callback();
    }
});

// Route avec chemin complet (car app.use(adminRoutes) est à la racine dans server.ts)
router.get('/api/admin/digest', httpAuthConnect(digest), (req: any, res) => {
    console.log(`[SUCCESS] Connexion réussie pour ${req.user}`);
    res.json({ message: `Bienvenue dans la zone Digest, ${req.user} !` });
});

router.get('/api/admin/basic', basicAuth, (req, res) => {
    res.json({ message: "Succès ! Vous êtes authentifié en Basic." });
});

export default router;