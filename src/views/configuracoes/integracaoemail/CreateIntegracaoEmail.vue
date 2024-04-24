<template>
    <div>
        <h3 class="detalhes">CADASTRO DE INTEGRAÇÃO DE EMAIL</h3>
    </div>
  
    <div class="container-fluid p-5">
        <form class="row g-3" v-on:submit.prevent="createIntegracaoEmail(formData)">
            <div class="grid gap-6 mb-6 md:grid-cols-2">

                <div v-if="user.tipo == 4">
                    <label class="label-form">Conta</label>
                    <select v-model="formData.conta"
                        class="input-form">
                        <option value="" disabled selected>Escolha a conta</option>
                        <option v-for="c in contas" :key="c.id" :value="c.conta">{{ c.conta }}</option>
                    </select>
                </div>
                <div>
                    <label class="label-form">Protocolo</label>
                    <select v-model="formData.protocolo"
                        class="input-form">
                        <option value="" disabled selected>Escolha o protocolo</option>
                        <option :value="1">SMTP</option>
                        <option :value="2">OAuth2</option>
                    </select>
                </div>
                <div>
                    <label class="label-form">Título</label>
                    <input type="text" v-model="formData.titulo"
                        class="input-form"
                        placeholder="" required>
                </div>

                <div>
                    <label class="label-form">Descrição</label>
                    <textarea rows="4" v-model="formData.descricao"
                        class="input-form"
                        placeholder=""></textarea>
                </div>
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-1">
                <div>
                    <label class="label-form">Email</label>
                    <input type="email" v-model="formData.email"
                        class="input-form"
                        placeholder="" required>
                </div>


            </div>
            <div v-if="formData.protocolo == '1'" class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label class="label-form">SMTP Host</label>
                    <input type="text" v-model="formData.smpthost"
                        class="input-form"
                        placeholder="" required>
                </div>
                <div>
                    <label class="label-form">SMTP Port</label>
                    <input type="number" v-model="formData.smtpport"
                        class="input-form"
                        placeholder="" required>
                </div>
            </div>
            <div v-if="formData.protocolo == '1'" class="grid gap-6 mb-6 md:grid-cols-3">
                <div>
                    <label class="label-form">Criptografia</label>
                    <select v-model="formData.criptografia"
                        class="input-form">
                        <option value="0" selected>Nenhuma</option>
                        <option value="1">SSL</option>
                        <option value="2">TLS1.0/1.1</option>
                        <option value="3">TLS1.2</option>
                    </select>
                </div>
                <div>
                    <label class="label-form">SMTP Usuário</label>
                    <input type="text" v-model="formData.smtpusuario"
                        class="input-form"
                        placeholder="" required>
                </div>
                <div>
                    <label class="label-form">SMTP senha</label>
                    <input type="password" v-model="formData.smtpsenha"
                        class="input-form"
                        placeholder="" required>
                </div>
            </div>
            <div v-if="formData.protocolo == '2'" class="grid gap-6 mb-6 md:grid-cols-3">
                <div>
                    <label class="label-form">Tenant ID</label>
                    <input type="text" v-model="formData.tenantid"
                        class="input-form"
                        placeholder="" required>
                </div>
                <div>
                    <label class="label-form">Cliente ID</label>
                    <input type="text" v-model="formData.clienteid"
                        class="input-form"
                        placeholder="" required>
                </div>
                <div>
                    <label class="label-form">Cliente Chave</label>
                    <input type="password" v-model="formData.clientkey"
                        class="input-form"
                        placeholder="" required>
                </div>


            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-3">
                <div>
                    <label class="label-form">Encoding</label>
                    <input type="text" v-model="formData.encoding"
                        class="input-form"
                        placeholder="" required>
                </div>
                <div>
                    <label class="label-form">Tipo Conteúdo</label>
                    <select v-model="formData.tipoconteudo"
                        class="input-form">
                        <option value="1" selected>Texto</option>
                        <option value="0">HTML</option>
                    </select>
                </div>
                <div>
                    <label class="label-form">Charset</label>
                    <input type="text" v-model="formData.charset"
                        class="input-form"
                        placeholder="" required>
                </div>
            </div>
            <button type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Salvar</button>
            <button type="button" @click="cancelar()"
                class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">Cancelar</button>
            <button type="button" @click="testarConexao(formData)"
                class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Testar
                Conexão</button>
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
                charset: 'utf-8',
                encoding: 'utf-8',
                criptografia: 0,
                tipoconteudo: 1
            },
            user: {},
            contas: []
        };
    },
    methods: {
        createIntegracaoEmail(formData) {
            http.post('/emailintegracao/', formData)
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'criado com sucesso',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$router.push('/emailintegracao');
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        testarConexao(formData) {
            http.post('/emailintegracao/teste/emailconexao/', formData)
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: res.data.detail,
                        showConfirmButton: false,
                        timer: 1500
                    })
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
        setUser() {
            const u = ref(auth.user)
            this.user = u.value
        },
        chamadasGet() {
            if (this.user.tipo == 4) {
                this.getContas();
            }
        },
        cancelar() {
            this.$router.push('/emailintegracao');
        },

    },
    mounted() {
        this.setUser();
        this.chamadasGet();
    }
};
</script>


<style scoped></style>