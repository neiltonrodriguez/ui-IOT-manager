import { ref } from 'vue'
import { defineStore } from 'pinia'
import http from '../services/http.js'

export const fabricanteStore = defineStore('fabricantes', () => {
    const fabricante = ref({});

    function setFabricante(data) {
        fabricante.value = data
    }


    return {
        fabricante,
        setFabricante
    };
});