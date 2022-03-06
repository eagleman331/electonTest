import React, { useContext, useState, useEffect, createContext } from "react"
import { auth } from "./../Firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth2 = getAuth();
export const AuthContext = createContext();



export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [currentUserUid, setCurrentUserUid] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function loginFirebase(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }
//new
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth2, (user) => {
      setCurrentUserUid(user.uid)
    })

    return unsubscribe
  }, [])
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth2, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])


  const value = {
    currentUser,
    currentUserUid
  }
 
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
