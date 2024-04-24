<template>
    <div>
        <Filtro @meu-evento="filtrar" :filterConta="true" :filterUf="true" :filterTipoUsuario="true"
            :filterEmpresa="true" :filterGrupoSensor="false" :filterDepartamentoUsuario="true" :filterStatus="true" />
    </div>
    <div class="shadow-sm overflow-hidden my-2">
        <div class="pb-2">
            <button type="button" @click="accessRoute('create-usuario')"
                class="px-4 py-2 font-semibold text-sm bg-blue-700  hover:bg-blue-900 text-white rounded-md shadow-sm">Novo
                Usuário</button>
        </div>
        
            <table class="border-collapse  w-full text-sm">
                <thead>
                    <tr>


                        <th
                            class="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                            FOTO</th>
                        <th
                            class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                            Nome Completo</th>
                        <th
                            class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                            Login</th>
                        <th
                            class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                            Email</th>
                        <th
                            class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                            Origem</th>
                        <th
                            class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                            Habilitado</th>
                        <th
                            class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                            Ação</th>

                    </tr>
                </thead>
                <tbody class="bg-white dark:bg-slate-800">
                    <tr class="hover:bg-gray-100 cursor-pointer duration-200" v-for="u in usuarios" :key="u.id">
                        <td
                            class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                            <template v-if="u.foto == null"><img
                                    class="rounded-lg shadow-md duration-200 hover:scale-105" width="40"
                                    src="../../assets/img/sem-foto.png"> </template>
                            <template v-else>
                                <img class="rounded-lg shadow-md duration-200 hover:scale-105" :src="u.foto" width="40">
                            </template>
                        </td>
                        <td @click="viewUser(u.id)"
                            class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                            {{ u.nomecompleto }}</td>
                        <td @click="viewUser(u.id)"
                            class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                            {{ u.usuario }}</td>
                        <td @click="viewUser(u.id)"
                            class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                            {{ u.email }}</td>
                        <td @click="viewUser(u.id)"
                            class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                            {{ u.origemusuario }}</td>
                        <td @click="viewUser(u.id)"
                            class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                            <template v-if="u.is_active">
                                <div class="flex items-center">
                                    <div class="h-2.5 w-2.5 rounded-full                     bg-green-500 mr-2"></div>
                                    Sim
                                </div>
                            </template>
                            <template v-else>
                                <div class="flex items-center">
                                    <div class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div> Não
                                </div>
                            </template>
                        </td>
                        <td
                            class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                            <button @click="viewUser(u.id)" class="btn">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                                    stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                            <button @click="deleteUser(u.id)" class="btn">
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
        <button :disabled="prev1 == null" @click="nextPage('previous')"
            class="px-3 mx-1 py-2 text-sm bg-blue-700 hover:bg-blue-900 disabled:bg-gray-300 focus:bg-violet-700 text-white">
            Anterior
        </button>
        <template v-for="(page, index) in pages" :key="page">

            <template v-if="page === '.....'">
                {{ page }}
            </template>

            <template v-else>
                <button class="px-3 mx-1 py-2 text-sm bg-blue-700 hover:bg-blue-900 focus:bg-violet-700 text-white"
                    :class="page === atual ? 'bg-violet-700' : 'bg-blue-700'" @click="changePage(page)">
                    {{ page }}
                </button>
            </template>


        </template>

        <button :disabled="next1 == null" @click="nextPage('next')"
            class="px-3 mx-1 py-2 text-sm bg-blue-700 hover:bg-blue-900 disabled:bg-gray-300 focus:bg-violet-700 text-white">
            Próximo
        </button>

        <span class="mx-4 text-xd font-semibold text-blue-700">total: </span> {{
            total }}
    </div>


    </div>
    
</template>
<script>
import http from '../../services/http.js'
import router from '../../router'
import Filtro from '../../components/Filtro.vue'


