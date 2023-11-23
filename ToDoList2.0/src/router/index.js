import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import TasksPage from '@/views/TasksPage.vue';
import UsertasksSummary from '@/views/UsertasksSummary.vue';
import store from '@/store/index.js';
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/tasks',
    name: 'TasksPage',
    component: TasksPage,
    // This meta field means the route requires authentication.
    meta: { requiresAuth: true }
  },
  {
    path: '/summary',
    name: 'TasksSummary',
    component: UsertasksSummary,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation Guard: To make sure user is redirected to Login if not authenticated
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.currentUser) {
    next('/');
  } else {
    next();
  }
});

export default router;
