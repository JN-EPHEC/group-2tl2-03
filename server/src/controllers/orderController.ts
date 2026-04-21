import { Request, Response } from 'express';
import { OrderManager } from '../services/orderManager.js';

interface OrderBody {
    customer: { firstName: string; lastName: string; email: string; phone: string; address: string };
    product: { name: string; price: number; stock: number };
    quantity: number;
    discountCode?: string;
}

export const createOrder = async (req: Request, res: Response) => {
    try {
        const data = req.body as OrderBody;
        const orderManager = new OrderManager();

        const result = await orderManager.processOrder(
            data.customer,
            data.product,
            data.quantity,
            data.discountCode || ""
        );

        res.status(201).json({
            success: true,
            message: "Commande créée !",
            totalPrice: result
        });
    } catch (error: any) {
        console.error("Erreur Controller:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};