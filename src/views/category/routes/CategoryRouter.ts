
export default [
  {
    path: 'categories',
    name: 'categories',
    component: () => import('@/views/category/pages/CategoriesView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: 'category/create',
    name: 'category-create',
    component: () => import('@/views/category/pages/CategoryCreateView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: 'category/:id',
    name: 'category-id',
    component: () => import('@/views/category/pages/CategoryView.vue'),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: 'category/:name',
    name: 'category-name',
    component: () => import('@/views/category/pages/CategoryView.vue'),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: 'categories/:id/update',
    name: 'category-update',
    component: () => import('@/views/category/pages/CategoryUpdateView.vue'),
    meta: { requiresAuth: true },
    props: true,
  },
];
