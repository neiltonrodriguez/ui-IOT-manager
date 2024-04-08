import { ref } from 'vue'
import { defineStore } from 'pinia'
import http from '../services/http.js'

export const tipoSensorStore = defineStore('tiposensor', () => {
    const tiposensor = ref({});

    function setTipoSensor(data) {
        tiposensor.value = data
    }


    return {
        tiposensor,
        setTipoSensor
    };
});