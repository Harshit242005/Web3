<template>
    <div>
        <!-- Input and button section -->
        <input class="emailInput" type="email" v-model="email" placeholder="Type email..." /><br />
        <button @click="connectIdentity">Connect with identity</button>

        <!-- Popup dialog for success -->
        <div v-if="showSuccessPopup" class="successPopup">
            <!-- Your success message or content goes here -->
            <!-- here i need to add a cross icon that would close/hide this -->
            <span class="closeIcon" @click="closeSuccessPopup">&#10006;</span>
            <div class="successConnectedMessage">
                Success! Identity connected.
            </div>
            <div>
                <button @click="openAccountModal">Connect with metamask</button>
            </div>
        </div>





        <!-- Account modal -->
        <div v-if="showAccountModal" class="accountModal">
            <h2>Select an account</h2>
            <div class="accounts-Options">
                <!-- Display all accounts with radio buttons -->
                <label v-for="account in accounts" :key="account" class="accountOption">
                    <input type="radio" v-model="selectedAccount" :value="account" />
                    {{ account }}
                </label>
            </div>

            <button @click="connectWithSelectedAccount">Connect</button>
            <button @click="closeAccountModal">Cancel</button>
        </div>

        <!-- another div for showing the private key for the input box and when we pass that in the input box
        and approve it it would send them both private and public key for check -->
        <!-- Div with input box and check button -->
        <div v-if="showPrivateKeyInput" class="privateKeyInputContainer">
            <span class="closeIcon" @click="closePrivatePopup">&#10006;</span>
            <!-- Display server response -->
            <div v-if="serverResponse" class="serverResponse">
                {{ serverResponse }}
            </div>
            <input v-model="privateKey" placeholder="Enter Private Key" />
            <button @click="checkPrivateKey">Check</button>
        </div>

        <div v-if="allowConnection" class="IdentityTransfer">
            <button @click="AllowConnection()">Allow</button>
            <button @click="HideAllowConnection()">Close</button>
        </div>



    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import router from './router';
// State variables
const email = ref('');

const showSuccessPopup = ref(false);
const showAccountModal = ref(false);
const accounts = ref([]); // Array to store MetaMask accounts
const selectedAccount = ref('');


const showPrivateKeyInput = ref(false);
const privateKey = ref('');

const serverResponse = ref('');

const allowConnection = ref(false);



// Function to connect identity
const connectIdentity = async () => {
    // we would check the item from the localstorage directly and check if that exist in localstorage or not
    // and navigate the user directly to the landing / voting page
    console.log(`Sending email is: ${email}`);
    // try to get the public accont as well on condition 

    const response = await axios.post('http://localhost:3001/checkEmail', {
        data: email.value,
    });

    console.log(`Email status in the check email for the identity verification is: ${response.data.response_boolean_value}`);

    if (response.data.response_boolean_value) {
        selectedAccount.value = '';
        privateKey.value == '';
        // Set the variable to show the success popup
        showSuccessPopup.value = true;
        console.log('email exist in the connection');


    }
}


// we have to make an function for this to check if the application name exist in the access list
const checkAccess = async () => {
    console.log(`checking for the email is: ${email.value}`);
    const response = await axios.post('http://localhost:3001/GetAllowAccess', {
        email: email.value
    });


    console.log(response);
    if (response.status === 200) {
        const accessList = response.data.allowNames;
        console.log(`Getting the access names list is: ${accessList}`);

        if (accessList.includes("Voting Application")) {
            return true;
        }
        else {
            return false;
        }
    }
}

// Function to open the account modal
const openAccountModal = () => {
    // hide the older window before it 
    showSuccessPopup.value = false;
    // Check if MetaMask is installed and available
    if (window.ethereum) {
        // Request access to accounts
        window.ethereum.request({ method: 'eth_requestAccounts' })
            .then((accs: never[]) => {
                accounts.value = accs;
                showAccountModal.value = true;
            })
            .catch((error: { message: any; }) => {
                console.error('Error connecting with MetaMask:', error.message);
            });
    } else {
        console.error('MetaMask is not installed or not available.');
    }
};

// Function to connect with the selected account
const connectWithSelectedAccount = () => {
    if (selectedAccount.value) {
        console.log(`Account choosen is: ${selectedAccount.value}`)
        // Save selected account to local storage
        localStorage.setItem('selectedAccount', selectedAccount.value);

        // You can perform additional actions with the selected account if needed
        console.log(`Connected with MetaMask. Selected account: ${selectedAccount.value}`);
        // hide the private key input value
        showAccountModal.value = false;
        // Update ref variable to show the private key input div
        showPrivateKeyInput.value = true;
    }
};

