import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants/api-constants";
import { useUser } from "./UserProvider";

interface TsumegoAttempt {
  id: number;
  is_solved: boolean;
  attempt_date: string;
  problem: number;
  user: number;
}
interface TsumegoAttemptContextType {
  userAttempts: TsumegoAttempt[];
  loading: boolean;
  fetchUserAttempts: () => Promise<void>;
  fetchAttemptById: (id: number) => Promise<TsumegoAttempt | null>;
  createOrUpdateAttempt: (
    problemId: number,
    isSolved: boolean
  ) => Promise<TsumegoAttempt | number>;
}

const TsumegoAttemptContext = createContext<TsumegoAttemptContextType | null>(
  null
);

export const TsumegoAttemptProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [userAttempts, setUserAttempts] = useState<TsumegoAttempt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser();

  const fetchUserAttempts = async () => {
    setLoading(true);
    try {
      const response = await axios.get<TsumegoAttempt[]>(
        `${API_BASE_URL}/problem-attempts/me`
      );
      setUserAttempts(response.data);
    } catch (error) {
      console.error("Failed to fetch user attempts", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAttemptById = async (id: number) => {
    setLoading(true);
    try {
      const response = await axios.get<TsumegoAttempt>(
        `${API_BASE_URL}/problem-attempts/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch attempt by ID", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createOrUpdateAttempt = async (
    problemId: number,
    isSolved: boolean
  ) => {
    setLoading(true);
    try {
      if (!user) return;
      const existingAttempt = userAttempts.find(
        (attempt) => attempt.problem === problemId && attempt.user === user.id
      );

      if (existingAttempt) {
        const response = await axios.put<TsumegoAttempt>(
          `${API_BASE_URL}/problem-attempts/${existingAttempt.id}/`,
          { is_solved: isSolved }
        );
        setUserAttempts((prev) =>
          prev.map((attempt) =>
            attempt.id === existingAttempt.id
              ? { ...attempt, is_solved: response.data.is_solved }
              : attempt
          )
        );
        return existingAttempt;
      } else {
        const response = await axios.post<TsumegoAttempt>(
          `${API_BASE_URL}/problem-attempts/`,
          {
            problem: problemId,
            is_solved: isSolved,
            user: user.id,
          }
        );
        setUserAttempts((prev) => [...prev, response.data]);
        return response.data.id;
      }
    } catch (error) {
      console.error("Failed to create or update attempt", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAttempts();
  }, [user]);

  return (
    <TsumegoAttemptContext.Provider
      value={{
        userAttempts,
        loading,
        fetchUserAttempts,
        fetchAttemptById,
        createOrUpdateAttempt,
      }}
    >
      {children}
    </TsumegoAttemptContext.Provider>
  );
};

export const useTsumegoAttempt = () => {
  const context = useContext(TsumegoAttemptContext);
  if (!context) {
    throw new Error(
      "useTsumegoAttempt must be used within a TsumegoAttemptProvider"
    );
  }
  return context;
};
