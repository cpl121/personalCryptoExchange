import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
  },

  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue'),
  },
  {
    path: '/coin/:id',
    name: 'coin-detail',
    component: () => import('@/views/CoinDetail.vue'),
  },

  {
    path: '/:catchAll(.*)',
    name: 'error',
    component: () => import('@/views/Error.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
