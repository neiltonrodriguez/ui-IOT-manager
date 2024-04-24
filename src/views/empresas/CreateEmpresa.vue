<template>
    <div>
        <h3 class="detalhes">CADASTRO DE EMPRESAS</h3>
    </div>
  
    <div class="container-fluid p-5">

        <form class="row g-3" v-on:submit.prevent="createEmpresa(formD)">
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div class="flex flex-col items-start">
                    <div class="flex flex-col items-center justify-center">
                        <template v-if="img">
                            <img id="img-empresa" class="border-2 max-h-36 border-gray-500  shadow-md duration-200"
                                :src="imagem">
                        </template>
                        <template v-else="">
                            <img class="border-2 max-h-36 border-gray-500  shadow-md duration-200"
                                src="../../assets/img/sem-foto.png">
                        </template>

                        <div>
                            <label title="Click to upload" for="file"
                                class="bg-gray-200 py-1 text-sm font-semibold rounded-md px-5 cursor-pointer hover:bg-gray-300 duration-200">
                                Escolher imagem
                            </label>
                            <input @change="uploadFile()" hidden="" name="inputFoto" type="file" ref="file" id="file">
                        </div>
                        {{ img.name ? img.name.slice(0, 15) + '...' : '' }}
                    </div>
                </div>
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label class="label-form">Nome</label>
                    <input type="text" v-model="formD.nome"
                        class="input-form"
                        placeholder="" required>
                </div>

                <div>
                    <label class="label-form">Razão social</label>
                    <input type="text" v-model="formD.razaosocial"
                        class="input-form"
                        placeholder="" required>
                </div>
                <div>
                    <label class="label-form">CNPJ</label>
                    <input type="text" v-model="formD.cnpj" v-mask="'##.###.###/####-##'"
                        class="input-form"
                        placeholder="" required>
                </div>
                <div>
                    <label class="label-form">Descrição</label>
                    <textarea rows="4" v-model="formD.descricao"
                        class="input-form"
                        placeholder=""></textarea>
                </div>
                <div v-if="user.tipo == 4">
                    <label class="label-form">Conta</label>
                    <select required v-model="formD.conta" @change="actionByAccount()"
                        class="input-form">
                        <option value="" disabled selected>Escolha a conta</option>
                        <option v-for="c in contas" :key="c.id" :value="c.conta">{{ c.conta }}</option>
                    </select>
                </div>
                <div>
                    <label class="label-form">Habilitado</label>
                    <select v-model="formD.is_active" disabled class="input-form">
                        <option :value="true">Sim</option>
                        <option :value="false">Não</option>
                    </select>
                </div>

            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-3">
                <div>
                    <label class="label-form">Telefone
                        1</label>
                    <input required type="text" v-model="formD.telefone1" v-mask="['(##) ####-####', '(##) #####-####']"
                        class="input-form"
                        placeholder="">
                </div>
                <div>
                    <label class="label-form">Telefone
                        2</label>
                    <input type="text" v-model="formD.telefone2" v-mask="['(##) ####-####', '(##) #####-####']"
                        class="input-form"
                        placeholder="">
                </div>
                <div>
                    <label class="label-form">Contato</label>
                    <input type="text" v-model="formD.contato"
                        class="input-form"
                        placeholder="pessoa para contato" required>
                </div>
                <div>
                    <label class="label-form">E-mail</label>
                    <input type="email" v-model="formD.email"
                        class="input-form"
                        placeholder="email de contato">
                </div>

            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label class="label-form">CEP</label>
                    <input @blur="buscarCep()" type="text" v-model="formD.cep" v-mask="'##.###-###'"
                        class="input-form"
                        placeholder="">
                </div>
                <div>
                    <label class="label-form">Endereço</label>
                    <input type="text" v-model="formD.logradouro"
                        class="input-form"
                        placeholder="">
                </div>
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-3">
                <div>
                    <label class="label-form">Bairro</label>
                    <input type="text" v-model="formD.bairro"
                        class="input-form"
                        placeholder="">
                </div>
                <div>
                    <label class="label-form">Cidade</label>
                    <input type="text" v-model="formD.cidade"
                        class="input-form"
                        placeholder="">
                </div>
                <div>
                    <label for="confirm_password"
                        class="label-form">Estado</label>
                    <select v-model="formD.uf"
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
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label class="label-form">Complemento</label>
                    <select v-model="formD.complemento"
                        class="input-form">
                        <option value="" disabled selected>Escolha o complemento</option>
                        <option v-for="cp in complementos" :key="cp.id" :value="cp.id">{{ cp.titulo }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="confirm_password"
                        class="label-form">Número</label>
                    <input type="text" v-model="formD.numero"
                        class="input-form"
                        placeholder="">
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
import axios from 'axios'

const auth = useAuth();

export default {
    data() {
        return {
            formD: {
                complemento: "",
                is_active: true
            },
            user: {},
            complementos: [],
            contas: [],
            img: '',
            imagem: ''

        };
    },
    methods: {
        createEmpresa(formD) {
            let formData = new FormData()
            formData.append('logo', this.img)
            formData.append('nome', formD.nome)
            if (this.user.tipo == 4) {
                formData.append('conta', formD.conta)
            }
            if(formD.email != ""){
                formData.append('email', formD.email)
            }
            formData.append('razaosocial', formD.razaosocial)
            formData.append('cnpj', formD.cnpj)
            formData.append('contato', formD.contato)
            formData.append('descricao', formD.descricao)
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
            const headers = { 'Content-Type': 'multipart/form-data' };
            http.post('/empresas/', formData, { headers })
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Empresa criada com sucesso',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$router.push('/empresas');
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        cancelar() {
            this.$router.push('/empresas');
        },
        uploadFile() {
            this.img = this.$refs.file.files[0];
            var reader = new FileReader();
            reader.onload = (e) => {
                this.imagem = e.target.result;
            }
            reader.readAsDataURL(this.$refs.file.files[0]);
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
        setUser() {
            const u = ref(auth.user)
            this.user = u.value
        },
        chamadasGet() {
            if (this.user.tipo == 4) {
                this.getContas();
            } else {
                this.getComplementos();
            }
        },
        actionByAccount() {
            this.getComplementos();
        },
        getComplementos() {
            let query = '?modulo=empresa'
            if (this.user.tipo == 4) {
                query = `?conta=${this.formD.conta}&modulo=empresa`
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
    },
    mounted() {
        this.setUser();
        this.chamadasGet();
    }
};
</script>


<style scoped></style>