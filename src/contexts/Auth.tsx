import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

interface User{
    id:string;
    name:string;
    login:string;
    avatar_url:string
}

interface AuthContextData{
    user: User | null;
    signInUrl:string;
    signOut:()=>void;
}

interface AuthProvider {
    children: ReactNode;
}

interface AuthResponse{
    token:string;
    user:{
        id:string;
        avatar_url:string;
        name:string;
        login:string
    }
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider(props: AuthProvider){
    const [user, setUser] = useState<User | null>(null);

    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=630299c70c7cce64d547`;

    async function signIn(githubCode:string){
        const response = await api.post<AuthResponse>('/authenticate',{
            code: githubCode,
        })

        const { token, user } = response.data;

        localStorage.setItem('@dowhile:token', token);

        setUser(user);
    }

    async function signOut(){
        setUser(null);
        localStorage.removeItem('@dowhile:token');
    }

    useEffect(()=>{
        const token = localStorage.getItem('@dowhile:token');

        if(token){
            api.defaults.headers.common.authorization = `Bearer ${token}`

            api.get<User>('/profile').then(response=>{
                setUser(response.data)
            })
        }
    },[])

    useEffect(()=>{
        const url = window.location.href;
        const hasGIthubCode = url.includes('?code=');

        if(hasGIthubCode){
            const [ urlWhithoutCode, githubCode ] = url.split('?code=');
            window.history.pushState({}, '', urlWhithoutCode);

            signIn(githubCode);
        }
    },[])

    return(
        <AuthContext.Provider value={{ signInUrl,  user, signOut}}>
            {props.children}
        </AuthContext.Provider>
    )
}