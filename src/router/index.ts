import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/login/LoginView.vue'
import store from '@/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/home',
      component: () => import('@/views/dashboard/DashboardView.vue'),
      beforeEnter: (to, from, next) => {
        const isLoggedIn = store.getters['auth/isLoggedIn']
        if (!isLoggedIn) {
          next('/')
        } else {
          next()
        }
      },
      children: [
        {
          path: 'midia',
          name: 'midia-list',
          component: () => import('@/views/media/queries/list/MediaListView.vue'),
        },
        {
          path: 'midia/nova',
          name: 'midia-create',
          component: () => import('@/views/media/commands/create/MediaCreateView.vue'),
        },
        {
          path: 'user',
          name: 'user-create',
          component: () => import('@/views/user/commands/create/UserCreateView.vue'),
        }
      ],
    },
  ],
})

export default router
