// src/router/routes/user.routes.ts
export default [
  {
    path: 'user/create',
    name: 'user-create',
    component: () => import('@/views/user/commands/create/UserCreateView.vue'),
  },
  {
    path: 'user/update',
    name: 'user-update',
    component: () => import('@/views/user/commands/update/UserUpdateView.vue'),
  },
  {
    path: 'user/details',
    name: 'user-details',
    component: () => import('@/views/user/queries/details/UserDetailsView.vue'),
  },
  {
    path: 'user',
    name: 'user-list',
    component: () => import('@/views/user/queries/list/UserListView.vue'),
  }
]
