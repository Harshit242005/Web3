<template>
    <p>Voting Interface</p>

    <div v-if="showOwnerButton">
        <p>Welcome, Election board</p>
        <button>Announce Results</button>
    </div>

    
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
})
</script>

<style scoped></style>