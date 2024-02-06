
import { useState } from 'react';
import './App.css'

function App() {
  // setting for the user account 
  // In your React component
const [userAddress, setUserAddress] = useState(null);
  const ConnectMetamask = async () => {
    if (window.ethereum) {
      console.log('detected');
    }
    else {
      console.log('metamask is not detected');
    }
  }

  const RequestAccounts = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setUserAddress(accounts[0]);
    const selected = accounts[0];
    const balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [selected, 'latest'],
    });
    console.log(`the balance is: ${balance}`)
    // Convert the balance from Wei to Ether
    const balanceInEther = window.ethereum.utils.fromWei(balance, 'ether');
    console.log(balanceInEther)
    console.log(accounts);
  }

  return (
    <>
     <p>Connecting with metamask</p><br />
     <p>Current account: {userAddress}</p>
     <button onClick={ConnectMetamask}>Connect with metamasl</button><br />
     <button onClick={RequestAccounts}>Request for accounts</button>
    </>
  )
}

export default App
