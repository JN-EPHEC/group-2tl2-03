import type { Request, Response } from "express";
import User from "../models/User.js";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { nom, prenom } = req.body;
        const newUser = await User.create({ nom, prenom });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: (error as any).message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({ where: { id: id as string } });
        
        if (deleted) {
            res.status(204).send(); 
        } else {
            res.status(404).json({ error: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nom, prenom } = req.body;
        await User.update({ nom, prenom }, { where: { id: id as string } });
        const updatedUser = await User.findByPk(id as string); 
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
}; 

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id as string);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
}