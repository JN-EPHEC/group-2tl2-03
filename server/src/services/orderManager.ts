import Order from '../models/Order.js';

export class OrderManager {
    async processOrder(customer: any, product: any, quantity: number, discountCode: string): Promise<number> {
        // 1. Calcul du prix (Prix * Quantité + 21% TVA)
        const totalHTVA = product.price * quantity;
        const totalTTC = totalHTVA * 1.21; 

        // 2. Enregistrement en base de données
        await Order.create({
            customerName: `${customer.firstName} ${customer.lastName}`,
            productName: product.name,
            quantity: quantity,
            totalPrice: totalTTC
        });

        return totalTTC;
    }
}