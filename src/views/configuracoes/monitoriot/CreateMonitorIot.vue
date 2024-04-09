<template>
    <div>
        <h3 class="text-start">CADASTRO DE MONITOR IOT</h3>
    </div>
    <div class="divide-x my-5">
        <hr>
    </div>
    <div class="container-fluid p-5">

        <form class="row g-3" v-on:submit.prevent="createMonitorIot(formData)">
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div v-if="user.tipo == 4">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Conta</label>
                    <select v-model="formData.conta" @change="escolherConta()" class="edit-form">
                        <option value="" disabled selected>Escolha a conta</option>
                        <option v-for=" c in contas" :key="c.id" :value="c.conta">{{ c.conta }}
                        </option>
                    </select>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Empresa</label>
                    <select v-model="formData.empresa" class="edit-form">
                        <option value="" disabled selected>Escolha a empresa</option>
                        <option v-for="e in empresas" :key="e.id" :value="e.id">{{ e.nome }}
                        </option>
                    </select>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Monitor IOT</label>
                    <select v-model="formData.monitoriot" class="edit-form">
                        <option value="" disabled selected>Escolha a empresa</option>
                        <option v-for="e in monitoriot" :key="e.id" :value="e.id">{{ e.titulo }}
                        </option>
                    </select>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Título</label>
                    <input type="text" v-model="formData.titulo" class="edit-form" placeholder="" required>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
                    <textarea rows="4" v-model="formData.descricao" class="edit-form" placeholder=""></textarea>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Host</label>
                    <input type="text" v-model="formData.host" class="edit-form" placeholder="">
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Porta</label>
                    <input type="text" v-model="formData.porta" class="edit-form" placeholder="">
                </div>

            </div>
            <button type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Salvar</button>
            <button type="button" @click="cancelar()"
                class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">Cancelar</button>

        </form>
    </div>
</template>

<script>
import http from '../../../services/http.js'
import { useAuth } from '../../../stores/auth.js'
import { ref } from 'vue'

const auth = useAuth();

export default {
    data() {
        return {
            formData: {},
            user: {},
            isDisabled: false,
            contas: [],
            empresas: [],
            monitoriot: []
        };
    },
    methods: {
        escolherConta() {
            this.getEmpresas();
            this.getMonitorIot();
        },
        getEmpresas() {
            let query = '?'
            if (this.user.tipo == 4) {
                query = `?conta=${this.formData.conta}&`
            }

            const url = `/listaitens/empresa/lista/${query}so_ativos=true`;
            http.get(url)
                .then(res => {
                    this.empresas = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });

        },
        getMonitorIot() {
            let query = '?'
            if (this.user.tipo == 4) {
                query = `?conta=${this.formData.conta}&`
            }

            const url = `/listaitens/monitoriot/lista/${query}so_ativos=true`;
            http.get(url)
                .then(res => {
                    this.monitoriot = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });

        },

        createMonitorIot(form) {
            http.post('/monitoriot/', form)
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Monitor IOT criado com sucesso',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$router.push('/monitoriot');
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        cancelar() {
            this.$router.push('/monitoriot');
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
        },
        chamadasGet() {
            if (this.user.tipo == 4) {
                this.getContas();
            }
        },
        setUser() {
            const u = ref(auth.user)
            this.user = u.value
        },
    },
    mounted() {
        this.setUser();
        this.chamadasGet();
    }
};
</script>


<style scoped></style>