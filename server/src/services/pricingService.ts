export class PricingService {
  private static readonly TAX_RATE = 0.21;

  public calculateTotal(
    price: number,
    quantity: number,
    discountCode: string,
  ): number {
    let total = price * quantity;

    if (discountCode === "SUMMER20") {
      total *= 0.8;
    } else if (discountCode === "WELCOME10") {
      total *= 0.9;
    }

    return total * (1 + PricingService.TAX_RATE);
  }
}
