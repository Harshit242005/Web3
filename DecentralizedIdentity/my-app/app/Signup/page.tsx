'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Wallet } from 'ethers';
import axios from 'axios';
import { enc, AES } from 'crypto-js';

import styles from './page.module.css';
import CryptoJS from 'crypto-js';
import EC from 'elliptic';

const SignUp: React.FC = () => {
  const [metamaskAccounts, setMetamaskAccounts] = useState<string[]>([]);
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [showPrivatekey, SetPrivateKey] = useState(false);
  const [allowmetamask, setAllowMetamask] = useState(false);
  const router = useSearchParams();
  const navigate = useRouter();
  const userEmail = router.get("inputData");
  const [next, changeNextState] = useState(false);
  // const [keys, setKeys] = useState<{ privateKey: string; publicKey: string } | null>(null);
  // const [copied, setCopied] = useState<{ publicKey: boolean; privateKey: boolean }>({ publicKey: false, privateKey: false });


  // for able to type keys manually
  const [manualKey, setManualKeyType] = useState(false);
  interface CustomWindow extends Window {
    ethereum?: any; // Add any type if you know the exact type of ethereum
  }


  const connectwithmetamask = async () => {
    SetPublicKeyType('Metamask');
    setAllowMetamask(true);
    // allowing to show the private key input box
    SetPrivateKey(true);

    try {
      const windowWithEthereum = window as CustomWindow;

      if (windowWithEthereum.ethereum) {
        await windowWithEthereum.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await windowWithEthereum.ethereum.request({ method: 'eth_accounts' });
        console.log(accounts);
        setMetamaskAccounts(accounts);
      } else {
        console.error('Metamask not detected');
      }
    } catch (error) {
      console.error('Error connecting to Metamask:', error);
    }
  }

  const [PublicKeyType, SetPublicKeyType] = useState<string>('');

  const handleAccountSelection = (account: string) => {
    SetPublicKeyType(account);
    console.log(`Selected account is: ${account}`)
  };

  const saveKeys = () => {
    // Check if both public and private keys are available
    if (PublicKeyType && privateKey) {
      // Save the keys
      // setKeys({ publicKey: PublicKeyType, privateKey });
    } else {
      console.error('Public or private key is missing');
    }
  };



  const checkOverlap = (privateKey : string, publickey : string) => {
    const ec = new EC.ec('secp256k1');
  
    const keyPair = ec.keyFromPrivate(privateKey, 'hex');

   
    const publicKey = keyPair.getPublic('hex');
    return publickey == publicKey;
  }


  const submitKeysToServer = async () => {
    // check if the private and public key overlap each other
    if (checkOverlap(publicKey, privateKey)) {
      try {
        const encryptedPrivateKey = encryptPrivateKey(privateKey);
        const response = await axios.post('http://localhost:3001/saveKeys', {
          email: userEmail,
          publicKey: publicKey,
          privateKey: encryptedPrivateKey,
        });
        console.log(response.data);
        const success = response.data.success;
        console.log(`Success variable value is: ${success}`);
        console.log('Server Response:', response.data.save_email_boolean);
        // now we would sent a value from the server side that would help us to navigate to the interface of the application
        const save_email_boolean = response.data.save_email_boolean;
        console.log(`save email data boolean value: ${save_email_boolean}`);
        if (success) {
          // change the state of the next [usestate];
          changeNextState(true);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const encryptPrivateKey = (privateKey: string) => {
    const secretKey = 'decentralzied';
    const encrypted = AES.encrypt(privateKey, secretKey).toString();
    return encrypted;
  };



  return (
    <div className={styles.mainBody}>
      <button className={styles.generateKeys} onClick={connectwithmetamask}>
        Connect with metamask
      </button>
      {/* ... (existing code) */}
      {PublicKeyType === 'Metamask' ? (
        <div className={styles.metamaskAccounts}>
          {metamaskAccounts.map((account, index) => (
            <div
              className={`${styles.account} ${PublicKeyType === account ? styles.selectedAccount : ''}`}
              key={index}
              onClick={() => handleAccountSelection(account)}
            >
              {account}
            </div>

          ))}
        </div>

      ) : null}

      {/* Add input for typing private key */}
      <input
        type="text"
        className={`${styles.privateKeySet} ${showPrivatekey ? styles.privateKeySetVisible : styles.privateKeySetHidden}`}
        value={privateKey}
        onChange={(e) => setPrivateKey(e.target.value)}
        placeholder="Type private key..."
      />

      <button
        className={`${styles.showSaveButton} ${showPrivatekey ? styles.showSaveButtonActive : styles.showSaveButtonHide}`}
        onClick={saveKeys}>
        Save keys
      </button>

      <button

        className={`${styles.showSaveButton} ${showPrivatekey ? styles.showSaveButtonActive : styles.showSaveButtonHide}`}
        onClick={submitKeysToServer}>Submit Keys to Server</button>

      <p>or</p>
      {/* generate key checkup */}
      {/* <button className={styles.generateKeys} onClick={generateKeys}>Generate keys</button> */}
      {/* this would be changed to type the private and public key manually */}
      <button className={styles.generateKeys} onClick={() => setManualKeyType(true)}>Manual keys</button>

      {/* {keys && (
        <div>
         
          <div className={styles.publicKey}>
            <p>Public Key: {keys.publicKey}</p>
            <button
              style={{ backgroundColor: copied.publicKey ? 'rgb(51, 245, 100)' : 'inherit' }}
              onClick={() => copyToClipboard(keys.publicKey, 'publicKey')}
            >
              Copy Public Key
            </button>
          </div>
          <div className={styles.privateKey}>
            <p>Private Key: {keys.privateKey}</p>
            <button
              style={{ backgroundColor: copied.privateKey ? 'rgb(51, 245, 100)' : 'inherit' }}
              onClick={() => copyToClipboard(keys.privateKey, 'privateKey')}
            >
              Copy Private Key
            </button>
          </div>
          
          <button className={`${styles.generateKeys} ${allowmetamask ? styles.hideButton : styles.showButton }`} 
          onClick={submitKeysToServer}>Submit Keys to Server</button>

          {next && <button className={styles.generateKeys} onClick={Interface}>Interface</button>}
        </div>
      )} */}

      {/* inputs for public and private keys */}
      {
        manualKey &&
        <div className={styles.keys}>
          <div className={styles.key}>
            <p>Public key</p>
            <input type="text" placeholder='Type public key' onChange={(e) => setPublicKey(e.target.value)} />
          </div>
          <div className={styles.key}>
            <p>Private key</p>
            <input type="text" placeholder='Type private key' onChange={(e) => setPrivateKey(e.target.value)} />
          </div>
          <div className={styles.keysButtons}>
            <button onClick={() => setManualKeyType(false)}>cancel</button>
            <button onClick={submitKeysToServer} className={styles.createKeysButton}>Create & Save</button>
          </div>
        </div>
      }


    </div>
  );
};

export default SignUp;