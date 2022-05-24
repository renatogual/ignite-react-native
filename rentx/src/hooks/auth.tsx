import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

import { User as ModelUser } from "../databases/model/User";

import { api } from "../services/api";
import { database } from "../databases";

interface User {
  id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User>({} as User);

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post("/sessions", {
      email,
      password,
    });

    const { token, user } = response.data;
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const usersCollection = database.get<ModelUser>("users");
    await database.write(async () => {
      await usersCollection.create((newUser) => {
        (newUser.user_id = user.id),
          (newUser.name = user.name),
          (newUser.email = user.email),
          (newUser.driver_license = user.driver_license),
          (newUser.avatar = user.avatar),
          (newUser.token = user.token);
      });
    });

    setData({ token, ...user });
  }

  useEffect(() => {
    (async function loadUserData() {
      const usersCollection = database.get<ModelUser>("users");
      const response = await usersCollection.query().fetch();

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as User; // Hack para forçar tipagem
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${userData.token}`;
        setData(userData);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user: data, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
