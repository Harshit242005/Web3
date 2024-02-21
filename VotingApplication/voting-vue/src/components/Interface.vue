<template>
  <div>
    <h1>{{ username }}</h1>
    <button @click="open_dialog('Signup')" class="authButtons">Signup</button>
    <button @click="open_dialog('Login')" class="authButtons">Login</button>
  </div>

  <div v-if="show_dialog" class="ask_for_password">
    <p style="font-size: 20px; font-weight: 600;">Type password for {{ selected_auth }}</p>
    <input v-model="password_input" class="password_input" type="password" placeholder="Password">
    <button @click="auth_user" class="password_button">{{ selected_auth }}</button>
    <button class="password_button" @click="close_dialog">Close</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const show_dialog = ref(false);
const username = ref('');
const password_input = ref('');
const selected_auth = ref('');

import axios from 'axios';
import router from '../router';

const props = defineProps(['username', 'email', 'dob', 'contact']);

const privateKey = localStorage.getItem('selectedPrivateKey');
const publicKey = localStorage.getItem('selectedAccount');

const doc = {
  'username': props.username,
  'email': props.email,
  'dob': props.dob,
  'contact': props.contact,
  'password': '',
  'privatekey': privateKey,
  'publickey': publicKey

}
username.value = props.username;
console.log(username.value);

// define the function for the buttons 
const open_dialog = async (name: string) => {
  console.log(name);
  selected_auth.value = name;

  if (name == 'Login') {
    show_dialog.value = true;
    
  }

  // this should be sending the axios post request witht he data for the initial signup
  // and in that we would be showing further showup
  const response = await axios.post(`http://localhost:3002/${selected_auth.value}/InitialSignup`, {
    doc
  });

  if (response.status == 200) {
    show_dialog.value = true;
  }
  else {
    console.log('not been able to complete the initial signup');
  }


}

const close_dialog = () => {
  show_dialog.value = false;
}

const auth_user = async () => {
  console.log(password_input.value);
  doc.password = password_input.value;

  try {

    if (selected_auth.value == 'Login') {
      const response = await axios.post(`http://localhost:3002/${selected_auth.value}`, {
      doc
    });

    if (response.status == 200) {
      router.push({
        name: 'VotingInterface', params: {
          'username': props.username,
          'email': props.email,
          'dob': props.dob,
          'contact': props.contact,
          'password': password_input.value
        }
      })
    }
    }
    // Send the 'doc' object using Axios POST method
    const response = await axios.post(`http://localhost:3002/${selected_auth.value}/FinalSignup`, {
      doc
    });

    // Handle the response
    console.log('Response:', response.data);
    if (response.status === 200) {
      // push to some other page 
      router.push({
        name: 'VotingInterface', params: {
          'username': props.username,
          'email': props.email,
          'dob': props.dob,
          'contact': props.contact,
          'password': password_input.value
        }
      })
    }

  } catch (error) {
    console.error('Error:', error);
    // Handle the error if the request fails
  }

}


</script>
<style scoped>
.authButtons {
  width: 200px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  background-color: transparent;
  color: black;
  transition: 0.5s;
}

.authButtons:hover {
  background-color: black;
  color: white;
}

.ask_for_password {
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid rgba(0, 0, 0, 0.5);
  background-color: white;
  text-align: center;
  width: 400px;
  height: fit-content;
  border-radius: 10px;
  position: relative;
  gap: 10px;
  top: -50px;
  padding: 25px;
}

.password_input {
  width: 350px;
  height: 75px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  padding-left: 10px;

}

.password_input:focus {
  outline: none;
}

.password_button {
  width: 250px;
  height: 50px;
  border-radius: 5px;
  text-align: center;
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.25);
}
</style>