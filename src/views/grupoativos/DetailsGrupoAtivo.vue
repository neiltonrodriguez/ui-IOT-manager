<template>
    <div>
        <h3 class="detalhes">DETALHES GRUPO DE ATIVOS</h3>
    </div>
  
    <div class="container-fluid p-5">
        <div>
        </div>
        <form class="row g-3" v-on:submit.prevent="store(grupoativo)">
            <div class="grid gap-3 mb-3 md:grid-cols-2">

                <div v-if="user.tipo == 4">
                    <label class="label-form">Conta</label>
                    <input type="text" v-model="grupoativo.conta" disabled
                        class="input-form"
                        placeholder="" required>
                </div>
                <div>
                    <label class="label-form">Nome</label>
                    <input type="text" v-model="grupoativo.nome" v-on:keyup="habilitarSalvar()"
                        class="input-form"
                        placeholder="" required>
                </div>
                <div>
                    <label class="label-form">Habilitado</label>
                    <select v-model="grupoativo.is_active" class="input-form" @change="habilitarSalvar()">
                        <option :value="true">Sim</option>
                        <option :value="false">Não</option>


                    </select>
                </div>
                <div>
                    <label class="label-form">Descrição</label>
                    <textarea rows="4" v-model="grupoativo.descricao" v-on:keyup="habilitarSalvar()"
                        class="input-form"
                        placeholder=""></textarea>
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
import http from '../../services/http.js'
import { ref } from 'vue'
import router from '../../router'
import { useAuth } from '../../stores/auth.js'

const auth = useAuth();

export default {
    data() {
        return {
            grupoativo: {},
            user: {},
            isDisabled: true,
            contas: {}
        };
    },
    methods: {
        store(form) {
            
            const x = {
                nome: form.nome,
                descricao: form.descricao,
                is_active: form.is_active,
            }
            http.put('/ativogrupos/' + this.grupoativo.id + '/', x)
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Dados Atualizados',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    router.push({ name: 'grupoativos' })
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        cancelar() {
            this.$router.push('/grupoativos');
        },
        habilitarSalvar() {
            this.isDisabled = false
        },
        setGrupoAtivo() {
            http.get('/ativogrupos/' + this.$route.params.id)
                .then(res => {
                    this.grupoativo = res.data
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
    },
    mounted() {
        this.setUser();
        this.chamadasGet();
        this.setGrupoAtivo();
    }
}

</script>


<style scoped></style>