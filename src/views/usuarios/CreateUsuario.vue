<template>
    <div>
        <h3 class="detalhes">CADASTRO DE USUARIO</h3>
    </div>
    <div class="divide-x my-5">
        <hr>
    </div>
    <div class="container-fluid p-5">
        <form class="row g-3" v-on:submit.prevent="createUsuario(formD)">
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div class="flex flex-col items-start">
                    <div class="flex flex-col items-center justify-center">
                        <img class="border-2 max-h-36 border-gray-500  shadow-md duration-200"
                            src="../../assets/img/sem-foto.png">
                        <div>
                            <label title="Click to upload" for="file"
                                class="bg-gray-200 py-1 text-sm font-semibold rounded-md px-5 cursor-pointer hover:bg-gray-300 duration-200">
                                Escolher imagem
                            </label>
                            <input @change="uploadFile()" hidden="" name="inputFoto" type="file" ref="file" id="file">
                        </div>
                        {{ img.name ? img.name : '' }}
                    </div>
                </div>
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Primeiro Nome</label>
                    <input type="text" v-model="formD.first_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="" required>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sobrenome</label>
                    <input type="text" v-model="formD.last_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="">
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" v-model="formD.email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="">
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Login</label>
                    <input type="text" v-model="formD.usuario"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="" required>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                    <input type="password" v-model="formD.password"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="********" required>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CPF</label>
                    <input type="contato" v-model="formD.cpf" v-mask="'###.###.###-##'"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="pessoa para contato">
                </div>

                <div v-if="user.tipo == 4">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Conta</label>
                    <select v-model="formD.conta" @change="ActionByAccount()" required
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled selected>Escolha a conta</option>
                        <option v-for="c in contas" :key="c.id" :value="c.conta">{{ c.conta }}</option>
                    </select>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Empresa</label>
                    <select v-model="formD.empresa"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled selected>Escolha o empresa</option>
                        <option v-for="ep in empresas" :key="ep.id" :value="ep.id">{{ ep.nome }}
                        </option>
                    </select>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo
                        de usuário</label>
                    <select v-model="formD.tipo" required
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="0" disabled selected>Tipo de usuário</option>
                        <option value="1">Comun</option>
                        <option value="2">Monitor</option>
                        <option value="3">Gerente</option>
                        <option v-if="user.tipo == 4" value="4">Administrador</option>

                    </select>
                </div>
                <div>
                    <label class="label-form">Habilitado</label>
                    <select v-model="formD.is_active" disabled class="edit-form" @change="habilitarSalvar()">
                        <option :value="true" selected>Sim</option>
                        <option :value="false">Não</option>
                    </select>
                </div>
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone
                        1</label>
                    <input type="text" v-model="formD.telefone1" v-mask="['(##) ####-####', '(##) #####-####']"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="">
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone
                        2</label>
                    <input type="text" v-model="formD.telefone2" v-mask="['(##) ####-####', '(##) #####-####']"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="">
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cep</label>
                    <input @blur="buscarCep()" type="text" v-model="formD.cep" v-mask="'##.###-###'"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="">
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Endereço</label>
                    <input type="text" v-model="formD.logradouro"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="">
                </div>
            </div>
            <div class="mb-6">

            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-3">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bairro</label>
                    <input type="text" v-model="formD.bairro"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="">
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cidade</label>
                    <input type="text" v-model="formD.cidade"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="">
                </div>
                <div>
                    <label for="confirm_password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</label>
                    <select v-model="formD.uf"
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
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Complemento</label>
                    <select v-model="formD.complemento"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled selected>Escolha o complemento</option>
                        <option v-for="cp in complementos" :key="cp.id" :value="cp.id">{{ cp.titulo }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="confirm_password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Número</label>
                    <input type="text" v-model="formD.numero"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="">
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Departamento</label>
                    <select v-model="formD.departamento"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled selected>Escolha o departamento</option>
                        <option v-for="dp in departamentos" :key="dp.id" :value="dp.id">{{ dp.titulo }}
                        </option>
                    </select>
                </div>

            </div>

            <button type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cadastrar</button>
            <button type="button" @click="cancelar()"
                class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">Cancelar</button>
        </form>
    </div>
</template>
<script>
import http from '../../services/http.js'
import { useAuth } from '../../stores/auth.js'
import { ref } from 'vue'
import axios from 'axios'

const auth = useAuth();

export default {
    data() {
        return {
            formD: {
                empresa: "",
                departamento: "",
                complemento: "",
                is_active: true
            },
            user: {},
            img: '',
            empresas: [],
            departamentos: [],
            complementos: [],
            contas: [],
            formData: {
                conta: 'ct_system',
                tipo: 4
            },
            isDisabled: false
        };
    },
    methods: {
        createUsuario(formD) {
            let formData = new FormData()
            formData.append('foto', this.img)
            formData.append('first_name', formD.first_name)
            formData.append('last_name', formD.last_name)
            formData.append('email', formD.email)
            formData.append('usuario', formD.usuario)
            formData.append('password', formD.password)
            formData.append('cpf', formD.cpf)
            if (this.user.tipo == 4) {
                formData.append('conta', formD.conta)
            }
            if (formD.empresa != "") {
                formData.append('empresa', formD.empresa)
            }

            formData.append('tipo', formD.tipo)
            formData.append('telefone1', formD.telefone1)
            formData.append('telefone2', formD.telefone2)
            formData.append('cep', formD.cep)
            formData.append('logradouro', formD.logradouro)
            formData.append('bairro', formD.bairro)
            formData.append('cidade', formD.cidade)
            formData.append('uf', formD.uf)
            formData.append('numero', formD.numero)
            if (formD.complemento != "") {
                formData.append('complemento', formD.complemento)
            }
            if (formD.departamento != "") {
                formData.append('departamento', formD.departamento)
            }
            const headers = { 'Content-Type': 'multipart/form-data' };
            http.post('/usuarios/', formData, { headers })
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Usuário criado com sucesso',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$router.push('/usuarios');
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        
        uploadFile() {
            this.img = this.$refs.file.files[0];
        },
        cancelar() {
            this.$router.push('/usuarios');
        },
        buscarCep() {
            let cep = this.formD.cep
            let cepSemCaracteres = cep.replace("-", "").replace(".", "");
            axios.get('http://viacep.com.br/ws/' + cepSemCaracteres + '/json/')
                .then(data => {
                    this.formD.logradouro = data.data.logradouro,
                        this.formD.bairro = data.data.bairro,
                        this.formD.complemento = data.data.complemento,
                        this.formD.cidade = data.data.localidade,
                        this.formD.uf = data.data.uf
                }).catch(e => {
                    console.log(e);
                });
        },
        getContas() {
            http.get('/listaitens/conta/lista?so_ativos=true')
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
        setUser() {
            const u = ref(auth.user)
            this.user = u.value
        },
        ActionByAccount() {
            this.getDepartamentos();
            this.getComplementos();
            this.getEmpresas();
        },
        getDepartamentos() {
            let query = '?modulo=usuario'
            if (this.user.tipo == 4) {
                query = `?conta=${this.formD.conta}&modulo=usuario`
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
        getEmpresas() {
            let query = '?'
            if (this.user.tipo == 4) {
                query = `?conta=${this.formD.conta}&`
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
        getComplementos() {
            let query = '?modulo=usuario'
            if (this.user.tipo == 4) {
                query = `?conta=${this.formD.conta}&modulo=usuario`
            }

            const url = `/listaitens/complemento/lista${query}&so_ativos=true`;
            http.get(url)
                .then(res => {
                    this.complementos = res.data.results
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
                this.getDepartamentos();
                this.getComplementos();
                this.getEmpresas();
            }
        }
    },
    mounted() {
        this.setUser();
        this.chamadasGet();
    }
};
</script>


<style scoped></style>