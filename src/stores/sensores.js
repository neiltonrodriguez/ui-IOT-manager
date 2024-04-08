import { ref } from 'vue'
import { defineStore } from 'pinia'
import http from '../services/http.js'

export const sensoresStore = defineStore('sensores', () => {
    const sensor = ref({});

    function setSensor(data) {
        sensor.value = result
    }


    return {
        sensor,
        setSensor
    };
});