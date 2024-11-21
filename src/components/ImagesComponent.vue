<script setup>
import { ref } from 'vue';

const props = defineProps({
    images: {
        type: Array
    },
    checkLiked: {
        type: Function
    },
    from: {
        type: String
    },
    tab: {
        type: {
            String
        }
    }
});

const imageSrc = ref();
const show = ref(false);
const emit = defineEmits(['like-click', 'edit']);

const onLikeUnlike = (image) => {
    emit('like-click', image)
}


const openDialog = (img) => {
    emit('edit', img)
}

const openPreview = (img,) => {
    show.value = true
    imageSrc.value = img.img
}


</script>
<template>
    <v-row v-if="props.images.length === 0">
        <v-col :cols="12" class="d-flex justify-center">
            <img src="../assets/noimg.png" />
        </v-col>
    </v-row>
    <v-row>
        <v-col :cols="12" sm="6" md="4" lg="3" xl="2" v-for="(image, index) in props.images">
            <v-card class="d-flex align-center justify-center rounded-lg  pa-5 pb-0 w-100 ma-1">
                <div class="d-flex align-center justify-center w-100">
                    <div class="w-100">
                        <v-hover v-slot="{ isHovering, props }">
                            <v-card class="w-100 bg-grey-lighten-4" style="height: 160px;" v-bind="props">
                                <v-img :src="image.img" class="h-100 w-100" cover />
                                <v-overlay :model-value="isHovering" class="align-center justify-center" scrim="#036358"
                                    contained>
                                    <v-btn variant="flat" @click="openPreview(image)">Preview
                                    </v-btn>
                                </v-overlay>
                            </v-card>
                        </v-hover>
                        <div class="pa-3 w-100  border-none elevation-0">
                            <v-row>
                                <v-col :cols=12 sm="8" md="8" lg="8" xl="8">
                                    <v-icon :class="[{ 'like': checkLiked(image) }, 'cursor-pointer mr-3']"
                                        @click="onLikeUnlike(image)">{{ checkLiked(image) ?
                                            'mdi-heart' : 'mdi-heart-outline' }}
                                    </v-icon>
                                    <span>{{ image.likes }} Likes</span>
                                </v-col>
                                <v-col :cols=12 sm="4" md="4" lg="4" xl="4">
                                    <v-chip color="cyan" size="small" class="float-right cursor-pointer" v-if="from"
                                        @click="openDialog(image)">
                                        <v-icon icon="mdi-pencil" start></v-icon>Edit
                                    </v-chip>
                                </v-col>
                            </v-row>
                        </div>
                    </div>
                </div>
            </v-card>
            <v-dialog v-model="show" max-width="500">
                <v-card height="300" width="500">
                    <v-img :src="imageSrc" class="h-100 w-100" />
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>

</template>
<style scoped>
.like {
    animation: pulse 0.2s linear;
    color: red;
    will-change: transform, opacity;
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