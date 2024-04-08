import { ref } from 'vue'
import { defineStore } from 'pinia'
import http from '../services/http.js'

export const userStores = defineStore('usuarios', () => {
    const usuario = ref({});
    const users = ref([{}])

    function setUser(data) {
        usuario.value = data
    }

    function setIds(data) {
        users.value = data
    }


    return {
        usuario,
        setIds,
        users,
        setUser
    };
});