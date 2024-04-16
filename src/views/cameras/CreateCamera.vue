<template>
    <div>
        <h3 class="detalhes">CADASTRO DE CAMERAS</h3>
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
                            Cadastrar camera
                        </a>
                    </li>
                    <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                            v-on:click="toggleTabs(2)"
                            v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 2, 'text-white bg-gray-800': openTab === 2 }">
                            agendamento
                        </a>
                    </li>

                </ul>
                <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div class="px-4 py-5 flex-auto">
                        <div class="tab-content tab-space">
                            <div v-bind:class="{ 'hidden': openTab !== 1, 'block': openTab === 1 }">
                                <form class="row g-3" v-on:submit.prevent="createCamera(formData)">
                                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titulo</label>
                                            <input type="text" v-model="formData.titulo" class="edit-form"
                                                placeholder="" required>
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
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Empresa</label>
                                            <select v-model="formData.empresa" class="edit-form">
                                                <option value="" disabled selected>Escolha a empresa</option>
                                                <option v-for="e in empresas" :key="e.id" :value="e.id">{{ e.nome }}
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Serial</label>
                                            <input type="text" v-model="formData.serial" class="edit-form"
                                                placeholder="">
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Protocolo</label>
                                            <input type="text" v-model="formData.protocolo" class="edit-form"
                                                placeholder="">
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">URL</label>
                                            <input type="text" v-model="formData.url" class="edit-form" placeholder="">
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuário</label>
                                            <input type="text" v-model="formData.usuario" class="edit-form"
                                                placeholder="">
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                                            <input type="password" v-model="formData.senha" class="edit-form"
                                                placeholder="">
                                        </div>

                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grupo</label>
                                            <select v-model="formData.grupo" class="edit-form">
                                                <option value="" disabled selected>Escolha um</option>
                                                <option v-for="gc in grupocameras" :key="gc.id" :value="gc.id">{{
                                gc.nome
                            }}
                                                </option>
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
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gateway
                                                IOT</label>
                                            <select v-model="formData.gatewayiot" class="edit-form" required>
                                                <option value="" disabled selected>Escolha um</option>
                                                <option v-for="v in gatewayiot" :key="v.id" :value="v.id">{{ v.titulo
                                                    }}
                                                </option>
                                            </select>
                                        </div>

                                    </div>
                                    <button type="submit"
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Salvar</button>
                                    <button type="button" @click="cancelar()"
                                        class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">Cancelar</button>
                                </form>
                            </div>
                            <div v-bind:class="{ 'hidden': openTab !== 2, 'block': openTab === 2 }">
                                <form class="row g-3" v-on:submit.prevent="createAgendamento(formDataAgend)">
                                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                                        <div v-if="user.tipo == 4">
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Conta</label>
                                            <select v-model="formDataAgend.conta" class="edit-form"
                                                @change="escolherConta()" disabled>
                                                <option value="" disabled selected>Escolha a conta</option>
                                                <option v-for="c in contas" :key="c.id" :value="c.conta">{{ c.conta }}
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID
                                                Camera</label>
                                            <input disabled type="text" v-model="formDataAgend.camera" class="edit-form"
                                                placeholder="" required>
                                        </div>

                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Título</label>
                                            <input type="text" v-model="formDataAgend.titulo" class="edit-form"
                                                placeholder="" required>
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
                                            <textarea rows="4" v-model="formDataAgend.descricao" class="edit-form"
                                                placeholder=""></textarea>
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dias
                                                de Captura</label>
                                            <span v-for="d in diasSemana" :key="d.index"><input v-model="d.ativo"
                                                    @change="escolherDia()" type="checkbox"
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ml-2 my-auto">
                                                {{ d.dia }} </span>
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hora
                                                Início</label>
                                            <input type="text" v-model="formDataAgend.periodoinicio" class="edit-form"
                                                placeholder="08:00:00" required v-mask="'##:##:##'">
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hora
                                                Fim</label>
                                            <input type="text" v-model="formDataAgend.periodofim" class="edit-form"
                                                placeholder="12:00:00" required v-mask="'##:##:##'">
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Intervalo
                                                entre Capturas (minutos)</label>
                                            <input type="number" v-model="formDataAgend.intervaloentrecapturas"
                                                class="edit-form" placeholder="" required>
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantidade
                                                de Imagens</label>
                                            <input type="number" v-model="formDataAgend.quantidadedeimagem"
                                                class="edit-form" placeholder="" required>
                                        </div>
                                        <div>
                                            <label
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Intervalo
                                                entre Imagens (segundos)</label>
                                            <input type="number" v-model="formDataAgend.intervaloentreimagens"
                                                class="edit-form" placeholder="" required>
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
            formDataAgend: {
                id_camera: 0,
                serial_camera: '',
                conta: 0
            },
            empresas: [],
            inputS: 1,
            contas: [],
            openTab: 1,
            idCamera: 0,
            teste2: false,
            teste3: true,
            img: '',
            diasStr: "",
            grupocameras: [],
            departamentos: [],
            fabricantes: [],
            ativos: [],
            gatewayiot: [],
            modelos: [],

            diasSemana: [
                {
                    dia: "dom",
                    ativo: false,
                    value: 0,
                    indice: 0
                },
                {
                    dia: "seg",
                    ativo: false,
                    value: 0,
                    indice: 1
                },
                {
                    dia: "ter",
                    ativo: false,
                    value: 0,
                    indice: 2
                },
                {
                    dia: "qua",
                    ativo: false,
                    value: 0,
                    indice: 3
                },
                {
                    dia: "qui",
                    ativo: false,
                    value: 0,
                    indice: 4
                },
                {
                    dia: "sex",
                    ativo: false,
                    value: 0,
                    indice: 5
                },
                {
                    dia: "sab",
                    ativo: false,
                    value: 0,
                    indice: 6
                }

            ],

        };
    },
    methods: {
        createCamera(formD) {
            const result = Object.fromEntries(Object.entries(formD).filter(([_, v]) => v != ''))
            http.post('/cameras/', result)
                .then(res => {
                    this.formDataAgend.camera = res.data.id
                    this.formDataAgend.conta = formD.conta
                    this.idCamera = res.data.id
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
        getGatewayIot() {
            let query = '?'
            if (this.user.tipo == 4) {
                query = `?conta=${this.formData.conta}&`
            }

            const url = `/listaitens/gatewayiot/lista/${query}so_ativos=true`;
            http.get(url)
                .then(res => {
                    this.gatewayiot = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });

        },
        escolherDia() {
            let str = []
            for (let x = 0; x < this.diasSemana.length; x++) {
                if (this.diasSemana[x].ativo) {
                    str.push(this.diasSemana[x].dia)
                }
            }
            this.diasStr = str.toString()

        },
        cancelar() {
            this.$router.push('/cameras');
        },
        createAgendamento(form) {
            const x = {
                titulo: form.titulo,
                camera: form.camera,
                diascaptura: this.diasStr,
                periodoinicio: form.periodoinicio,
                periodofim: form.periodofim,
                intervaloentrecapturas: form.intervaloentrecapturas,
                quantidadeimagem: form.quantidadeimagem,
                intervaloentreimagens: form.intervaloentreimagens,
                conta: form.conta,
            }
            http.post('/cameras/' + this.idCamera + '/cameraagendas/', x)
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Camera criado com sucesso',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$router.push('/cameras');
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
        getDepartamentos() {
            let query = '?modulo=camera'
            if (this.user.tipo == 4) {
                query = `?conta=${this.formData.conta}&modulo=camera`
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
            let query = '?modulo=camera'
            if (this.user.tipo == 4) {
                query = `?conta=${this.formData.conta}&modulo=camera`
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
            let query = '?modulo=camera'
            if (this.user.tipo == 4) {
                query = `?conta=${this.formData.conta}&modulo=camera`
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

        getGrupos() {
            let query = ''
            if (this.user.tipo == 4) {
                query = `?conta=${this.formData.conta}`
            }
            const url = `/listaitens/cameragrupo/lista${query}&so_ativos=true`
            http.get(url)
                .then(res => {
                    this.grupocameras = res.data.results
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

        chamadasGet() {
            if (this.user.tipo == 4) {
                this.getContas();
            } else {
                this.getEmpresas();
                this.getDepartamentos();
                this.getFabricantes();
                this.getModelos();
                this.getAtivos();
                this.getGrupos();
                this.getGatewayIot();
            }

        },
        setUser() {
            const u = ref(auth.user)
            this.user = u.value
        },
        escolherConta() {
            this.getEmpresas();
            this.getDepartamentos();
            this.getFabricantes();
            this.getModelos();
            this.getAtivos();
            this.getGrupos();
            this.getGatewayIot();
        },

    },
    mounted() {
        this.setUser();
        this.chamadasGet();
    }
};
</script>


<style scoped></style>