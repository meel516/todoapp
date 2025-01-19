import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { configs } from "../configs";

type userType = {
  username: string;
};
interface AuthContextType {
  isAuthenticated: boolean;
  userDetails: userType | null;
  Logout: () => void;
  getUser: () => void;
  Login: (username: string) => void;
  isUserLoading: Boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<userType | null>(null);

  const Login = (username: string) => {
    setAuthenticated(true);
    setUserDetails({ username });
    localStorage.setItem("username", username);
  };
  const getUser = async () => {
    try {
      const storedUsername = localStorage.getItem("username");

      if (storedUsername) {
        const response = await fetch(configs.BASE_URL + "/auth");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setAuthenticated(true);
        setUserDetails({ username: storedUsername });
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setAuthenticated(false);
      setUserDetails(null);
    } finally {
      setIsUserLoading(false);
    }
  };
  const Logout = () => {
    setAuthenticated(false);
    setUserDetails(null);
    localStorage.removeItem("username");
    window.location.href = "/";
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userDetails,
        isUserLoading,
        Logout,
        getUser,
        Login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
