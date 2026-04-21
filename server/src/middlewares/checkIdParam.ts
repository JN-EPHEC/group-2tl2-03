import type { Request, Response, NextFunction } from 'express';

export const checkIdParam = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as { id: string };
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ 
            message: "Mauvaise requête : l'ID doit être un nombre entier valide." 
        });
    }
    next();
};