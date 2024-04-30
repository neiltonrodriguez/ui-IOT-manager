<template>
    <!-- <div class="border py-5 px-5 border-gray-300 rounded-lg">
        <button type="button" @click="mostrarSearch()"
            class="px-4 w-full py-2 my-3 font-semibold text-sm bg-blue-700  hover:bg-blue-900 text-white rounded-md shadow-sm">{{
                titleBtn }}</button>
        <Filtro :isVisible="this.isVisible" @meu-evento="filtrar" :filterConta="true" :filterEmpresa="true"
            :filterGrupoSensor="true" :filterDepartamento="true" :filterStatus="true" />
    </div> -->
    <div class="shadow-sm overflow-hidden">
        <div class="py-4">
            <div>
                <label class="label-form">LISTA CUSTOMIZADA</label>
                <select v-model="lista" class="input-form" @change="mostrarLista(lista)">
                    <option value="" disabled selected>Escolha o tipo de lista</option>
                    <option v-for="list in listacustomizada" :value="list.id" :key="list.id">{{ list.label }}</option>

                </select>
            </div>
        </div>
        <div v-if="lista" class="container-fluid p-5">
            <form class="row g-3" v-on:submit.prevent="createLista(formData)">
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div v-if="user.tipo == 4">
                        <label class="label-form">Conta</label>
                        <select v-model="formData.conta" class="input-form">
                            <option value="" disabled selected>Escolha a conta</option>
                            <option v-for="c in contas" :key="c.id" :value="c.conta">{{ c.conta }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label class="label-form">Título</label>
                        <input type="text" v-model="formData.titulo" class="input-form" placeholder="" required>
                    </div>
                    <div>
                        <label class="label-form">Descrição</label>
                        <textarea rows="4" v-model="formData.descricao" class="input-form" placeholder=""></textarea>
                    </div>
                    <div class="flex my-5">

                        <span class="label-form" v-for="m in modulos" :key="m.id"><input @change="prepareArray()"
                                class="mx-3" v-model="mod" type="checkbox" :value="m.id">{{ m.nome
                            }}</span>

                    </div>

                </div>
                <button type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Salvar</button>
                <button :disabled="idsForDelete.length === 0" @click="deleteAllSelected()"
                    class="px-4 mx-3 py-2 font-semibold text-sm bg-red-800 disabled:bg-gray-300 text-white rounded-md shadow-sm">Deletar
                    Selecionados</button>
            </form>
            <table class="border-collapse table-fixed w-full text-sm">
                <thead>
                    <tr>
                        <th
                            class="border-b dark:border-slate-600 font-medium p-2 text-slate-400 dark:text-slate-200 text-left">
                            <input type="checkbox" id="checkAll" @click="checkAllItems()" :value="true">
                        </th>
                        <th
                            class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                            Título</th>

                        <th
                            class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                            Tipo de lista</th>
                        <th v-if="user.tipo == 4"
                            class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                            Conta</th>

                        <th v-if="user.tipo == 4"
                            class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                            Criado por</th>
                        <th
                            class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                            Habilitado</th>
                        <th
                            class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                            Ação</th>

                    </tr>
                </thead>
                <tbody class="bg-white dark:bg-slate-800">
                    <tr class="hover:bg-gray-100 cursor-pointer duration-200" v-for="li in listas" :key="li.id">
                        <td
                            class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                            <input type="checkbox" :id="'check' + li.id" :value="li.id" v-model="idsForDelete">
                        </td>
                        <td @click="detailsLista(li.id)"
                            class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                            {{ li.titulo }}</td>

                        <td @click="detailsLista(li.id)"
                            class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                            {{ li.tipolista }}</td>
                        <td @click="detailsLista(li.id)" v-if="user.tipo == 4"
                            class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                            {{ li.conta }}</td>
                        <td @click="detailsLista(li.id)" v-if="user.tipo == 4"
                            class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                            {{ li.criadopor }}</td>
                        <td @click="detailsLista(li.id)"
                            class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                            <template v-if="li.is_active">
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
                            <button @click="detailsLista(li.id)" class="btn">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                                    stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                            <button @click="deleteLista(li.id, li.tipolista)" class="btn">
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

    </div>
</template>

<script>
import http from '../../../services/http.js'
import router from '../../../router'
import { departamentoStore } from '../../../stores/departamentos.js'
import Filtro from '../../../components/Filtro.vue'
import { useAuth } from '../../../stores/auth.js'
import { ref } from 'vue'

const auth = useAuth();

const departamentoStorage = departamentoStore();

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
            lista: "",
            list: "",
            listas: [],
            listacustomizada: [],
            user: {},
            formData: {},
            departamentos: [],
            contas: [],
            offset: 0,
            limit: 10,
            pages: [],
            total: 0,
            mod: [],
            modString: "",
            modulos: [],
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
        

checkAllItems(){
            const element = document.getElementById('checkAll')
            let arr = []
            if (element.checked){
                for(let x = 0; x < this.listas.length; x++){
                   const e = document.getElementById('check' + this.listas[x].id);
                   e.checked = true
                   arr.push(e.value)
                }
                
            } else {
                for(let i = 0; i < this.listas.length; i++){
                   const e = document.getElementById('check' + this.listas[i].id);
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
                    http.post('/customlistas/itens/delete/', this.items)
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
        mostrarLista(lista) {
            this.list = lista
            this.getModulos(this.list);
            this.getAll();
            this.mod = [];
        },
        prepareArray() {
            let a = ''
            for (let i = 0; i < this.mod.length; i++) {
                if (this.mod.length == i + 1) {
                    a += `${this.mod[i]}`;
                } else {
                    a += `${this.mod[i]};`;
                }
            }
            this.modString = a
        },
        getAll(i = null) {
            if (i) {
                this.offset = i
            }
            // let search = ""
            // if (this.filter.search != "") {
            //     search = `&search=${this.filter.search}`
            //     this.pages = []
            // }
            const url = `/customlistas/${this.list}/lista/?limit=${this.limit}&offset=${this.limit * this.offset}&ordering=-id`;
            http.get(url)
                .then(res => {
                    this.listas = res.data.results
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
        current() {
            return this.offset ? this.offset + 1 : 1;
        },
        deleteLista(id, lista) {
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
                    http.delete('/customlistas/' + lista + '/lista/' + id + '/')
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
        async detailsLista(id) {
            this.$router.push('/details-lista/' + this.lista + '/' + id);

        },
        createLista(formData) {
            let form = ''
            if (this.user.tipo === 4) {
                form = {
                    titulo: formData.titulo,
                    descricao: formData.descricao,
                    conta: formData.conta,
                    modulos: this.modString,
                }
            } else {
                form = {
                    titulo: formData.titulo,
                    descricao: formData.descricao,
                    modulos: this.modString,
                }
            }

            const url = `/customlistas/${this.list}/lista/`
            http.post(url, form)
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: this.list + ' criado com sucesso',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.getAll();
                    this.formData = {
                        titulo: '',
                        descricao: ''
                    }
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        getModulos(lista) {
            http.get('/customlistas/' + lista + '/modulos/')
                .then(res => {
                    this.modulos = res.data.modulos
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
        filtrar(payload) {
            this.filter = payload;
            this.getAll();
        },
        current() {
            return this.offset ? this.offset + 1 : 1;
        },

        accessRoute(nameRoute) {
            router.push({ name: nameRoute })
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
        getListaCustomizada() {
            http.get('/customlistas/todos/tipos/')
                .then(res => {
                    this.listacustomizada = res.data
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
        this.chamadasGet();
        this.getListaCustomizada();
    },
};
</script>

<style scoped></style>