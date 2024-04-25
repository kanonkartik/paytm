import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signedIn, setSignedIn] = useState(false); 
  const [error, setError] = useState(null); 
  const navigate =useNavigate()

  const handelSignin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/vi/user/signin', {
        username: username,
        password: password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      console.log('Token is saved:', token);
      setSignedIn(true); // Update sign-in status
      setError(null); // Reset error state
      navigate('/dashboard')
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Error signing in. Please try again.'); // Set error message
      setSignedIn(false); // Reset sign-in status
    }
  };

  return (
    <div>
      <h1>SignIN</h1>
      <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error message */}
      {signedIn ? (
        <div style={{ color: 'green' }}>Signed in successfully!</div>
      ) : (
        <button onClick={handelSignin}>SignIN</button>
      )}
    </div>
  );
};

export default Signin;
