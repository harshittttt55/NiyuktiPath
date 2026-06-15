// 📁 src/utils/api.js

// 🔗 Base URL for your backend API
export const BASE_URL = process.env.REACT_APP_API_URL;

// Common API endpoints
export const API = {
  JOBS: `${BASE_URL}/jobs`,
  INTERNSHIPS: `${BASE_URL}/internships`,
  USERS: `${BASE_URL}/users`,
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
  },
  PROFILE: `${BASE_URL}/profile/me`,
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

// Authenticated requests
export const getAuthenticatedData = async (url) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return response.json();
  } catch (error) {
    console.error("Auth GET Error:", error);
    return null;
  }
};

export const putAuthenticatedData = async (url, data) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error("Auth PUT Error:", error);
    return null;
  }
};

export const deleteAuthenticatedData = async (url) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });
    return response.json();
  } catch (error) {
    console.error("Auth DELETE Error:", error);
    return null;
  }
};
