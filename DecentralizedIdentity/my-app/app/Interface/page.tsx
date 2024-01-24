'use client';
import React, { useState, useEffect, ChangeEvent, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import CryptoJS from 'crypto-js';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';
import { error } from "console";
import Identity from "./components/identity";
import Permission from "./components/permission";

// importing the context for this 
//import { AppProvider, useAppContext } from "./KeyContext";

const Interface: React.FC = () => {
    // getting the query params to store them in a useState
    const searchParams = useSearchParams();
    const [publicKey, setPublicKey] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    //const { privateKey, publicKey, setPrivateKey, setPublicKey } = useAppContext(); // Use the context here
    const [selectedButton, setSelectedButton] = useState<string | null>(null);
    // State to track which component to render
    const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
    // Function to handle button clicks and set the selected component
    const handleButtonClick = (component: string) => {
        setSelectedComponent(component);
        setSelectedButton(component);
    };

    useEffect(() => {
        // Retrieve the parameters from the route
        const PrivateKey = searchParams.get('privateKey') || '';
        const PublicKey = searchParams.get('publicKey') || '';
        console.log(`fromt the query parameters ${PrivateKey}, ${PublicKey}`);
        setPrivateKey(PrivateKey);
        setPublicKey(PublicKey);
    }, [searchParams, setPrivateKey, setPublicKey]);

    return (
        
        <div className={styles.mainBody}>
            {/* he would be able to select anything change identity values or change permissions of access */}
            <div className={styles.navigationButtons}>
                <button onClick={() => handleButtonClick('Identity')}
                className={selectedButton === 'Identity' ? styles.selectedButton : ''}
                >Identity</button>
                <button onClick={() => handleButtonClick('Permission')}
                 className={selectedButton === 'Permission' ? styles.selectedButton : ''}
                >Permission</button>
            </div>
            <div className={styles.keys}>
                <p><span className={styles.keysHeader}>Public Key:</span> {publicKey}</p>
                <p><span className={styles.keysHeader}>Private Key:</span> {privateKey}</p>
            </div>
            <div className={styles.components}>
                {/* rendering compoent on the button click */}
                {/* Passing data as props for the components */}
                {selectedComponent === 'Identity' && <Identity publicKey={publicKey} privateKey={privateKey} />}
                {selectedComponent === 'Permission' && <Permission publicKey={publicKey} privateKey={privateKey} />}
            </div>
        </div>
       
    );
};
export default Interface;