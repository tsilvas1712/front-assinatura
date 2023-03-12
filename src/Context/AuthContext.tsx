import { api } from "@/services/api";
import { useToast } from "@chakra-ui/react";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { ReactNode, createContext, useEffect, useState } from "react";

type User = {
  user: {
    id: string;
    name: string;
    email: string;
    is_admin: boolean;
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

export function signOut() {
  destroyCookie(undefined, "user.token");
  Router.push("/");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  
  const isAuthenticated = !!user;

  const toast = useToast();

  useEffect(() => {
    const { "user.token": token } = parseCookies();

    if (token) {
      api
        .get("/profile")
        .then((response) => {
          const { user, plan } = response.data;
          setUser({ user, plan });
        })
        .catch((err) => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
  
      await api.post("auth", { email, password }).then(response =>{
       
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

      toast({
          title:"Seja Bem Vindo",         
          status:"success",
          duration:5000,
          isClosable:true,
          position:'top-right'
        })

       

      if (user.is_admin) {
        Router.push("/admin");
      } else {
        Router.push("/dashboard");
      }

      }).catch(err=>{   
        toast({
          title:"Erro na Autenticação",
          description:"Verifique as informações digitadas",
          status:"error",
          duration:3000,
          isClosable:true,
          position:'top'
        })
      });

   
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
