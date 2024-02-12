// defining the router for the application
// src/router/index.js
import { createRouter, createWebHistory, RouteRecordRaw  } from 'vue-router';

import Interface from './components/Interface.vue'

const routes: Array<RouteRecordRaw> = [
  
  {
    path: '/Interface',
    name: 'Interface',
    component: Interface,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
