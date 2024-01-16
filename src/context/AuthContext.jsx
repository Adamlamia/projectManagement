import { GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, signInWithEmailAndPassword, createUserWithEmailAndPassword , signOut } from "firebase/auth";
import { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../firebase";

//create context
const AuthContext = createContext();

//provider context
export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    //signin with google
    const signinWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider)
    }

    const signinWithEmailPassword = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setCurrentUser(userCredential.user);
        } catch (error) {
            console.error("Error signing in with email and password:", error);
            throw error;
        }
    }

    const signupWithEmailPassword = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setCurrentUser(userCredential.user);
        } catch (error) {
            console.error("Error signing up with email and password:", error);
            throw error;
        }
    }

    //signout
    const logout = () => signOut(auth);

    const value = {
        currentUser,
        setCurrentUser,
        signinWithGoogle,
        signinWithEmailPassword,
        signupWithEmailPassword,
        logout
    }

    //set currentUser
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}