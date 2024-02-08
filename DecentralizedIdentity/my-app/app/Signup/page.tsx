'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Wallet } from 'ethers';
import axios from 'axios';
import { enc, AES } from 'crypto-js';
import styles from './page.module.css';


const SignUp: React.FC = () => {
  const [metamaskAccounts, setMetamaskAccounts] = useState<string[]>([]);
  const [privateKey, setPrivateKey] = useState('');
  const [showPrivatekey, SetPrivateKey] = useState(false);
  const [allowmetamask, setAllowMetamask] = useState(false);
  const router = useSearchParams();
  const navigate = useRouter();
  const userEmail = router.get("inputData");
  const [next, changeNextState] = useState(false);
  const [keys, setKeys] = useState<{ privateKey: string; publicKey: string } | null>(null);
  const [copied, setCopied] = useState<{ publicKey: boolean; privateKey: boolean }>({ publicKey: false, privateKey: false });
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
      setKeys({ publicKey: PublicKeyType, privateKey });
    } else {
      console.error('Public or private key is missing');
    }
  };

  const generateKeys = () => {
    const wallet = Wallet.createRandom();
    const privateKey = wallet.privateKey; // Hex string
    const publicKey = wallet.address; // Hex string

    setKeys({ privateKey, publicKey });
  };

  const copyToClipboard = (text: string, keyType: 'publicKey' | 'privateKey') => {
    navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [keyType]: true }));

    // Reset the copied state after a short delay (e.g., 2 seconds)
    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [keyType]: false }));
    }, 2000);
  };

  const submitKeysToServer = async () => {
    if (keys) {
      try {
        const encryptedPrivateKey = encryptPrivateKey(keys.privateKey);
        const response = await axios.post('http://localhost:3001/saveKeys', {
          email: userEmail,
          publicKey: keys.publicKey,
          encryptedPrivateKey,
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

  function Interface() {
    navigate.push('/Interface');
  }

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
      <button className={styles.generateKeys} onClick={generateKeys}>Generate keys</button>
      {keys && (
        <div>
          {/* Copy buttons */}
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
          {/* Submit keys to the server */}
          <button className={`${styles.generateKeys} ${allowmetamask ? styles.hideButton : styles.showButton }`} 
          onClick={submitKeysToServer}>Submit Keys to Server</button>

          {next && <button className={styles.generateKeys} onClick={Interface}>Interface</button>}
        </div>
      )}
    </div>
  );
};

export default SignUp;