import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  function signup(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <form onSubmit={signup}>
        <input
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
