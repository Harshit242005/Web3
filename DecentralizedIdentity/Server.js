const express = require('express');
const bodyParser = require('body-parser');
const checkEmailExists = require('./InitialCheckup');
const checkPrivateKeyExists = require('./FinalCheckup');
const MongoClient = require('mongodb').MongoClient;
const SendMail = require('./SendMail');
const { generatePin, getVerificationPin, sendEmail } = SendMail; // Destructure the exported functions

const SaveEmail = require('./SaveEmail');
const { SaveEmailPrivateKey } = SaveEmail;

const createUser = require('./InitialStruct');
const { InitialStruct } = createUser;

const details = require('./FetchDetails');
const { GetDetails } = details;

const updateValue = require('./Update');
const { updateValueInContract } = updateValue


const { createCid, getAllowList, getDeniedList, addInAccess, addInDenied } = require('./IPFS/CID');

// // IPFS scripting 
// const CID = require('./CID');
// const { createCid, getAllowList, getDeniedList, addInAccess, addInDenied } = CID;

const cors = require('cors');
const app = express();

const fs = require('fs');
const { enc, AES } = require('crypto-js');
const Web3 = require('web3');
const { log } = require('console');
const web3 = new Web3();
const port = process.env.PORT || 3001;
app.use(cors());


app.use(bodyParser.json({ limit: '50mb' }));

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
            console.log(`verification pin is: ${verificationPin}`)
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
        const { email, publicKey, privateKey } = req.body;
        const storedPrivateKey = "decentralzied";
        // Decrypt the encrypted private key
        const decryptedPrivateKey = decryptPrivateKey(privateKey, storedPrivateKey);

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
            res.status(200).json({ message: true });
        }
        else {
            console.log('private ket related email does not exist');
            res.status(404).json({ message: 'Private key does not exist go to signup' });
        }
    } catch (error) {
        console.error('Error decrypting private key:', error);
        // Respond with an error message
        res.status(500).json({ message: 'Error decrypting private key' });
    }
});

// checking key for another kind of application
app.post('/check', async (req, res) => {
    const { PrivateKey } = req.body;

    try {


        // Now you can use the decryptedPrivateKey as needed
        console.log('Private Key:', PrivateKey);
        const email = await checkPrivateKeyExists(PrivateKey);
        console.log(`email related to private key is ${email}`);
        if (email !== null) {
            // email is not null and private key exist in the contract
            console.log('private key verified correctly');
            res.status(200).json({ message: true });
        }
        else {
            console.log('private ket related email does not exist');
            res.status(404).json({ message: 'Private key does not exist go to signup' });
        }
    } catch (error) {
        console.error('Error decrypting private key:', error);
        // Respond with an error message
        res.status(500).json({ message: 'Error decrypting private key' });
    }
});


// updating this to pass down a CID string value which would be the initial value 
// creating the user struct creating the endpoint
app.post('/createStructUser', async (req, res) => {
    // getting the req data
    const fullName = req.body.FullName;
    const email = req.body.Email;
    const contact = req.body.Contact;
    const dob = req.body.DOB;
    const publicKey = req.body.PublicKey;
    const privateKey = req.body.PrivateKey;
    const cid = await createCid(publicKey);
    console.log(fullName, email, contact, dob, publicKey, privateKey)
    try {
        // Call the InitialStruct function
        const response = await InitialStruct(publicKey, email, fullName, contact, dob, privateKey, cid);
        // Send the response to the client based on the status and message
        res.status(response.status).json({ message: response.message });
    } catch (error) {
        console.error('Server error:', error);
        // Handle any unexpected errors and send an internal server error response
        res.status(500).json({ message: 'Internal server error.' });
    }
});



