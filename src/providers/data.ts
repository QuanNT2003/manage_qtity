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
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const url = `${API_URL}/${resource}`;

    console.log("getList params:", { resource, pagination });

    const { currentPage, pageSize } = pagination ?? {};

    const query: Record<string, any> = {
      page: currentPage || 1,
      per_page: pageSize || 10,
    };

    console.log("getList query:", query);

    // Support for filters and sorters if needed in future
    // if (filters) { ... }
    // if (sorters) { ... }

    const response = await axiosInstance.get(url, {
      params: query,
    });

    const { data } = response;

    console.log("getList response data:", data);

    return {
      data: data.data || [], // Ensure data is an array
      total: data.pagination?.total || data.data?.length || 0, // Fallback for total
    };
  },
};

// Export axios instance for other uses
export const httpClient = axiosInstance;
