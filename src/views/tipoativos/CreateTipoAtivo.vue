<template>
    <div>
        <h3 class="detalhes">CADASTRO DE TIPOS DE ATIVOS</h3>
    </div>
  
    <div class="container-fluid p-5">

        <form class="row g-3" v-on:submit.prevent="createTipoAtivo(formData)">
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
                    <input type="text" v-model="formData.nome" class="input-form" placeholder="" required>
                </div>

                <div v-if="user.tipo == 4">
                    <label class="label-form">Conta</label>
                    <select v-model="formData.conta" class="input-form">
                        <option value="" disabled selected>Escolha a conta</option>
                        <option v-for="c in contas" :key="c.id" :value="c.conta">{{ c.conta }}
                        </option>
                    </select>
                </div>
                <div>
                    <label class="label-form">Descrição</label>
                    <textarea rows="4" v-model="formData.descricao" class="input-form" placeholder=""></textarea>
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
            formData: {},
            user: {},
            isDisabled: false,
            contas: [],
            empresas: [],
            openTab: 1,
            img: '',
            imagem: ''
        };
    },
    methods: {
        createTipoAtivo(formD) {
            let formData = new FormData()
            formData.append('icone', this.img)
            formData.append('nome', formD.nome)
            formData.append('descricao', formD.descricao)
            if (this.user.tipo == 4) {
                formData.append('conta', formD.conta)
            }
            const headers = { 'Content-Type': 'multipart/form-data' };
            http.post('/ativotipos/', formData, headers)
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Tipo de ativo criado com sucesso',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$router.push('/tipoativos');
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
            var reader = new FileReader();
            reader.onload = (e) => {
                this.imagem = e.target.result;
            }
            reader.readAsDataURL(this.$refs.file.files[0]);
        },
        cancelar() {
            this.$router.push('/tipoativos');
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
    }
};
</script>


<style scoped></style>