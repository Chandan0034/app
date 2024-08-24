import React,{useState} from "react";
import './Signup.css';
import {Link} from 'react-router-dom';
import {auth} from './firebase';
import {useNavigate} from 'react-router-dom';
import {createUserWithEmailAndPassword} from 'firebase/auth';

const Signup =()=>{
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const useNavigates=useNavigate();
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth,email,password).then((response)=>{
        console.log("Account Created",response);
        setEmail('');
        setPassword('');
        useNavigates('/');
      }).catch((error)=>{
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }
  }
  return(
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label htmlFor="email">Email:
          <input type="email" id="email" name="email" required onChange={(e)=>setEmail(e.target.value)}/>
        </label>
        <label htmlFor="password">Password:
          <input type="password" id="password" name="password" required onChange={(e)=>setPassword(e.target.value)}/></label> 
        <button type='submit'>Sign Up</button>
        <p>Already Registered? <Link to="/login">Login</Link></p>
      </form>
    </div>
  )
}
export default Signup;