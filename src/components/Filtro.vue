<template>
    <div class="border py-5 px-5 border-gray-300 rounded-lg ">
        <form v-on:submit.prevent="enviarParaPai()">
            <div class="grid grid-cols-3 gap-4">
                <div>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" v-model="filter.search"
                            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="digite o termo da sua pesquisa">

                    </div>
                </div>
                <div v-if="filterEmpresa">
                    <div class="flex items-center  mx-8 my-2">
                        <select v-model="filter.empresa"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="0" disabled selected>Filtrar por empresa</option>
                            <option v-for="e in empresas" :key="e.id" :value="e.id">
                                {{ e.nome }}
                            </option>
                        </select>
                    </div>
                </div>
                <div v-if="filterUf">
                    <div class="flex items-center mx-8 my-2">
                        <select v-model="filter.uf"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="" disabled selected>Filtrar por UF</option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                        </select>
                    </div>
                </div>
                <div v-if="filterConta && user.tipo == 4">
                    <div class="flex items-center  mx-8 my-2">
                        <select v-model="filter.conta"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="" disabled selected>Filtrar por conta</option>
                            <option v-for="c in contas" :key="c.id" :value="c.conta">
                                {{ c.conta }}
                            </option>
                        </select>
                    </div>
                </div>
                <div v-if="filterDepartamentoAtivo">
                    <div class="flex items-center  mx-8 my-2">
                        <select v-model="filter.departamentoAtivo"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="0" disabled selected>Filtrar por departamento</option>
                            <option v-for="c in departamentoAtivos" :key="c.id" :value="c.id">
                                {{ c.titulo }}
                            </option>
                        </select>
                    </div>
                </div>
                <div v-if="filterDepartamentoSensor">
                    <div class="flex items-center  mx-8 my-2">
                        <select v-model="filter.departamentoSensor"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="0" disabled selected>Filtrar por departamento</option>
                            <option v-for="c in departamentoSensores" :key="c.id" :value="c.id">
                                {{ c.titulo }}
                            </option>
                        </select>
                    </div>
                </div>


                <div v-if="filterDepartamento">
                    <div class="flex items-center  mx-8 my-2">
                        <select v-model="filter.departamento"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="0" disabled selected>Filtrar por departamento</option>
                            <option value="1"> departamento 1</option>
                            <option value="2"> departamento 2</option>
                            <option value="3"> departamento 3</option>
                        </select>
                    </div>
                </div>
                <div v-if="filterTipo">
                    <div class="flex items-center  mx-8 my-2">
                        <select v-model="filter.tipo"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="0" disabled selected>Escolha uma tipo</option>
                            <option value="1">Usuarios/Grupos</option>
                            <option value="2">Sensores</option>
                        </select>
                    </div>
                </div>
                <div v-if="filterTipoUsuario">
                    <div class="flex items-center  mx-8 my-2">
                        <select v-model="filter.tipoUsuario"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="0" disabled selected>Tipo de usuário</option>
                            <option value="1">Comun</option>
                            <option value="2">Monitor</option>
                            <option value="3">Gerente</option>
                            <option v-if="user.tipo == 4" value="4">Administrador</option>
                        </select>
                    </div>
                </div>
                <div v-if="filterGrupoSensor">
                    <div class="flex items-center  mx-8 my-2">
                        <select v-model="filter.sensorgrupo"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="0" disabled selected>Filtrar por grupo de sensor</option>
                            <option v-for="sg in sensorgrupos" :key="sg.id" :value="sg.id">
                                {{ sg.nome }}
                            </option>
                        </select>
                    </div>
                </div>
                <div v-if="filterStatus">
                    <div class="flex items-center mx-auto px-10 py-5">
                        <input id="default-checkbox" type="checkbox" value="1" v-model="filter.is_active"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="default-checkbox"
                            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Filtrar
                            só ativos</label>
                    </div>

                </div>
            </div>
            <div class="mx-auto px-6 py-2">
                <button type="submit"
                    class="px-20 py-2 font-semibold text-sm bg-blue-700  hover:bg-blue-900 text-white rounded-md shadow-sm">Pesquisa</button>
                <span> </span>
                <button type="button" @click="limparFiltro()"
                    class="px-10 py-2 mx-4 font-semibold text-sm bg-red-700  hover:bg-blue-900 text-white rounded-md shadow-sm">Limpar
                    filtro</button>
            </div>
        </form>
    </div>
