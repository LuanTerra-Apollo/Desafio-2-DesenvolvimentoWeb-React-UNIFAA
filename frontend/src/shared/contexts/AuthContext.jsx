import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useContext } from 'react';
import { AuthService } from '../services/api';

const AuthContext = createContext({});

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN';

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    return token ? JSON.parse(token) : undefined;
  });

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

    if (accessToken) {
      setAccessToken(JSON.parse(accessToken));
    } else {
      setAccessToken(undefined);
    }
  }, [LOCAL_STORAGE_KEY__ACCESS_TOKEN, accessToken]);

  const handleLogin = useCallback(async (email, password) => {
    const result = await AuthService.login(email, password);
    if (result instanceof Error) {
      console.log(result.message);
      return result;
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(result.token));
      setAccessToken(result.token);
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    setAccessToken(undefined);
  }, []);

  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, isAuthenticated, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext)