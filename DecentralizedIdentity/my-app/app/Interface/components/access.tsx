'use client';
import React, { useState, useEffect } from "react";
import { useInputData } from "@/app/InputDataContext";
import axios from "axios";
import styles from './access.module.css';

interface IdentityProps {
    privateKey: string;
    publicKey: string;
}

const Access: React.FC<IdentityProps> = ({ publicKey, privateKey }) => {
    const { inputData, setInputData } = useInputData();
    // use the axios post method to send up the data
    console.log(`email that we had for this access page is: ${inputData}`);
    // for filling out the names
    const [allowName, SetAllowName] = useState<string[]>([]);
    useEffect(() => {
        const getAccessNames = async () => {
            const response = await axios.post('http://localhost:3001/GetAllowAccess', {
                email: inputData
            });

            if (response.status === 200) {
                SetAllowName(response.data.allowNames);
            }
            else {
                console.log(`we found some error while fetching the names: ${response.data.message}`)
            }
        }

        getAccessNames();
    }, [inputData]);

    // function to handle the button which want to make the connection disappear
    const handleButtonClick = (name: string) => {
        // Handle the button click based on the name (you can use it as needed)
        console.log(`Button clicked for name: ${name}`);
    };

    return (
        <div>
            <p className={styles.heading}>Access application list</p>
            {/* let's provide the optios user can use for this  */}
            {/* we would map up the values of the useState here */}
            {allowName.map((name, index) => (
                <div className={styles.allowConnections} key={index}>
                    <p>{name}</p>
                <button className={styles.accessButton} onClick={() => handleButtonClick(name)}>
                    Deny
                </button>
                </div>
            ))}
        </div>
    )
}

export default Access;