// defining the router for the application
// src/router/index.js
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import VotingInterface from './components/VottingInterface.vue';
import Interface from './components/Interface.vue'
import Landing from './Landing.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
    props: true
  },
  {
    path: '/Interface/:username/:email/:dob/:contact',
    name: 'Interface',
    component: Interface,
    props: true
  },
  {
    path: '/VotingInterface/:username/:email/:dob/:contact/:password',
    name: 'VotingInterface',
    component: VotingInterface,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
