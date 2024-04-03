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
    console.log(publicKey);
    const { inputData, setInputData, cidData, setCidData } = useInputData();
    // use the axios post method to send up the data
    console.log(`cid that we had for this access page is: ${cidData}`);
    // for filling out the names
    const [allowName, SetAllowName] = useState<string[]>([]);


    useEffect(() => {
        const getAccessNames = async () => {
            const response = await axios.post('http://localhost:3001/GetAllowAccess', {
                CID: cidData
            });

            if (response.status === 200) {
                SetAllowName(response.data.allowNames);
            }
            else {
                console.log(`we found some error while fetching the names: ${response.data.message}`)
            }
        }

        getAccessNames();
    }, [cidData]);

    // function to handle the button which want to make the connection disappear
    const handleButtonClick = async (name: string) => {

        console.log(`Button clicked for name: ${name}`);
        // here we would be sending of the name and email to the backend to change the name of the application
        // and put it in the deny list
        const response = await axios.post('http://localhost:3001/AddInDeny', {
            CID: cidData,
            publickKey: publicKey,
            privateKey: privateKey,
            application_name: name
        });

        console.log(response)
        if (response.status === 200) {
            // get the new cid value from the response and update with the context cid
            const newCidValue = response.data.newCid;
            console.log(`new cid value is: ${newCidValue}`);
            setCidData(newCidValue);

            // call the function to update cid value in smart contract & values in the interface
            const newResponse = await axios.post('http://localhost:3001/GetAllowAccess', {
                CID: newCidValue
            });

            if (newResponse.status === 200) {
                SetAllowName(response.data.allowNames);
            }
            else {
                console.log(`we found some error while fetching the names: ${response.data.message}`)
            }   
        }
    };

    return (
        <div>
            <p className={styles.heading}>Access application list</p>
            {/* let's provide the optios user can use for this  */}
            {/* we would map up the values of the useState here */}
            {/* {allowName.map((name, index) => (
                <div className={styles.allowConnections} key={index}>
                    <p>{name}</p>
                <button className={styles.accessButton} onClick={() => handleButtonClick(name)}>
                    Deny
                </button>
                </div>
            ))} */}
            {allowName && allowName.length > 0 ? (
                allowName.map((name, index) => (
                    <div className={styles.allowConnections} key={index}>
                        <p>{name}</p>
                        <button className={styles.accessButton} onClick={() => handleButtonClick(name)}>
                            Deny
                        </button>
                    </div>
                ))
            ) : (
                <p>No applications are allowed right now.</p>
            )}

        </div>
    )
}

export default Access;