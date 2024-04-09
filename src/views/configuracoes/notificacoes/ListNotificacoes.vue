<template>
    <div>
        <Filtro @meu-evento="filtrar" :filterConta="false" :filterUf="false" :filterEmpresa="false"
            :filterGrupoSensor="false" :filterDepartamento="false" :filterStatus="false" :filterTipo="false" />
    </div>
    <div class="shadow-sm overflow-hidden my-8">
        <div class="py-4">
            <button @click="accessRoute('create-notificacao')"
                class="px-4 py-2 font-semibold text-sm bg-blue-800 text-white rounded-md shadow-sm">Nova
                Notificação</button>
        </div>
        <table class="border-collapse table-fixed w-full text-sm">
            <thead>
                <tr>

                    <th
                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        Titulo</th>

                    <th
                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        Descrição</th>

                    <th v-if="user.tipo == 4"
                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        Criado por</th>
                    <th v-if="user.tipo == 4"
                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        Modificado por</th>
                    <th
                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        Habilitado</th>
                    <th
                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        Ação</th>

                </tr>
            </thead>
            <tbody class="bg-white dark:bg-slate-800">
                <tr v-for="n in  notificacoes" :key="n.id">

                    <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{{
                        n.titulo }}</td>

                    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                        {{ n.descricao }}</td>

                    <td v-if="user.tipo == 4"
                        class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                        {{ n.criadopor }}</td>
                    <td v-if="user.tipo == 4"
                        class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                        {{ n.modificadopor }}</td>
                    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                        <template v-if="n.is_active">
                            <div class="flex items-center">
                                <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Sim
                            </div>
                        </template>
                        <template v-else>
                            <div class="flex items-center">
                                <div class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div> Não
                            </div>
                        </template>
                    </td>
                    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                        <button @click="detailsNotificacao(n.id)" class="btn">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                        <button @click="deleteNotificacao(n.id)" class="btn">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>


                        </button>
                    </td>
                </tr>

            </tbody>
        </table>
        <div class="py-4">
            <button v-for="(page, index) in pages" :key="page"
                class="px-3 mx-1 py-2 text-sm bg-blue-700 hover:bg-blue-900 focus:bg-violet-700 text-white"
                :class="{ current: page === current }" @click="changePage(index)">
                {{ page }}
            </button>
            <span class="mx-4 text-xd font-semibold text-blue-700">total de registros:</span> {{ total }}
        </div>
    </div>
</template>
<script>
import http from '../../../services/http.js'
import router from '../../../router/index.js'
import Filtro from '../../../components/Filtro.vue'
import { useAuth } from '../../../stores/auth.js'
import { ref } from 'vue'

const auth = useAuth();

export default {
    components: {
        Filtro

    },
    data() {
        return {
            titleBtn: "mostrar filtro avançado",
            isVisible: false,
            user: {},
            notificacoes: [],
            contas: [],
            offset: 0,
            limit: 5,
            pages: [],
            total: 0,
            filter: {
                search: '',
                departamento: 0,
                sensorgrupo: 0,
                empresa: 0,
                tipo: 0,
                is_active: false,
                conta: '',
                uf: ''
            }
        };
    },
    methods: {
        getAll(i = null) {
            if (i) {
                this.offset = i
            }
            let search = ""
            if (this.filter.search != "") {
                search = `&search=${this.filter.search}`
            }
            const url = `/notificacao/?limit=${this.limit}&offset=${this.limit * this.offset}${search}&ordering=-id`;
            http.get(url)
                .then(res => {
                    this.notificacoes = res.data.results
                    this.total = res.data.count
                    const qty = Math.ceil(this.total / this.limit);
                    if (qty <= 1) return [1];
                    this.pages = Array.from(Array(qty).keys(), (i) => i + 1);
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        changePage(i) {
            this.getAll(i);
            this.offset = 0
        },
        mostrarSearch() {
            this.isVisible = !this.isVisible
            if (this.isVisible) {
                this.titleBtn = "ocultar filtro avançado"
            } else {
                this.titleBtn = "mostrar filtro avançado"
            }
        },
        filtrar(payload) {
            this.filter = payload;
            this.getAll();
        },
        current() {
            return this.offset ? this.offset + 1 : 1;
        },
        deleteNotificacao(id) {
            this.$swal.fire({
                title: 'Deseja Realmente Excluir?',
                text: "Essa ação não pode ser revertida!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Sim, excluir!'
            }).then((result) => {
                if (result.isConfirmed) {
                    http.delete('/notificacao/' + id)
                        .then(res => {
                            this.grupos = res.data.response
                            this.getAll();
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
                }
            })
        },
        async detailsNotificacao(id) {
            this.$router.push('/details-notificacao/' + id);

        },
        accessRoute(nameRoute) {
            router.push({ name: nameRoute })
        },

        setUser() {
            const u = ref(auth.user)
            this.user = u.value
        },

    },
    mounted() {
        this.getAll();
        this.setUser();
    },
};
</script>