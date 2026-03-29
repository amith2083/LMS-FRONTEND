"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    isBlocked: boolean;
    isVerified: boolean;
    profilePicture?: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get("/api/users/me");
                setUser(response.data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used inside UserProvider");
    return context;
};
