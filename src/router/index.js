import {
  createRouter,
  createWebHistory,
} from 'vue-router';

const routes = [
  { path: '/', name: 'Home', component: () => import('../pages/Home.vue') },
  { path: '/services', name: 'Services', component: () => import('../pages/Services.vue') },
  { path: '/portfolio', name: 'Portfolio', component: () => import('../pages/Portfolio.vue') },
  { path: '/prices', name: 'Prices', component: () => import('../pages/Prices.vue') },  
  { path: '/contacts', name: 'Contacts', component: () => import('../pages/Contacts.vue') },
  { path: '/about', name: 'About', component: () => import('../pages/About.vue') },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../pages/NotFound.vue') }
]

const router = createRouter({
  history: createWebHistory('/legion-tomsk/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
})

export default router 