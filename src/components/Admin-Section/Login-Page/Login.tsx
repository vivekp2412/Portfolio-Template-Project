import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../Hooks/Hooks";
import { loginUser } from "../../../slices/authSlice";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function login(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        dispatch(loginUser({ email, password }));
        navigate("/admin/home");
      })
      .catch((error) => {
        alert("Invalid User");
        console.log(error);
      });
  }
  return (
    <div>
      <form onSubmit={login}>
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

export default Login;
