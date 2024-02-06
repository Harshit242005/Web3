<script setup lang="ts">
</script>

<script>
export default {
  methods: {
    async ConnectMetamask() {
      // Check if MetaMask is installed
      if (window.ethereum) {
        try {
          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          console.log('Connected to MetaMask!');
          
          // Now you can use window.ethereum for further interactions
          // For example, you can get the selected account:
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          const selectedAccount = accounts[0];
          console.log('Selected account:', selectedAccount);
          
          // You can perform other Ethereum-related operations here
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      } else {
        console.error('MetaMask is not installed. Please install MetaMask to use this feature.');
      }
    }
  }
}
</script>

<template>
  <button @click="ConnectMetamask()">Connect to MetaMask</button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
