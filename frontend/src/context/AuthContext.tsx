import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LoadingScreen } from "../components/loading-screen/LoadingScreen";
import axios, { AUTH_TOKEN } from "../config/axios";

type AuthContextType = {
  isAuth: null | boolean;
  currentUser: null | User;
  onLogin: ({ email, password }: { email: string, password: string }) => void;
  onRegister: ({ name, email, password }: { name: string, email: string, password: string }) => void;
  onLogout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({
  isAuth: null,
  currentUser: null,
  onLogin: () => {
  },
  onRegister: () => {
  },
  onLogout: () => {
  },
})

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkIsAuth();
  }, [isAuth])

  const checkIsAuth = async () => {
    const token = localStorage.getItem(AUTH_TOKEN);
    try {
      if (isAuth === null) {
        if (token) {
          const responseUser = await axios.post('/api/user/me', null, {
            headers: {
              "Authorization": token
            }
          });
          const user = responseUser.data;
          setCurrentUser(user);
          setIsAuth(true)
        } else {
          setIsAuth(false);
        }
      }
    } catch (error) {
      toast.error("Failed to load user");
      if (token) {
        localStorage.removeItem(AUTH_TOKEN);
      }
      setIsAuth(false)
    }
  }

  const onLogin = async ({ email, password }: { email: string, password: string }) => {
    try {
      const response = await axios.post(`/api/user/login`, { email, password });
      const { token, user } = response.data;

      if (token && user) {
        localStorage.setItem(AUTH_TOKEN, token);
        setCurrentUser(user);
        setIsAuth(true);
        navigate("/")
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to login");
    }
  }

  const onRegister = async ({ name, email, password }: { name: string, email: string, password: string }) => {
    try {
      await axios.post('/api/user/register', {
        email,
        password,
        name,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to register");
    }
  }
  const onLogout = async () => {
    try {
      localStorage.removeItem(AUTH_TOKEN);
      setIsAuth(false);
      setCurrentUser(null);
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        currentUser: currentUser,
        onLogin: onLogin,
        onLogout: onLogout,
        onRegister: onRegister
      }}
    >
      {isAuth === null ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  )
}