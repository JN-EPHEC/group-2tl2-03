export function validateUserRegistration(age: number, role: string, email: string): boolean {
    if (typeof age !== "number" || age < 0) {
        throw new Error("Âge invalide");
    }
    if (age < 18 && role !== "stagiaire") {
        return false;
    }
    if (age > 120) {
        throw new Error("Âge invalide");

    }
    const allowedRoles = ["stagiaire", "admin", "user"];
    if (!allowedRoles.includes(role)) {
        throw new Error("Rôle invalide");
    }
   
    if (!email.includes("@") || !email.includes(".")) {
        return false;
    }
    return true;
} 