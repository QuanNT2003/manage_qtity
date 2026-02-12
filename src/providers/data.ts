import dataProviderSimpleRest from "@refinedev/simple-rest";
import { DataProvider } from "@refinedev/core";
import { API_URL } from "./constants";
import axios from "axios";

// Create axios instance
const axiosInstance = axios.create();

// Add response interceptor to unwrap the {status: "success", data: ...} format
axiosInstance.interceptors.response.use(
  (response) => {
    // Unwrap the response if it has the {status, data} structure
    if (
      response.data &&
      response.data.status === "success" &&
      response.data.data !== undefined
    ) {
      response.data = response.data.data;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Create the data provider with the custom axios instance
const baseDataProvider = dataProviderSimpleRest(API_URL, axiosInstance);

export const dataProvider: DataProvider = {
  ...baseDataProvider,
};

// Export axios instance for other uses
export const httpClient = axiosInstance;
