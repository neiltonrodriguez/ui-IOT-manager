<template>
    <div>
        <h3 class="text-start">CADASTRO DE INTEGRAÇÃO DE MENSAGEM</h3>
    </div>
  
    <div class="container-fluid p-5">
        <form class="row g-3" v-on:submit.prevent="createIntegracaoMensagem(formData)">
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
                <div>
                    <label class="label-form">Telefone</label>
                    <input type="text" v-model="formData.numerotelefone" v-mask="['(##) ####-####', '(##) #####-####']"
                        class="input-form"
                        placeholder="" required>
                </div>

                <div>
                    <label class="label-form">SID twilio</label>
                    <input type="text" v-model="formData.sidtwilio"
                        class="input-form"
                        placeholder="" required>
                </div>
                <div>
                    <label class="label-form">Token Twilio</label>
                    <input type="password" v-model="formData.authtokentwilio"
                        class="input-form"
                        placeholder="" required>
                </div>
                <div>
                    <label class="label-form">CharSet</label>
                    <input type="text" v-model="formData.charset"
                        class="input-form"
                        placeholder="" required>
                </div>

            </div>
            <button type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Salvar</button>
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
import { useAuth } from '../../../stores/auth.js'
import { ref } from 'vue'

const auth = useAuth();

export default {
    data() {
        return {
            formData: {
                charset: 'utf-8'
            },
            user: {},
            contas: []
        };
    },
    methods: {
        createIntegracaoMensagem(formData) {
            http.post('/mensagemintegracao/', formData)
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'criado com sucesso',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$router.push('/mensagemintegracao');
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
                    if (res.data.detail == "Conexão bem sucedida!") {
                        this.$swal.fire({
                            icon: 'success',
                            title: e.response.data.detail,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    } else {
                        this.$swal("Oops...", res.data.detail, "error");
                    }
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
        }

    },
    mounted() {
        this.setUser();
        this.chamadasGet();
    }
};
</script>


<style scoped></style>