import axios from 'axios';
import CardHoverEffectDemo from './cards';


interface LoginCredentials {
  email: string;
  password: string;
}

export const loginUser = async ({ email, password }: LoginCredentials) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/drinks/", {
      mail: email,
      password: password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log("Login successful:", response.data.message);


    
    return response.data; // Or return token/user info
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};
