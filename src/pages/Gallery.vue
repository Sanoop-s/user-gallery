<script setup>
import { onMounted, ref } from 'vue';
import AddImgDialog from '../components/AddImgDialog.vue'

const openModal = ref(false);
const imageSrc = ref();
const images = ref([]);
const openSnack = ref(false);
const snackText = ref(null)

let userData = JSON.parse(localStorage.getItem('userLoggedin'));
let imagesData = ref(JSON.parse(localStorage.getItem('galleryData')));

onMounted(() => {
    if (imagesData.value?.length > 0) {
        images.value = imagesData.value
    }
})

const openDialog = () => {
    openModal.value = true
    imageSrc.value = ''
}

const handleImageUpload = (e) => {
    var files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    const reader = new FileReader();
    reader.onload = (event) => {
        imageSrc.value = event.target.result;
    }
    reader.readAsDataURL(files[0]);
};

const handleRemoveImage = () => {
    imageSrc.value = '';

};
const onImageSave = () => {
    if (imageSrc.valuev !== '') {
        let data = {
            id: userData.id,
            likes: 0,
            img: imageSrc.value,
            liked_by: []
        }
        images.value.push(data)
        localStorage.setItem('galleryData', JSON.stringify(images.value));
        openModal.value = false;
    } else {


    }


}

const onLikeUnlike = (image) => {
    let currentUserId = userData.id;
    const index = image.liked_by.indexOf(currentUserId);
    if (index === -1) {
        image.likes++;
        image.liked_by.push(currentUserId)
    } else {
        image.likes--;
        image.liked_by.splice(index, 1)
    }
    localStorage.setItem('galleryData', JSON.stringify(images.value));
}

const isImageLiked = (image) => {
    let currentUserId = userData.id;
    return image.liked_by.find((user) => user === currentUserId);
}

const onClose = () => {
    openModal.value = false;
}

</script>
<template>
    <v-card class="pa-5">
        <span class="text-h6 font-weight-bold">Gallery</span>
        <v-divider></v-divider>
        <v-row class="mt-3">
            <v-col :cols="12">
                <v-btn class="text-white float-right bg-cyan-darken-1" @click="openDialog">Add new</v-btn>
            </v-col>
        </v-row>
        <AddImgDialog v-model:openModal="openModal" :imageSrc="imageSrc" @close="onClose"
            @upload="handleImageUpload" @remove="handleRemoveImage" @Save="onImageSave" />

        <v-row v-if="images.length === 0">
            <v-col :cols="12" class="d-flex justify-center">
                <img src="../assets/noimg.png" />
            </v-col>
        </v-row>
        <v-row>
            <v-col :cols="12" sm="6" md="4" lg="3" xl="2" v-for="image in images">
                <v-card class="d-flex align-center justify-center rounded-lg  pa-5 pb-0 w-100">
                    <div class="d-flex align-center justify-center w-100">
                        <div class="w-100">
                            <v-card class="w-100 bg-grey-lighten-4" style="height: 160px;">
                                <v-img :src="image.img" class="h-100 w-100" cover></v-img>
                            </v-card>
                            <div class="pa-3 w-100  border-none elevation-0">
                                <v-icon :class="[{ 'like': isImageLiked(image) }, 'cursor-pointer mr-3']"
                                    @click="onLikeUnlike(image)">{{ isImageLiked(image) ?
                                        'mdi-heart' : 'mdi-heart-outline' }}
                                </v-icon>
                                <span>{{ image.likes }} Likes</span>
                            </div>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>

<style scoped>
.like {
    animation: pulse 0.2s linear;
    color: red;
}

@keyframes pulse {
    0% {
        transform: scale(1);
        opacity: 0;
    }

    50% {
        transform: scale(1.3);
        opacity: 1;
    }

    100% {
        transform: scale(1);
        opacity: 0;
    }
}
</style>