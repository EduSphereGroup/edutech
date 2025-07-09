import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "../firebase";

interface UserProfile {
  id: string;         // será o uid do Firebase
  username: string;   // email, por enquanto
  xp: number;
  level: number;
}

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loading: boolean;
  updateUser: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const register = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password);
  await signOut(auth);
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // Aqui você pode buscar dados extras do Firestore
        setProfile({
          id: firebaseUser.uid,
          username: firebaseUser.email || "",
          xp: 0,
          level: 1,
        });
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
    // user será capturado pelo onAuthStateChanged
  };

  const logout = async () => {
    await signOut(auth);
    setProfile(null);
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    if (!profile) return;
    const updated = { ...profile, ...updates };
    setProfile(updated);
    // TODO: persistir no Firestore, se quiser salvar
  };

  return (
    <AuthContext.Provider
      value={{ user, profile, login, logout, register, loading, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};



