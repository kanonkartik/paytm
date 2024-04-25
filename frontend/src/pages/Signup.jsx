import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupError, setSignupError] = useState(null); // State for signup error
  const navigate = useNavigate();

  const handleButton = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/vi/user/signup', {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
      });
      
      localStorage.setItem("token", response.data.token); // Set token in local storage

      console.log(response.data);
      navigate('/Dashboard');
    } catch (err) {
      console.log('Signup error: ', err);
      setSignupError('Signup failed. Please try again.'); // Set error state
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <input
        placeholder='firstName'
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      /><br />
      <input
        placeholder='lastName'
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      /><br /><br />
      <input
        placeholder='username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />
      <input
        placeholder='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <button onClick={handleButton}>Sign Up</button>
      
      {signupError && <p>{signupError}</p>} {/* Display error message if signup fails */}
      <h3>Already have an account</h3>
    </div>
  );
};
