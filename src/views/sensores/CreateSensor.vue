<template>
    <div>
        <h3 class="detalhes">CADASTRO DE SENSORES</h3>
    </div>
    <div class="divide-x my-5">
        <hr>
    </div>
    <div class="container-fluid p-5">
        <div class="flex flex-wrap">
            <div class="w-full">
                <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
                    <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                            v-on:click="toggleTabs(1)"
                            v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 1, 'text-white bg-gray-800': openTab === 1 }">
                            Cadastrar sensor
                        </a>
                    </li>
                    <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                            v-on:click="toggleTabs(2)"
                            v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 2, 'text-white bg-gray-800': openTab === 2 }">
                            sensor scripts
                        </a>
                    </li>

                </ul>
                <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div class="px-4 py-5 flex-auto">
                        <div class="tab-content tab-space">
                            <div v-bind:class="{ 'hidden': openTab !== 1, 'block': openTab === 1 }">
                                <form class="row g-3" v-on:submit.prevent="createSensor(formData)">
                                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                                            <input type="text" v-model="formData.nome" class="edit-form" placeholder=""
                                                required>
                                        </div>
                                        <div v-if="user.tipo == 4">
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Conta</label>
                                            <select v-model="formData.conta" class="edit-form"
                                                @change="escolherConta()">
                                                <option value="" disabled selected>Escolha a conta</option>
                                                <option v-for="c in contas" :key="c.id" :value="c.conta">{{ c.conta }}
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
                                            <textarea rows="4" v-model="formData.descricao" class="edit-form"
                                                placeholder=""></textarea>
                                        </div>

                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Serial</label>
                                            <input type="text" v-model="formData.serial" class="edit-form"
                                                placeholder="" required>
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Empresa</label>
                                            <select v-model="formData.empresa" class="edit-form">
                                                <option value="" disabled selected>Escolha a empresa</option>
                                                <option v-for="e in empresas" :key="e.id" :value="e.id">{{ e.nome }}
                                                </option>
                                            </select>
                                        </div>


                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grupo</label>
                                            <select v-model="formData.grupo" class="edit-form">
                                                <option value="" disabled selected>Escolha um</option>
                                                <option v-for="sg in sensorgrupos" :key="sg.id" :value="sg.id">{{
                                                    sg.nome }}</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Departamento</label>
                                            <select v-model="formData.departamento" class="edit-form">
                                                <option value="" disabled selected>Escolha um</option>
                                                <option v-for="dp in departamentos" :key="dp.id" :value="dp.id">{{
                                                    dp.titulo
                                                    }}
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fabricante</label>
                                            <select v-model="formData.fabricante" class="edit-form">
                                                <option value="" disabled selected>Escolha um</option>
                                                <option v-for="f in fabricantes" :key="f.id" :value="f.id">{{ f.titulo
                                                    }}
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Modelo</label>
                                            <select v-model="formData.modelo" class="edit-form">
                                                <option value="" disabled selected>Escolha um</option>
                                                <option v-for="m in modelos" :key="m.id" :value="m.id">{{ m.titulo
                                                    }}
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ativos</label>
                                            <select v-model="formData.ativo" class="edit-form">
                                                <option value="" disabled selected>Escolha um</option>
                                                <option v-for="v in ativos" :key="v.id" :value="v.id">{{ v.nome
                                                    }}
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">GateWay</label>
                                            <select v-model="formData.gatewayiot" class="edit-form" required>
                                                <option value="" disabled selected>Escolha um</option>
                                                <option v-for="g in gateways" :key="g.id" :value="g.id">{{ g.titulo
                                                    }}
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo</label>
                                            <select required v-model="formData.tipo" @change="getAtributosTipoSensor()"
                                                class="edit-form">
                                                <option value="" disabled selected>Escolha um</option>
                                                <option v-for="t in tipos" :key="t.id" :value="t.id">{{ t.nome
                                                    }}
                                                </option>
                                            </select>
                                        </div>
                                        <div v-if="valorRefs.valor_ref1.label !== ''">
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                                                valorRefs.valor_ref1.label }}</label>
                                            <input type="text" v-model="formData.valor_ref1" class="edit-form"
                                                placeholder="" required>
                                        </div>
                                        <div v-if="valorRefs.valor_ref2.label !== ''">
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                                                valorRefs.valor_ref2.label }}</label>
                                            <input type="text" v-model="formData.valor_ref2" class="edit-form"
                                                placeholder="" required>
                                        </div>
                                        <div v-if="valorRefs.valor_ref3.label !== ''">
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                                                valorRefs.valor_ref3.label }}</label>
                                            <input type="text" v-model="formData.valor_ref3" class="edit-form"
                                                placeholder="" required>
                                        </div>
                                        <div v-if="valorRefs.valor_ref4.label !== ''">
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                                                valorRefs.valor_ref4.label }}</label>
                                            <input type="text" v-model="formData.valor_ref4" class="edit-form"
                                                placeholder="" required>
                                        </div>
                                        <div v-if="valorRefs.valor_ref5.label !== ''">
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                                                valorRefs.valor_ref5.label }}</label>
                                            <input type="text" v-model="formData.valor_ref5" class="edit-form"
                                                placeholder="" required>
                                        </div>
                                        <div v-if="valorRefs.valor_ref6.label !== ''">
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                                                valorRefs.valor_ref6.label }}</label>
                                            <input type="text" v-model="formData.valor_ref6" class="edit-form"
                                                placeholder="" required>
                                        </div>
                                        <div v-if="valorRefs.valor_ref7.label !== ''">
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                                                valorRefs.valor_ref7.label }}</label>
                                            <input type="text" v-model="formData.valor_ref7" class="edit-form"
                                                placeholder="" required>
                                        </div>
                                        <div v-if="valorRefs.valor_ref8.label !== ''">
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                                                valorRefs.valor_ref8.label }}</label>
                                            <input type="text" v-model="formData.valor_ref8" class="edit-form"
                                                placeholder="" required>
                                        </div>
                                        <div v-if="valorRefs.valor_ref9.label !== ''">
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                                                valorRefs.valor_ref9.label }}</label>
                                            <input type="text" v-model="formData.valor_ref9" class="edit-form"
                                                placeholder="" required>
                                        </div>
                                        <div v-if="valorRefs.valor_ref10.label !== ''">
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
                                                valorRefs.valor_ref10.label }}</label>
                                            <input type="text" v-model="formData.valor_ref10" class="edit-form"
                                                placeholder="" required>
                                        </div>

                                    </div>
                                    <button type="submit"
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Salvar</button>
                                    <button type="button" @click="cancelar()"
                                        class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">Cancelar</button>
                                </form>
                            </div>
                            <div v-bind:class="{ 'hidden': openTab !== 2, 'block': openTab === 2 }">
                                <form class="row g-3" v-on:submit.prevent="createSensorScript(formDataSC)">
                                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Título</label>
                                            <input type="text" v-model="formDataSC.titulo" class="edit-form"
                                                placeholder="" required>
                                        </div>
                                        <div v-if="user.tipo == 4">
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Conta</label>
                                            <select v-model="formDataSC.conta" disabled class="edit-form">
                                                <option value="" disabled selected>Escolha a conta</option>
                                                <option v-for="c in contas" :key="c.id" :value="c.conta">{{ c.conta }}
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
                                            <textarea rows="4" v-model=" formDataSC.descricao" class="edit-form"
                                                placeholder="" required></textarea>
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Regra</label>
                                            <textarea rows="4" v-model="formDataSC.regra" class="edit-form"
                                                placeholder="" required></textarea>
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ação</label>
                                            <input type="text" v-model="formDataSC.acao" class="edit-form"
                                                placeholder="" required>
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enviar
                                                Notificação</label>
                                            <select @change="listarNotificacoes()" class="edit-form"
                                                v-model="formDataSC.enviar_notificacao">
                                                <option :value="true">Sim</option>
                                                <option :value="false">Não</option>
                                            </select>
                                        </div>
                                        <div v-if="mostrarNotificacoes">
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notificações</label>
                                            <select v-model="formDataSC.notificacao" class="edit-form">
                                                <option value="" disabled selected>Escolha a conta</option>
                                                <option v-for="c in notificacoes" :key="c.id" :value="c.id">{{
                                                    c.titulo }}
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alerta</label>
                                            <select class="edit-form" v-model="formDataSC.alerta">
                                                <option :value="0">Não alterar</option>
                                                <option :value="1">Gerar alerta</option>
                                                <option :value="2">Remover alerta</option>
                                            </select>
                                        </div>


                                    </div>
                                    <button type="submit"
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Salvar</button>
                                    <button type="button" @click="cancelar()"
                                        class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">Cancelar</button>
                                </form>
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
import { useAuth } from '../../stores/auth.js'
import { ref } from 'vue'

