'use client';
import React, { useEffect, useState } from "react";
import { useInputData } from "@/app/InputDataContext";
import axios from "axios";
import styles from './access.module.css';


interface IdentityProps {
    privateKey: string;
    publicKey: string;
}


const Denied: React.FC<IdentityProps> = ({ publicKey, privateKey }) => {
    const { inputData, setInputData, cidData, setCidData } = useInputData();

    // for filling out the names
    const [denyName, SetDenyName] = useState<string[]>([]);
    useEffect(() => {
        const getNotAccessNames = async () => {
            const response = await axios.post('http://localhost:3001/GetDenyAccess', {
                CID: cidData
            });

            if (response.status === 200) {
                SetDenyName(response.data.denyNames);
            }
            else {
                console.log(`we found some error while fetching the names: ${response.data.message}`)
            }
        }

        getNotAccessNames();
    }, [cidData]);

    const handleButtonClick = async (name: string) => {

        console.log(`Button clicked for name: ${name}`);
        // here we would be sending of the name and email to the backend to change the name of the application
        // and put it in the deny list
        const response = await axios.post('http://localhost:3001/AddInAllow', {
            CID: cidData,
            publickKey: publicKey,
            privateKey: privateKey,
            application_name: name
        });

     
        if (response.status === 200) {
            const newCidValue = response.data.newCid;
            console.log(`new cid value is: ${newCidValue}`);
            setCidData(newCidValue);
            const newResponse = await axios.post('http://localhost:3001/GetDenyAccess', {
                CID: cidData
            });

            if (newResponse.status === 200) {
                SetDenyName(response.data.denyNames);
            }
            else {
                console.log(`we found some error while fetching the names: ${response.data.message}`)
            }
        }
    };


    return (
        <div>
            <div>
                <p className={styles.heading}>Denied application list</p>
                {/* let's provide the optios user can use for this  */}
                {/* we would map up the values of the useState here */}
                {denyName && denyName.length > 0 ? ( denyName.map((name, index) => (
                    <div className={styles.allowConnections} key={index}>
                        <p>{name}</p>
                        <button className={styles.accessButton} onClick={() => handleButtonClick(name)}>
                            Allow
                        </button>
                    </div>
                )) 
                ) : (
                    <p>No application in the denied list right now</p>
                )}
                
            </div>
        </div>
    )
}

export default Denied;