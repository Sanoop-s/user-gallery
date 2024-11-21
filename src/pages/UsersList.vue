<script setup>
import { onMounted, ref } from 'vue';
import Users from '../components/users';
import { router } from '../router/routes';
import { useDate } from 'vuetify';

const items = ref(Users);
const headers = ref([]);
const date = useDate()

onMounted(() => {
    headers.value = [{
        align: 'start',
        key: 'id',
        sortable: false,
        title: 'Id',
    },
    { key: 'firstName', title: 'First name' },
    { key: 'lastName', title: 'Last name' },
    { key: 'age', title: 'Age' },
    { key: 'email', title: 'Email' },
    { key: 'phone', title: 'Phone' },
    { key: 'birthDate', title: 'DOB' },
    { key: 'action', title: 'Action' },
    ]
});

const onLogin = (item) => {
    router.push({
        name: 'Profile'
    });
    localStorage.setItem('userLoggedin', JSON.stringify(item))
}

const formatDate = (item) => {
    console.log(item)
    return date.format(item,'keyboardDate' )
}

</script>
<template>
    <div class="container">
        <div class="user-container w-75 ">
            <v-card title="Users list " class="px-2 py-2 h-100">
                <div class="h-100 pt-5 pr-5 pb-16 pl-5">
                    <v-card class="h-100 py-3 px-3 rounded-lg">
                        <v-data-table :headers="headers" :items="items" class="h-100  custom-scroll">
                            <template v-slot:item.birthDate="{ item }">
                                {{ formatDate(item.birthDate) }}
                            </template>
                            <template v-slot:item.action="{ item }">
                                <v-btn size="small" class="text-none text-white font-weight-bold bg-cyan-darken-1"
                                    style="color: #3f82df;" color="#dbedfc" @click="onLogin(item)">Login</v-btn>
                            </template>
                        </v-data-table>
                    </v-card>
                </div>
            </v-card>
        </div>
    </div>
</template>

<style scoped>
.container {
    margin: 0;
    display: flex;
    place-items: center;
    min-height: 100vh;
    background-color: #d3d3d3;
}

.user-container {
    margin: 0 auto;
    height: 90vh;
}

.v-table {
    height: 100%;
}
</style>