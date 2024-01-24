'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Wallet } from 'ethers';
import axios from 'axios';
import { enc, AES } from 'crypto-js';
import styles from './page.module.css';
const SignUp: React.FC = () => {
  const router = useSearchParams();
  const navigate = useRouter();
  const userEmail = router.get("inputData");
  const [next, changeNextState] = useState(false);
  const [keys, setKeys] = useState<{ privateKey: string; publicKey: string } | null>(null);
  const [copied, setCopied] = useState<{ publicKey: boolean; privateKey: boolean }>({ publicKey: false, privateKey: false });

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
      <h2>Get your keys</h2>

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
          <button className={styles.generateKeys} onClick={submitKeysToServer}>Submit Keys to Server</button>

          {next && <button className={styles.generateKeys} onClick={Interface}>Interface</button>}
        </div>
      )}
    </div>
  );
};

export default SignUp;