<template>
    <div>

        <Filtro @meu-evento="filtrar" :filterConta="true" :filterEmpresa="true" :filterGrupoSensor="false"
            :filterDepartamentoSensor="true" :filterStatus="true" />
    </div>
    <div class="shadow-sm overflow-hidden my-2">
        <div class="py-4">
            <button @click="accessRoute('create-camera')"
                class="px-4 py-2 font-semibold text-sm bg-blue-800 text-white rounded-md shadow-sm">Nova Camera</button>
            <button :disabled="idsForDelete.length === 0" 
 @click="deleteAllSelected()" class="px-4 mx-3 py-2 font-semibold text-sm bg-red-800 disabled:bg-gray-300 text-white rounded-md shadow-sm">Excluir Selecionados</button>
        </div>
        <table class="border-collapse w-full text-sm">
            <thead>
                <tr>
                    <th
                        class="border-b dark:border-slate-600 font-medium p-2 text-slate-400 dark:text-slate-200 text-left">
                        <input type="checkbox" id="checkAll" @click="checkAllItems()" :value="true">
                    </th>
                    <th
                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        Nome</th>
                    <th v-if="user.tipo == 4"
                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        Conta</th>
                    <th
                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        Descrição</th>
                    <th v-if="user.tipo == 4"
                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        Criado por</th>
                    <th
                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        Serial</th>
                    <th
                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        Empresa</th>
                    <th
                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        Habilitado</th>
                    <th
                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        Ação</th>

                </tr>
            </thead>
            <tbody class="bg-white dark:bg-slate-800">
                <tr class="hover:bg-gray-100 cursor-pointer duration-200" v-for="ca in cameras" :key="ca.id">
                    <td class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                        <input type="checkbox" :id="'check' + ca.id" :value="ca.id" v-model="idsForDelete">
                    </td>
                    <td @click="detailsCamera(ca.id)"
                        class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                        {{ ca.titulo }}</td>
                    <td @click="detailsCamera(ca.id)" v-if="user.tipo == 4"
                        class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                        {{ ca.conta }}</td>
                    <td @click="detailsCamera(ca.id)"
                        class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                        {{ ca.descricao }}</td>
                    <td @click="detailsCamera(ca.id)" v-if="user.tipo == 4"
                        class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                        {{ ca.criadopor }}</td>
                    <td @click="detailsCamera(ca.id)"
                        class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                        {{ ca.serial }}</td>

                    <td @click="detailsCamera(ca.id)"
                        class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                        <span v-for="e in empresas" :key="e.id">{{ ca.empresa === e.id ? e.nome : '' }}</span>
                    </td>

                    <td @click="detailsCamera(ca.id)"
                        class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                        <template v-if="ca.is_active">
                            <div class="flex items-center">
                                <div class="h-2.5 w-2.5 rounded-full                     bg-green-500 mr-2"></div> Sim
                            </div>
                        </template>
                        <template v-else>
                            <div class="flex items-center">
                                <div class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div> Não
                            </div>
                        </template>
                    </td>
                    <td class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                        <button @click="detailsCamera(ca.id)" class="btn">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                        <button @click="deleteCamera(ca.id)" class="btn">
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
            <span class="mx-4 text-xd font-semibold text-blue-700">Total:</span> {{ total }}
        </div>
    </div>
</template>

<script>
import http from '../../services/http.js'
import router from '../../router'
import Filtro from '../../components/Filtro.vue'
import { useAuth } from '../../stores/auth.js'
import { ref } from 'vue'

const auth = useAuth();

export default {
    components: {
        Filtro
    },
    data() {
        return {
            idsForDelete: [],
            items: {},
            titleBtn: "mostrar filtro avançado",
            isVisible: false,
            user: {},
            cameras: [],
            empresas: [],
            contas: [],
            offset: 0,
            limit: 5,
            pages: [],
            total: 0,
            filter: {
                search: '',
                departamento: 0,
                departamentoSensor: 0,
                sensorgrupo: 0,
                empresa: 0,
                tipo: 0,
                is_active: "",
                conta: '',
                uf: ''
            }
        };
    },
    methods: {
        
checkAllItems(){
            const element = document.getElementById('checkAll')
            let arr = []
            if (element.checked){
                for(let x = 0; x < this.cameras.length; x++){
                   const e = document.getElementById('check' + this.cameras[x].id);
                   e.checked = true
                   arr.push(e.value)
                }
                
            } else {
                for(let i = 0; i < this.cameras.length; i++){
                   const e = document.getElementById('check' + this.cameras[i].id);
                   e.checked = false
                }
                arr = []
            }

            this.idsForDelete = arr
        },

deleteAllSelected() {
            this.items.items = this.idsForDelete
            this.$swal.fire({
                title: 'Deseja Realmente Excluir todos os selecionados?',
                text: "Essa ação não pode ser revertida!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Sim, Excluir!'
            }).then((result) => {
                if (result.isConfirmed) {
                    http.post('/cameras/itens/delete/', this.items)
                        .then(res => {
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
        getAll(i = null) {
            if (i) {
                this.offset = i
            }
            let search = ""
            if (this.filter.search != "") {
                search = `&search=${this.filter.search}`
                this.pages = []
            }
            let departamento = ""
            if (this.filter.departamentoSensor != 0) {
                departamento = `&departamento=${this.filter.departamentoSensor}`
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
            let conta = ""
            if (this.filter.conta != "") {
                conta = `&conta=${this.filter.conta}`
                this.pages = []
            }
            let empresa = ""
            if (this.filter.empresa != 0) {
                empresa = `&empresa=${this.filter.empresa}`
                this.pages = []
            }
            const url = `/cameras/?limit=${this.limit}&offset=${this.limit * this.offset}${search}${empresa}${conta}${is_active}${departamento}&ordering=-id`;
            http.get(url)
                .then(res => {
                    this.cameras = res.data.results
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
        mostrarSearch() {
            this.isVisible = !this.isVisible
            if (this.isVisible) {
                this.titleBtn = "ocultar filtro avançado"
            } else {
                this.titleBtn = "mostrar filtro avançado"
            }
        },
        changePage(i) {
            this.getAll(i);
            this.offset = 0
        },
        filtrar(payload) {
            this.filter = payload;
            this.getAll();
        },
        current() {
            return this.offset ? this.offset + 1 : 1;
        },
        deleteCamera(id) {
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
                    http.delete('/cameras/' + id)
                        .then(res => {
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
        async detailsCamera(id) {
            this.$router.push('/details-camera/' + id);

        },
        accessRoute(nameRoute) {
            router.push({ name: nameRoute })
        },
        getEmpresas() {
            let query = '?'
            if (this.user.tipo == 4) {
                query = `?conta=${this.user.conta}&`
            }
            const url = `/listaitens/empresa/lista${query}so_ativos=false`
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
        getContas() {
            http.get('listaitens/conta/lista?so_ativos=false')
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
        this.getAll();
        this.getEmpresas();
        this.chamadasGet();
    },
};
</script>

<style scoped></style>