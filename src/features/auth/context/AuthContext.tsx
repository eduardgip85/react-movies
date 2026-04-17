import {
    createContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import type { Session, User, AuthChangeEvent } from "@supabase/supabase-js";
import {
    getCurrentSession,
    onAuthStateChange,
    signOut,
} from "../services/auth.service";

type AuthContextType = {
    session: Session | null;
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadSession() {
            try {
                const currentSession = await getCurrentSession();
                setSession(currentSession);
                setUser(currentSession?.user ?? null);
            } catch (error) {
                console.error("Error loading session:", error);
            } finally {
                setLoading(false);
            }
        }

        loadSession();

        const {
            data: { subscription },
        } = onAuthStateChange(
            async (_event: AuthChangeEvent, session: Session | null) => {
                setSession(session);
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    async function logout() {
        await signOut();
    }

    const value = useMemo(
    () => ({
        session,
        user,
        loading,
        logout,
    }),[session, user, loading]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}