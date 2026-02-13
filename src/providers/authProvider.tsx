import { AuthProvider } from "@refinedev/core";
import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "./constants";

interface JwtPayload {
  sub: string;
  email: string;
  username: string;
  exp: number;
}

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      const { accessToken, refreshToken } = res.data.data;

      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      return {
        success: true,
        successNotification: {
          message: "Login successful",
          name: "Success",
        },
        redirectTo: "/",
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const data = axiosError.response?.data;

      return {
        success: false,
        error: {
          message: "Login failed",
          name: data?.message || "Invalid credentials",
        },
      };
    }
  },
  logout: async () => {
    try {
      await axios.post(
        `${API_URL}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );
    } catch {
      console.error("Logout error");
    }

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return { success: true, redirectTo: "/login" };
  },
  check: async () => {
    const token = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (!token) {
      return {
        authenticated: false,
        redirectTo: "/login",
        logout: true,
      };
    }

    try {
      const payload = jwtDecode<JwtPayload>(token);
      const exp = payload.exp * 1000;
      const now = Date.now();

      if (now < exp) {
        return { authenticated: true };
      }

      if (refreshToken) {
        try {
          const res = await axios.post(`${API_URL}/auth/refresh`, {
            refreshToken,
          });
          const { accessToken: newToken } = res.data;
          localStorage.setItem("access_token", newToken);
          return { authenticated: true };
        } catch {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          return { authenticated: false, redirectTo: "/login" };
        }
      }
    } catch (error) {
      return { authenticated: false, redirectTo: "/login" };
    }

    return { authenticated: true };
  },
  getIdentity: async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return {
        id: decoded.sub,
        email: decoded.email,
        username: decoded.username,
      };
    } catch {
      return null;
    }
  },
  getPermissions: async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return null;

    try {
      const res = await axios.get(`${API_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.roles || [];
    } catch {
      return null;
    }
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return { logout: true };
    }
    return { logout: false };
  },
};
