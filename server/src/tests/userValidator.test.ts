/*
*Cas de test pour la fonction validateUserRegistration
*1: âge :17, rôle : "stagiaire", email : "stagiaire@example.com" -true
*2: âge :17, rôle : "user", email : "user@example.com" -false
*3: âge :18, rôle : "admin", email : "admin@example.com" -true
*4: âge :120, rôle : "user", email : "user@example.com" -true
*5: âge :121, rôle : "admin", email : "admin@example.com" -throw error
*6: âge :30, rôle : "guest", email : "guest@example.com" -throw error
*7: âge :25, rôle : "user", email : "userexample.com" - false
*8: âge :25, rôle : "stagiaire", email : "user@examplecom"  - false
*9: âge :"vieux", rôle : "admin", email : "admin@example.com" -throw error
*/


import { validateUserRegistration } from "../utils/userValidator";

describe("User Registration Validator - White Box Testing", () => {
    const testCases = [
        ///[age, role, email, expected, description]
        [17, "stagiaire", "stagiaire@example.com", true, "Valid stagiaire registration"],
        [17, "user", "user@example.com", false, "Invalid user registration under 18"],
        [18, "admin", "admin@example.com", true, "Valid admin registration"],
        [120, "user", "user@example.com", true, "Valid user registration at 120"],
        [121, "admin", "admin@example.com", "error", "Invalid admin registration over 120"],
        [30, "guest", "guest@example.com", "error", "Invalid guest registration"],
        [25, "user", "userexample.com", false, "Invalid user email format"],
        [25, "stagiaire", "user@examplecom", false, "Invalid stagiaire email format"],
        ["vieux", "admin", "admin@example.com", "error", "Invalid age format"]
    ];

    testCases.forEach(([age, role, email, expected, description]) => {
        it(description, () => {
            if (expected === "error") {
                expect(() => validateUserRegistration(age, role, email)).toThrow();
            } else {
                expect(validateUserRegistration(age as any, role as any, email)).toBe(expected);
            }
        });
    });
});