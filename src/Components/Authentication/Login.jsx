import React,{useState} from "react";
import './Login.css';
import {Link} from 'react-router-dom'; 
import {auth} from './firebase';
import {useNavigate} from 'react-router-dom';
import {signInWithEmailAndPassword} from 'firebase/auth';
const Login =()=>{
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth,email,password).then((response)=>{
        console.log("Login Successful",response);
        setEmail('');
        setPassword('');
        navigate('/');
      }).catch((error)=>{
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }
  }
  return(
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="email">Email:
          <input type="email" id="email" name="email" required onChange={(e)=>setEmail(e.target.value)}/>
        </label>
        <label htmlFor="password">Password:
          <input type="password" id="password" name="password" required onChange={(e)=>setPassword(e.target.value)}/></label> 
        <button type='submit'>Login</button>
        <p>Already Registered? <Link to="/signup">Sign Up</Link></p>
      </form>
    </div>
  )
}
export default Login;