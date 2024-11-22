<script setup>
import { ref } from 'vue';
import { router } from '../router/routes';
import { useTheme } from 'vuetify'
import { VCard, VIcon, VSwitch } from 'vuetify/components';

const drawer = ref(true)
const theme = useTheme()

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

let userData = JSON.parse(localStorage.getItem('userLoggedin'));

const menuItems = ref([
    { title: 'Profile', path: '/profile', icon: 'mdi-home' },
    { title: 'Gallery', path: '/gallery', icon: 'mdi-image' },
])

const onRoute = (item) => {
    router.push({
        name: item.title
    })
}

const onLogout = () => {
    router.push({
        name: 'users'
    })
}

</script>

<template>

    <v-app>
        <div class="container">
            <v-layout class="h-screen">
                <v-navigation-drawer class="pa-3 " v-model="drawer" :permanent="$vuetify.display.lgAndUp">
                    <span class="rounded  text-white font-weight-bold w-66 d-flex justify-center align-center "
                        style="height: 43px;">
                        <img src="../assets/logo.svg" />
                    </span>

                    <v-list class="d-block  py-10 ">
                        <v-list-item class="rounded d-flex align-center font-weight-medium text-subtitle-2"
                            v-for="item in menuItems" :key="item.title" @click="onRoute(item)"
                            :class="{ 'v-list-item--active ': item.path === $route.path }">
                            <v-icon class="icon mr-2">{{ item.icon }}</v-icon>
                            <span>{{ item.title }}</span>
                        </v-list-item>
                    </v-list>
                </v-navigation-drawer>
                <v-app-bar class="px-5 ">
                    <template v-if="$vuetify.display.mdAndDown">
                        <v-btn icon @click="drawer = !drawer" class="mr-3">
                            <v-icon>mdi-menu</v-icon>
                        </v-btn>
                    </template>
                    <v-spacer></v-spacer>
                    <VCard class="mr-3">
                        <VIcon icon="mdi-theme-light-dark" @click="toggleTheme" />
                    </VCard>
                    <v-card class="mr-3">
                        <v-img :src="userData.image" :width="50" />
                    </v-card>
                    <p class="mr-3">{{ userData.firstName }} {{ userData.lastName }}</p>
                    <v-icon icon="mdi-logout" size="large" @click="onLogout"></v-icon>
                </v-app-bar>
                <v-main class=" overflow-x-auto ">
                    <router-view class="ma-10 "></router-view>
                </v-main>
            </v-layout>
        </div>
    </v-app>
</template>
<style scoped>
.v-list-item__overlay {
    background-color: white !important;
}

.v-list-item__overlay {
    background-color: white !important;

}

.v-list-item:hover {
    cursor: pointer;
}

.v-list-item--active {
    background-color: #f0f1f2 !important;
    color: #000;
    font-weight: bold;
    border-left: 3px solid #00acc1;
}

.v-list-item--active span,
.v-list-item--active .icon {
    color: #00acc1;

}
</style>