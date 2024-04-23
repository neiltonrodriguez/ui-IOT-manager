<template>
    <div>
        <h3 class="text-start">DETALHES DA EMPRESA</h3>
    </div>
    <div class="divide-x my-5">
        <hr>
    </div>
    <div class="container-fluid p-5">
        <div>
        </div>
        <form class="row g-3" v-on:submit.prevent="store(empresa)">
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div class="flex flex-col items-start">
                    <div class="flex flex-col items-center justify-center">
                        <template v-if="empresa.foto == null && img == ''">
                            <img class="border-2 max-h-36 border-gray-500  shadow-md duration-200"
                                src="../../assets/img/sem-foto.png">
                        </template>
                        <template v-else-if="img">
                            <img id="img-empresa" class="border-2 max-h-36 border-gray-500  shadow-md duration-200"
                                :src="imagem">

                        </template>
                        <template v-else>
                            <img class="border-2 max-h-36 border-gray-500  shadow-md duration-200" :src="empresa.foto"
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
                    <label class="label-form">Nome</label>
                    <input v-on:keyup="habilitarSalvar()" type="text" v-model="empresa.nome" class="edit-form"
                        placeholder="" required>
                </div>
                <div>
                    <label class="label-form">Razão social</label>
                    <input v-on:keyup="habilitarSalvar()" type="text" disabled v-model="empresa.razaosocial"
                        class="edit-form" placeholder="" required>
                </div>
                <div>
                    <label class="label-form">CNPJ</label>
                    <input type="text" v-model="empresa.cnpj" v-mask="'##.###.###/####-##'" class="edit-form"
                        v-on:keyup="habilitarSalvar()" placeholder="" required disabled>
                </div>
                <div>
                    <label class="label-form">Descrição</label>
                    <textarea  rows="4" v-model="empresa.descricao" class="edit-form"
                        v-on:keyup="habilitarSalvar()" placeholder="" ></textarea>
                </div>
                <div v-if="user.tipo == 4">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Conta</label>
                    <select v-model="empresa.conta" disabled class="edit-form" @change="habilitarSalvar()">
                        <option value="" disabled selected>Escolha a conta</option>
                        <option v-for="c in contas" :key="c.id" :value="c.conta">{{ c.conta }}</option>
                    </select>
                </div>

                <div>
                    <label class="label-form">Habilitado</label>
                    <select required v-model="empresa.is_active" class="edit-form" @change="habilitarSalvar()">
                        <option :value="true">Sim</option>
                        <option :value="false">Não</option>


                    </select>
                </div>
            </div>

            <div class="grid gap-6 mb-6 md:grid-cols-3">
                <div>
                    <label class="label-form">Telefone
                        1</label>
                    <input type="text" v-model="empresa.telefone1" v-mask="['(##) ####-####', '(##) #####-####']"
                        class="edit-form" @change="habilitarSalvar()" placeholder="" required>
                </div>
                <div>
                    <label class="label-form">Telefone
                        2</label>
                    <input type="text" v-model="empresa.telefone2" v-mask="['(##) ####-####', '(##) #####-####']"
                        class="edit-form" placeholder="" v-on:keyup="habilitarSalvar()">
                </div>
                <div>
                    <label class="label-form">Contato</label>
                    <input type="contato" v-model="empresa.contato" class="edit-form" placeholder="pessoa para contato"
                        v-on:keyup="habilitarSalvar()" required>
                </div>

            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2">

                <div>
                    <label class="label-form">Cep</label>
                    <input type="text" v-model="empresa.cep" v-mask="'##.###-###'" class="edit-form" placeholder=""
                        v-on:keyup="habilitarSalvar()">
                </div>
                <div>
                    <label class="label-form">Endereço</label>
                    <input type="text" v-model="empresa.logradouro" class="edit-form" placeholder=""
                        v-on:keyup="habilitarSalvar()">
                </div>
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-3">
                <div>
                    <label class="label-form">Bairro</label>
                    <input type="text" v-model="empresa.bairro" v-on:keyup="habilitarSalvar()" class="edit-form"
                        placeholder="">
                </div>
                <div>
                    <label class="label-form">Cidade</label>
                    <input type="text" v-model="empresa.cidade" v-on:keyup="habilitarSalvar()" class="edit-form"
                        placeholder="">
                </div>
                <div>
                    <label for="confirm_password" class="label-form">Estado</label>
                    <select v-model="empresa.uf" class="edit-form" @change="habilitarSalvar()">
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
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Complemento</label>
                    <select v-model="empresa.complemento" @change="habilitarSalvar()" class="edit-form">
                        <option value="" disabled selected>Escolha o complemento</option>
                        <option v-for="cp in complementos" :key="cp.id" :value="cp.id">{{ cp.titulo }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="confirm_password" class="label-form">Número</label>
                    <input type="text" v-model="empresa.numero" class="edit-form" v-on:keyup="habilitarSalvar()"
                        placeholder="">
                </div>
            </div>

            <button type="submit" v-bind:disabled="isDisabled"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-300">Salvar</button>
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
            empresa: {},
            contas: [],
            complementos: [],
            user: {},
            img: '',
            isDisabled: true,
            imagem: ''
        };
    },
    methods: {
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
            let formData = new FormData()
            if (this.img) {
                formData.append('logo', this.img)
            }
            formData.append('nome', formD.nome)
            formData.append('is_active', formD.is_active)
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
            if (formD.complemento != "" && formD.complemento != null) {
                formData.append('complemento', formD.complemento)
            }
            const headers = { 'Content-Type': 'multipart/form-data' };
            http.put('/empresas/' + this.empresa.id + '/', formData, { headers })
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Dados Atualizados',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    router.push({ name: 'empresas' })
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
        setEmpresa() {
            http.get('/empresas/' + this.$route.params.id)
                .then(res => {
                    this.empresa = res.data
                    this.getComplementos();
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
        setUser() {
            const u = ref(auth.user)
            this.user = u.value
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
                this.getComplementos();
            }
        },
        getComplementos() {
            let query = '?modulo=empresa'
            if (this.user.tipo == 4) {
                query = `?conta=${this.empresa.conta}&modulo=empresa`
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
        this.setEmpresa();
    }
}

</script>


<style scoped></style>