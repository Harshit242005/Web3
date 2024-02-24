<template>
  <p>Voting Interface</p>

  <div v-if="activate_results">
    <p>Results are now announced</p>
    <button @click="hide_result_announcement">Close</button>
  </div>

  <div v-if="showOwnerButton">
    <p>Welcome, Election board</p>
    <button @click="activate_result" :disabled="result_button">Announce Results</button>
  </div>

  <div v-if="vote_dialog_party">
    <div>
      <button @click="SelectParty('AAP')">AAP</button>
      <button @click="SelectParty('BJP')">BJP</button>
      <button @click="SelectParty('CONGRESS')">CONGRESS</button>
    </div>

    <div>
      <button @click="VoteNow">Vote</button>
      <button @click="hide_vote_dialog">Close</button>
    </div>
  </div>

  <div v-if="result_dialog">

    <p>{{ result_data }}</p>
    <button @click="close_result_dialog">Close</button>
  </div>

  <div v-if="vote_dialog">
    <button @click="vote" :disabled="already_voted">Vote now</button>
    <button @click="showResults" :disabled="!result_button">See Results</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
const props = defineProps(['username', 'email', 'dob', 'contact']);
// getting the detials [ publickey and privatekey ]
const publickey = localStorage.getItem('selectedAccount');
const privatekey = localStorage.getItem('selectedPrivateKey');
console.log(`public key is: ${publickey} and private key is: ${privatekey}`);
const showOwnerButton = ref(false);
const owner_check_doc = {
  'publickey': publickey,
  'privatekey': privatekey
}
// for the voting result to 
const result_button = ref(false);
const activate_results = ref(false);
const result_data = ref('');
const already_voted = ref(false);
const vote_dialog = ref(true);
const result_dialog = ref(false);
const selectedParty = ref('');
const vote_dialog_party = ref(false);
onMounted(async () => {
  console.log('checking for query using the onMounted function call');

  try {
    console.log(`public key using for the owner check is: ${publickey}`);
    //https://71c9-2401-4900-1c1a-1855-6430-f50a-15e7-ca0b.ngrok-free.app
    const response = await axios.get(`http://localhost:3003/OwnerCheck/${publickey}`);
    console.log(response.data);
    if (response.data.owner) {
      showOwnerButton.value = true;
      vote_dialog.value = false;
    }
    if (response.data.owner == 400) {
      showOwnerButton.value = false;
      vote_dialog.value = true;
    }
  }
  catch (error) {
    console.error(`Error checking for the owner status`);
  }





  // check the results status [ this is a post and might not get called from the onMounted for now ]
  await axios.get('http://localhost:3003/CheckResults')
    .then(response => {
      console.log(response.data);
      if (response.data.success) {
        result_button.value = true;
        console.log(response.data.result_message);
        
        result_data.value = response.data.result_message;
      }
    })
    .catch(error => {
      console.error(`Error fetchinf data: ${error}`);
    });


  // check if the user has already voted or not 
  try {
    const response = await axios.get(`http://localhost:3003/AlreadyVoted/${publickey}`)
    if (response.status === 200) {
      if (response.data.has_voted) {
        already_voted.value = true;
      }
    }
  }
  catch (error) {
    console.error('Some error occured while checking if the user has already voted or not', error);
  }


});

const activate_result = async () => {
  try {
    const response = await axios.post("http://localhost:3003/Activate_result", {
      'publickey': publickey
    });


    if (response.data.result_announced) {
      activate_results.value = true;
    }
  }
  catch (error) {
    console.error(`Not been able to activate result: ${error}`);
  }
}

const hide_result_announcement = () => {
  activate_results.value = false;
}

const vote = () => {
  // showing the dialog to be appear to the user 
  vote_dialog_party.value = true;
}

const VoteNow = async () => {

  interface VoteDoc {
    publickey: string | null;
    privatekey: string | null;
    selected_party?: string;
    username?: string;
    email?: string;
    dob?: string;
    contact?: string;
  }

  const vote_doc: VoteDoc = { ...owner_check_doc };
  // getting the user data from the params
  

  vote_doc.username = props.username;
  vote_doc.email = props.email;
  vote_doc.dob = props.dob;
  vote_doc.contact = props.contact;

  vote_doc.selected_party = selectedParty.value;
  console.log(vote_doc);
  try {
    const response = await axios.post('http://localhost:3003/Vote', {
      doc: vote_doc
    });

    if (response.data.success) {
      vote_dialog.value = false
      console.log(response.data.transactionHash);
    }
  }
  catch (error) {
    console.error(`Error voting to party: ${error}`);
  }

}

const hide_vote_dialog = () => {
  vote_dialog_party.value = false
}


const showResults = async () => {
  // show the result dialog 
  result_dialog.value = true;
  // try {
  //   const response = await axios.get('http://localhost:3002/GetResult');
  //   if (response.status == 200) {
  //     result_data.value = response.data.result_data;
      
  //   }
  // }
  // catch (error) {
  //   console.error(`Error fetching the election results; ${error}`)
  // }

}

const close_result_dialog = () => {
  result_dialog.value = false;
}

const SelectParty = (partyName: string) => {
  selectedParty.value = partyName
}

</script>

<style scoped></style>