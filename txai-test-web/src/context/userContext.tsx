import { api } from "@/axios/api";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export interface Product {
  id: number,
  name: string,
  price: number,
  quantity: number,
  created_at: Date
}

interface User {
  id: number,
  userName: string,
  products: Product[]
}

interface UserContextType {
  user: User | null
  login: (cpf: string, password: string) => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (cpf: string, password: string) => {
    api.post('login', {
      cpf,
      password
    }).then((response) => {
      setUser(response.data)
      localStorage.setItem('user', JSON.stringify(response.data));
    }).catch(() => {
      toast.error('Usuário ou senha incorreto(s)!', {
        position: 'top-right',
        autoClose: 5000,
        theme: 'light',
      })
    })
  };

  return (
      <UserContext.Provider value={{ user, login }}>
          {children}
      </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
      throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};