// Function to close the account modal
const closeAccountModal = () => {
    showAccountModal.value = false;
};

// hiding the div by clicking on the close button
// Function to close the success popup
const closeSuccessPopup = () => {
    showSuccessPopup.value = false;
};


const checkPrivateKey = async () => {
    // Your server endpoint URL
    const serverEndpoint = 'http://localhost:3001/check';

    console.log(`private key value is: ${privateKey.value} for the selected account: ${localStorage.getItem('selectedAccount')}`);
    try {

        // Make Axios POST request with the private key and selected account
        const response = await axios.post(serverEndpoint, {
            PrivateKey: privateKey.value,
            // selectedAccount: localStorage.getItem('selectedAccount'),
        });

        if (response.status === 200) {
            // hidel the old dialogs 
            showPrivateKeyInput.value = false;
            allowConnection.value = true;
            console.log('keys matched');
            // setting up the private key
            localStorage.setItem('selectedPrivateKey', privateKey.value);
        }
        else {
            console.log('Keys does not match');
        }
    } catch (error) {
        console.error('Error checking private key:');
        serverResponse.value = 'An error occurred while checking the private key.';
    }
};
// hide the private key popup
const closePrivatePopup = () => {
    showPrivateKeyInput.value = false;
}
// do not allow connection adn hide the dialog
const HideAllowConnection = () => {
    allowConnection.value = false;
}

const AllowConnection = async () => {
    // we would be sending the email and appplication name directly Make a request to your server to update the MongoDB collection
    const serverEndpoint = 'http://localhost:3001/allowConnection';

    const selectedEmail = email.value; // Assuming you have the email stored in the ref variable
    console.log(`the email for allow connection is: ${selectedEmail}`);


    const response = await axios.post(serverEndpoint, {
        email: selectedEmail,
        accessName: 'Voting Application', // Add the name you want to store in the accessList
    });
    if (response.status === 200) {
        console.log('voting application is added in the allow access list')

        // we have to check for the allow access if the voting application [ name of app ] exist in the database for allow connection or not 
        const isExist = await checkAccess();
        if (isExist) {
            console.log('voting application exist in the access list');



            // get the data from this side and run the axios get request here after the checking for the allow button
            const response = await axios.get(`http://localhost:3001/FetchDetails/${selectedAccount.value}`);

            console.log(`username data is: ${response.data.document.username}`);

            if (response.status == 200) {

                // this should wait until we type the private key in the input box
                router.push({
                    name: 'Interface',
                    params: {
                        username: response.data.document.username,
                        email: response.data.document.email,
                        dob: response.data.document.dob,
                        contact: response.data.document.contact
                    }
                });
            }



            else {
                console.log(response.data.message);
            }
        }
    }
    allowConnection.value = false;
}
</script>




<style scoped>
/* Styles for this component */
.emailInput {
    width: 400px;
    height: 50px;
    border: 1px solid rgba(0, 0, 0, 0.35);
    border-radius: 5px;
    margin-bottom: 50px;
    padding-left: 10px;
}

.emailInput:focus {
    outline: none;
}

.emailInput::placeholder {
    font-weight: 600;
    padding-left: 10px;
}

.successPopup {
    /* Styles for success popup */
    background-color: #ffffff;
    color: white;
    padding: 10px;
    z-index: 999;
    border: none;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    gap: 25px;
    top: -150px;
    height: 200px;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
}

.successConnectedMessage {
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    text-align: center;
    background-color: transparent;
    color: rgb(0, 0, 0);
    font-size: 16px;
    font-weight: 600px;
    box-shadow: 0px 0px 5px 0px rgb(121, 255, 121);
    padding: 10px;
    margin-top: 25px;
}

.errorContainer {
    /* Styles for error message container */
    color: #ff0000;
    margin-top: 10px;
}

.accountModal {
    position: fixed;
    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    color: black;
    padding: 20px;
    border: 1px solid #ccc;
}

.accountOption {
    margin-bottom: 10px;
}

.closeIcon {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    color: black;
    cursor: pointer;
}

.accounts-Options {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.TypeAccount {
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.25);
    width: 400px;
    height: 200px;
    border-radius: 5px;
}

.TypeAccount input {
    width: 400px;
    height: 60px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}
</style>