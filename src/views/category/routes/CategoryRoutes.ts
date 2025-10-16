
export default [
  {
    path: 'categorias',
    name: 'categories',
    component: () => import('@/views/category/pages/CategoriesView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: 'categoria/criacao',
    name: 'category-create',
    component: () => import('@/views/category/pages/CategoryCreateView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: 'categoria/:id',
    name: 'category-id',
    component: () => import('@/views/category/pages/CategoryView.vue'),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: 'categoria/:nome',
    name: 'category-name',
    component: () => import('@/views/category/pages/CategoryView.vue'),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: 'categoria/edicao/:id',
    name: 'category-update',
    component: () => import('@/views/category/pages/CategoryUpdateView.vue'),
    meta: { requiresAuth: true },
    props: true,
  },
];
