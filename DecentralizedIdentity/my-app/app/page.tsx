'use client';
import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { query } from 'express';

const Home: React.FC = () => {
  const [inputData, setInputData] = useState<string>('');
  const [showVerification, setShowVerification] = useState(false);
  const [verificationPin, setVerificationPin] = useState<string>('');
  const navigate = useRouter();

  const handleButtonClick = async () => {
    try {
      // Use Axios to send data to the server
      const response = await axios.post('http://localhost:3001/checkEmail', { data: inputData });

      // Handle the response as needed [used type to restrict to only get the boolean return data type]
      const boolean_value: boolean = response.data.response_boolean_value;
      console.log(`boolean value that we had return is ${boolean_value}`);
      if (boolean_value) {
        // If true, navigate to Login
        navigate.push('/Login');
      } else {
        // Show email verification
        setShowVerification(true);
      }
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  };

  const handleVerificationSubmit = async () => {
    try {
      // Assume you have a server endpoint to verify the email pin
      const response = await axios.post('http://localhost:3001/verifyEmailPin', {
        pin: verificationPin,
      });

      const isPinVerified = response.data.isPinVerified;
      console.log(`Is pin verified? ${isPinVerified}`);

      if (isPinVerified) {
        // If true, navigate to the Signup page 

        // In the component where you navigate
        navigate.push(`/Signup?inputData=${encodeURIComponent(inputData)}`);

      } else {
        // If false, you can show an error message or handle it accordingly
        console.log('Email pin verification failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main className={styles.divButton}>
      <input
        type="email"
        value={inputData}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInputData(e.target.value)}
        placeholder="Type email..."
        className={styles.emailInput}
      />
      <button className={styles.button} onClick={handleButtonClick}>
        Check Email
      </button>
      {/* Email verification input and button */}
      {showVerification && (
        <div className='verify'>
          <p>Type verification key for the email</p>
          <input
            type="text"
            value={verificationPin}
            onChange={(e) => setVerificationPin(e.target.value)}
            className={styles.verifyEmail}
            placeholder="Enter Verification Pin"
          />
          <button
            className={styles.button}
            onClick={handleVerificationSubmit}>Verify</button>
        </div>
      )}
    </main>
  );
};

export default Home;