const auth = useAuth();

export default {
    data() {
        return {
            quantity: 10,
            formData: {
                departamento: '',
                grupo: '',
                tipo: '',
                fabricante: '',
                modelo: '',
                ativo: '',
                empresa: ''
            },
            user: {},
            formDataSC: {
                enviar_notificacao: false,
                notificacao: null
            },
            empresas: [],
            inputS: 1,
            sensorgrupos: [],
            tipos: [],
            fabricantes: [],
            modelos: [],
            departamentos: [],
            contas: [],
            openTab: 1,
            idSensor: 0,
            teste2: true,
            teste3: true,
            img: '',
            ativos: [],
            gateways: [],
            atributosTipoSensor: "",
            notificacoes: [],
            valorRefs: {
                valor_ref1: {
                    label: "",
                    parametro: ""
                },
                valor_ref2: {
                    label: "",
                    parametro: ""
                },
                valor_ref3: {
                    label: "",
                    parametro: ""
                },
                valor_ref4: {
                    label: "",
                    parametro: ""
                },
                valor_ref5: {
                    label: "",
                    parametro: ""
                },
                valor_ref6: {
                    label: "",
                    parametro: ""
                },
                valor_ref7: {
                    label: "",
                    parametro: ""
                },
                valor_ref8: {
                    label: "",
                    parametro: ""
                },
                valor_ref9: {
                    label: "",
                    parametro: ""
                },
                valor_ref10: {
                    label: "",
                    parametro: ""
                }
            },
            mostrarNotificacoes: false

        };
    },
    methods: {
        createSensor(formD) {
            const result = Object.fromEntries(Object.entries(formD).filter(([_, v]) => v != ''))
            http.post('/sensores/', result)
                .then(res => {
                    this.idSensor = res.data.id
                    this.formDataSC.conta = res.data.conta
                    this.teste2 = true
                    this.toggleTabs(2);
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        cancelar() {
            this.$router.push('/sensores');
        },
        createSensorScript(formDataSC) {
            const x = {
                titulo: formDataSC.titulo,
                descricao: formDataSC.descricao,
                regra: formDataSC.regra,
                acao: formDataSC.acao,
                enviar_notificacao: formDataSC.enviar_notificacao,
                alerta: formDataSC.alerta,
                notificacao: formDataSC.notificacao
            }
            http.post('/sensores/' + this.idSensor + '/sensorscripts/', x)
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Sensor criado com sucesso',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$router.push('/sensores');
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },

        toggleTabs: function (tabNumber) {
            if (tabNumber == 1) {
                this.openTab = tabNumber
            } else if (tabNumber == 2 && this.teste2) {
                this.openTab = tabNumber
            }


        },
        getAtributosTipoSensor() {
            const url = `sensortipos/${this.formData.tipo}/`
            http.get(url)
                .then(res => {
                    this.valorRefs = res.data.atributos
                    console.log(this.valorRefs)
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        listarNotificacoes(){
            if (this.formDataSC.enviar_notificacao) {
                this.mostrarNotificacoes = true
                this.getNotificacoes();
            } else {
                this.mostrarNotificacoes = false
            }
        },

        getNotificacoes() {
            let query = `?so_ativos=true`
            if (this.user.tipo == 4) {
                query = `?conta=${this.formDataSC.conta}&so_ativos=true`
            }
            const url = `/listaitens/notificacao/lista${query}`
            http.get(url)
                .then(res => {
                    this.notificacoes = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        getEmpresas() {
            let query = '?'
            if (this.user.tipo == 4) {
                query = `?conta=${this.formData.conta}&`
            }

            const url = `/listaitens/empresa/lista/${query}so_ativos=true`;
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
        getAtivos() {
            let query = `?conta=${this.user.conta}`
            if (this.user.tipo == 4) {
                query = `?conta=${this.formData.conta}`
            }
            http.get('/ativos' + query)
                .then(res => {
                    this.ativos = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        getGateway() {
            let query = `?conta=${this.user.conta}`
            if (this.user.tipo == 4) {
                query = `?conta=${this.formData.conta}`
            }
            const url = `/listaitens/gatewayiot/lista${query}&so_ativos=true`
            http.get(url)
                .then(res => {
                    this.gateways = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        getDepartamentos() {
            let query = '?modulo=sensor'
            if (this.user.tipo == 4) {
                query = `?conta=${this.formData.conta}&modulo=sensor`
            }
            const url = `/listaitens/departamento/lista${query}&so_ativos=true`
            http.get(url)
                .then(res => {
                    this.departamentos = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });

        },
        getFabricantes() {
            let query = '?modulo=sensor'
            if (this.user.tipo == 4) {
                query = `?conta=${this.formData.conta}&modulo=sensor`
            }

            http.get('/listaitens/fabricante/lista' + query + '&so_ativos=true')
                .then(res => {
                    this.fabricantes = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });

        },
        getModelos() {
            let query = '?modulo=sensor'
            if (this.user.tipo == 4) {
                query = `?conta=${this.formData.conta}&modulo=sensor`
            }
            const url = `/listaitens/modelo/lista${query}&so_ativos=true`
            http.get(url)
                .then(res => {
                    this.modelos = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });

        },
        getTiposSensores() {
            let query = ''
            if (this.user.tipo == 4) {
                query = `?conta=${this.formData.conta}`
            }
            http.get('/listaitens/sensortipo/lista' + query + '&so_ativos=true')
                .then(res => {
                    this.tipos = res.data.results
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
        getSensorGrupos() {
            let query = '?'
            if (this.user.tipo == 4) {
                query = `?conta=${this.formData.conta}&`
            }
            const url = `/listaitens/sensorgrupo/lista${query}so_ativos=true`
            http.get(url)
                .then(res => {
                    this.sensorgrupos = res.data.results
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
            } else {
                this.getEmpresas();
                this.getDepartamentos();
                this.getTiposSensores();
                this.getFabricantes();
                this.getModelos();
                this.getSensorGrupos();
                this.getAtivos();
                this.getGateway();
            }

        },
        setUser() {
            const u = ref(auth.user)
            this.user = u.value
        },
        escolherConta() {
            this.getEmpresas();
            this.getDepartamentos();
            this.getTiposSensores();
            this.getFabricantes();
            this.getModelos();
            this.getSensorGrupos();
            this.getAtivos();
            this.getGateway();
        },

    },
    mounted() {
        this.setUser();
        this.chamadasGet();
    }
};
</script>


<style scoped></style>