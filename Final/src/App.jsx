import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { db, auth, google } from "../firebase.ts";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { signInWithPopup, signOut } from "firebase/auth";

function App() {
  const [count, setCount] = useState(0);
  const [docRef, setDocRef] = useState(null);
  const [user, setUser] = useState(null);

  const testDocRef = doc(db, "test", "single-document");

  useEffect(() => {
    const loadDocument = async () => {
      try {
        const docSnap = await getDoc(testDocRef);
        if (docSnap.exists()) {
          setCount(docSnap.data().count || 0);
          setDocRef(testDocRef);
        } else {
          await setDoc(testDocRef, {
            uid: "test",
            createdAt: new Date(),
            count: 0,
          });
          setCount(0);
          setDocRef(testDocRef);
        }
      } catch (error) {
        console.error("Error loading document:", error);
      }
    };

    loadDocument();
  }, []);

  const handleAuthClick = () => {
    if (user) {
      signOut(auth).catch(console.error);
      setUser(null);
    } else {
      signInWithPopup(auth, google)
        .then((result) => setUser(result.user))
        .catch(console.error);
    }
  };

  const resetCount = async () => {
    if (!docRef) return;
    try {
      await updateDoc(docRef, { count: 0 });
      setCount(0);
    } catch (error) {
      console.error("Error resetting count:", error);
    }
  };

  useEffect(() => {
    if (!docRef) return;
    const updateCount = async () => {
      try {
        await updateDoc(docRef, { count });
      } catch (error) {
        console.error("Error updating count:", error);
      }
    };
    updateCount();
  }, [docRef, count]);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((c) => c + 1)}>count is {count}</button>
        <button onClick={resetCount}>reset</button>
        <button onClick={handleAuthClick}>
          {user ? "sign out" : "sign in"}
        </button>
      </div>
    </>
  );
}

export default App;
