// src/router/routes/dashboard.routes.ts
export default [
  {
    path: '',
    redirect: 'dashboard',
  },
  {
    path: 'dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/DashboardView.vue'),
  },
]
