import { ref } from 'vue'
import { defineStore } from 'pinia'
import http from '../services/http.js'

export const ldapsStore = defineStore('ldaps', () => {
    const ldap = ref({});
    const tipo = ref({});

    function setLdap(data) {
        ldap.value = data
    }
    function setTipo(data) {
        tipo.value = data
    }

    return {
        ldap,
        setLdap,
        setTipo,
        tipo
    };
});