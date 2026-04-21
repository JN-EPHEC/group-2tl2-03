import { validatePassword } from "../utils/password";

describe("Password Validator - White Box Testing", () => {
  
  const testCases = [
    // [password, age, expected, description]
    ["", 25, false, "rejeter un mot de passe vide"], // Branch 1
    ["Short1!", 25, false, "rejeter un mot de passe trop court"], // Branch 2
    ["VeryLongPasswordThatIsOverLimit1!", 25, false, "rejeter un mot de passe trop long"], // Branch 3
    
    // Enfant (< 12)
    ["minimalist", 10, true, "accepter un mdp simple pour enfant"],
    ["12345678", 10, false, "rejeter enfant sans minuscule"], // Branch 4
    
    // Adulte (12-65)
    ["password", 25, false, "rejeter adulte sans Maj/Chiffre"], // Branch 5
    ["Password123", 25, false, "rejeter adulte sans car. spécial"], // Branch 6
    ["Password123!", 25, true, "accepter adulte complet"], // Branch finale
    
    // Senior (>= 65)
    ["abcdefgh", 70, false, "rejeter senior sans Maj et sans Chiffre"], // Branch 7
    ["Senior123", 70, true, "accepter senior avec Maj ou Chiffre"], // Branch finale
  ];

  test.each(testCases)(
    "devrait %s (pwd: %s, age: %i)",
    (pwd, age, expected) => {
      expect(validatePassword(pwd as string, age as number)).toBe(expected);
    }
  );
});