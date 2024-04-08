import { ref } from 'vue'
import { defineStore } from 'pinia'
import http from '../services/http.js'

export const contasStore = defineStore('contas', () => {
    const conta = ref({});

    function setConta(data) {
        conta.value = data
    }


    return {
        conta,
        setConta
    };
});