<template>
    <div>
        <h3 class="
detalhes">CADASTRO DE ATIVOS</h3>
    </div>
  
    <div class="container-fluid p-5">

        <form class="row g-3" v-on:submit.prevent="createAtivo(formData)">
            <div class="grid gap-3 mb-3 md:grid-cols-2">
                <div v-if="user.tipo == 4">
                    <label class="label-form">Conta</label>
                    <select v-model="formData.conta" class="input-form" @change="actionByAcount()">
                        <option value="" disabled selected>Escolha a conta</option>
                        <option v-for="c in contas" :key="c.id" :value="c.conta">{{ c.conta }}
                        </option>
                    </select>
                </div>
                <div>
                    <label class="label-form">Nome</label>
                    <input type="text" v-model="formData.nome" class="input-form" placeholder="" required>
                </div>
                <div>
                    <label class="label-form">Descrição</label>
                    <textarea rows="4" v-model="formData.descricao" class="input-form" placeholder=""></textarea>
                </div>
             
                <div>
                    <label class="label-form">Empresa</label>
                    <select v-model="formData.empresa"
                    class="input-form">
                        <option value="" disabled selected>Escolha a empresa</option>
                        <option v-for="e in empresas" :key="e.id" :value="e.id">{{ e.nome }}
                        </option>
                    </select>
                </div>
                <div>
                    <label class="label-form">Serial</label>
                    <input type="text" v-model="formData.serial" class="input-form" placeholder="" required>
                </div>
                <div>
                    <label class="label-form">Fabricante</label>
                    <select v-model="formData.fabricante"
                        class="input-form">
                        <option value="" disabled selected>Escolha o fabricante</option>
                        <option v-for="fb in fabricantes" :key="fb.id" :value="fb.id">{{ fb.titulo }}
                        </option>
                    </select>
                </div>
                <div>
                    <label class="label-form">Modelo</label>
                    <select v-model="formData.modelo"
                        class="input-form">
                        <option value="" disabled selected>Escolha o modelo</option>
                        <option v-for="md in modelos" :key="md.id" :value="md.id">{{ md.titulo }}
                        </option>
                    </select>
                </div>
                <div>
                    <label class="label-form">Departamento</label>
                    <select v-model="formData.departamento"
                        class="input-form">
                        <option value="" disabled selected>Escolha o departamento</option>
                        <option v-for="dp in departamentos" :key="dp.id" :value="dp.id">{{ dp.titulo }}
                        </option>
                    </select>
                </div>
                <div>
                    <label class="label-form">Grupo</label>
                    <select v-model="formData.grupo"
                        class="input-form">
                        <option value="" disabled selected>Escolha o grupo</option>
                        <option v-for="g in grupoativo" :key="g.id" :value="g.id">{{ g.nome }}
                        </option>
                    </select>
                </div>
                <div>
                    <label class="label-form">Tipo</label>
                    <select v-model="formData.tipo"
                        class="input-form">
                        <option value="" disabled selected>Escolha o tipo</option>
                        <option v-for="t in tipoativo" :key="t.id" :value="t.id">{{ t.nome }}
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
                modelo: '',
                fabricante: '',
                grupo: '',
                tipo: '',
                empresa: ''
            },
            user: {},
            formDataSC: {},
            isDisabled: false,
            contas: [],
            empresas: [],
            tipoativo: [],
            departamentos: [],
            modelos: [],
            fabricantes: [],
            grupoativo: [],
            openTab: 1,
            idSensor: 0,
            img: ''
        };
    },
    methods: {
        createAtivo(formD) {
            let formData = new FormData()
            formData.append('nome', formD.nome)
            if (this.user.tipo == 4) {
                formData.append('conta', formD.conta)
            }
            if (formD.empresa != "") {
                formData.append('empresa', formD.empresa)
            } 
            if (formD.departamento != "") {
                formData.append('departamento', formD.departamento)
            } 
            if (formD.grupo != "") {
                formData.append('grupo', formD.grupo)
            } 
            if (formD.tipo != "") {
                formData.append('tipo', formD.tipo)
            }
            if (formD.modelo != "") {
                formData.append('modelo', formD.modelo)
            } 
            if (formD.fabricante != "") {
                formData.append('fabricante', formD.fabricante)
            } 
            if (formD.descricao) {
                formData.append('descricao', formD.descricao)
            }
            formData.append('serial', formD.serial)
            const headers = { 'Content-Type': 'multipart/form-data' };
            http.post('/ativos/', formData, { headers })
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Ativo criado com sucesso',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$router.push('/ativos');
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        cancelar() {
            this.$router.push('/ativos');
        },
        uploadFile() {
            this.img = this.$refs.file.files[0];
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
        getTipoAtivo() {
            http.get('/ativotipos/')
                .then(res => {
                    this.tipoativo = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        getGrupoAtivos() {
            http.get('/ativogrupos/')
                .then(res => {
                    this.grupoativo = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        getDepartamentos() {
            let query = '?modulo=ativo'
            if (this.user.tipo == 4) {
                query = `?conta=${this.formData.conta}&modulo=ativo`
            }

            const url = `/listaitens/departamento/lista/${query}&so_ativos=true`;
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
        getModelos() {
            let query = '?modulo=ativo'
            if (this.user.tipo == 4) {
                query = `?conta=${this.formData.conta}&modulo=ativo`
            }

            const url = `/listaitens/modelo/lista/${query}&so_ativos=true`;
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
        getFabricantes() {
            let query = '?modulo=ativo'
            if (this.user.tipo == 4) {
                query = `?conta=${this.formData.conta}&modulo=ativo`
            }

            const url = `/listaitens/fabricante/lista/${query}&so_ativos=true`;
            http.get(url)
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
        getEmpresas() {
            let query = '?'
            if (this.user.tipo == 4) {
                query = `?conta=${this.formData.conta}&`
            }

            const url = `/listaitens/empresa/lista${query}so_ativos=true`;
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
        actionByAcount() {
            this.getDepartamentos();
            this.getModelos();
            this.getFabricantes();
            this.getEmpresas();
        },
        chamadasGet() {
            if (this.user.tipo == 4) {
                this.getContas();
            } else {
                this.getEmpresas();
                this.getDepartamentos();
                this.getModelos();
                this.getFabricantes();
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
        this.getTipoAtivo();
        this.getGrupoAtivos();

    }
};
</script>


<style scoped></style>