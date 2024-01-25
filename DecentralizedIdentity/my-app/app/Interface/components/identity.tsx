'use client';
import React, { useState, } from "react";
import styles from './identity.module.css'
import axios from "axios";
import { log } from "console";


interface IdentityProps {
    privateKey: string;
    publicKey: string;
}

const Identity: React.FC<IdentityProps> = ({ privateKey, publicKey }) => {
    console.log(privateKey);
    console.log(publicKey);
    
    // State variables for input values
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [dob, setDOB] = useState('');
    //const [image, setImage] = useState<File | null>(null);
    // error handling for creating User Struct
    const [structError, SetStructError] = useState('');
    // to check if the data for the struct has been sent or not
    const [initialSent, SetInitialSent] = useState(false);
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        const document = {
            // sending a JSON data
            'FullName': fullName,
            'Email': email,
            'DOB': dob,
            'Contact': contact,
            'PublicKey': publicKey,
            'PrivateKey': privateKey
        };
        console.log(`Document data is ${document}`);
       
        // pass the data to the server for creating initial user struct
        const response = axios.post('http://localhost:3001/createStructUser', document, {
            headers: {
                "Content-Type": 'application/json',
            },
        });
        // getting user status
        const vaild = await (await response).data.status;
        // getting yser message 
        const message = await (await response).data.message;
        if (vaild == 200) {
            // setting the state button boolean value to be true
            SetInitialSent(true);
            SetStructError(message);
        }

        else {
            SetStructError(message);
            ;
        }
    }

    // Handle input changes
    const handleFullNameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setFullName(e.target.value);
    };

    const handleEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setEmail(e.target.value);
    };

    const handleContactChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setContact(e.target.value);
    };

    const handleDOBChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setDOB(e.target.value);
    };

    return (
        <div className={styles.body}>
            <h1>Identity Management</h1>
            <p style={{ color: 'red', fontSize: '20px' }}>{structError}</p>
            {/* details filling  */}
            <form onSubmit={handleSubmit}>
                <div className={styles.initalData}>
                    {/* inital data filling that shoould be sent as a struct */}

                    <div className={styles.row}>
                        {/* Full Name input */}

                        <input type="text" className={styles.inputBox} value={fullName} onChange={handleFullNameChange} placeholder="Type name..." />
                        <button className={styles.changeDataButton}>Edit</button>
                    </div>

                    <div className={styles.row}>
                        {/* Email input */}
                        <input type="email" className={styles.inputBox} value={email} onChange={handleEmailChange} placeholder="Type email..." />
                        <button className={styles.changeDataButton}>Edit</button>
                    </div>

                    <div className={styles.row}>
                        {/* Contact input */}
                        <input type="text" className={styles.inputBox} value={contact} onChange={handleContactChange} placeholder="Type contact..." />
                        <button className={styles.changeDataButton}>Edit</button>
                    </div>

                    <div className={styles.row}>
                        {/* DOB input */}
                        <input type="text" className={styles.inputBox} value={dob} onChange={handleDOBChange} placeholder="Type dd/mm/yyyy" />
                        <button className={styles.changeDataButton}>Edit</button>
                    </div>

                    
                </div>

                {initialSent ? (
                    <button className={styles.disabledButton} disabled>
                        Already Created
                    </button>
                ) : (
                    <button className={styles.enabledButton} type="submit">
                        Create User
                    </button>
                )}
            </form>
        </div>
    )
}
export default Identity;