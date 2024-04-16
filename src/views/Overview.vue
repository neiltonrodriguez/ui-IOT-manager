<template>
    <div>
        <div class="relative bg-slate-100 rounded-xl overflow-auto p-8">
            <div class="text-gray-700 text-2xl mb-3">
                <h3>Sensores:</h3>

                </div>
            <div
                class="grid grid-cols-4 gap-5 font-mono text-white text-sm text-center font-bold rounded-lg">
                
                <div
                    class="rounded-lg p-5 shadow-lg w-full flex flex-col gap-3 justify-center h-auto items-center bg-gradient-to-r from-white to-gray-50">
                    <p class="text-gray-700 flex-1 text-md font-bold font-sans">Quantidade de sensores</p>
                    <p class="text-sky-500 flex-1 text-4xl">{{ sensores.count }}</p>
                </div>
                <div
                    class="rounded-lg p-5 shadow-lg w-full flex flex-col gap-3 justify-center h-auto items-center bg-gradient-to-r from-white to-gray-50">
                    <p class="text-gray-700 flex-1 text-md font-bold font-sans">Sesores em alerta</p>
                    <span class="text-white flex-1 bg-red-500 px-2 rounded-md text-4xl">{{ sensoresemalerta.count ? sensoresemalerta.count : 0 }}</span>
                </div>
                <div
                    class="rounded-lg p-5 shadow-lg w-full flex flex-col gap-3 justify-center h-auto items-center bg-gradient-to-r from-white to-gray-50">
                    <p class="text-gray-700 flex-1 text-md font-bold font-sans">Quantidade de tipos de sensores</p>
                    <span class="text-sky-500 flex-1 text-4xl">{{ sensortipos.count }}</span>
                </div>
                <div
                    class="rounded-lg p-5 shadow-lg w-full flex flex-col gap-3 justify-center h-auto items-center bg-gradient-to-r from-white to-gray-50">
                    <p class="text-gray-700 flex-1 text-md font-bold font-sans">Quantidade de grupos de sensores</p>
                    <span class="text-sky-500 flex-1 text-4xl">{{ sensorgrupos.count }}</span>
                </div>
                
            </div>
        </div>
        <div class="relative bg-slate-100 rounded-xl overflow-auto p-8">
            <div class="text-gray-700 text-2xl mb-3">
                <h3>Quantidade de tipos de Ativos: <span class="bg-gray-500 text-white rounded-md px-2">{{ ativosportipo.length }}</span></h3>

                </div>
            <div
                class="grid grid-cols-4 gap-5 font-mono text-white text-sm text-center font-bold rounded-lg">
                
                <div v-for="a in ativosportipo" :key="a.id"
                    class="rounded-lg p-5 shadow-lg w-full flex flex-col gap-3 justify-center h-auto items-center bg-gradient-to-r from-white to-gray-50">
                    <p class="text-gray-700 flex-1 text-md font-bold font-sans">{{ a.nome }}: </p>
                    <p class="text-sky-500 flex-1 text-4xl">{{ a.count }}</p>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import http from '../services/http'

export default {
    data() {
        return {
            sensores: {},
            sensortipos: {},
            sensorgrupos: {},
            sensoresemalerta: {},
            ativosportipo: []

        };
    },
    methods: {
        getQtdeSensores() {
            http.get('/sensores/')
                .then(res => {
                    this.sensores = res.data
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        getQtdeSensorTipos() {
            http.get('/sensortipos/')
                .then(res => {
                    this.sensortipos = res.data
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        getQtdeSensorGrupos() {
            http.get('/sensorgrupos/')
                .then(res => {
                    this.sensorgrupos = res.data
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        getAtivosPorTipos() {
            http.get('/dashboard/lista/ativostipo/')
                .then(res => {
                    this.ativosportipo = res.data
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        getQtdeSensoresEmAlerta() {
            http.get('/dashboard/lista/sensoresalerta/')
                .then(res => {
                    this.sensoresemalerta = res.data
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },

    },
    mounted() {
        this.getQtdeSensores();
        this.getQtdeSensorTipos();
        this.getQtdeSensorGrupos();
        this.getQtdeSensoresEmAlerta();
        this.getAtivosPorTipos();
    }
}
</script>

<style scoped></style>