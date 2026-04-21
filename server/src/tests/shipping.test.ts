import { calculateShipping } from '../utils/shipping';
const shippingTests = [
  // [distance, poids, type, résultat attendu ou erreur]
  
  // --- Tests de Distance (Poids < 10kg, Standard) ---
  [10, 5, "standard", 10],   // 0-50 km -> 10€
  [100, 5, "standard", 25],  // 51-500 km -> 25€
  [600, 5, "standard", 50],  // > 500 km -> 50€
  
  // --- Tests de Poids (Majoration 50%) ---
  [10, 15, "standard", 15],  // 10€ + 50% = 15€
  [100, 50, "standard", 37.5], // 25€ + 50% = 37.5€
  
  // --- Tests Mode Express (Multiplicateur x2) ---
  [10, 5, "express", 20],    // (10€ + 0%) * 2 = 20€
  [10, 20, "express", 30],   // (10€ + 50%) * 2 = 30€
  [600, 20, "express", 150], // (50€ + 50%) * 2 = 150€

  // --- Tests Limites ---
  [0, 1, "standard", 10],    // Distance exacte 0
  [50, 1, "standard", 10],   // Distance exacte 50
  [500, 1, "standard", 25],  // Distance exacte 500
  [10, 10, "standard", 15],  // Poids exact 10 (majoration)
];

describe('calculateShipping - Success cases', () => {
  test.each(shippingTests)(
    'pour %i km, %i kg en mode %s, le prix devrait être %f€',
    (distance, weight, type, expected) => {
      expect(calculateShipping(distance as number, weight as number, type as any)).toBe(expected);
    }
  );
});

describe('calculateShipping - Error cases', () => {
  test('devrait lever une erreur pour une distance négative', () => {
    expect(() => calculateShipping(-1, 10, "standard")).toThrow("Invalid distance");
  });

  test('devrait lever une erreur pour un poids nul ou négatif', () => {
    expect(() => calculateShipping(10, 0, "standard")).toThrow("Invalid weight");
    expect(() => calculateShipping(10, -5, "standard")).toThrow("Invalid weight");
  });

  test('devrait lever une erreur pour un poids supérieur à 50kg', () => {
    expect(() => calculateShipping(10, 51, "standard")).toThrow("Invalid weight");
  });
});