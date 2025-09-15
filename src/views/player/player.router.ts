

export default [
    {
        path: 'player/:tvId?',
        name: 'player',
        component: () => import('@/views/player/PlayerView.vue'),
        props: true
    },
]