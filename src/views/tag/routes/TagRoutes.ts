
export default [
  {
    path: 'tags',
    name: 'tags',
    component: () => import('@/views/tag/pages/TagsView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: 'tag/criacao',
    name: 'tag-create',
    component: () => import('@/views/tag/pages/TagCreateView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: 'tag/edicao/:id',
    name: 'tag-update',
    component: () => import('@/views/tag/pages/TagUpdateView.vue'),
    meta: { requiresAuth: true },
    props: true,
  },
];
