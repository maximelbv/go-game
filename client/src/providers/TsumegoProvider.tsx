import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants/api-constants";

interface Tsumego {
  id: number;
  title: string;
  difficulty: string;
  json_data: {
    C: string;
    AB: string[];
    AW: string[];
    SZ: string;
    SOL: [string, string, string, string][];
  };
  date_created: string;
}

interface TsumegoContextType {
  tsumegos: Tsumego[];
  loading: boolean;
  fetchTsumegos: () => Promise<void>;
}

const TsumegoContext = createContext<TsumegoContextType | null>(null);

export const TsumegoProvider = ({ children }: { children: ReactNode }) => {
  const [tsumegos, setTsumegos] = useState<Tsumego[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTsumegos();
  }, []);

  const fetchTsumegos = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Tsumego[]>(`${API_BASE_URL}/problems/`);
      const sortedTsumegos = response.data.sort(
        (a, b) =>
          new Date(b.date_created).getTime() -
          new Date(a.date_created).getTime()
      );
      setTsumegos(sortedTsumegos);
    } catch (error) {
      console.error("Failed to fetch tsumegos", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TsumegoContext.Provider value={{ tsumegos, loading, fetchTsumegos }}>
      {children}
    </TsumegoContext.Provider>
  );
};

export const useTsumego = () => {
  const context = useContext(TsumegoContext);
  if (!context) {
    throw new Error("useTsumego must be used within a TsumegoProvider");
  }
  return context;
};
