export class EmailService {
  public sendEmail(to: string, message: string): void {
    console.log("Connexion au serveur SMTP...");
    console.log(`Envoi de l'email à ${to}: ${message}`);
  }
}