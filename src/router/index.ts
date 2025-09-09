import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/login/LoginView.vue'
import store from '@/store'

import dashboard from '@/views/dashboard/dashboard.routers'
import media from '@/views/media/media.routers'
import user from '@/views/user/user.routers'

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
      component: () => import('@/views/home/HomeView.vue'),
      beforeEnter: (to, from, next) => {
        const isLoggedIn = store.getters['auth/isLoggedIn']
        if (!isLoggedIn) {
          next('/')
        } else {
          next()
        }
      },
<<<<<<< HEAD
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
        },{
          path: 'player',
          name: 'player',
          component: () => import('@/views/player/PlayerView.vue'),
        }
      ],
=======
      children: [{ path: '', redirect: 'home/dashboard' }, ...dashboard, ...media, ...user],
>>>>>>> 1f4f8ad448dedaaf8d39b609ce1eb8b498f018de
    },
  ],
})

export default router
