import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '../components/layout.vue';


const routes = [
    {
        path: '/',
        name: 'users',
        component: () => import('../pages/UsersList.vue')
    },
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '/profile',
                name: 'Profile',
                component: () => import('../pages/Profile.vue'),
            },
            {
                path: '/gallery',
                name: 'Gallery',
                component: () => import('../pages/Gallery.vue'),
            }
        ]
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
});

