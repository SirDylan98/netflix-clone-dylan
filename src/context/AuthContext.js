import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,signInAnonymously,
  onAuthStateChanged,
} from 'firebase/auth';
import {setDoc,doc} from 'firebase/firestore'

const AuthContext = createContext();/// create the context STEP1

// THE AUTHCONTEXTPROVIDER RETURNS AN AUTHCONTEXT.PROVIDER
export function AuthContextProvider({ children }) { // create the context provided STEP2
  const [user, setUser] = useState({}); // used to store the current user details

/* THESE ARE ALL FUNCTION WE WANT TO PASS AS PROPS BUT ACCESSED GLOBALLY VIA THE CONTEXT API */
  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(db, 'users', email), {
        savedShows: []
    })
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);// Function to login with email and password
  }

  function logInAno(auth) {
    return signInAnonymously(auth); // function to login Anonymously
   
  }
  

  function logOut() {
    return signOut(auth);//function to signOut
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => { // used to listen to changes in the state of of the authentication and to get the current user details
      setUser(currentUser);// updating the state
    });
    return () => {
      unsubscribe();
    };
  }); // we did not put the dependency array because we want to keep track of it all the time, if we put the array it will fire once on intial start

  return (
    // The value props is where we put the props we want to subscribed from // this allows us to subscribe to 
    <AuthContext.Provider value={{ signUp, logIn,logInAno, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);// the useContext allows us to listen to the state changes of our props
}
