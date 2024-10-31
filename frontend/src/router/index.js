import { createRouter, createWebHistory } from 'vue-router';
import AlunosList from '../components/AlunosList.vue';
import CavalosList from '../components/CavalosList.vue';

const routes = [
  { path: '/', redirect: '/alunos' },
  { path: '/alunos', component: AlunosList },
  { path: '/cavalos', component: CavalosList }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
