<template>
    <div>
        <h3 class="detalhes">DETALHES PERFIL</h3>
    </div>
  
    <div class="container-fluid p-5">

        <form class="row g-3" v-on:submit.prevent="store(perfil)">
            <div class="grid gap-3 mb-3 md:grid-cols-2">
                <div class="flex flex-col items-start">
                    <div class="flex flex-col items-center justify-center">
                        <template v-if="perfil.foto == null && img == ''">
                            <img class="max-h-28 rounded-lg border-gray-500  shadow-md duration-200"
                                src="../../assets/img/sem-foto.png">
                        </template>
                        <template v-else-if="img">
                            <img id="img-empresa" class="max-h-28 rounded-lg border-gray-500  shadow-md duration-200"
                                :src="imagem">

                        </template>
                        <template v-else>
                            <img class="max-h-28 rounded-lg border-gray-500  shadow-md duration-200" :src="perfil.foto">

                        </template>
                        <div>
                            <label title="Click to upload" for="file"                              class="bg-gray-200 py-1 text-sm font-semibold rounded-md px-5 cursor-pointer hover:bg-gray-300 duration-200">
                                Escolher imagem
                            </label>
                            <input @change="uploadFile()" hidden="" name="inputFoto" type="file" ref="file" id="file">
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="grid gap-3 mb-3 md:grid-cols-2">
                <div>
                    <label class="label-form">Primeiro Nome</label>
                    <input type="text" v-model="perfil.first_name" v-on:keyup="habilitarSalvar()"
                        class="input-form"
                        placeholder="" required>
                </div>
                <div>
                    <label class="label-form">Sobrenome</label>
                    <input type="text" v-model="perfil.last_name" v-on:keyup="habilitarSalvar()"
                        class="input-form"
                        placeholder="">
                </div>
                <div>
                    <label class="label-form">Login</label>
                    <input type="text" v-model="perfil.usuario" disabled
                        class="input-form"
                        placeholder="">
                </div>
                <div v-if="perfil.origemusuario != 'ldap'">
                    <label class="label-form">Login</label>
                    <input type="password" v-model="perfil.password" disabled
                        class="input-form"
                        placeholder="">
                </div>
                <div>
                    <label class="label-form">Email</label>
                    <input type="email" v-model="perfil.email" disabled
                        class="input-form"
                        placeholder="">
                </div>
                <div>
                    <label class="label-form">Empresa</label>
                    <select v-model="perfil.empresa" disabled
                        class="bg-gray-50 border border-gray-300   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled selected>Escolha o empresa</option>
                        <option v-for="ep in empresas" :key="ep.id" :value="ep.id">{{ ep.nome }}
                        </option>
                    </select>
                </div>

                <div>
                    <label class="label-form">Telefone 1</label>
                    <input type="text" v-model="perfil.telefone1" v-on:keyup="habilitarSalvar()"
                        v-mask="['(##) ####-####', '(##) #####-####']"
                        class="input-form"
                        placeholder="">
                </div>
                <div>
                    <label class="label-form">Telefone 2</label>
                    <input type="text" v-model="perfil.telefone2" v-on:keyup="habilitarSalvar()"
                        v-mask="['(##) ####-####', '(##) #####-####']"
                        class="input-form"
                        placeholder="">
                </div>
                <div>
                    <label class="label-form">Cep</label>
                    <input type="text" v-model="perfil.cep" v-mask="'##.###-###'" v-on:keyup="habilitarSalvar()"
                        class="input-form"
                        placeholder="">
                </div>
                <div class="mb-6">
                    <div>
                        <label class="label-form">Endereço</label>
                        <input type="text" v-model="perfil.logradouro" v-on:keyup="habilitarSalvar()"
                            class="input-form"
                            placeholder="">
                    </div>
                </div>

                <div>
                    <label class="label-form">Bairro</label>
                    <input type="text" v-model="perfil.bairro" v-on:keyup="habilitarSalvar()"
                        class="input-form"
                        placeholder="">
                </div>
                <div>
                    <label class="label-form">Cidade</label>
                    <input type="text" v-model="perfil.cidade" v-on:keyup="habilitarSalvar()"
                        class="input-form"
                        placeholder="">
                </div>
                <div>
                    <label for="confirm_password"
                        class="label-form">Estado</label>
                    <select v-model="perfil.uf" @change="habilitarSalvar()"
                        class="input-form">
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
                    <label class="label-form">Comlemento</label>
                    <select v-model="perfil.complemento" @change="habilitarSalvar()"
                        class="input-form">
                        <option value="" disabled selected>Escolha o complemento</option>
                        <option v-for="cp in complementos" :key="cp.id" :value="cp.id">{{ cp.titulo }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="confirm_password"
                        class="label-form">Número</label>
                    <input type="text" v-model="perfil.numero" v-on:keyup="habilitarSalvar()"
                        class="input-form"
                        placeholder="">
                </div>
                <div>
                    <label class="label-form">Departamento</label>
                    <select v-model="perfil.departamento" disabled
                        class="bg-gray-50 border border-gray-300   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
import { useAuth } from '../../stores/auth.js'
import { ref } from 'vue'

const auth = useAuth();

export default {
    data() {
        return {
            perfil: {},
            user: {},
            isDisabled: true,
            departamentos: [],
            complementos: [],
            empresas: [],
            img: '',
            imagem: ''
        };
    },
    methods: {
        cancelar() {
            this.$router.push('/');
        },
        uploadFile() {
            this.isDisabled = false
            this.img = this.$refs.file.files[0];
            var reader = new FileReader();
            reader.onload = (e) => {
                this.imagem = e.target.result;
            }
            reader.readAsDataURL(this.$refs.file.files[0]);
            this.isDisabled = false
        },
        habilitarSalvar() {
            this.isDisabled = false
        },
        getEmpresas() {
            let query = '?'
            if (this.user.tipo == 4) {
                query = `?conta=${this.user.conta}&`
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
        store(formD) {
            let formData = new FormData()
            if (this.img) {
                formData.append('foto', this.img)
            }
            formData.append('first_name', formD.first_name)
            formData.append('last_name', formD.last_name)
            formData.append('email', formD.email)
            if (this.perfil.origemusuario != "ldap") {
                formData.append('password', formD.password)
            }
            formData.append('cpf', formD.cpf)
            formData.append('telefone1', formD.telefone1)
            formData.append('telefone2', formD.telefone2)
            formData.append('cep', formD.cep)
            formData.append('logradouro', formD.logradouro)
            formData.append('bairro', formD.bairro)
            formData.append('cidade', formD.cidade)
            formData.append('uf', formD.uf)
            formData.append('numero', formD.numero)
            formData.append('descricao', formD.descricao)
            if (formD.complemento != "" && formD.complemento != null) {
                formData.append('complemento', formD.complemento)
            }
            const headers = { 'Content-Type': 'multipart/form-data' };
            http.put('/usuarioperfil/user/', formData, { headers })
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Usuário criado com sucesso',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$router.push('/');
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
        getDepartamentos() {
            let query = '?modulo=usuario'
            if (this.user.tipo == 4) {
                query = `?conta=${this.user.conta}&modulo=usuario`
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
        getComplementos() {
            let query = '?modulo=usuario'
            if (this.user.tipo == 4) {
                query = `?conta=${this.user.conta}&modulo=usuario`
            }

            const url = `/listaitens/complemento/lista/${query}&so_ativos=true`;
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
        setPerfil() {
            http.get('/usuarioperfil/user/')
                .then(res => {
                    this.perfil = res.data
                    this.getComplementos();
                    this.getDepartamentos();
                    this.getEmpresas();
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
        }
    },
    mounted() {
        this.setUser();
        this.setPerfil();

    }
}

</script>


<style scoped></style>