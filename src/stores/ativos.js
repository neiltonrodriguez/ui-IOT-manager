import { ref } from 'vue'
import { defineStore } from 'pinia'
import http from '../services/http.js'

export const ativoStore = defineStore('ativos', () => {
    const ativos = ref({});

    function setAtivo(data) {
        ativos.value = data
    }


    return {
        ativos,
        setAtivo
    };
});