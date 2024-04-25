import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [users, setUsers]= useState([])
    const navigate=useNavigate();

    const handleQuery = async () => {
        try {
            const result = await axios.get('http://localhost:3001/api/vi/user/bulk',{
                params:{filter:query}
            });
             setUsers(result.data.user)
             console.log(result.data.user)
        } catch (error) {
            console.log(error);
        }
    };
  
  const handleRemoveUser = (userId)=>{
    setUsers(users.filter(user=>user._id !==userId))
  }

    return (
        <div>
            <input
                placeholder='search your friend'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleQuery}>search</button>

            <div>
                {users.map(user => (
                    <div key={user._id}>
                        <p>Username: {user.username}</p>
                       
                        <p>Last Name: {user.lastName}</p>
                        <button onClick={(e) => {
    navigate('/send?id=' + user._id + '&name=' + user.firstName);
}}>
    Send Money
</button>
                        <button onClick={()=>handleRemoveUser(user._id)}>remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
