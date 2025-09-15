import TvPlayView from "./TvPlayView.vue";

export default [
    {
        path: '/tv',
        name: 'tv',
        component: TvPlayView,
        meta: { requiresAuth: true }
    },
]