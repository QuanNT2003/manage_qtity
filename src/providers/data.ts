import dataProviderSimpleRest from "@refinedev/simple-rest";
import { DataProvider } from "@refinedev/core";
import { API_URL } from "./constants";
import axios from "axios";

// Create axios instance
const axiosInstance = axios.create({ baseURL: API_URL });

// Add request interceptor to attach JWT token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
  create: async ({ resource, variables }) => {
    const url = `${API_URL}/${resource}`;

    // Check if any variable is a file or contains a file
    const hasFile = Object.values(variables).some((value) => {
      if (value instanceof File) return true;
      if (
        Array.isArray(value) &&
        value.length > 0 &&
        value[0]?.originFileObj instanceof File
      )
        return true;
      return false;
    });

    if (hasFile || variables.file) {
      const formData = new FormData();

      for (const key in variables) {
        const value = variables[key];

        if (value === undefined || value === null) continue;

        // Handle file arrays (Antd Upload)
        if (key === "file" && Array.isArray(value) && value.length > 0) {
          if (value[0].originFileObj) {
            formData.append(key, value[0].originFileObj);
          }
          continue;
        }

        // Handle normal arrays (e.g. genre_ids)
        if (Array.isArray(value)) {
          value.forEach((val) => {
            formData.append(key, val); // NestJS handles repeated keys as array
          });
          continue;
        }

        // Handle simple values
        formData.append(key, value as string | Blob);
      }

      const response = await axiosInstance.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return {
        data: response.data,
      };
    }

    // Default JSON behavior
    const response = await axiosInstance.post(url, variables);
    return {
      data: response.data,
    };
  },
  update: async ({ resource, id, variables }) => {
    const url = `${API_URL}/${resource}/${id}`;

    // Check if any variable is a file or contains a file
    const hasFile = Object.values(variables).some((value) => {
      if (value instanceof File) return true;
      if (
        Array.isArray(value) &&
        value.length > 0 &&
        value[0]?.originFileObj instanceof File
      )
        return true;
      return false;
    });

    // Check specifically for file field key
    const isFileUpload =
      hasFile ||
      (variables.file &&
        Array.isArray(variables.file) &&
        variables.file.length > 0 &&
        variables.file[0]?.originFileObj);

    if (isFileUpload) {
      const formData = new FormData();

      for (const key in variables) {
        const value = variables[key];

        if (value === undefined || value === null) continue;

        // Handle file arrays (Antd Upload)
        if (key === "file" && Array.isArray(value) && value.length > 0) {
          if (value[0].originFileObj) {
            formData.append(key, value[0].originFileObj);
          }
          continue;
        }

        // Handle normal arrays
        if (Array.isArray(value)) {
          value.forEach((val) => {
            formData.append(key, val);
          });
          continue;
        }

        formData.append(key, value as string | Blob);
      }

      // Use PATCH for update as per controller
      const response = await axiosInstance.patch(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return {
        data: response.data,
      };
    }

    const response = await axiosInstance.patch(url, variables);
    return {
      data: response.data,
    };
  },
  getMany: async ({ resource, ids }) => {
    // Backend doesn't support batch fetch, so we fetch individually
    const promises = ids.map((id) =>
      axiosInstance.get(`${API_URL}/${resource}/${id}`),
    );

    const responses = await Promise.all(promises);

    // Each response is already unwrapped by interceptor
    const data = responses.map((response) => response.data);

    return {
      data,
    };
  },
};

export const httpClient = axiosInstance;
