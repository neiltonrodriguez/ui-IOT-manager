import { ref } from 'vue'
import { defineStore } from 'pinia'
import http from '../services/http.js'

export const empresasStore = defineStore('empresas', () => {
    const empresa = ref({});

    function setEmpresa(data) {
        empresa.value = data
    }


    return {
        empresa,
        setEmpresa
    };
});