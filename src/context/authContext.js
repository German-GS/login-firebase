import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase.js";

export const authContext = createContext();
export const useAuth = () => {
  const context = useContext(authContext);

  if (!context) throw new Error("there is not provider");

  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (
    email,
    password // Recibe el email y el password para hacer login en la app
  ) => signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth); // El usuario ceirra sesion

  const resetPassword = (email) => {
    //Se resetea el password de la cuenta registrada
    sendPasswordResetEmail(auth, email);
  };

  const loginWithGoogle = () => {
    //hace la autenticacion por Google con una ventana emergente
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currenUser) => {
      setUser(currenUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        logout,
        loading,
        loginWithGoogle,
        resetPassword,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
