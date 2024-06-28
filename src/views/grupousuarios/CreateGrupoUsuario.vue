<template>
    <div>
        <h3 class="detalhes">CADASTRO DE GRUPO DE USUÁRIO</h3>
    </div>
  
    <div class="container-fluid p-5">
        <div class="flex flex-wrap">
            <div class="w-full">
                <ul class="flex mb-0 list-none flex-wrap flex-row">
                    <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                            v-on:click="toggleTabs(1)"
                            v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 1, 'text-white bg-gray-800': openTab === 1 }">
                            Cadastro do Grupo
                        </a>
                    </li>
                    <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                            v-on:click="toggleTabs(2)"
                            v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 2, 'text-white bg-gray-800': openTab === 2 }">
                            Permissões
                        </a>
                    </li>
                    <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                            v-on:click="toggleTabs(3)"
                            v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 3, 'text-white bg-gray-800': openTab === 3 }">
                            Membros
                        </a>
                    </li>
                    <li v-if="user.tipo == 4 && tipoGrupo == 4" class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                            v-on:click="toggleTabs(4)"
                            v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 4, 'text-white bg-gray-800': openTab === 4 }">
                            Contas gerenciadas
                        </a>
                    </li>

                </ul>
                <div class="relative flex flex-col min-w-0 break-words  w-full mb-6 shadow-lg rounded">
                    <div class="px-4 py-5 flex-auto">
                        <div class="tab-content tab-space">
                            <div v-bind:class="{ 'hidden': openTab !== 1, 'block': openTab === 1 }">
                                <form class="row g-3" v-on:submit.prevent="createGrupoUsuario(formData)">
                                    <div class="grid gap-3 mb-3 md:grid-cols-2">
                                        <div>
                                            <label
                                                class="label-form">Nome</label>
                                            <input type="text" v-model="formData.nome" v-bind:disabled="isDisabled"
                                                class="input-form"
                                                placeholder="" required>
                                        </div>
                                        <div v-if="user.tipo == 4">
                                            <label
                                                class="label-form">Conta</label>
                                            <select v-model="formData.conta" required v-bind:disabled="isDisabled"
                                                class="input-form">
                                                <option value="" disabled selected>Escolha a conta</option>
                                                <option v-for="c in contas" :key="c.id" :value="c.conta">{{ c.conta }}
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                class="label-form">Tipo
                                                de usuário</label>
                                            <select v-model="formData.tipo" v-bind:disabled="isDisabled" required
                                                class="input-form">
                                                <option value="0" disabled selected>Tipo de usuário</option>
                                                <option value="1">Monitor</option>
                                                <option value="2">Coordenador</option>
                                                <option value="3">Gerente</option>
                                                <option v-if="user.tipo == 4" value="4">Administrador</option>

                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                class="label-form">Descrição</label>
                                            <textarea rows="4" v-model="formData.descricao"
                                                v-bind:disabled="isDisabled"
                                                class="input-form"
                                                placeholder=""></textarea>
                                        </div>
                                    </div>
                                    <button type="submit" v-bind:disabled="isDisabled"
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Aplicar</button><span></span>
                                    <button type="button" @click="cancelar()"
                                        class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Cancelar</button>
                                </form>
                            </div>
                            <div v-bind:class="{ 'hidden': openTab !== 2, 'block': openTab === 2 }">
                                <Permissoes @muda-tab="recebeParamentroTab" :idGrupo="idGrupo" :tabNumber="openTab" />

                            </div>
                            <div v-bind:class="{ 'hidden': openTab !== 3, 'block': openTab === 3 }">
                                <div>
                                    <button type="button" @click="addUserForGroup()"
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Adicionar
                                        usuários selecionados a este grupo</button>
                                    <button type="button" @click="cancelar()"
                                        class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Voltar</button>
                                </div>
                                <div class="h-full border my-4 rounded-md px-2 py-2 grid grid-cols-2 gap-2">
                                    <div>
                                        <table class="border-collapse table-fixed w-400 text-sm">
                                            <thead>
                                                <tr>
                                                    <th
                                                        class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                        #</th>
                                                    <th
                                                        class="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                        ID</th>
                                                    <th
                                                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                        Nome completo</th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white dark:bg-slate-800">
                                                <tr v-for="u in usuarios" :key="u.id">
                                                    <td
                                                        class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                                        <input type="checkbox" v-model="ids" :value="u.id" />
                                                    </td>
                                                    <td
                                                        class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                                                        {{
                                                            u.id }}</td>
                                                    <td
                                                        class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                                                        {{ u.first_name ? u.first_name : u.nomecompleto }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="py-4">
                                            <button v-for="(page, index) in pages" :key="page"
                                                class="px-3 mx-1 py-2 text-sm bg-blue-700 hover:bg-blue-900 focus:bg-violet-700 text-white"
                                                :class="{ current: page === current }" @click="changePage(index)">
                                                {{ page }}
                                            </button>
                                            <span class="mx-4 text-xd font-semibold text-blue-700">total:</span> {{
                                                total }}
                                        </div>
                                    </div>
                                    <div class="border">
                                        <table class="border-collapse w-full text-sm">
                                            <thead>

                                            </thead>
                                            <tbody class="bg-white dark:bg-slate-800">
                                                <tr v-for="m in membros" :key="m.id">
                                                    <td
                                                        class="border-b border-slate-100 dark:border-slate-700 p-2 pr-3 text-slate-500 dark:text-slate-400">
                                                        {{ m.nomecompleto }}</td>
                                                    <td
                                                        class="border-b text-right border-slate-100 dark:border-slate-700 p-2 pr-3 text-slate-500 dark:text-slate-400">
                                                        <button type="button" class="mx-1 px-1"
                                                            @click="removeMembro(m.id)"><svg
                                                                xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                                class="w-6 h-6 hover:bg-red-100">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="py-4">
                                            <button v-for="(page, index) in pagesM" :key="page"
                                                class="px-3 mx-1 py-2 text-sm bg-blue-700 hover:bg-blue-900 focus:bg-violet-700 text-white"
                                                :class="{ current: page === currentM }" @click="changePageM(index)">
                                                {{ page }}
                                            </button>
                                            <span class="mx-4 text-xd font-semibold text-blue-700">total:</span> {{
                                                totalM }}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div v-bind:class="{ 'hidden': openTab !== 4, 'block': openTab === 4 }">
                                <div>
                                    <button type="button" @click="addAccountForGroup()"
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Adicionar
                                        contas gerenciadas este grupo</button>
                                    <button type="button" @click="cancelar()"
                                        class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Voltar</button>
                                </div>
                                <div class="h-full border my-4 rounded-md px-2 py-2 grid grid-cols-2 gap-2">
                                    <div>
                                        {{ contasStr }}
                                        {{ idGrupo }}
                                        <table class="border-collapse table-fixed w-400 text-sm">
                                            <thead>
                                                <tr>
                                                    <th
                                                        class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                        #</th>
                                                    <th
                                                        class="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                        ID</th>
                                                    <th
                                                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                        Título</th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white dark:bg-slate-800">
                                                <tr v-for="u in contasdisponiveis" :key="u.id">
                                                    <td
                                                        class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                                        <input :id="u.id" @change="prepareArray()" type="checkbox"
                                                            v-model="idContas" :value="u.id" />
                                                    </td>
                                                    <td
                                                        class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                                                        {{
                                                            u.id }}</td>
                                                    <td
                                                        class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                                                        {{ u.titulo }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="py-4">
                                            <button v-for="(page, index) in pages1" :key="page"
                                                class="px-3 mx-1 py-2 text-sm bg-blue-700 hover:bg-blue-900 focus:bg-violet-700 text-white"
                                                :class="{ current: page === current1 }" @click="changePage1(index)">
                                                {{ page }}
                                            </button>
                                            <span class="mx-4 text-xd font-semibold text-blue-700">total:</span> {{
                                                total1 }}
                                        </div>
                                    </div>
                                    <div class="border">
                                        <table class="border-collapse w-full text-sm">
                                            <thead>

                                            </thead>
                                            <tbody class="bg-white dark:bg-slate-800">
                                                <tr v-for="(u, index) in contasgerenciadas" :key="u.id">
                                                    <td
                                                        class="border-b border-slate-100 dark:border-slate-700 p-2 pr-3 text-slate-500 dark:text-slate-400">
                                                        {{ u.titulo }}</td>
                                                    <td
                                                        class="border-b text-right border-slate-100 dark:border-slate-700 p-2 pr-3 text-slate-500 dark:text-slate-400">
                                                        <button type="button" class="mx-1 px-1"
                                                            @click="removeContaGerenciadas(index)"><svg
                                                                xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                                class="w-6 h-6 hover:bg-red-100">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import http from '../../services/http.js'
import Permissoes from '../../components/Permissoes.vue'
import { useAuth } from '../../stores/auth.js'
import { ref } from 'vue'

const auth = useAuth();

export default {
    components: {
        Permissoes
    },
    data() {
        return {
            formData: {},
            contasdisponiveis: [],
            contasgerenciadas: [],
            membros: {},
            idContas: [],
            user: {},
            permissoes: [],
            usuarios: {},
            idGrupo: 0,
            openTab: 1,
            ids: [],
            contas: [],
            isDisabled: false,
            offset: 0,
            limit: 5,
            pages: [],
            total: 0,
            teste3: false,
            teste2: false,
            teste4: true,
            tipoGrupo: 0,
            offsetM: 0,
            limitM: 5,
            pagesM: [],
            totalM: 0,
            pages1: [],
            offset1: 0,
            limit1: 5,
            pages1: [],
            total1: 0,
            contasStr: [],
            grupousuario: {}
        };
    },
    methods: {
        createGrupoUsuario(formData) {
            formData.tipo = parseInt(formData.tipo)
            http.post('/usuariogrupos/', formData)
                .then(res => {
                    this.idGrupo = res.data.id
                    this.grupousuario  = res.data
                    this.tipoGrupo = res.data.tipo
                    this.teste2 = true
                    this.toggleTabs(2);
                    this.editar();
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        async addUserForGroup() {
            const u = {
                usuarios: this.ids
            }
            await http.put('/usuariogrupos/' + this.idGrupo + '/membros/add/', u)
                .then(res => {
                    this.getMembros();
                    this.teste4 = true
                    this.getUsuarios();
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Membros adicionados ao grupo selecionado',
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
        prepareArray() {
            let arr = []
            for (let x = 0; x < this.contasdisponiveis.length; x++) {
                const element = document.getElementById(this.contasdisponiveis[x].id)
                if (element.checked) {
                    if (arr.includes(this.contasdisponiveis[x].id)) {
                        let index = arr.indexOf(this.contasdisponiveis[x].id);
                        arr.splice(index)
                    }
                    arr.push(this.contasdisponiveis[x])
                } else {
                    if (arr.includes(this.contasdisponiveis[x].id)) {
                        let index = arr.indexOf(this.contasdisponiveis[x].id);
                        arr.splice(index)
                    }
                }
            }
            this.contasStr = arr
            this.isDisabled = false
        },
        async addAccountForGroup() {
            this.prepareArray();
            let contas = this.contasgerenciadas
            contas.push(...this.contasStr)
            const u = {
                is_active: this.grupousuario.is_active,
                contasgerenciadas: this.contasStr
            }

            console.log(u)
            await http.put('/usuariogrupos/' + this.grupousuario.id + '/', u)
                .then(res => {
                    // this.getMembros();
                    this.getContasDisponiveis();
                    this.contasStr = []
                    this.$swal.fire({
                        icon: 'success',
                        title: 'contas adicionadas ao grupo selecionado',
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
        removeContaGerenciadas(index) {
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
                    const u = {
                        is_active: this.grupousuario.is_active,
                        contasgerenciadas: this.contasgerenciadas
                    }
                    u.contasgerenciadas.splice(index, 1)
                    http.put('/usuariogrupos/' + this.grupousuario.id + '/', u)
                        .then(res => {
                            this.getContasDisponiveis();
                            this.contasStr = []
                            this.$swal.fire({
                                icon: 'success',
                                title: 'Deletado com sucesso',
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
        getContasGerenciadas(i = null) {
            if (i) {
                this.offset1 = i
            }
            const url = `/usuariogrupos/${this.idGrupo}/?limit=${this.limit1}&offset=${this.limit1 * this.offset1}&ordering=-id`;
            http.get(url)
                .then(res => {
                    this.contasgerenciadas = res.data.results.contasgerenciadas

                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        current() {
            return this.offset ? this.offset + 1 : 1;
        },
        changePage(i) {
            this.getUsuarios(i);
            this.offset = 0
        },
        currentM() {
            return this.offsetM ? this.offsetM + 1 : 1;
        },
        changePageM(i) {
            this.getMembros(i);
            this.offsetM = 0
        },
        current1() {
            return this.offset1 ? this.offset1 + 1 : 1;
        },
        changePage1(i) {
            this.getContasDisponiveis(i);
            this.offset1 = 0
        },
        editar() {
            this.isDisabled = !this.isDisabled
        },
        toggleTabs: function (tabNumber) {
            console.log(tabNumber)
            console.log(this.tipoGrupo)
            console.log(this.teste4)
            if (tabNumber == 3 && this.teste3) {
                this.getUsuarios();
                this.getMembros();
                this.openTab = tabNumber
            } else if (tabNumber == 2 && this.teste2) {
                this.openTab = tabNumber
            } else if (tabNumber == 1) {
                this.openTab = tabNumber
            } else if (tabNumber == 4 && this.teste4 && this.tipoGrupo == 4) {
                this.getContasDisponiveis();
                this.getContasGerenciadas();
                this.openTab = tabNumber
            }
        },
        recebeParamentroTab(payload) {
            this.teste3 = true
            this.toggleTabs(payload);
        },
        cancelar() {
            this.$router.push('/grupousuarios');
        },
        getMembros(i = null) {
            if (i) {
                this.offsetM = i
            }
            const url = `/usuariogrupos/${this.idGrupo}/membros/?limit=${this.limitM}&offset=${this.limitM * this.offsetM}&ordering=-id`;
            http.get(url)
                .then(res => {
                    this.membros = res.data.results
                    this.totalM = res.data.count
                    const qty = Math.ceil(this.totalM / this.limitM);
                    if (qty <= 1) return [1];
                    this.pagesM = Array.from(Array(qty).keys(), (i) => i + 1);
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        getUsuarios(i = null) {
            if (i) {
                this.offset = i
            }
            let tipo = `&tipo=${this.tipoGrupo}`

            const url = `/usuariogrupos/${this.idGrupo}/udisponiveis/?limit=${this.limit}&offset=${this.limit * this.offset}${tipo}&ordering=-id`;
            http.get(url)
                .then(res => {
                    this.usuarios = res.data.results
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
        getContasDisponiveis(i = null) {
            if (i) {
                this.offset1 = i
            }
            const url = `/usuariogrupos/${this.idGrupo}/?limit=${this.limit1}&offset=${this.limit1 * this.offset1}&ordering=-id`;
            http.get(url)
                .then(res => {
                    this.contasdisponiveis = res.data.contasdisponiveis
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        removeMembro(id) {
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
                    const u = {
                        usuarios: []
                    }
                    u.usuarios.push(id)
                    http.put('/usuariogrupos/' + this.idGrupo + '/membros/remove/', u)
                        .then(res => {
                            this.getMembros(0);
                            this.getUsuarios();
                            this.$swal.fire(
                                'Deletado!',
                                'deletado com sucesso.',
                                'success'
                            )
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
    }
};
</script>


<style scoped></style>