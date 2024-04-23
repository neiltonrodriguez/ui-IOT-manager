<template>
    <div>
        <h3 class="detalhes">DETALHES GATEWAY IOT</h3>
    </div>
    <div class="divide-x my-5">
        <hr>
    </div>
    <div class="container-fluid p-5">
        <div>
        </div>
        <form class="row g-3" v-on:submit.prevent="store(gatewayiot)">
            <div class="grid gap-6 mb-6 md:grid-cols-2">

                <div v-if="user.tipo == 4">
                    <label class="label-form">Conta</label>
                    <input type="text" v-model="gatewayiot.conta" disabled
                        class="input-form"
                        placeholder="" required>
                </div>

                <div>
                    <label class="label-form">Título</label>
                    <input type="text" v-model="gatewayiot.titulo" v-on:keyup="habilitarSalvar()"
                        class="input-form"
                        placeholder="" required>
                </div>
                <div>
                    <label class="label-form">Descrição</label>
                    <textarea rows="4" v-model="gatewayiot.descricao" v-on:keyup="habilitarSalvar()"
                        class="input-form"
                        placeholder=""></textarea>
                </div>
                <div>
                    <label class="label-form">Host</label>
                    <input type="text" v-model="gatewayiot.host" v-on:keyup="habilitarSalvar()"
                        class="input-form"
                        placeholder="" required>
                </div>
                <div>
                    <label class="label-form">Porta</label>
                    <input type="text" v-model="gatewayiot.porta" v-on:keyup="habilitarSalvar()"
                        class="input-form"
                        placeholder="" required>
                </div>
                <div>
                    <label class="label-form">Exchange</label>
                    <input type="text" v-model="gatewayiot.exchange" v-on:keyup="habilitarSalvar()"
                        class="input-form"
                        placeholder="" required>
                </div>
                <div>
                    <label class="label-form">Monitor IOT</label>
                    <select v-model="gatewayiot.monitoriot" class="input-form">
                        <option value="" disabled selected>Escolha um</option>
                        <option v-for="e in monitoresiot" :key="e.id" :value="e.id">{{ e.titulo }}
                        </option>
                    </select>
                </div>
                <div>
                    <label class="label-form">Habilitado</label>
                    <select v-model="gatewayiot.is_active" class="input-form" @change="habilitarSalvar()">
                        <option :value="true">Sim</option>
                        <option :value="false">Não</option>


                    </select>
                </div>

            </div>
            <button type="submit" v-bind:disabled="isDisabled"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  disabled:bg-gray-300">Salvar</button>
            <button type="button" @click="cancelar()"
                class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">Cancelar</button>
        </form>
    </div>
</template>

<script>
import http from '../../../services/http.js'
import { ref } from 'vue'
import router from '../../../router'
import { useAuth } from '../../../stores/auth.js'

const auth = useAuth();

export default {
    data() {
        return {
            gatewayiot: {},
            user: {},
            isDisabled: true,
            contas: {},
            empresas: [],
            monitoresiot: []
        };
    },
    methods: {
        store(form) {
            const x = {
                titulo: form.titulo,
                descricao: form.descricao,
                is_active: form.is_active,
                host: form.host,
                monitoriot: form.monitoriot,
                porta: form.porta,
                exchange: form.exchange,
            }
            http.put('/gatewayiot/' + this.gatewayiot.id + '/', x)
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Dados Atualizados',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    router.push({ name: 'gatewayiot' })
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        cancelar() {
            this.$router.push('/gatewayiot');
        },
        habilitarSalvar() {
            this.isDisabled = false
        },
        setGatewayIot() {
            http.get('/gatewayiot/' + this.$route.params.id)
                .then(res => {
                    this.gatewayiot = res.data
                    this.getMonitoresIot();
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        setUser() {
            const u = ref(auth.user)
            this.user = u.value
        },
        chamadasGet() {
            if (this.user.tipo == 4) {
                this.getContas();
            }
        },
        getMonitoresIot() {
            let query = '?'
            if (this.user.tipo == 4) {
                query = `?conta=${this.gatewayiot.conta}&`
            }

            const url = `/listaitens/monitoriot/lista/${query}so_ativos=true`;
            http.get(url)
                .then(res => {
                    this.monitoresiot = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });

        },
        getContas() {
            http.get('listaitens/conta/lista?so_ativos=true')
                .then(res => {
                    this.contas = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        }
    },
    mounted() {
        this.setUser();
        this.chamadasGet();
        this.setGatewayIot();
    }
}

</script>


<style scoped></style>