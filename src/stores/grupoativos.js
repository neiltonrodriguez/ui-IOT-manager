import { ref } from 'vue'
import { defineStore } from 'pinia'
import http from '../services/http.js'

export const grupoAtivoStore = defineStore('grupoativos', () => {
    const grupoativos = ref({});

    function setGrupoAtivo(data) {
        grupoativos.value = data
    }


    return {
        grupoativos,
        setGrupoAtivo
    };
});