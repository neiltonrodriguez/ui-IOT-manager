<template>
    <div>
        <h3 class="
detalhes">DETALHES DE ATIVOS</h3>
    </div>
  
    <div class="container-fluid p-5">

        <form class="row g-3" v-on:submit.prevent="store(ativo)">
            <div class="grid gap-6 mb-6 md:grid-cols-2">

                <div v-if="user.tipo == 4">
                    <label class="label-form">Conta</label>
                    <input type="text" v-model="ativo.conta" disabled
                        class="input-form"
                        placeholder="" required>
                </div>
                <div>
                    <label class="label-form">Empresa</label>
                    <select v-model="ativo.empresa" @change="habilitarSalvar()" class="input-form">
                        <option value="" disabled selected>Escolha a conta</option>
                        <option v-for="e in empresas" :key="e.id" :value="e.id">{{ e.nome }}
                        </option>
                    </select>
                </div>
                <div>
                    <label class="label-form">Nome</label>
                    <input type="text" v-model="ativo.nome" v-on:keyup="habilitarSalvar()"
                        class="input-form"
                        placeholder="" required>
                </div>
                <div>
                    <label class="label-form">Descrição</label>
                    <textarea rows="4" v-model="ativo.descricao" v-on:keyup="habilitarSalvar()"
                        class="input-form"
                        placeholder=""></textarea>
                </div>
                <div>
                    <label class="label-form">Serial</label>
                    <input type="text" v-model="ativo.serial" v-on:keyup="habilitarSalvar()"
                        class="input-form"
                        placeholder="" required>
                </div>
                <div>
                    <label class="label-form">Grupo</label>
                    <select v-model="ativo.grupo" @change="habilitarSalvar()" class="input-form">
                        <option value="" disabled selected>Escolha o grupo</option>
                        <option v-for="g in grupoativo" :key="g.id" :value="g.id">{{ g.nome }}
                        </option>
                    </select>
                </div>
                <div>
                    <label class="label-form">Tipo</label>
                    <select v-model="ativo.tipo" @change="habilitarSalvar()" class="input-form">
                        <option value="" disabled selected>Escolha o tipo</option>
                        <option v-for="t in tipoativo" :key="t.id" :value="t.id">{{ t.nome }}
                        </option>
                    </select>
                </div>
                <div>
                    <label class="label-form">Habilitado</label>
                    <select v-model="ativo.is_active" class="input-form" @change="habilitarSalvar()">
                        <option :value="true">Sim</option>
                        <option :value="false">Não</option>
                    </select>
                </div>
                <div>
                    <label class="label-form">Fabricante</label>
                    <select v-model="ativo.fabricante" @change="habilitarSalvar()" class="input-form">
                        <option value="" disabled selected>Escolha o fabricante</option>
                        <option v-for="fb in fabricantes" :key="fb.id" :value="fb.id">{{ fb.titulo }}
                        </option>
                    </select>
                </div>
                <div>
                    <label class="label-form">Modelo</label>
                    <select v-model="ativo.modelo" @change="habilitarSalvar()" class="input-form">
                        <option value="" disabled selected>Escolha o modelo</option>
                        <option v-for="md in modelos" :key="md.id" :value="md.id">{{ md.titulo }}
                        </option>
                    </select>
                </div>
                <div>
                    <label class="label-form">Departamento</label>
                    <select v-model="ativo.departamento" @change="habilitarSalvar()" class="input-form">
                        <option value="" disabled selected>Escolha o departamento</option>
                        <option v-for="dp in departamentos" :key="dp.id" :value="dp.id">{{ dp.titulo }}
                        </option>
                    </select>
                </div>

            </div>
            <button type="submit" v-bind:disabled="isDisabled"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  disabled:bg-gray-300">Salvar</button>
            <button type="button" @click="cancelar()"
                class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">Cancelar</button>
        </form>
    </div>
</template>
<script>
import http from '../../services/http.js'
import { ref } from 'vue'
import router from '../../router'
import { useAuth } from '../../stores/auth.js'

const auth = useAuth();

export default {
    data() {
        return {
            ativo: {},
            grupoativo: [],
            departamentos: [],
            modelos: [],
            fabricantes: [],
            tipoativo: [],
            empresas: [],
            user: {},
            isDisabled: true,
            contas: {}
        };
    },
    methods: {
        store(form) {
            const x = {
                nome: form.nome,
                descricao: form.descricao,
                serial: form.serial,
                departamento: form.departamento,
                fabricante: form.fabricante,
                modelo: form.modelo,
                tipo: form.tipo,
                grupo: form.grupo,
                is_active: form.is_active
            }
            http.put('/ativos/' + this.ativo.id + '/', x)
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Dados Atualizados',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    router.push({ name: 'ativos' })
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        habilitarSalvar() {
            this.isDisabled = false
        },
        cancelar() {
            this.$router.push('/ativos');
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
        getGrupoAtivo() {
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
        setAtivo() {
            http.get('/ativos/' + this.$route.params.id)
                .then(res => {
                    this.ativo = res.data
                    this.getDepartamentos();
                    this.getFabricantes();
                    this.getModelos();
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        editar() {
            this.isDisabled = !this.isDisabled
        },
        setUser() {
            const u = ref(auth.user)
            this.user = u.value
        },
        chamadasGet() {
            if (this.user.tipo == 4) {
                this.getContas();
            }
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
        getDepartamentos() {
            let query = '?modulo=ativo'
            if (this.user.tipo == 4) {
                query = `?conta=${this.ativo.conta}&modulo=ativo`
            }

            const url = `/listaitens/departamento/lista${query}&so_ativos=true`;
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
                query = `?conta=${this.ativo.conta}&modulo=ativo`
            }

            const url = `/listaitens/modelo/lista${query}&so_ativos=true`;
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
                query = `?conta=${this.ativo.conta}&modulo=ativo`
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
                query = `?conta=${this.user.conta}&`
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
    },
    mounted() {
        this.setUser();
        this.chamadasGet();
        this.getEmpresas();
        this.setAtivo();
        this.getTipoAtivo();
        this.getGrupoAtivo();
        
    }
}

</script>


<style scoped></style>