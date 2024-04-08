import { ref } from 'vue'
import { defineStore } from 'pinia'
import http from '../services/http.js'

export const sensorGruposStore = defineStore('sensorgrupos', () => {
    const sensorgrupo = ref({});

    function setSensorGrupo(data) {
        sensorgrupo.value = data
    }


    return {
        sensorgrupo,
        setSensorGrupo
    };
});