// Fetching the details on the GET request
app.get('/FetchDetails/:publicKey', async (req, res) => {
    try {
        const publicKey = req.params.publicKey;
        console.log(`public key is ${publicKey}`);

        // Calling details for functions 
        const values = await GetDetails(publicKey);
        console.log(`values that we are fetching are: ${values}`)
        if (!values.username) {
            // If values are null, send a 400 response
            console.log('values does not exist');
            res.status(400).json({ error: 'Details not found' });
            return;
        }

        // Creating an object and passing details on it and sending that object as a response 
        const doc = {
            'username': values.username,
            'email': values.email,
            'dob': values.dob,
            'contact': values.contact,
            'cid': values.cid
        };

        console.log(doc);
        res.status(200).json({ 'document': doc });
    } catch (error) {
        console.error('Error fetching details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/updateValue', async (req, res) => {
    // handling the data
    const valueType = req.body.valueType;
    const value = req.body.value;
    const publicKey = req.body.publicKey;
    const privateKey = req.body.privateKey;
    // apply a switch call for the function call that would send up some conditional function call
    switch (valueType) {
        case 'email':
            // function call from update.js
            const emailRespond = updateValueInContract('email', value, publicKey, privateKey);
            res.json(emailRespond);
            break;
        case 'fullName':
            // function call from update.js
            const nameResponsd = updateValueInContract('fullName', value, publicKey, privateKey);
            res.json(nameResponsd);
            break;
        case 'contact':
            // function call from update.js
            const contactRespond = updateValueInContract('contact', value, publicKey, privateKey);
            res.json(contactRespond)
            break;
        case 'dob':
            // function call from update.js
            const dobRespond = updateValue('dob', value, publicKey, privateKey);
            res.json(dobRespond);
            break;
    }
    // console.log(`value type is ${valueType} and value is ${value}`);
    // res.status(200).json({'message': 'Value is updated'})
});



// change this with the new one of adding the name in the access list with the function and return the new cid
// handling the connection and allowing the application and saving their details
app.post('/allowConnection', async (req, res) => {

    // Connection URL and Database Name
    const url = 'mongodb+srv://agreharshit610:i4ZnXRbFARI4kaSl@taskhandler.u5cgjfw.mongodb.net/';
    const dbName = 'ApplicationAccess';
    const collectionName = 'Access';
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    // trying to connect with the mongodb client and make it working 
    try {
        const { email, accessName } = req.body;
        console.log(`Email: ${email}, AccessName: ${accessName}`);

        // Check if the email exists in any document
        const existingDocument = await collection.findOne({ email });

        if (existingDocument) {
            // If the email exists, update the AccessList
            await collection.updateOne(
                { email },
                { $addToSet: { AccessList: accessName } }
            );
        } else {
            // If the email does not exist, create a new document
            await collection.insertOne({
                email,
                AccessList: [accessName],
                DeniedList: []
            });
        }

        console.log('Allow connection successful');
        res.status(200).json({ success: true, message: 'Allow connection successful' });
    } catch (error) {
        console.error('Error allowing connection:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});



// get the allow access list for the user using it's CID 
app.post('/GetAllowAccess', async (req, res) => {

    const { CID } = req.body;
    const AllowList = await getAllowList(CID);

    if (AllowList) {

        console.log('AccessList retrieved successfully:', AllowList);
        res.status(200).json({ success: true, allowNames: AllowList });
    } else {

        res.status(200).json({ success: true, accessList: [] });
    }

});


// // get the allow access list for the user using it's CID 
// app.post('/GetAllowAccess', async (req, res) => {
//     // Connection URL and Database Name
//     const url = 'mongodb+srv://agreharshit610:i4ZnXRbFARI4kaSl@taskhandler.u5cgjfw.mongodb.net/';
//     const dbName = 'ApplicationAccess';
//     const collectionName = 'Access';

//     const client = await MongoClient.connect(url);
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

//     try {
//         const { email } = req.body;
//         console.log(`Fetching AccessList for email: ${email}`);

//         // Check if the email exists in any document
//         const existingDocument = await collection.findOne({ email });

//         if (existingDocument) {
//             // If the email exists, retrieve the AccessList
//             const accessList = existingDocument.AccessList;
//             console.log('AccessList retrieved successfully:', accessList);
//             res.status(200).json({ success: true, allowNames: accessList });
//         } else {
//             // If the email does not exist, return an empty AccessList
//             console.log('Email not found. No AccessList available.');
//             res.status(200).json({ success: true, accessList: [] });
//         }
//     } catch (error) {
//         console.error('Error fetching AccessList:', error.message);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     } finally {
//         // Close the MongoDB client
//         client.close();
//     }
// });



app.post('/GetDenyAccess', async (req, res) => {
    const { CID } = req.body;
    const deniedList = await getDeniedList(CID);

    if (deniedList) {

        console.log('AccessList retrieved successfully:', deniedList);
        res.status(200).json({ success: true, denyNames: deniedList });
    } else {

        res.status(200).json({ success: true, accessList: [] });
    }

});


// app.post('/GetDenyAccess', async (req, res) => {
//     // Connection URL and Database Name
//     const url = 'mongodb+srv://agreharshit610:i4ZnXRbFARI4kaSl@taskhandler.u5cgjfw.mongodb.net/';
//     const dbName = 'ApplicationAccess';
//     const collectionName = 'Access';

//     const client = await MongoClient.connect(url);
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

//     try {
//         const { email } = req.body;
//         console.log(`Fetching AccessList for email: ${email}`);

//         // Check if the email exists in any document
//         const existingDocument = await collection.findOne({ email });

//         if (existingDocument) {
//             // If the email exists, retrieve the DeniedList
//             const deniedList = existingDocument.DeniedList;
//             console.log('AccessList retrieved successfully:', deniedList);
//             res.status(200).json({ success: true, denyNames: deniedList });
//         } else {
//             // If the email does not exist, return an empty AccessList
//             console.log('Email not found. No AccessList available.');
//             res.status(200).json({ success: true, accessList: [] });
//         }
//     } catch (error) {
//         console.error('Error fetching AccessList:', error.message);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     } finally {
//         // Close the MongoDB client
//         client.close();
//     }
// });



// app.post('/AddInDeny', async (req, res) => {
//     const { email, application_name } = req.body;
//     console.log(`email: ${email} and the application name is: ${application_name}`);
//     // connection part for connecting to the database
//     const url = 'mongodb+srv://agreharshit610:i4ZnXRbFARI4kaSl@taskhandler.u5cgjfw.mongodb.net/';
//     const dbName = 'ApplicationAccess';
//     const collectionName = 'Access';

//     const client = await MongoClient.connect(url);
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);


//     try {
//         // Find the document with the matching email
//         const existingDocument = await collection.findOne({ email });

//         if (existingDocument) {
//             // Update the document to remove the application_name from AccessList
//             await collection.updateOne(
//                 { email },
//                 {
//                     $pull: { AccessList: application_name },
//                     $addToSet: { DeniedList: application_name }
//                 }
//             );

//             console.log('Updated document successfully');
//             res.status(200).json({ success: true, message: 'Updated document successfully' });
//         } else {
//             // If the email does not exist, return an error
//             console.log('Email not found. Cannot update document.');
//             res.status(404).json({ success: false, message: 'Email not found. Cannot update document.' });
//         }
//     } catch (error) {
//         console.error('Error updating document:', error.message);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });



app.post('/AddInDeny', async (req, res) => {
    const { CID, publickKey, privateKey, application_name } = req.body;

    const newCid = await addInDenied(CID, application_name);
    // update the smart contract as well call the fuunction to update the cid value 
    await updateValueInContract('cid', newCid, publickKey, privateKey);
    if (newCid) {
        res.status(200).json({ success: true, newCid: newCid });
    } else {

        res.status(404).json({ success: false, newCid: CID });
    }

});


// app.post('/AddInAllow', async (req, res) => {
//     const { email, application_name } = req.body;
//     console.log(`email: ${email} and the application name is: ${application_name}`);
//     // connecting with the database 
//     const url = 'mongodb+srv://agreharshit610:i4ZnXRbFARI4kaSl@taskhandler.u5cgjfw.mongodb.net/';
//     const dbName = 'ApplicationAccess';
//     const collectionName = 'Access';

//     const client = await MongoClient.connect(url);
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);
//     try {
//         // Find the document with the matching email
//         const existingDocument = await collection.findOne({ email });

//         if (existingDocument) {
//             // Update the document to remove the application_name from DeniedList
//             await collection.updateOne(
//                 { email },
//                 {
//                     $pull: { DeniedList: application_name },
//                     $addToSet: { AccessList: application_name }
//                 }
//             );

//             console.log('Updated document successfully');
//             res.status(200).json({ success: true, message: 'Updated document successfully' });
//         } else {
//             // If the email does not exist, return an error
//             console.log('Email not found. Cannot update document.');
//             res.status(404).json({ success: false, message: 'Email not found. Cannot update document.' });
//         }
//     } catch (error) {
//         console.error('Error updating document:', error.message);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });



app.post('/AddInAllow', async (req, res) => {
    const { CID, publickKey, privateKey, application_name } = req.body;

    const newCid = await addInAccess(CID, application_name);
    await updateValueInContract('cid', newCid, publickKey, privateKey);
    if (newCid) {
        res.status(200).json({ success: true, newCid: newCid });
    } else {

        res.status(404).json({ success: false, newCid: newCid });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});