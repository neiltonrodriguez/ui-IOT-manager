<template>
    <div>
        <h3 class="detalhes">DETALHES DA INTEGRAÇÃO DE MENSAGEM</h3>
    </div>
    <div class="divide-x my-5">
        <hr>
    </div>
    <div class="container-fluid p-5">
        <div>
        </div>
        <form class="row g-3" v-on:submit.prevent="store(mensagemintegracao)">
            <div class="grid gap-6 mb-6 md:grid-cols-2">

                <div v-if="user.tipo == 4">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Conta</label>
                    <input type="text" v-model="mensagemintegracao.conta" disabled
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-red-50"
                        placeholder="" required>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Título</label>
                    <input type="text" v-model="mensagemintegracao.titulo" v-on:keyup="habilitarSalvar()"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  disabled:bg-red-50 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="" required>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone</label>
                    <input type="text" v-model="mensagemintegracao.numerotelefone" v-on:keyup="habilitarSalvar()"
                        v-mask="['(##) ####-####', '(##) #####-####']"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  disabled:bg-red-50 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="" required>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SID Twilio</label>
                    <input type="text" v-model="mensagemintegracao.sidtwilio" v-on:keyup="habilitarSalvar()"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  disabled:bg-red-50 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="" required>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">TOKEN Twilio</label>
                    <input type="password" v-model="mensagemintegracao.authtokentwilio" v-on:keyup="habilitarSalvar()"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  disabled:bg-red-50 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="" required>
                </div>


                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
                    <textarea rows="4" v-model="mensagemintegracao.descricao" v-on:keyup="habilitarSalvar()"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                    focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                    dark:placeholder-gray-400 disabled:bg-red-50 dark:text-white dark:focus:ring-blue-500
                    dark:focus:border-blue-500"
                    placeholder="" required></textarea>
                </div>
                <div>
                    <label class="label-form">Habilitado</label>
                    <select v-model="mensagemintegracao.is_active" class="edit-form" @change="habilitarSalvar()">
                        <option :value="true">Sim</option>
                        <option :value="false">Não</option>
                    </select>
                </div>

            </div>
            <button type="submit" v-bind:disabled="isDisabled"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  disabled:bg-gray-300">Salvar</button>
            <button type="button" @click="cancelar()"
                class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">Cancelar</button>
            <!-- <button type="button" @click="testarConexao(integracao)"
                class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Testar
                Conexão</button> -->
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
            user: {},
            mensagemintegracao: {},
            isDisabled: true,
            contas: {}
        };
    },
    methods: {
        store(ts) {
            const x = {
                titulo: ts.titulo,
                authtokentwilio: ts.authtokentwilio,
                sidtwilio: ts.sidtwilio,
                descricao: ts.descricao,
                numerotelefone: ts.numerotelefone,
                is_active: ts.is_active
            }
            http.put('/mensagemintegracao/' + this.mensagemintegracao.id + '/', x)
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Dados Atualizados',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    router.push({ name: 'mensagemintegracao' })
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        cancelar() {
            this.$router.push('/mensagemintegracao');
        },
        testarConexao(formData) {
            http.post('/ldaps/teste/testeconexao/', formData)
                .then(res => {
                    if (res.data.detail === "A conexão realizada com sucesso.") {
                        this.$swal.fire({
                            icon: 'success',
                            title: res.data.detail,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }else{
                          this.$swal("Oops...", res.data.detail[0], "error");
                    }
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        habilitarSalvar() {
            this.isDisabled = false
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
        getIntegracaoMensagem() {
            http.get('/mensagemintegracao/' + this.$route.params.id + '/')
                .then(res => {
                    this.mensagemintegracao = res.data
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
        this.setUser();
        this.chamadasGet();
        this.getIntegracaoMensagem();

    }
}

</script>


<style scoped></style>