// 📁 src/utils/api.js

// 🔗 Base URL for your backend API
// Update this when backend is ready:
export const BASE_URL = "http://localhost:5000/api";

// Common API endpoints
export const API = {
  JOBS: `${BASE_URL}/jobs`,
  INTERNSHIPS: `${BASE_URL}/internships`,
  USERS: `${BASE_URL}/users`,
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
  },
};

// Wrapper for GET requests
export const getData = async (url) => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error("GET Error:", error);
    return null;
  }
};

// Wrapper for POST requests
export const postData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error("POST Error:", error);
    return null;
  }
};

// Wrapper for PUT requests
export const putData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error("PUT Error:", error);
    return null;
  }
};

// Wrapper for DELETE requests
export const deleteData = async (url) => {
  try {
    const response = await fetch(url, { method: "DELETE" });
    return response.json();
  } catch (error) {
    console.error("DELETE Error:", error);
    return null;
  }
};
