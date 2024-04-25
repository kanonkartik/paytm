import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const SendMoney = ({ selectedUser }) => {
    const [amount, setAmount] = useState('');
    const [sendMoney, setSendMoney] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [searchParams]=useSearchParams();
    const name=searchParams.get('name')
    const id=searchParams.get('id')

    const handleTransaction = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/vi/account/transfer', {
                to: id,
                amount:amount

            },{
                headers:{
                    Authorization:'Bearer '+localStorage.getItem('token')
                }
            });
            console.log(response.data); // Log the response to see what data is returned

            // Update state based on the response
            setSendMoney(true);
            setSuccessful(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Send Money</h1>
           to Account : {name}
           <br />
           Account id: {id}
            <br />
            Amount (in Rs)
            <input
                placeholder='Enter amount'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleTransaction}>Initiate Transfer</button>

            {sendMoney && successful && <p>Money sent successfully!</p>}
            {sendMoney && !successful && <p>Failed to send money. Please try again.</p>}
        </div>
    );
};

export default SendMoney;
