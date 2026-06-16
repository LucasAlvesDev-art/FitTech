import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode 
} from 'react';

import { 
  signIn, 
  signOut, 
  signUp, 
  getSession, 
  getUserRole, 
  UserRole 
} from '../services/auth';

type User = {
  id: string;
  email: string;
  role: UserRole;
};

type AuthContextData = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  cadastro: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSession();
  }, []);

  async function loadSession() {
    try {
      const session = await getSession();
      if (session?.user) {
        const role = await getUserRole();
        setUser({
          id: session.user.id,
          email: session.user.email!,
          role: role ?? 'aluno',
        });
      }
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    const data = await signIn(email, password);

    const role = await getUserRole();

    if (!role) {
      await signOut();

      throw new Error(
        'Perfil não encontrado. Entre em contato com o administrador.'
      );
    }

    setUser({
      id: data.user!.id,
      email: data.user!.email!,
      role,
    });
  }

  async function cadastro(email: string, password: string, role: UserRole) {
    await signUp(email, password, role);
  }

  async function logout() {
    await signOut();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, cadastro, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}