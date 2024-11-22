<script setup>
import { computed } from 'vue';
import { useDate } from 'vuetify';

let userData = JSON.parse(localStorage.getItem('userLoggedin'));
const date = useDate();

const address = computed(() => {
    return `${userData.Address.address},${userData.Address.city},${userData.Address.state} ${userData.Address.postalCode},${userData.Address.country}`
});

const formatDate = (item) => {
    return date.format(item, 'keyboardDate')
}


</script>
<template>
    <v-card class="pa-5">
        <span class="text-h6 font-weight-bold">Profile</span>
        <v-divider class="mt-2"></v-divider>
        <div class="d-flex align-center justify-center mt-5">
            <div class=" pa-5 rounded-lg " :class="{
                'w-100': $vuetify.display.xs, 'w-75': $vuetify.display.smAndDown,
                'w-50': $vuetify.display.mdAndUp
            }">
                <div class="rounded-lg  text-center d-flex align-center justify-center">
                    <v-card class="rounded-lg text-center d-flex align-center justify-center" style="width: 40%;">
                        <v-img :src="userData.image"></v-img>
                    </v-card>
                </div>
                <div class="text-center mt-3">
                    <p class="text-h5 font-weight-bold text-cyan-darken-4 " >{{ userData.firstName }} {{
                        userData.lastName }}</p>
                    <span class="text-subtitle-2 text-grey-darken-1">{{ formatDate(userData.birthDate) }}</span><span
                        class="text-subtitle-2 text-grey-darken-1"> ({{ userData.age }} years old)</span>
                </div>
            </div>
        </div>
        <div class="d-flex align-center justify-center ">
            <div class="  pa-4 border-sm rounded-lg " :class="{
                'w-100': $vuetify.display.xs, 'w-100': $vuetify.display.smAndDown,
                'w-50': $vuetify.display.mdAndUp
            }">
                <div class="d-flex text-cyan-darken-4" >
                    <span class="text-caption rounded-lg border-sm d-flex justify-center align-center mr-3"
                        style="height: 28px; width: 28px;">
                        <v-icon>mdi-contacts</v-icon>
                    </span><span class="font-weight-bold">Contacts</span>
                </div>
                <div class="text-subtitle-2 text-grey-darken-1 mt-5">
                    <v-row>
                        <v-col :cols="12" sm="3" md="3" lg="3" class="py-1 px-5">
                            <p>Email:</p>
                        </v-col>
                        <v-col :cols="12" sm="9" md="9" lg="9" class="text-right py-1 px-5 ">
                            <p class="text-subtitle-2 text-grey-darken-3">{{ userData.email }} </p>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col :cols="12" sm="3" md="3" lg="3" class="py-1 px-5">
                            <p>Phone:</p>
                        </v-col>
                        <v-col :cols="12" sm="9" md="9" lg="9" class="text-right py-1 px-5">
                            <p class="text-subtitle-2 text-grey-darken-3">{{ userData.phone }} </p>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col :cols="12" sm="3" md="3" lg="3" class="py-1 px-5">
                            <p>Address:</p>
                        </v-col>
                        <v-col :cols="12" sm="9" md="9" lg="9" class="text-right py-1 px-5">
                            <p class="text-subtitle-2 text-grey-darken-3">{{ address }} </p>
                        </v-col>
                    </v-row>
                </div>
            </div>
        </div>
    </v-card>
</template>
<style scoped></style>
