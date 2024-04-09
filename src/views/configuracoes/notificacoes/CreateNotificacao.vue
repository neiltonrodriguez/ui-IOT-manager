<template>
    <div>
        <h3 class="detalhes">CADASTRO DE NOTIFICAÇÃO</h3>
    </div>
    <div class="divide-x my-5">
        <hr>
    </div>
    <div class="container-fluid p-5">
        <form class="row g-3" v-on:submit.prevent="createNotificacao(formData)">
            <div class="grid gap-6 mb-6 md:grid-cols-2">

                <div v-if="user.tipo == 4">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Conta</label>
                    <select v-model="formData.conta" @change="chamadaConta()"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled selected>Escolha a conta</option>
                        <option v-for="c in contas" :key="c.id" :value="c.conta">{{ c.conta }}</option>
                    </select>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Título</label>
                    <input type="text" v-model="formData.titulo"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="" required>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
                    <textarea rows="4" v-model="formData.descricao"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""></textarea>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assunto</label>
                    <input type="text" v-model="formData.assunto"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="" required>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mensagem</label>
                    <textarea rows="4" v-model="formData.mensagem"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="digite aqui sua mensagem"></textarea>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Destinatário</label>
                    <input type="text" v-model="formData.destinatario"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="" required>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CC</label>
                    <input type="text" v-model="formData.destinatariocc"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="">
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CCO</label>
                    <input type="text" v-model="formData.destinatariocco"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="">
                </div>
                <div>

                    <label class="relative inline-flex items-center cursor-pointer">
                        <input v-model="formData.notificacc" type="checkbox" value="false" class="sr-only peer">
                        <div
                            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                        </div>
                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Notificar CC</span>
                    </label>
                </div>
                <div>

                    <label class="relative inline-flex items-center cursor-pointer">
                        <input v-model="formData.nottificacco" type="checkbox" value="false" class="sr-only peer">
                        <div
                            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                        </div>
                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Notificar CCO</span>
                    </label>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de envio</label>
                    <select v-model="formData.tipoenvio"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="1" selected>texto</option>
                        <option value="0">html</option>
                    </select>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Integração</label>
                    <select v-model="formData.emailintegracao"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled selected>Escolha um</option>
                        <option v-for="ei in emailintegracao" :key="ei.id" :value="ei.id">{{ ei.titulo }}</option>
                    </select>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mensagem
                        Integração</label>
                    <select v-model="formData.mensagemintegracao"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled selected>Escolha um</option>
                        <option v-for="mi in mensagemintegracao" :key="mi.id" :value="mi.id">{{ mi.titulo }}</option>
                    </select>
                </div>

            </div>
            <button type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Salvar</button>
            <button type="button" @click="cancelar()"
                class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Cancelar</button>

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
            formData: {
                mensagemintegracao: '',
                emailintegracao: '',
                tipoenvio: 1
            },
            emailintegracao: [],
            mensagemintegracao: [],
            user: {},
            contas: []
        };
    },
    methods: {
        cancelar() {
            this.$router.push('/notificacoes');
        },
        createNotificacao(formData) {
            if (!formData.notificacc) {
                formData.notificacc = false
            }
            if (!formData.nottificacco) {
                formData.nottificacco = false
            }
            http.post('/notificacao/', formData)
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Notificação criada com sucesso',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$router.push('/notificacoes');
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        getContas() {
            http.get('/listaitens/conta/lista?so_ativos=true')
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
        getEmailIntegracao() {
            let query = '?'
            if (this.user.tipo == 4) {
                query = `?conta=${this.formData.conta}&`
            }
            const url = `/listaitens/emailintegracao/lista${query}so_ativos=true`
            http.get(url)
                .then(res => {
                    this.emailintegracao = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        getMensagemIntegracao() {
            let query = '?'
            if (this.user.tipo == 4) {
                query = `?conta=${this.formData.conta}&`
            }
            const url = `/listaitens/mensagemintegracao/lista${query}so_ativos=true`
            http.get(url)
                .then(res => {
                    this.mensagemintegracao = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        chamadaConta() {
            this.getEmailIntegracao();
            this.getMensagemIntegracao();
        },
        setUser() {
            const u = ref(auth.user)
            this.user = u.value
        },
        chamadasGet() {
            if (this.user.tipo == 4) {
                this.getContas();
            }
        }

    },
    mounted() {
        this.setUser();
        this.chamadasGet();
    }
};
</script>


<style scoped></style>