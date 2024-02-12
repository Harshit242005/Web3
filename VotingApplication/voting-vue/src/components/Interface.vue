<template>

</template>

<script setup lang="ts">
import {onMounted} from 'vue';
const props = defineProps(['document']);

// Use publicKey in your component logic
onMounted(() => {
  console.log('Received document:', props.document);
});
</script>