'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import CryptoJS from 'crypto-js';
import styles from './page.module.css';
import { Wallet } from 'ethers';
import { log } from "console";
const Login: React.FC = () => {
    const navigation = useRouter();
    const [invalidKey, setInvalidKey] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [publicKeyToCheck, setPublicKeyToCheck] = useState('');
    const [isMatch, setIsMatch] = useState(false);
    const [metamaskAccounts, setMetamaskAccounts] = useState<string[]>([]);
    interface CustomWindow extends Window {
        ethereum?: any; // Add any type if you know the exact type of ethereum
    }

    // ...

    useEffect(() => {
        const connectMetamask = async () => {
            try {
                const windowWithEthereum = window as CustomWindow;

                // Check if Metamask is available
                if (windowWithEthereum.ethereum) {
                    // Request Metamask account access
                    await windowWithEthereum.ethereum.request({ method: 'eth_requestAccounts' });

                    // Get Metamask accounts
                    const accounts = await windowWithEthereum.ethereum.request({ method: 'eth_accounts' });

                    // Update the state with the accounts
                    setMetamaskAccounts(accounts);
                } else {
                    console.error('Metamask not detected');
                    // Handle case where Metamask is not available
                }
            } catch (error) {
                console.error('Error connecting to Metamask:', error);
                // Handle error, show a message, etc.
            }
        };

        connectMetamask();
    }, []);
    // const publicSecretKey = 'public';
    // const privateSecretKey = 'private';
    const [PublicKeyType, SetPublicKeyType] = useState<string>('');

    // handling the selected account
    const handleAccountSelection = (account: string) => {
        // Set the selected account to the state variable
        setPublicKeyToCheck(account);
        console.log(`Selected account is: ${account}`);
    };

    const handleCheckKey = () => {
        try {
            const wallet = new Wallet(privateKey);
            console.log(`wallet is: ${wallet}`);
            const derivedPublicKey = wallet.address;
            console.log(`derived public key from the private key: ${derivedPublicKey}`)
            console.log(`my public key ${publicKeyToCheck}`);
            console.log(`${ typeof derivedPublicKey} ${typeof publicKeyToCheck}`);
            if (derivedPublicKey.toLowerCase() === publicKeyToCheck.toLowerCase())
            {
                setIsMatch(true);
                console.log('matched correctly')
            }
            else {
                setIsMatch(false);
                console.log('matched incorrectly')
            }
        } catch (error) {
            console.error('Error checking keys:', error);
            setIsMatch(false); // Set to false in case of any error
        }
    };

    // allowing what to choose
    const PublicKeyFillType = (TypeChoosen: string) => {
        SetPublicKeyType(TypeChoosen);
    }

    const sendEncryptedPrivateKey = async () => {
        // Encrypt the private key before sending
        const encryptedPrivateKey = CryptoJS.AES.encrypt(privateKey, 'privatekeyEncryption').toString();

        try {
            const response = await axios.post('http://localhost:3001/checkKey', { encryptedPrivateKey });

            setPrivateKey('');
            console.log(response.data);

            const { message } = response.data;
            console.log(`private key verification status: ${message}`);

            //const encryptedPrivateKeySend = CryptoJS.AES.encrypt(privateKey, privateSecretKey).toString();
            //const encryptedPublicKeySend = CryptoJS.AES.encrypt(publicKeyToCheck, publicSecretKey).toString();

            if (response.status === 200 && isMatch) {
                navigation.push(`/Interface?privateKey=${privateKey}&publicKey=${publicKeyToCheck}`)
            } else {
                setInvalidKey(message);
            }
        } catch (error) {
            console.error('Error sending request:', error);
            // Handle error, setInvalidKey, or show an error message to the user
        }
    }

    return (
        <div className={styles.mainBody}>
            <h1>Type Private key for login...</h1>
            <p style={{ color: 'red' }}>{invalidKey}</p>
            <div className={styles.mainBody}>
                {isMatch ? (
                    <p>Public key matches the derived public key from the private key!</p>
                ) : (
                    <p>Public key does not match the derived public key from the private key.</p>
                )}
                {/* first user would get his options to select which he want 
                manual typing or connect with metamask */}
                <div className={styles.connectionOption}>
                    <button onClick={() => PublicKeyFillType('Manual')}>Type manual</button>
                    <button onClick={() => PublicKeyFillType('Metamask')}>Connect with metamask</button>
                </div>
                {PublicKeyType === 'Manual' ? (
                    <input
                        type="text"
                        className={styles.privateKeySet}
                        value={publicKeyToCheck}
                        onChange={(e) => setPublicKeyToCheck(e.target.value)}
                        placeholder="Type public key to check..."
                    />
                ) : PublicKeyType === 'Metamask' ? (
                    // Render the div with accounts here
                    <div className={styles.metamaskAccounts}>
                        {/* Fetch and map Metamask accounts here */}
                        {/* For simplicity, I'll assume you have a state to store Metamask accounts */}
                        {metamaskAccounts.map((account, index) => (
                            // <div className={styles.account} key={index}>{account}</div>
                            <div
                                className={`${styles.account} ${publicKeyToCheck === account ? styles.selectedAccount : ''}`}
                                key={index}
                                onClick={() => handleAccountSelection(account)}
                            >
                                {account}
                            </div>
                        ))}
                    </div>
                ) : null}

                {/* <input
                    type="text"
                    className={styles.privateKeySet}
                    value={publicKeyToCheck}
                    onChange={(e) => setPublicKeyToCheck(e.target.value)}
                    placeholder="Type public key to check..."
                />  */}

                <input
                    type="text"
                    className={styles.privateKeySet}
                    value={privateKey}
                    onChange={(e) => setPrivateKey(e.target.value)}
                    placeholder="Type private key..."
                />

                <div className={styles.checkButtons}>
                    <button className={styles.sendKeys} onClick={handleCheckKey}>Check Key</button>
                    {/* directly adding the interface with the public key and cheking if they cross each other */}

                    <button disabled={!isMatch} className={styles.sendKeys} onClick={sendEncryptedPrivateKey}>Check</button>
                </div>
            </div>

        </div>
    );
}
export default Login;