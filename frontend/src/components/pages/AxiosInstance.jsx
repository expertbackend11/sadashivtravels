import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://sadashivtravels.onrender.com/api/v1/tours", // Set the backend URL
  withCredentials: true, // Allows sending cookies with requests
  headers: {
    "Content-Type": "application/json", // Default content type
  },
});



export default axiosInstance;
