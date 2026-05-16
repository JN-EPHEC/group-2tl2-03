import React, { useState } from "react";
import { register } from "../services/api";
import "../App.css"

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    nom: "",
    prenom: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await register(formData);
    if (data.user) {
      alert("Inscription réussie ! Connectez-vous.");
    } else {
      alert("Erreur : " + (data.message || "Une erreur est survenue"));
    }
  };

  return (
    <div className="auth-card">
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Nom d'utilisateur" 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, username: e.target.value})} 
        />
        <input 
          type="text" 
          placeholder="Prénom" 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, prenom: e.target.value})} 
        />
        <input 
          type="text" 
          placeholder="Nom" 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, nom: e.target.value})} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value})} 
        />
        <input 
          type="password" 
          placeholder="Mot de passe" 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, password: e.target.value})} 
        />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;