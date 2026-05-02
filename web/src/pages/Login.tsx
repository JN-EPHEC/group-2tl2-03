import React, { useState } from "react";
import { login } from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const data = await login(email, password);

    if (data.token) {
      
      localStorage.setItem("token", data.token);
      alert("Connexion réussie ! Bienvenue, Neo.");
      
      
    } else {
      
      alert("Erreur : " + (data.message || "Identifiants invalides"));
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto' }}>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
          required
        />
        <input 
          type="password" 
          placeholder="Mot de passe" 
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
          required
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;