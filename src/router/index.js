import { createRouter, createWebHistory } from 'vue-router';
// import TestTools from '../components/TestTools.vue';
import MainView from '../components/MainView.vue';
import MainPanel from '../components/MainPanel.vue';
import GPTPanel from '@/components/GPTPanel.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainView
  },
  {
    path: '/sceneclassify',
    name: 'Scenary Picture Classification',
    component: MainPanel
  },
  {
    path: '/gpt',
    name: 'GPT',
    component: GPTPanel
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
