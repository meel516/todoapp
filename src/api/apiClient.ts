import axios from "axios";
import { configs } from "../configs";

const apiClient = axios.create({
  baseURL: configs.BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const SetInterceptor = (triggerToast) => {
  return apiClient.interceptors.response.use(
    (response) => {
      if (
        response.config.method === "post" ||
        response.config.method === "put" ||
        response.config.method === "delete"
      ) {
        triggerToast("Successfully completed", "success");
      }
      return response;
    },
    (error) => {
      let errorMessage = "An unknown error occurred";

      if (error.response) {
        errorMessage = `Error: ${error.response.status} - ${
          error.response.data.message || error.response.statusText
        }`;
      } else if (error.request) {
        if (!navigator.onLine) {
          errorMessage =
            "You are offline. Please check your internet connection.";
        } else {
          errorMessage = "Network error: No response received from the server.";
        }
      } else {
        errorMessage = `Error: ${error.message}`;
      }

      triggerToast(errorMessage, "error");

      return Promise.reject(error);
    },
  );
};

export default apiClient;
