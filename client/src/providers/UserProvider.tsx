import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthResponse {
  token: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get<User>(`${API_BASE_URL}/users/me/`);
      setUser(response.data);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    const response = await axios.post<AuthResponse>(
      `${API_BASE_URL}/api/token/`,
      credentials
    );
    const token = response.data.token;
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
    await fetchUserProfile();
  };

  const register = async (credentials: RegisterCredentials) => {
    if (credentials.password !== credentials.confirmPassword) {
      throw new Error("Passwords do not match");
    }
    try {
      const response = await axios.post<AuthResponse>(
        `${API_BASE_URL}/api/register/`,
        {
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
        }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      await fetchUserProfile();
    } catch (err) {
      throw new Error(`Registration failed. Please try again. ${err}`);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = "";
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
