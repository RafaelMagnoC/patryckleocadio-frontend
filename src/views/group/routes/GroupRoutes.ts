
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
    component: () => import('@/views/group/pages/GroupCreateView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: 'grupo/edicao:id/',
    name: 'group-update',
    component: () => import('@/views/group/pages/GroupUpdateView.vue'),
    meta: { requiresAuth: true },
    props: true,
  },
];
