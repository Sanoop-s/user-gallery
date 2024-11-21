<script setup>
import { computed, ref } from 'vue';

const inputRef = ref();

const props = defineProps({
    openModal: {
        type: Boolean
    },
    imageSrc: {
        type: String
    }
});

const emit = defineEmits(['close', 'upload', 'remove', 'save', 'update:openModal']);

const computedValue = computed({
    get: () => props.openModal,
    set: (val) => emit('update:openModal', val)
})

const onClose = () => {
    emit('close')
}
const imageUpload = (file) => {
    emit('upload', file)
}
const removeImage = () => {
    emit('remove')
}
const Save = () => {
    emit('save')
}

const triggerInput = () => {
    inputRef.value?.click()
}


</script>
<template>
    <v-dialog v-model="computedValue" max-width="500">
        <v-card class="pa-5">
            <VRow>
                <v-col :cols="10">
                    <span class="text-h6 font-weight-bold">Image</span>
                </v-col>
                <v-col :cols="2">
                    <v-card style="width: 25px; height: 25px;" class="d-flex align-center justify-center float-right"
                        @click="onClose">
                        <span class="text-h6 ">x</span>
                    </v-card>
                </v-col>
            </VRow>
            <v-row class="mt-5">
                <v-col :cols="12" class="d-flex justify-center align-center">
                    <div class="file-container position-relative cursor-pointer text-center " :class="{
                        'w-100': $vuetify.display.smAndDown,
                        'w-50': $vuetify.display.mdAndUp
                    }"> 
                        <div v-if="!imageSrc">
                            <form
                                class="position-absolute cursor-pointer w-100 h-100 rounded-lg border-md border-dashed"
                                @click="triggerInput">
                                <v-file-input class="m-0 p-0 w-100 h-100 cursor-pointer opacity-0 hidden" ref="inputRef"
                                    @update:modelValue="imageUpload"></v-file-input>
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
                                    @click="removeImage"><v-icon>mdi-close-circle</v-icon></span>
                            </div>
                            <v-img :src="imageSrc" class="rounded-lg"></v-img>
                        </div>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col :cols="12">
                    <v-btn class="text-white float-right bg-cyan-darken-1 " :class="{ 'cursor-not-allowed': !imageSrc }"
                        @click="Save" :disabled="!imageSrc">Save</v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
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
    margin-left: -20px;

}

.image-uploaded {
    height: 160px;
}
</style>