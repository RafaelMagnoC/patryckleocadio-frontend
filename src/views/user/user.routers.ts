// src/router/routes/user.routes.ts
export default [
  {
    path: 'usuario/criacao',
    name: 'user-create',
    component: () => import('@/views/user/commands/create/UserCreateView.vue'),
  },
  {
    path: 'usuario/edicao/:id',
    name: 'user-update',
    component: () => import('@/views/user/commands/update/UserUpdateView.vue'),
  },
  {
    path: 'usuario/detalhes/:id',
    name: 'user-details',
    component: () => import('@/views/user/queries/details/UserDetailsView.vue'),
  },
  {
    path: 'usuarios',
    name: 'user-list',
    component: () => import('@/views/user/queries/list/UserListView.vue'),
  }
]
