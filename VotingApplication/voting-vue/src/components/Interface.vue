<template>
  <div>
    <h1>{{ username }}</h1>
    
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const username = ref('');
const props = defineProps(['username', 'email', 'dob', 'contact']);
username.value = props.username;
console.log(username);



</script>
