import { createRouter, createWebHashHistory } from 'vue-router';
import UsersList from '../pages/UsersList.vue';
import Layout from '../components/layout.vue';
import Profile from '../pages/Profile.vue';
import Gallery from '../pages/Gallery.vue';

const routes = [
    { path: '/', component: UsersList, name: 'users' },
    {
        path: '/',
        component: Layout,
        children: [
            { path: '/profile', component: Profile, name: 'Profile' },
            { path: '/gallery', component: Gallery, name: 'Gallery' }

        ]
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
});

