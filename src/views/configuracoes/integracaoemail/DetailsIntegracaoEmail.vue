<template>
    <div>
        <h3 class="detalhes">DETALHES DA INTEGRAÇÃO DE EMAIL</h3>
    </div>
    <div class="divide-x my-5">
        <hr>
    </div>
    <div class="container-fluid p-5">
        <div>
        </div>
        <form class="row g-3" v-on:submit.prevent="store(integracao)">
            <div class="grid gap-6 mb-6 md:grid-cols-2">

                <div v-if="user.tipo == 4">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Conta</label>
                    <input type="text" v-model="integracao.conta" disabled
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:bg-red-50"
                        placeholder="" required>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Protocolo</label>
                    <select v-model="integracao.protocolo" @change="habilitarSalvar()"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled selected>Escolha o protocolo</option>
                        <option value="1">SMTP</option>
                        <option value="2">OAuth2</option>
                    </select>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Título</label>
                    <input type="text" v-model="integracao.titulo" v-on:keyup="habilitarSalvar()"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  disabled:bg-red-50 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="" required>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" v-model="integracao.email" v-on:keyup="habilitarSalvar()"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  disabled:bg-red-50 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="" required>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
                    <input type="text" v-model="integracao.descricao" v-on:keyup="habilitarSalvar()"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  disabled:bg-red-50 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="">
                </div>
                <div>
                    <label class="label-form">Habilitado</label>
                    <select v-model="integracao.is_active" class="edit-form" @change="habilitarSalvar()">
                        <option value="" disabled selected>escolha um status</option>
                        <option :value="true">Sim</option>
                        <option :value="false">Não</option>
                    </select>
                </div>
            </div>
            <div v-if="integracao.protocolo == '1'" class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SMTP Host</label>
                    <input type="text" v-model="integracao.smpthost" v-on:keyup="habilitarSalvar()"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="" required>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SMTP Port</label>
                    <input type="text" v-model="integracao.smtpport" v-on:keyup="habilitarSalvar()"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="" required>
                </div>
            </div>
            <div v-if="integracao.protocolo == '1'" class="grid gap-6 mb-6 md:grid-cols-3">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Criptografia</label>
                    <select v-model="integracao.criptografia" @change="habilitarSalvar()"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled selected>Escolha o tipo de conteudo</option>
                        <option value="0">Nenhuma</option>
                        <option value="1">SSL</option>
                        <option value="2">TLS1.0/1.1</option>
                        <option value="3">TLS1.2</option>
                    </select>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SMTP Usuário</label>
                    <input type="text" v-model="integracao.smtpusuario" v-on:keyup="habilitarSalvar()"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="" required>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SMTP senha</label>
                    <input type="password" v-model="integracao.smtpsenha" v-on:keyup="habilitarSalvar()"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="" required>
                </div>
            </div>
            <div v-if="integracao.protocolo == '2'" class="grid gap-6 mb-6 md:grid-cols-3">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tenant ID</label>
                    <input type="text" v-model="integracao.tenantid" v-on:keyup="habilitarSalvar()"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="" required>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cliente ID</label>
                    <input type="text" v-model="integracao.clienteid" v-on:keyup="habilitarSalvar()"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="" required>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cliente Chave</label>
                    <input type="password" v-model="integracao.clientkey" v-on:keyup="habilitarSalvar()"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="" required>
                </div>


            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-3">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Encoding</label>
                    <input type="text" v-model="integracao.encoding" v-on:keyup="habilitarSalvar()"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="" required>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo Conteúdo</label>
                    <select v-model="integracao.tipoconteudo" @change="habilitarSalvar()"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="1">Texto</option>
                        <option value="0">HTML</option>
                    </select>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Charset</label>
                    <input type="text" v-model="integracao.charset" v-on:keyup="habilitarSalvar()"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="" required>
                </div>
            </div>


            <button type="submit" v-bind:disabled="isDisabled"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  disabled:bg-gray-300">Salvar</button>
            <button type="button" @click="cancelar()"
                class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">Cancelar</button>
            <button type="button" @click="testarConexao(integracao)"
                class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Testar
                Conexão</button>
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
            integracao: {},
            contas: {},
            isDisabled: true
        };
    },
    methods: {
        store(ts) {
            const x = {
                charset: ts.charset,
                clienteid: ts.clienteid,
                protocolo: ts.protocolo,
                clientkey: ts.clientkey,
                criptografia: ts.criptografia,
                descricao: ts.descricao,
                email: ts.email,
                encoding: ts.encoding,
                is_active: ts.is_active,
                smpthost: ts.smpthost,
                smtpport: ts.smtpport,
                smtpsenha: ts.smtpsenha,
                smtpusuario: ts.smtpusuario,
                tenantid: ts.tenantid,
                tipoconteudo: ts.tipoconteudo,
                titulo: ts.titulo,
            }
            http.put('/emailintegracao/' + this.integracao.id + '/', x)
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Dados Atualizados',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    router.push({ name: 'emailintegracao' })
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        cancelar() {
            this.$router.push('/emailintegracao');
        },
        setUser() {
            const u = ref(auth.user)
            this.user = u.value
        },
        habilitarSalvar() {
            this.isDisabled = false
        },
        testarConexao(formData) {
            http.post('/emailintegracao/teste/emailconexao/', formData)
                .then(res => {
                    if (res.data.detail === "A conexão realizada com sucesso.") {
                        this.$swal.fire({
                            icon: 'success',
                            title: res.data.detail,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    } else {
                        this.$swal("Oops...", res.data.detail, "error");
                    }
                })
                .catch(e => {
                    console.log(e);
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
        getIntegracao() {
            http.get('/emailintegracao/' + this.$route.params.id + '/')
                .then(res => {
                    this.integracao = res.data
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
        this.getIntegracao();

    }
}

</script>


<style scoped></style>