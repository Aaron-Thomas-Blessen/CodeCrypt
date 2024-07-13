import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../Firebase/Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUser({ uid: currentUser.uid, ...userDoc.data() });
        } else {
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const updateCompletedAlgorithms = async (algorithm, totalAlgorithms) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const newCompletedAlgorithms = {
        ...user.completedAlgorithms,
        [algorithm]: true,
      };
      const completedAlgorithmCount = Object.keys(
        newCompletedAlgorithms
      ).filter((key) => newCompletedAlgorithms[key]).length;
      const completionPercentage =
        (completedAlgorithmCount / totalAlgorithms) * 100;

      await setDoc(
        userRef,
        {
          completedAlgorithms: newCompletedAlgorithms,
          completionPercentage: completionPercentage.toFixed(2), // Store percentage with 2 decimal places
        },
        { merge: true }
      );

      setUser({
        ...user,
        completedAlgorithms: newCompletedAlgorithms,
        completionPercentage,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, logout, updateCompletedAlgorithms }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
