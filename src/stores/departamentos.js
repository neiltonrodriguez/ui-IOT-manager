import { ref } from 'vue'
import { defineStore } from 'pinia'
import http from '../services/http.js'

export const departamentoStore = defineStore('departamentos', () => {
    const departamento = ref({});

    function setDepartamento(data) {
        departamento.value = data
    }


    return {
        departamento,
        setDepartamento
    };
});