// src/main.ts
import { createApp } from 'vue';
import App from './App.vue'; // Correct import statement
import router from './router';
import './style.css';
const app = createApp(App);  
app.use(router);
app.mount('#app');
