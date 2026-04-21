import React, { useState } from 'react';
import { apiService } from '../services/api';

export const Login = () => {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await apiService.login(user, pwd);
    if (result.ok) {
      alert("Connecté ! Token stocké.");
    } else {
      alert("Erreur : " + result.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={e => setUser(e.target.value)} placeholder="student" />
      <input type="password" onChange={e => setPwd(e.target.value)} placeholder="password123" />
      <button type="submit">Se connecter</button>
    </form>
  );
};