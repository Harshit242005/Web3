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
const props = defineProps(['username', 'email', 'dob', 'contact']);
const doc = {
    'username': props.username,
    'email': props.email,
    'dob': props.dob,
    'contact': props.contact,
    'password': '' // Add the 'password' key here
  } 
username.value = props.username;
console.log(username.value);

// define the function for the buttons 
const open_dialog = (name: string) => {
  console.log(name);
  selected_auth.value = name;
  show_dialog.value = true;

  
}

const close_dialog = () => {
  show_dialog.value = false;
}

const auth_user = async () => {
  console.log(password_input.value);
  doc.password = password_input.value;

  try {
    // Send the 'doc' object using Axios POST method
    const response = await axios.post(`http://localhost:3002/${selected_auth.value}`, {
      doc
    });

    // Handle the response
    console.log('Response:', response.data);
    // You can perform further actions based on the response
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

.ask_for_password
{
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

.password_input
{
  width: 350px;
  height: 75px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  padding-left: 10px;

}

.password_input:focus
{
  outline: none;
}

.password_button
{
  width: 250px;
  height: 50px;
  border-radius: 5px;
  text-align: center;
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.25);
}
</style>