import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/login/LoginView.vue'
import store from '@/store'

import dashboard from '@/views/dashboard/dashboard.routers'
import media from '@/views/media/media.routers'
import user from '@/views/user/user.routers'
import player from '@/views/player/player.router'
import tv from '@/views/tv/tv.router'
import Category from '@/views/category/routes/CategoryRoutes'
import Group from '@/views/group/routes/GroupRoutes'
import Tag from '@/views/tag/routes/TagRoutes'

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
      children: [
        { path: '', redirect: 'home/dashboard' },
        ...dashboard,
        ...media,
        ...user,
        ...player,
        ...Category,
        ...Group,
        ...Tag
      ],
    },
    ...tv,
  ],
})

export default router
