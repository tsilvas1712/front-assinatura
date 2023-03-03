import { api } from "@/services/api";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";

type User = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  plan: {
    id: string;
    name: string;
    limit_photos: number;
    limit_factor: number;
  };
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credencials: SignInCredentials): Promise<void>;
  user: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut(){
  destroyCookie(undefined,'user.token')
  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  
  useEffect(() => {
    const { "user.token": token } = parseCookies();

    if (token) {
      api.get("/profile").then((response) => {
        const { user, plan } = response.data;
        setUser({ user, plan });
      }).catch(err=>{
        signOut();
      });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("auth", { email, password });

      console.log("RESPONSE",response.data);

      const { plan, token, user } = response.data;
      setUser({
        user,
        plan,
      });
      setCookie(undefined, "user.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      Router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
