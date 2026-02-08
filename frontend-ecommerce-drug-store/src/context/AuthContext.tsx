import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { User, LoginRequest } from "../api/types/auth.types";
import { authApi } from "../api/endpoints/auth.api";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Decode JWT payload to extract role
function decodeJwtPayload(token: string): {
  role?: string;
  sub?: string;
  exp?: number;
} {
  try {
    const base64Payload = token.split(".")[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch {
    return {};
  }
}

// Get role from JWT token
function getRoleFromToken(token: string | null): "USER" | "ADMIN" | null {
  if (!token) return null;
  const payload = decodeJwtPayload(token);
  if (payload.role === "ADMIN" || payload.role === "USER") {
    return payload.role;
  }
  return null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("jwt_token");
    const storedUser = localStorage.getItem("user_data");

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("jwt_token");
        localStorage.removeItem("user_data");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (credentials: LoginRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log(credentials);

      const response = await authApi.login(credentials);
      setToken(response.token);
      setUser(response.userDto);

      localStorage.setItem("jwt_token", response.token);
      localStorage.setItem("user_data", JSON.stringify(response.userDto));
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      const message = error.response?.data?.message || "Login failed";
      setError(message);

      // If email not verified, trigger re-send
      if (message === "Email is not verified !") {
        try {
          await authApi.sendVerification(credentials.email);
          setError(
            "Email not verified. A new verification email has been sent.",
          );
        } catch {
          // Ignore verification send error
        }
      }

      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await authApi.register({ email, password, role: "USER" });
      await authApi.sendVerification(email);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_data");
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const isAdmin = getRoleFromToken(token) === "ADMIN";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isAdmin,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
