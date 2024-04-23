<template>
    <div>
        <h3 class="detalhes">DETALHES DA CONTA</h3>
    </div>
    <div class="divide-x my-5">
        <hr>
    </div>
    <div class="container-fluid p-5">

        <form class="row g-3" v-on:submit.prevent="store(conta)">
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div class="flex flex-col items-start">
                    <div class="flex flex-col items-center justify-center">
                        <template v-if="conta.logo == null && img == ''">
                            <img class="border-2 max-h-36 border-gray-500  shadow-md duration-200"
                                src="../../assets/img/sem-foto.png">
                        </template>
                        <template v-else-if="img">
                            <img id="img-empresa" class="border-2 max-h-36 border-gray-500  shadow-md duration-200"
                                :src="imagem">

                        </template>
                        <template v-else>
                            <img class="border-2 max-h-36 border-gray-500  shadow-md duration-200" :src="conta.logo"
                                width="150">

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
                    <label class="label-form">Titulo</label>
                    <input required type="text" v-model="conta.titulo" v-on:keyup="habilitarSalvar()" class="input-form"
                        placeholder="">
                </div>



                <div>
                    <label class="label-form">Razão
                        social</label>
                    <input required type="text" v-model="conta.razaosocial" v-on:keyup="habilitarSalvar()" class="input-form"
                        placeholder="">
                </div>
                <div>
                    <label class="label-form">CNPJ</label>
                    <input required type="text" v-model="conta.cnpj" v-mask="'##.###.###/####-##'" v-on:keyup="habilitarSalvar()"
                        class="input-form" placeholder="">
                </div>


                <div>
                    <label class="label-form">Conta</label>
                    <input type="text" v-model="conta.conta" disabled class="input-form" placeholder="">
                </div>


                <div>
                    <label class="label-form">Telefone
                        1</label>
                    <input required type="text" v-model="conta.telefone1" v-mask="['(##) ####-####', '(##) #####-####']"
                        v-on:keyup="habilitarSalvar()" class="input-form" placeholder="">
                </div>
                <div>
                    <label class="label-form">Telefone
                        2</label>
                    <input type="text" v-model="conta.telefone2" v-mask="['(##) ####-####', '(##) #####-####']"
                        v-on:keyup="habilitarSalvar()" class="input-form" placeholder="">
                </div>
                <div>
                    <label class="label-form">Descrição</label>
                    <textarea rows="4" v-model="conta.descricao" v-on:keyup="habilitarSalvar()"
                        class="input-form" placeholder=""></textarea>
                </div>
                <div>
                    <label class="label-form">Contato</label>
                    <input type="contato" v-model="conta.contato" class="input-form" placeholder="pessoa para contato"
                        v-on:keyup="habilitarSalvar()">
                </div>

            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label class="label-form">Habilitado</label>
                    <select required v-model="conta.is_active" class="input-form" @change="habilitarSalvar()">
                        <option :value="true">Sim</option>
                        <option :value="false">Não</option>
                    </select>
                </div>
                <div>
                    <label class="label-form">Email</label>
                    <input type="email" id="email" v-model="conta.email" class="input-form"
                        placeholder="seuemail@email.com" v-on:keyup="habilitarSalvar()">
                </div>

            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label class="label-form">Cep</label>
                    <input @blur="buscarCep()" type="text" v-model="conta.cep" v-mask="'##.###-###'" class="input-form"
                        v-on:keyup="habilitarSalvar()" placeholder="">
                </div>
                <div>
                    <label class="label-form">Endereço</label>
                    <input type="text" v-model="conta.logradouro" class="input-form" placeholder=""
                        v-on:keyup="habilitarSalvar()">
                </div>
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-3">
                <div>
                    <label class="label-form">Bairro</label>
                    <input type="text" v-model="conta.bairro" class="input-form" v-on:keyup="habilitarSalvar()"
                        placeholder="">
                </div>
                <div>
                    <label class="label-form">Cidade</label>
                    <input type="text" v-model="conta.cidade" v-on:keyup="habilitarSalvar()" class="input-form"
                        placeholder="">
                </div>
                <div>
                    <label class="label-form">Estado</label>
                    <select v-model="conta.uf" class="input-form" @change="habilitarSalvar()">
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
                    <select v-model="conta.complemento" @change="habilitarSalvar()"
                        class="input-form">
                        <option value="" disabled selected>Escolha o complemento</option>
                        <option v-for="cp in complementos" :key="cp.id" :value="cp.id">{{ cp.titulo }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="confirm_password" class="label-form">Número</label>
                    <input type="text" v-model="conta.numero" v-on:keyup="habilitarSalvar()" class="input-form"
                        placeholder="">
                </div>

            </div>
            <div class="mb-6">
                <div class="flex my-5">

                    <span class="label-form" v-for="m in modulos" :key="m.id">
                        <input required :id='"check" + m.id' @change="prepareArray()" class="mx-3" :checked="m.is_active"
                            type="checkbox" :value="m.id">{{ m.nome
                        }}
                    </span>

                </div>
            </div>

            <button type="submit" v-bind:disabled="isDisabled"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-gray-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Salvar</button>
            <button type="button" @click="cancelar()"
                class="text-white bg-red-500 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Cancelar</button>
        </form>
    </div>
</template>
<script>
import http from '../../services/http.js'
import router from '../../router'
import axios from 'axios'
import { useAuth } from '../../stores/auth.js'
import { ref } from 'vue'

const auth = useAuth();

export default {
    data() {
        return {
            conta: {
                complemento: ""
            },
            mod: [],
            modulos: [],
            modString: '',
            user: {},
            img: '',
            membros: {},
            complementos: [],
            isDisabled: true,
            imagem: ''
        };
    },
    methods: {
        prepareArray() {
            let a = ';'
            for (let i = 0; i < this.modulos.length; i++) {
                const check = document.getElementById('check' + this.modulos[i].id)
                if (check.checked) {
                    a += `${check.value};`;
                }

            }
            this.modString = a
            this.isDisabled = false
        },
        uploadFile() {
            this.img = this.$refs.file.files[0];
            var reader = new FileReader();
            reader.onload = (e) => {
                this.imagem = e.target.result;
            }
            reader.readAsDataURL(this.$refs.file.files[0]);
            this.isDisabled = false
        },
        store(formD) {
            this.prepareArray();
            let formData = new FormData()
            if (this.img) {
                formData.append('logo', this.img)
            }
            formData.append('titulo', formD.titulo)
            formData.append('razaosocial', formD.razaosocial)
            formData.append('cnpj', formD.cnpj)
            formData.append('contato', formD.contato)
            formData.append('email', formD.email)
            formData.append('descricao', formD.descricao)
            formData.append('telefone1', formD.telefone1)
            formData.append('telefone2', formD.telefone2)
            formData.append('cep', formD.cep)
            formData.append('logradouro', formD.logradouro)
            formData.append('bairro', formD.bairro)
            formData.append('cidade', formD.cidade)
            formData.append('uf', formD.uf)
            formData.append('numero', formD.numero)
            formData.append('is_active', formD.is_active)
            formData.append('modulos', this.modString)
            if (formD.complemento != "" && formD.complemento != null) {
                formData.append('complemento', formD.complemento)
            }
            const headers = { 'Content-Type': 'multipart/form-data' };

            http.put('/contas/' + this.conta.id + '/', formData, { headers })
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Dados Atualizados',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    router.push({ name: 'contas' })
                })
                .catch(e => {
                    console.log(e.response);
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });

        },
        getComplementos() {
            let query = '?modulo=conta'
            if (this.user.tipo == 4) {
                query = `?conta=${this.user.conta}&modulo=conta`
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
        buscarCep() {
            let cep = this.conta.cep
            let cepSemCaracteres = cep.replace("-", "").replace(".", "");
            axios.get('http://viacep.com.br/ws/' + cepSemCaracteres + '/json/')
                .then(data => {
                    this.conta.logradouro = data.data.logradouro,
                        this.conta.bairro = data.data.bairro,
                        this.conta.complemento = data.data.complemento,
                        this.conta.cidade = data.data.localidade,
                        this.conta.uf = data.data.uf
                }).catch(e => {
                    console.log(e);
                });
        },
        habilitarSalvar() {
            this.isDisabled = false
        },
        cancelar() {
            this.$router.push('/contas');
        },
        setConta() {
            http.get('/contas/' + this.$route.params.id)
                .then(res => {
                    this.conta = res.data
                    this.modulos = res.data.modulos

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
    },
    created() {
        this.setConta();

    },
    mounted() {
        this.setUser();
        // this.setConta();
        this.getComplementos();

    }
}

</script>


<style scoped></style>