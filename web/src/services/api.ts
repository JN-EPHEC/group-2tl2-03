const API_URL = "https://www.l2-5.ephec-ti.be/api/auth";

export const login = async (email: string, pass: string) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: pass }),
  });
  return response.json();
};

export const register = async (userData: any) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const getQuizzes = async () => {
  const token = localStorage.getItem("token"); 
  const response = await fetch("https://www.l2-5.ephec-ti.be/api/quizz", {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` 
    },
  });
  return response.json();
};