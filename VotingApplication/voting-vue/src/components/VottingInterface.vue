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

  <div v-if="vote_dialog">
   
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

  <button @click="vote" :disabled="already_voted">Vote now</button>
  <button @click="showResults" :disabled="!result_button">See Results</button>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
// getting the detials [ publickey and privatekey ]
const publickey = localStorage.getItem('selectedAccount');
const privatekey = localStorage.getItem('selectedPrivateKey');
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
const vote_dialog = ref(false);
const result_dialog = ref(false);
const selectedParty = ref('');

onMounted(() => {
  axios.post('https://localhost:3002/OwnerCheck', {
    'doc': owner_check_doc
  })
    .then(response => {

      console.log(response.data);
      if (response.data.success) {
        showOwnerButton.value = true;
      }

    })
    .catch(error => {
      // Handle errors
      console.error('Error fetching data:', error);
    });

  // check the results status
  axios.post('http://localhost:3002/CheckResults', {
    'doc': owner_check_doc
  })
    .then(response => {
      console.log(response.data);
      if (response.data.success) {
        result_button.value = true;
      }
    })
    .catch(error => {
      console.error(`Error fetchinf data: ${error}`);
    });


    // check if the user has already voted or not 
    axios.post('http://localhost:3002/AlreadyVoted', {
      'publickey': publickey
    })
    .then(response => {
      if (response.status === 200) {
        if (response.data.already_voted){
          already_voted.value = true;
        }
      }
    })
    .catch(error => {
      console.error(`Error while checking if the user has alrady voted or not: ${error}`);
    });
});

const activate_result = async () => {
  try {
    const response = await axios.post("http://localhost:3002/Activate_result", {
      'doc': owner_check_doc
    });

    if (response.data.success) {
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
  vote_dialog.value = true

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
  const props = defineProps(['username', 'email', 'dob', 'contact']);
  
  vote_doc.username = props.username;
  vote_doc.email = props.email;
  vote_doc.dob = props.dob;
  vote_doc.contact = props.contact;

  vote_doc.selected_party = selectedParty.value;
  try {
    const response = await axios.post('http://localhost:3002/Vote', {
      'doc': vote_doc
    });

    if (response.data.success) {
      vote_dialog.value = false
    }
  }
  catch (error) {
    console.error(`Error voting to party: ${error}`);
  }

}

const hide_vote_dialog = () => {
  vote_dialog.value = false
}


const showResults = async () => {
  try {
    const response = await axios.get('http://localhost:3002/GetResult');
    if (response.status == 200) {
      result_data.value = response.data.result_data;
      result_dialog.value = true;
    }
  }
  catch (error) {
    console.error(`Error fetching the election results; ${error}`)
  }
  
}

const close_result_dialog = () => {
  result_dialog.value = false;
}

const SelectParty = (partyName: string) => {
  selectedParty.value = partyName
}

</script>

<style scoped></style>