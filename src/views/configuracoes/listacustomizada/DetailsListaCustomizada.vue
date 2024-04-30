<template>
    <div>
        <h3 class="detalhes">DETALHES DO {{ this.$route.params.lista }}</h3>
    </div>
  
    <div class="container-fluid p-5">
        <div>
        </div>
        <form class="row g-3" v-on:submit.prevent="store(lista)">
            <div class="grid gap-3 mb-3 md:grid-cols-2">

                <div v-if="user.tipo == 4">
                    <label class="label-form">Conta</label>
                    <input type="text" v-model="lista.conta" disabled
                        class="input-form"
                        placeholder="" required>
                </div>
                <div>
                    <label class="label-form">Nome</label>
                    <input type="text" v-model="lista.titulo" v-on:keyup="habilitarSalvar()"
                        class="input-form"
                        placeholder="" required>
                </div>
                <div>
                    <label class="label-form">Descrição</label>
                    <textarea rows="4" v-model="lista.descricao" v-on:keyup="habilitarSalvar()"
                        class="input-form"
                        placeholder=""></textarea>
                </div>

                <div class="flex my-5">

                    <span v-on:keyup="habilitarSalvar()" class="label-form" v-for="m in lista.modulos" :key="m.id"><input
                            @change="prepareArray()" class="mx-3 checkFab" type="checkbox" :value="m.id"
                            :checked="m.is_active">{{ m.nome
                            }}</span>

                </div>
                <div>
                    <label class="label-form">Habilitado</label>
                    <select v-model="lista.is_active" class="input-form" @change="habilitarSalvar()">
                        <option :value="true">Sim</option>
                        <option :value="false">Não</option>
                    </select>
                </div>
            </div>
            <button id="btn-salvar" type="submit" v-bind:disabled="isDisabled"
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
            user: {},
            lista: {},
            isDisabled: true,
            contas: {},
            mod: [],
            modString: ""
        };
    },
    methods: {
        prepareArray() {
            const collection = document.getElementsByClassName("checkFab");
            let id = 0
            let ids = []
            for (let i = 0; i < collection.length; i++) {
                if (collection[i].checked) {
                    id = collection[i].value;
                    ids.push(id)
                }
            }

            let a = ''
            for (let i = 0; i < ids.length; i++) {
                console.log(ids[i]);
                if (ids.length == i + 1) {
                    a += `${ids[i]}`;
                } else {
                    a += `${ids[i]};`;
                }
            }
            this.modString = a
        },
        cancelar() {
            this.$router.push('/lista-customizada');
        },
        store(ts) {
            const x = {
                titulo: ts.titulo,
                descricao: ts.descricao,
                modulos: this.modString,
                is_active: ts.is_active
            }
            http.put('/customlistas/' + this.$route.params.lista + '/lista/' + this.lista.id + '/', x)
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Dados Atualizados',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    router.push({ name: 'lista-customizada' })
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
        getLista() {
            http.get('/customlistas/' + this.$route.params.lista + '/lista/' + this.$route.params.id + '/')
                .then(res => {
                    this.lista = res.data
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
        this.getLista();
        this.prepareArray();
    },
   
}

</script>


<style scoped></style>