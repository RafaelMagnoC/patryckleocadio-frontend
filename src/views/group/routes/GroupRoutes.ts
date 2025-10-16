
export default [
  {
    path: 'grupos',
    name: 'groups',
    component: () => import('@/views/group/pages/GroupsView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: 'grupo/criacao',
    name: 'group-create',
    component: () => import('@/views/category/pages/CategoryCreateView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: 'grupo/:id',
    name: 'group-id',
    component: () => import('@/views/category/pages/CategoryView.vue'),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: 'grupo/:nome',
    name: 'group-name',
    component: () => import('@/views/category/pages/CategoryView.vue'),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: 'grupo/edicao:id/',
    name: 'group-update',
    component: () => import('@/views/category/pages/CategoryUpdateView.vue'),
    meta: { requiresAuth: true },
    props: true,
  },
];
