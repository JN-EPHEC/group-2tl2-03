const API_URL = 'https://l2-5.ephec-ti.be/api';

export const apiService = {
  // Ajout de : string pour username et password
  login: async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('accessToken', data.accessToken);
    }
    return { ok: response.ok, data };
  },

  getProfile: async () => {
    let token = localStorage.getItem('accessToken');
    let response = await fetch(`${API_URL}/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.status === 401 || response.status === 403) {
      const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include' 
      });

      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        localStorage.setItem('accessToken', refreshData.accessToken);
        response = await fetch(`${API_URL}/profile`, {
          headers: { 'Authorization': `Bearer ${refreshData.accessToken}` }
        });
      } else {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
    }
    return response.json();
  }
};