export default {
    components: {
        Filtro
    },
    data() {
        return {
            atual: 1,
            next1: null,
            prev1: null,
            titleBtn: "mostrar filtro avançado",
            isVisible: false,
            usuarios: [],
            usuario: {},
            users: [],
            offset: 0,
            limit: 10,
            pages: [],
            total: 0,
            filter: {
                search: '',
                departamentoUsuario: 0,
                sensorgrupo: 0,
                empresa: 0,
                tipo: 0,
                is_active: "",
                tipoUsuario: 0,
                conta: '',
                uf: ''
            }
        };
    },
    methods: {
        nextPage(n) {
            let i = 0;

            if (n === "next") {
                let n = this.next1.substring(this.next1.indexOf("&"), 100).trim();
                let a = n.slice(0, -13);
                i = a.substring(a.indexOf("&") + 8, 100).trim();

            } else {
                let n = this.prev1.substring(this.prev1.indexOf("&"), 100).trim();
                let a = n.slice(0, -13);

                if (a) {
                    i = a.substring(a.indexOf("&") + 8, 100).trim();
                }

            }
            console.log(i)
            if (i === 0) {
                this.offset = 0;
                this.getAll();
                this.atual = 1;
            } else {
                this.getAll(i / this.limit);
                this.atual = i / this.limit + 1;
            }

        },
        abreviarPages() {
            const qty = this.pages.length; // quantidade total de páginas
            const firstPages = 15; // número de páginas para manter no início
            const lastPages = 3; // número de páginas para manter no final

            let pages = [];
            for (let i = 1; i <= qty; i++) {
                if (i <= firstPages || i > qty - lastPages) {
                    pages.push(i);
                } else if (i === firstPages + 1) {
                    pages.push(".....");
                }
            }
            this.pages = pages
        },
        getAll(i = null) {
            if (i) {
                this.offset = i
            }
            let search = ""
            if (this.filter.search != "") {
                search = `&search=${this.filter.search}`
                this.pages = []
            }
            let uf = ""
            if (this.filter.uf != "") {
                uf = `&uf=${this.filter.uf}`
                this.pages = []
            }
            let is_active = ""
            if (this.filter.is_active === "true") {
                is_active = `&is_active=1`
                this.pages = []
            }
            if (this.filter.is_active === "false") {
                is_active = `&is_active=0`
                this.pages = []
            }
            console.log(this.filter)
            let tipo = ""
            if (this.filter.tipoUsuario) {
                tipo = `&tipo=${this.filter.tipoUsuario}`
                this.pages = []
            }
            let departamento = ""
            if (this.filter.departamentoUsuario) {
                departamento = `&departamento=${this.filter.departamentoUsuario}`
                this.pages = []
            }
            const url = `/usuarios/?limit=${this.limit}&offset=${this.limit * this.offset}${search}${uf}${is_active}${tipo}${departamento}&ordering=-id`;
            http.get(url)
                .then(res => {
                    this.usuarios = res.data.results
                    this.total = res.data.count
                    const qty = Math.ceil(this.total / this.limit);
                    if (qty <= 1) return [1];
                    this.pages = Array.from(Array(qty).keys(), (i) => i + 1);
                    this.next1 = res.data.next;
                    this.prev1 = res.data.previous;
                    this.abreviarPages();
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        changePage(i) {
            if (i == 1) {
                this.getAll(0);
                this.atual = 1;
            } else {
                this.getAll(i - 1);
                this.atual = i;
            }

            this.offset = 0;

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
            console.log(payload)
            this.filter = payload;
            this.getAll();
        },
        current() {
            return this.offset ? this.offset + 1 : 1;
        },
        deleteUser(id) {
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
                    http.delete('/usuarios/' + id)
                        .then(res => {
                            this.usuarios = res.data.response
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
        async viewUser(id) {
            this.$router.push('/details-usuario/' + id);
        },
        accessRoute(nameRoute) {
            router.push({ name: nameRoute })
        }
    },
    mounted() {
        this.getAll();
    },
};
</script>

<style scoped></style>