</template>


<script>
import http from '../services/http.js'
import router from '../router'
import { sensoresStore } from '../stores/sensores.js'
import { useAuth } from '../stores/auth.js'
import { ref } from 'vue'

const sensorStore = sensoresStore();
const auth = useAuth();

export default {
    props: {
        filterSearch: Boolean,
        filterConta: Boolean,
        filterEmpresa: Boolean,
        filterStatus: Boolean,
        filterDepartamento: Boolean,
        filterGrupoSensor: Boolean,
        filterUf: Boolean,
        filterTipo: Boolean,
        filterTipoUsuario: Boolean,
        filterDepartamentoAtivo: Boolean,
        filterDepartamentoSensor: Boolean,
    },
    data() {
        return {
            sensores: [],
            sensorgrupos: [],
            empresas: [],
            contas: [],
            user: {},
            departamentoAtivos: [],
            departamentoSensores: [],
            usuariogrupos: [],
            filter: {
                search: '',
                departamento: 0,
                departamentoAtivo: 0,
                departamentoSensor: 0,
                sensorgrupo: 0,
                empresa: 0,
                is_active: false,
                conta: '',
                tipo: 0,
                tipoUsuario: 0,
                uf: ''
            }
        };
    },
    methods: {
        enviarParaPai() {
            this.$emit('meu-evento', this.filter)
        },

        limparFiltro() {
            this.filter.search = '';
            this.filter.departamento = 0;
            this.filter.sensorgrupo = 0;
            this.filter.empresa = 0;
            this.filter.is_active = false;
            this.filter.conta = '';
            this.filter.tipo = 0;
            this.filter.tipoUsuario = 0;
            this.filter.uf = '';
            this.filter.departamentoAtivo = 0;
            this.enviarParaPai();
        },

        getEmpresas() {
            const url = `/listaitens/empresa/lista?so_ativos=false`
            http.get(url)
                .then(res => {
                    this.empresas = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                });

        },
        getSensorGrupos() {
            http.get('/sensorgrupos/')
                .then(res => {
                    this.sensorgrupos = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                });

        },
        getDepartamentoAtivos() {
            let query = '?modulo=ativo'
            if (this.user.tipo == 4) {
                query = `?conta=${this.user.conta}&modulo=ativo`
            }

            const url = `/listaitens/departamento/lista/${query}&so_ativos=false`;
            http.get(url)
                .then(res => {
                    this.departamentoAtivos = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        getDepartamentoSensores() {
            let query = '?modulo=sensor'
            if (this.user.tipo == 4) {
                query = `?conta=${this.user.conta}&modulo=sensor`
            }

            const url = `/listaitens/departamento/lista/${query}&so_ativos=false`;
            http.get(url)
                .then(res => {
                    this.departamentoSensores = res.data.results
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
                });
        },
        getGrupoUsuarios() {
            http.get('/usuariogrupos/')
                .then(res => {
                    this.usuariogrupos = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                });

        },
        setUser() {
            const u = ref(auth.user)
            this.user = u.value
        },
        chamadasGet() {
            if (this.user.tipo == 4) {
                this.getContas();
                this.getGrupoUsuarios();
            }
        }
    },
    mounted() {
        this.setUser();
        this.getEmpresas();
        this.getSensorGrupos();
        this.chamadasGet();
        this.getDepartamentoAtivos();
        this.getDepartamentoSensores();
    },
};
</script>

<style scoped></style>