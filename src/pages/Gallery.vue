<script setup>
import { onMounted, ref, watch } from 'vue';
import AddImgDialog from '../components/AddImgDialog.vue'
import { VCol, VRow } from 'vuetify/components';
import ImagesComponent from '../components/ImagesComponent.vue';

const openModal = ref(false);
const imageSrc = ref();
const images = ref([]);
const tab = ref('All');
const myImages = ref([]);
const editId = ref(null);


let userData = JSON.parse(localStorage.getItem('userLoggedin'));
let imagesData = ref(JSON.parse(localStorage.getItem('galleryData')));

onMounted(() => {
    if (imagesData.value?.length > 0) {
        isMyImages()
        images.value = imagesData.value
    }
})



const openDialog = (img = null) => {
    if (img) {
        openModal.value = true
        imageSrc.value = img.img
        editId.value = img.id
    } else {
        openModal.value = true
        imageSrc.value = ''
    }

}

const handleImageUpload = (file) => {
    var files = file;
    const reader = new FileReader();
    reader.onload = (event) => {
        imageSrc.value = event.target.result;
    }
    reader.readAsDataURL(files);

};

const handleRemoveImage = () => {
    imageSrc.value = '';

};
const onImageSave = () => {
    myImages.value = []
    if (imageSrc.value !== '') {
        if (editId.value) {
            const index = imagesData.value.findIndex((img) => img.id === editId.value);
            console.log(imageSrc.value,imagesData.value[index].img)
            if (imageSrc.value !== imagesData.value[index].img) {
                imagesData.value[index].liked_by = []
                imagesData.value[index].likes = 0
            }
            imagesData.value[index].img = imageSrc.value;
            localStorage.setItem('galleryData', JSON.stringify(imagesData.value));
            openModal.value = false;
        } else {
            let data = {
                id: Math.ceil(Math.random() * 1000000),
                likes: 0,
                img: imageSrc.value,
                liked_by: [],
                userId: userData.id
            }
            images.value.push(data)
            localStorage.setItem('galleryData', JSON.stringify(images.value));
            openModal.value = false;
            tab.value = tab.value
        }
        isMyImages()

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

const isMyImages = () => {
    let currentUserId = userData.id;
    console.log(imagesData)
    imagesData.value?.forEach(element => {
        if (element.userId === currentUserId) {
            myImages.value.push(element)
        }
    });
}

</script>
<template>
    <v-card class="pa-5">
        <v-row>
            <v-col :cols="8">
                <span class="text-h6 font-weight-bold">Gallery</span>
            </v-col>
            <v-col :cols="4">
                <v-btn class="text-white float-right bg-cyan-darken-1" @click="openDialog">Add new</v-btn>
            </v-col>
        </v-row>
        <v-divider class="mt-2"></v-divider>
        <v-row>
            <v-col :cols="12">
                <v-tabs color="cyan-darken-1" bg-color="transparent" v-model="tab">
                    <v-tab text="All images" value="All" />
                    <v-tab text="My images" value="My" />
                </v-tabs>
                <v-tabs-window v-model="tab" class="mt-3">
                    <v-tabs-window-item value="All">
                        <ImagesComponent :images="images" :check-liked="isImageLiked" @like-click="onLikeUnlike" />
                    </v-tabs-window-item>
                    <v-tabs-window-item value="My">
                        <ImagesComponent :images="myImages" :check-liked="isImageLiked" @like-click="onLikeUnlike"
                            :from="'My'" :tab="tab" @edit="openDialog" />
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-col>
        </v-row>
        <AddImgDialog v-model:openModal="openModal" :imageSrc="imageSrc" @close="onClose" @upload="handleImageUpload"
            @remove="handleRemoveImage" @Save="onImageSave" />
    </v-card>
</template>

<style scoped></style>