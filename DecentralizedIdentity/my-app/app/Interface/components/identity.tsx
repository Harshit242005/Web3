'use client';
import React, { useState, useEffect } from "react";
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
    // to check if the data for the struct has been sent or not
    const [initialSent, SetInitialSent] = useState(false);
    // State variables for input values
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [dob, setDOB] = useState('');
    const [successPopUp, SetSuccessPopUp] = useState(false);
    const [newValue, SetNewValueName] = useState('');
    const [newInputBox, SetNewInputBoxValue] = useState('');
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const [successMessage, SetSucessMessage] = useState('');


    const hideSuccessPopup = () => {
        SetSuccessPopUp(false);
    }

    const handleCancelClick = () => {
        setPopupVisibility(false);
    };

    const handleUpdateClick = async () => {
        // Run your update function here with fieldName and newInputBox value
        console.log('Updating:', newValue, newInputBox);
        // sending these values with the axios and handling response and showing values 
        const response = axios.post('http://localhost:3001/updateValue', {
            // object pass for which value and what value to get changed
            'valueType': newValue,
            'value': newInputBox,
            'publicKey': publicKey
        });
        // consoling out the values 
        console.log((await response).data.message);
        SetSucessMessage((await response).data.message);
        if ((await response).status === 200) {
            // show up the values as a popup to see how this works out
            SetSuccessPopUp(true);
        }
        else {
            // show a popup that value does not change
            alert('Value has not been updated correctly');
        }
        // Close the popup after updating
        setPopupVisibility(false);
    };


    // Function to update the respective input box value
    const handleEditClick = (fieldName: string) => {
        SetNewValueName(fieldName);
        setPopupVisibility(true);

        // replace this with the custom popup which has the input filed take value from it and use that
        const newValue = newInputBox;

        // // Update the state based on the field name
        switch (fieldName) {
            case 'fullName':
                setFullName(newValue || '');
                break;
            case 'email':
                setEmail(newValue || '');
                break;
            case 'contact':
                setContact(newValue || '');
                break;
            case 'dob':
                setDOB(newValue || '');
                break;
            default:
                break;
        }
    };

    // creating a useEffect hook based call for filling the details
    useEffect(() => {
        // Make the API call to fetch details when the component mounts
        axios.get(`http://localhost:3001/FetchDetails/${publicKey}`)
            .then(response => {
                const details = response.data.document;
                // restricting the user to click on create user button
                SetInitialSent(true);
                console.log(`Document details that i am fetching is: ${details}`);
                // Set the state with the retrieved details
                setFullName(details.username);
                setEmail(details.email);
                setContact(details.contact);
                setDOB(details.dob);
            })
            .catch(error => {
                console.error('Error fetching details:', error);
            });
    }, [publicKey]); // The empty dependency array ensures that this effect runs once when the component mounts

    //const [image, setImage] = useState<File | null>(null);
    // error handling for creating User Struct
    const [structError, SetStructError] = useState('');
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();  // preventing the form from auto default posting as whole and refreshing 
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
            {/* showing that value has been updated as a pop up */}
            {successPopUp && (
                <div className={styles.success}>
                    {/* data value has been changed */}
                    <div className={styles.successMessage}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                            <g clip-path="url(#clip0_3849_5)">
                                <path d="M25 0C11.193 0 0 11.193 0 25C0 38.8078 11.193 50 25 50C38.8078 50 50 38.8078 50 25C50 11.193 38.8078 0 25 0ZM25 46.9242C12.9383 46.9242 3.125 37.0617 3.125 24.9999C3.125 12.9382 12.9383 3.1249 25 3.1249C37.0617 3.1249 46.875 12.9382 46.875 24.9999C46.875 37.0616 37.0617 46.9242 25 46.9242ZM34.9773 15.8523L20.3093 30.6125L13.7039 24.007C13.0937 23.3969 12.1046 23.3969 11.4937 24.007C10.8835 24.6172 10.8835 25.6062 11.4937 26.2164L19.2273 33.9508C19.8375 34.5602 20.8265 34.5602 21.4375 33.9508C21.5078 33.8805 21.568 33.8039 21.6227 33.7242L37.1883 18.0625C37.7977 17.4523 37.7977 16.4632 37.1883 15.8523C36.5773 15.2422 35.5883 15.2422 34.9773 15.8523Z" fill="#14FF00" />
                            </g>
                            <defs>
                                <clipPath id="clip0_3849_5">
                                    <rect width="50" height="50" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <p>{successMessage}</p>
                    </div>
                    <button className={styles.successPopUpEndButton} onClick={hideSuccessPopup}>Hide</button>
                </div>

            )}
            {isPopupVisible && (
                <div className={styles.hiddenPopup}>
                    <p>New value for <span>{newValue}</span></p>
                    <input
                        className={styles.newInputBoxValue}
                        type="text"
                        placeholder="New value..."
                        value={newInputBox}
                        onChange={(e) => SetNewInputBoxValue(e.target.value)}
                    />
                    <div className={styles.hiddenPopupButtons}>
                        <button className={styles.hiddenPopupButton} onClick={handleCancelClick}>Cancel</button>
                        <button className={styles.hiddenPopupButton} onClick={handleUpdateClick}>Update</button>
                    </div>
                </div>
            )}
            {/* details filling  */}
            <form onSubmit={handleSubmit} className={styles.formData}>
                <div className={styles.initalData}>
                    {/* inital data filling that shoould be sent as a struct */}

                    <div className={styles.row}>
                        {/* Full Name input */}
                        <input type="text" className={styles.inputBox} value={fullName} onChange={handleFullNameChange} placeholder="Type name..." />
                        <button className={styles.changeDataButton}
                            onClick={() => handleEditClick('fullName')}
                        >Edit</button>
                    </div>

                    <div className={styles.row}>
                        {/* Email input */}
                        <input type="email" className={styles.inputBox} value={email} onChange={handleEmailChange} placeholder="Type email..." />
                        <button className={styles.changeDataButton}
                            onClick={() => handleEditClick('email')}
                        >Edit</button>
                    </div>

                    <div className={styles.row}>
                        {/* Contact input */}
                        <input type="text" className={styles.inputBox} value={contact} onChange={handleContactChange} placeholder="Type contact..." />
                        <button className={styles.changeDataButton}
                            onClick={() => handleEditClick('contact')}
                        >Edit</button>
                    </div>

                    <div className={styles.row}>
                        {/* DOB input */}
                        <input type="text" className={styles.inputBox} value={dob} onChange={handleDOBChange} placeholder="Type dd/mm/yyyy" />
                        <button className={styles.changeDataButton}
                            onClick={() => handleEditClick('dob')}
                        >Edit</button>
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