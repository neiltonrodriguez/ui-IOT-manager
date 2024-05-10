<template>
    <div>
        <Filtro @meu-evento="filtrar" :filterConta="true" :filterUf="true" :filterEmpresa="false"
            :filterGrupoSensor="false" :filterDepartamento="false" :filterStatus="true" :filterTipo="false" />
    </div>
    <div class="shadow-sm overflow-hidden my-2">
        <div class="py-4">
            <button @click="accessRoute('create-empresa')"
                class="px-4 py-2 font-semibold text-sm bg-blue-800 text-white rounded-md shadow-sm">Nova
                Empresa</button>
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
                        class="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        Logo</th>
                    <th
                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        Nome</th>
                    <th v-if="user.tipo == 4"
                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        Conta</th>
                    <th
                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        CNPJ</th>
                    <th
                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        Contato</th>
                    <th
                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        Cidade</th>
                    <th
                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        Telefone</th>
                    <th
                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                        Habilitado</th>
                   

                </tr>
            </thead>
            <tbody class="bg-white dark:bg-slate-800">
                <tr class="hover:bg-gray-100 cursor-pointer duration-200" v-for="e in empresas " :key="e.id">
                    <td class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                        <input type="checkbox" :id="'check' + e.id" :value="e.id" v-model="idsForDelete">
                    </td>
                    <td @click="detailsEmpresa(e.id)"
                        class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                        <template v-if="e.logo == null"><img class="rounded-lg shadow-md duration-200 hover:scale-105"
                                width="40" src="../../assets/img/sem-foto.png"> </template>
                        <template v-else>
                            <img class="rounded-lg shadow-md duration-200 hover:scale-105" :src="e.logo" width="40">
                        </template>
                    </td>
                    <td @click="detailsEmpresa(e.id)"
                        class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                        {{
                            e.nome }}</td>
                    <td @click="detailsEmpresa(e.id)" v-if="user.tipo == 4"
                        class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                        {{ e.conta }}</td>
                    <td @click="detailsEmpresa(e.id)"
                        class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                        {{ e.cnpj }}</td>
                    <td @click="detailsEmpresa(e.id)"
                        class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                        {{ e.contato }}</td>
                    <td @click="detailsEmpresa(e.id)"
                        class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                        {{ e.cidade }}</td>
                    <td @click="detailsEmpresa(e.id)"
                        class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                        {{ e.telefone1 }}</td>
                    <td @click="detailsEmpresa(e.id)"
                        class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                        <template v-if="e.is_active">
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
import { empresasStore } from '../../stores/empresas.js'
import Filtro from '../../components/Filtro.vue'
import { useAuth } from '../../stores/auth.js'
import { ref } from 'vue'

const auth = useAuth();

const empresaStore = empresasStore();

export default {
    components: {
        Filtro
    },
    data() {
        return {
            user: {},
            empresas: [],
            empresa: {},
            contas: {},
            offset: 0,
            limit: 10,
            pages: [],
            total: 0,
            idsForDelete: [],
            items: {},
            filter: {
                search: '',
                departamento: 0,
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

        checkAllItems() {
            const element = document.getElementById('checkAll')
            let arr = []
            if (element.checked) {
                for (let x = 0; x < this.empresas.length; x++) {
                    const e = document.getElementById('check' + this.empresas[x].id);
                    e.checked = true
                    arr.push(e.value)
                }
                
            } else {
                for (let i = 0; i < this.empresas.length; i++) {
                    const e = document.getElementById('check' + this.empresas[i].id);
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
                    http.post('/empresas/itens/delete/', this.items)
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
            let conta = ""
            if (this.filter.conta) {
                conta = `&conta=${this.filter.conta}`
                this.pages = []
            }
            const url = `/empresas/?limit=${this.limit}&offset=${this.limit * this.offset}${search}${uf}${is_active}${conta}&ordering=-id`;
            http.get(url)
                .then(res => {
                    this.empresas = res.data.results
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
        deleteEmpresa(id) {
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
                    http.delete('/empresas/' + id)
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
        async detailsEmpresa(id) {
            this.$router.push('/details-empresa/' + id);

        },
        setUser() {
            const u = ref(auth.user)
            this.user = u.value
        },
        accessRoute(nameRoute) {
            router.push({ name: nameRoute })
        },
        chamadasGet() {
            if (this.user.tipo == 4) {
                this.getContas();
            }
        }
    },
    mounted() {
        this.setUser();
        this.getAll();
        this.chamadasGet();
    },
};
</script>

<style scoped></style>