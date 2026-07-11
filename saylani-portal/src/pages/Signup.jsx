 import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/authService";

export default function Signup() {

  const navigate = useNavigate();

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleSignup=async(e)=>{

    e.preventDefault();

    try{

      await signup(email,password);

      alert("Account Created Successfully");

      navigate("/");

    }

    catch(error){

      alert(error.message);

    }

  }

  return (

<div className="container mt-5" style={{maxWidth:"450px"}}>

<div className="card shadow p-4">

<h2 className="text-success text-center mb-4">

Create Account

</h2>

<form onSubmit={handleSignup}>

<input
type="email"
className="form-control mb-3"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="password"
className="form-control mb-3"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button className="btn btn-primary w-100">

Signup

</button>

</form>

<p className="text-center mt-3">

Already have account?

<Link to="/"> Login</Link>

</p>

</div>

</div>

  )

}