import { ref } from 'vue'
import { defineStore } from 'pinia'
import http from '../services/http.js'

export const gruposStore = defineStore('grupousuarios', () => {
    const grupo = ref({});
    const ids = ref([])

    function setGrupo(data) {
        grupo.value = data
    }

    function setIds(data) {
        ids.value = data
    }


    return {
        grupo,
        setIds,
        setGrupo
    };
});