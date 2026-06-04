import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  email: string;
  role: 'aluno' | 'instrutor';
};

type AuthContextData = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

type Props = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  //  LOGIN SIMULADO (depois troca pelo Supabase)
  async function login(email: string, password: string) {
    setLoading(true);

    try {
      // simulação simples
      if (!email || !password) return false;

      if (email === 'a' && password === 'a') {
        // regra simples:
        // email "a" = aluno
        const fakeUser: User = {
          email,
          role: 'aluno',
        };

        setUser(fakeUser);
        return true;
      }

      if (email === 'i' && password === 'i') {
        // instrutor
        const fakeUser: User = {
          email,
          role: 'instrutor',
        };

        setUser(fakeUser);
        return true;
      }

      return false;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// hook para usar no app inteiro
export function useAuth() {
  return useContext(AuthContext);
}