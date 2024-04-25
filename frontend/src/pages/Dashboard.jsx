import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {useNavigate} from 'react-router-dom'
import SearchBar from '../component/ SearchBar';

const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alluser, setAlluser] = useState(null)
  const [error, setError] = useState(null);
  
  const navigate =useNavigate()

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token); 
        if (!token) {
          setError('Token not found in local storage');
          return;
        }

        // Perform token validation if needed

        const response = await axios.get('http://localhost:3001/api/vi/account/balance', {
          headers: { Authorization: `Bearer ${token}` },
        });

        

        const { balance } = response.data
        setBalance(balance)
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error fetching balance:', error);
        setError('Error fetching balance. Please try again.');
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);


  useEffect(() => {
    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/vi/user/bulk')
            const userdata = response.data.user
            setAlluser(userdata)
            console.log(userdata)
            setLoading(null)
            setError(null)
        } catch (error) {
            console.log(error)
        }
    }
    getUser()
}, [])
 


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div>
        <h1>Dashboard</h1>
        <h2>Your Balance: {balance}</h2>
        <br></br>
        <br></br>
        <SearchBar />
        <ul>
            {alluser.map((item, i) => (
                <li key={i}>
                    {item.username} -  {item.firstName} ____ {item.lastName} -------
                    
                    
               <button onClick={(e) => {
    navigate('/send?id=' + item._id + '&name=' + item.firstName);
}}>
    Send Money
</button>
                </li>
            ))}
        </ul>
    </div>
);
};

export default Dashboard;
