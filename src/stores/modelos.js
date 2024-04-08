import { ref } from 'vue'
import { defineStore } from 'pinia'
import http from '../services/http.js'

export const modeloStore = defineStore('modelos', () => {
    const modelo = ref({});

    function setModelo(data) {
        modelo.value = data
    }


    return {
        modelo,
        setModelo
    };
});