import { ref } from 'vue'
import { defineStore } from 'pinia'
import http from '../services/http.js'

export const tipoAtivoStore = defineStore('tipoativos', () => {
    const tipoativos = ref({});

    function setTipoAtivo(data) {
        tipoativos.value = data
    }


    return {
        tipoativos,
        setTipoAtivo
    };
});