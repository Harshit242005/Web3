'use client';
import React, { useState, ChangeEvent, useRef } from "react";
import styles from './identity.module.css'
import axios from "axios";


interface IdentityProps {
    privateKey: string;
    publicKey: string;
}

const Identity: React.FC<IdentityProps> = ({ privateKey, publicKey }) => {
    // State variables for input values
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [dob, setDOB] = useState('');
    const [image, setImage] = useState<File | null>(null);
    // error handling for creating User Struct
    const [structError, SetStructError] = useState('');
    // to check if the data for the struct has been sent or not
    const [initialSent, SetInitialSent] = useState(false);
    const handleButtonClick = async () => {

        // pass the data to the server for creating initial user struct
        const response = axios.post('http://localhost:3001/createStructUser', {
            // sending a JSON data
            'FullName': fullName,
            'Email': email,
            'DOB': dob,
            'Contact': contact,
            'Image': image,
            'PublicKey': publicKey,
            'PrivateKey': privateKey
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

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Handle file input change and set the image state
        const selectedImage = e.target.files?.[0];
        setImage(selectedImage || null);
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDivClick = () => {
        // Trigger a click event on the file input when the div is clicked
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className={styles.body}>
            <h1>Identity Management</h1>
            <p style={{ color: 'red', fontSize: '20px' }}>{structError}</p>
            {/* details filling  */}
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

                <div className={styles.row}>
                    {/* Image input */}
                    <div onClick={handleDivClick} className={styles.takeImage}>
                        {/* take image as input */}
                        <div className={styles.image}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M25.0003 28.1252C27.2105 28.1252 29.3301 27.2472 30.8929 25.6844C32.4557 24.1216 33.3337 22.002 33.3337 19.7918C33.3337 17.5817 32.4557 15.4621 30.8929 13.8993C29.3301 12.3365 27.2105 11.4585 25.0003 11.4585C22.7902 11.4585 20.6706 12.3365 19.1078 13.8993C17.545 15.4621 16.667 17.5817 16.667 19.7918C16.667 22.002 17.545 24.1216 19.1078 25.6844C20.6706 27.2472 22.7902 28.1252 25.0003 28.1252ZM25.0003 26.0418C25.8211 26.0418 26.6338 25.8802 27.3921 25.5661C28.1504 25.252 28.8394 24.7916 29.4197 24.2112C30.0001 23.6309 30.4605 22.9419 30.7746 22.1836C31.0887 21.4253 31.2503 20.6126 31.2503 19.7918C31.2503 18.9711 31.0887 18.1583 30.7746 17.4001C30.4605 16.6418 30.0001 15.9528 29.4197 15.3724C28.8394 14.792 28.1504 14.3317 27.3921 14.0176C26.6338 13.7035 25.8211 13.5418 25.0003 13.5418C23.3427 13.5418 21.753 14.2003 20.5809 15.3724C19.4088 16.5445 18.7503 18.1342 18.7503 19.7918C18.7503 21.4494 19.4088 23.0391 20.5809 24.2112C21.753 25.3833 23.3427 26.0418 25.0003 26.0418Z" fill="black" fill-opacity="0.5" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M45.8337 25.0001C45.8337 36.5063 36.5066 45.8334 25.0003 45.8334C13.4941 45.8334 4.16699 36.5063 4.16699 25.0001C4.16699 13.4938 13.4941 4.16675 25.0003 4.16675C36.5066 4.16675 45.8337 13.4938 45.8337 25.0001ZM35.0316 40.8438C32.0326 42.7476 28.5525 43.7558 25.0003 43.7501C21.3633 43.7557 17.8039 42.6985 14.7597 40.7084C14.5097 40.3959 14.2555 40.073 13.9993 39.7397C13.7015 39.3491 13.5408 38.8714 13.542 38.3803C13.542 37.2584 14.3482 36.3178 15.4264 36.1605C22.5566 35.1188 27.466 35.2084 34.6055 36.197C35.1226 36.2719 35.595 36.5314 35.9357 36.9276C36.2763 37.3237 36.462 37.8297 36.4587 38.3522C36.4587 38.8522 36.2868 39.3376 35.9764 39.7167C35.6566 40.1063 35.341 40.4824 35.0316 40.8438ZM38.5264 37.9855C38.3597 36.0355 36.8795 34.4084 34.8909 34.1334C27.5826 33.122 22.4743 33.0251 15.1253 34.099C13.1253 34.3907 11.6514 36.0324 11.4764 37.9876C8.11733 34.4991 6.24371 29.8429 6.25033 25.0001C6.25033 14.6449 14.6451 6.25008 25.0003 6.25008C35.3555 6.25008 43.7503 14.6449 43.7503 25.0001C43.757 29.8419 41.8841 34.4972 38.5264 37.9855Z" fill="black" fill-opacity="0.5" />
                            </svg>
                        </div>
                    </div>
                    <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleImageChange} placeholder="Pick an image..." />
                    <button className={styles.changeDataButton}>Edit</button>
                </div>
            </div>

            {initialSent ? (
                <button className={styles.disabledButton} disabled>
                    Already Created
                </button>
            ) : (
                <button className={styles.enabledButton} onClick={handleButtonClick}>
                    Create User
                </button>
            )}
        </div>
    )
}
export default Identity;