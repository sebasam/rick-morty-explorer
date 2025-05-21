import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CharacterDetail from '../views/CharacterDetail.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/character/:id', name: 'Detail', component: CharacterDetail, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;