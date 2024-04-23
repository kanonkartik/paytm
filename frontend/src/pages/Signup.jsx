import React, { useEffect, useState } from 'react'
import axios from 'axios'





export const Signup = () => {
  const [firstName,setFirstName]=useState('');
  const [lastName, setLastName]=useState('');
  const [username, setUsername]=useState('')
  const [password, setPassword]=useState('')
  const [signup , setSignup]=useState(null);

  const  handelButton = ()=>{
    axios.post("http://localhost:3001/api/vi/user/signup",{
      firstName:firstName,
      lastName:lastName,
      username:username,
      password:password
    
    }).then(res=>{
        const data = res.data;
        setSignup(signup)
        setSignup(data);
        console.log(data);
       
       }).catch(err =>{
        console.log('Signup error: ', err)
       })
  }

  
  return (
    <div>
    <h1>Signup</h1>
   
    <input placeholder='firstName'
    value={firstName} onChange={(e)=>setFirstName(e.target.value)}
    ></input> <br></br>
    
    <input placeholder='lastName' value={lastName} onChange={(e)=>setLastName(e.target.value)}></input>
    <br></br>
    <br></br>
    <input placeholder='username' value={username} onChange={(e)=>setUsername(e.target.value)}></input>
     <br></br>
     <input placeholder='password' value={password} onChange={ (e)=>setPassword(e.target.value)}></input>
     <br></br> <br></br>
     <button onClick={handelButton}>SignUP</button>

     <h3>Aleady have an account  </h3>
   
   
    </div>
  )
}
