import { useState } from 'react';
import { GoogleProvider, auth } from '../config/firebase'
import { createUserWithEmailAndPassword,signInWithPopup, signOut } from 'firebase/auth'
function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  // console.log(auth?.currentUser?.photoURL);
  // console.log(auth?.currentUser?.email);
  
  const handleSignIn = async () => {
    try{
      await createUserWithEmailAndPassword(auth, email, password)
    }catch (err) {
      console.error(err);
    }
  };

  const SingInWithGoogle = async () => {
    try{
      await signInWithPopup(auth, GoogleProvider)
    }catch (err) {
      console.error(err);
    }
  };

  const SignOut = async () => {
    try{
      await signOut(auth)
    }catch (err) {
      console.error(err);
    }
  };


  return (
    <div>
      <input onChange={(e) => setEmail(e.target.value)} placeholder="email..." type="text" />
      <input onChange={(e) => setPassword(e.target.value)} placeholder="passwod..." type="password" />
      <button onClick={handleSignIn}>Sing in </button>
      <button onClick={SingInWithGoogle}>Sing in With Google </button>
      <button onClick={SignOut}>Log Out </button>
    </div>
  )
}

export default Auth