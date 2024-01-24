const express = require('express');
const bodyParser = require('body-parser');
const checkEmailExists = require('./InitialCheckup');
const checkPrivateKeyExists = require('./FinalCheckup');
const SendMail = require('./SendMail');
const { generatePin, getVerificationPin, sendEmail } = SendMail; // Destructure the exported functions
const SaveEmail = require('./SaveEmail');
const { SaveEmailPrivateKey } = SaveEmail;
const createUser = require('./InitialStruct');
const { InitialStruct } = createUser;
const cors = require('cors');
const app = express();
const multer = require('multer');
const fs = require('fs');
const { Wallet } = require('ethers');
const { enc, AES } = require('crypto-js');

const port = process.env.PORT || 3001;

app.use(cors());

// Set up multer storage for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(bodyParser.json());

require('dotenv').config(); // Load environment variables from .env

// Function to listen for the boolean value for the initial check from the mapping to determine the login or signup
async function checkAndLog(email) {
    try {
        const result = await checkEmailExists(email);
        console.log(result); // Handle the result as needed
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Endpoint to handle checking email
app.post('/checkEmail', async (req, res) => {

    try {
        const { data } = req.body;
        console.log(`Email: ${data}`);
        // Perform actions with the email data
        console.log('Received email data:', data);
        // Respond with success or any other necessary data
        const status = await checkAndLog(data);
        console.log(`Sending status is ${status}`);
        // send verificaiton key for the user
        if (!status) {
            const verificationPin = generatePin();
            process.env.VERIFICATION_PIN = verificationPin;

            // Read the existing content of .env
            const envContent = fs.readFileSync('.env', 'utf-8');

            // Check if VERIFICATION_PIN exists in the .env file
            const pinExists = envContent.includes('VERIFICATION_PIN=');

            // If VERIFICATION_PIN doesn't exist, append it to the .env file
            if (!pinExists) {
                fs.appendFileSync('.env', `\nVERIFICATION_PIN=${verificationPin}`);
            } else {
                // If VERIFICATION_PIN exists, update its value in the .env file
                const updatedEnvContent = envContent.replace(/VERIFICATION_PIN=.*/, `VERIFICATION_PIN=${verificationPin}`);
                fs.writeFileSync('.env', updatedEnvContent);
            }
            sendEmail(verificationPin, data);
        }
        // Sending response data for the user
        res.json({ success: true, response_boolean_value: status });
    } catch (error) {
        console.error('Error handling email data:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.post('/verifyEmailPin', (req, res) => {
    const { pin } = req.body;

    // Retrieve the verification pin from the environment variables
    const savedPin = getVerificationPin();

    // Check if the provided pin matches the saved pin
    const isPinVerified = pin === savedPin;
    console.log(`Pin verification ${isPinVerified}`);
    // Respond with the verification result
    res.json({ isPinVerified });
});

// endpoint to handle the user email and encrypted keys
app.post('/saveKeys', (req, res) => {
    try {
        const { email, publicKey, encryptedPrivateKey } = req.body;
        const storedPrivateKey = "decentralzied";
        // Decrypt the encrypted private key
        const decryptedPrivateKey = decryptPrivateKey(encryptedPrivateKey, storedPrivateKey);

        // Log the decrypted private key to the console
        console.log('Decrypted Private Key:', decryptedPrivateKey);
        // use the decrypted private key to store them in the solidity smart contract
        console.log(`Email: ${email}, Public key: ${publicKey}`);
        const response_data = SaveEmailPrivateKey(decryptedPrivateKey, email);
        console.log(`response data is: ${response_data}`);
        return res.json({ success: true, save_email_boolean: response_data });
    } catch (error) {
        console.error('Error saving keys:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

const decryptPrivateKey = (encryptedPrivateKey, storedPrivateKey) => {
    // Decrypt the encrypted private key
    const decryptedBytes = AES.decrypt(encryptedPrivateKey, storedPrivateKey);
    const decryptedPrivateKey = decryptedBytes.toString(enc.Utf8);
    return decryptedPrivateKey;
};

// handling private key for login purpose
// Endpoint to handle the encrypted private key
app.post('/checkKey', async (req, res) => {
    const { encryptedPrivateKey } = req.body;

    // Replace 'yourSecretKey123' with the same secret key used for encryption
    const secretKey = 'privatekeyEncryption';

    try {
        // Decrypt the private key
        const decryptedPrivateKey = AES.decrypt(encryptedPrivateKey, secretKey).toString(enc.Utf8);

        // Now you can use the decryptedPrivateKey as needed
        console.log('Decrypted Private Key:', decryptedPrivateKey);
        const email = await checkPrivateKeyExists(decryptPrivateKey);
        console.log(`email related to private key is ${email}`);
        if (email !== null) {
            // email is not null and private key exist in the contract
            console.log('private key verified correctly');
            res.status(200).json({message: true});
        }
        else {
            console.log('private ket related email does not exist');
            res.status(404).json({message: 'Private key does not exist go to signup'});
        }
    } catch (error) {
        console.error('Error decrypting private key:', error);
        // Respond with an error message
        res.status(500).json({ message: 'Error decrypting private key' });
    }
});

// creating the user struct creating the endpoint
app.post('/createStructUser', upload.single('Image'), async (req, res) => {
    // getting the req data
    const fullName = req.body.FullName;
    const email = req.body.Email;
    const contact = req.body.Contact;
    const dob = req.body.DOB;
    const publicKey = req.body.PublicKey;
    const privateKey = req.body.PrivateKey
    let base64Image = ''; // storing the base64 of the image
    // Access the file data from req.file
    if (req.file) {
        const imageBuffer = req.file.buffer;
        base64Image = imageBuffer.toString('base64');
    }
    // consoling the values 
    console.log(fullName, email, contact, dob, publicKey, privateKey)
    // calling the function for creating initial contract and mapping of keys
    try {
        // Call the InitialStruct function
        const response = await InitialStruct(publicKey, email, fullName, base64Image, contact, dob, privateKey);
        // Send the response to the client based on the status and message
        res.status(response.status).json({ message: response.message });
    } catch (error) {
        console.error('Server error:', error);
        // Handle any unexpected errors and send an internal server error response
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});