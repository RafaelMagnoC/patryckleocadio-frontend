// src/router/routes/midia.routes.ts
export default [
  {
    path: 'midia/nova',
    name: 'midia-create',
    component: () => import('@/views/media/commands/create/MediaCreateView.vue'),
  },
  {
    path: 'midia/details',
    name: 'midia-details',
    component: () => import('@/views/media/queries/details/MediaDetailsView.vue'),
  },
  {
    path: 'midia/update',
    name: 'midia-update',
    component: () => import('@/views/media/commands/update/MediaUpdateView.vue'),
  },
  {
    path: 'midia',
    name: 'midia-list',
    component: () => import('@/views/media/queries/list/MediaListView.vue'),
  },
]
