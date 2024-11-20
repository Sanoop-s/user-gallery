<script setup>
import { onMounted, ref, watch } from 'vue';

const openModal = ref(false);
const imageSrc = ref();
const images = ref([]);

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
    console.log(files)
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

    let data = {
        id: userData.id,
        likes: 0,
        img: imageSrc.value,
        liked_by: []
    }
    images.value.push(data)
    localStorage.setItem('galleryData', JSON.stringify(images.value));
    openModal.value = false;

}

const onLikeUnlike = (image) => {
    let currentUserId = userData.id;
    const index = image.liked_by.indexOf(currentUserId);
    console.log(index);
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
    console.log(image.liked_by.find((user) => user === currentUserId))
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
        <v-dialog v-model="openModal" max-width="500">
            <v-card class="pa-5">
                <v-row>
                    <v-col :cols="10">
                        <span class="text-h6 font-weight-bold">Add new image</span>
                    </v-col>
                    <v-col :cols="2">
                        <v-card style="width: 25px; height: 25px;"
                            class="d-flex align-center justify-center float-right" @click="onClose">
                            <span class="text-h6 ">x</span>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row class="mt-5">
                    <v-col :cols="12" class="d-flex justify-center align-center">
                        <div class="file-container position-relative cursor-pointer text-center "
                            :class="{
                                'w-100': $vuetify.display.smAndDown,
                                'w-50': $vuetify.display.mdAndUp
                            }">
                            <div v-if="!imageSrc">
                                <form
                                    class="position-absolute cursor-pointer w-100 h-100 rounded-lg border-md border-dashed">
                                    <input type="file" id="media" accept="image/*"
                                        class="m-0 p-0 w-100 h-100 cursor-pointer opacity-0"
                                        @change="(event) => { handleImageUpload(event) }" />
                                    <div>
                                        <section>
                                            <v-icon>mdi-cloud-upload</v-icon>
                                            <p class="mt-0">Upload image.</p>
                                        </section>
                                    </div>
                                </form>
                            </div>
                            <div v-else class="image-uploaded potion-absolute w-100 border-sm rounded-lg d-flex">
                                <div class="trash-div position-absolute text-end w-100 h-100">
                                    <span class="trash text-red text-center position-absolute"
                                        @click="handleRemoveImage"><v-icon>mdi-close-circle</v-icon></span>
                                </div>
                                <v-img :src="imageSrc" class="rounded-lg"></v-img>
                            </div>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col :cols="12">
                        <v-btn class="text-white float-right bg-cyan-darken-1" @click="onImageSave">Save</v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
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
                                <v-img :src="image.img" class="h-100 w-100"></v-img>
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
.file-container {
    height: 160px;
}

.file-container form {
    left: 0;
}

.file-container form input {
    outline: none;
}

.file-container form section {
    top: 55%;
    margin-top: -100px;
}

.trash-div {
    z-index: 1;
}

.trash {
    margin-top: -12px;
    z-index: 1;
}

.image-uploaded {
    height: 160px;
}

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