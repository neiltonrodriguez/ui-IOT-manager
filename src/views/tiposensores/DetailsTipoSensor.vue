<template>
    <div>
        <h3 class="
detalhes">DETALHES DE TIPOS DE SENSORES</h3>
    </div>
    <div class="divide-x my-5">
        <hr>
    </div>
    <div class="container-fluid p-5">
        <div class="w-full">
            <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                        v-on:click="toggleTabs(1)"
                        v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 1, 'text-white bg-gray-800': openTab === 1 }">
                        Detalhes tipo sensor
                    </a>
                </li>
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                        v-on:click="toggleTabs(2)"
                        v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 2, 'text-white bg-gray-800': openTab === 2 }">
                        atributos
                    </a>
                </li>

            </ul>
            <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
                <div class="px-4 py-5 flex-auto">
                    <div class="tab-content tab-space">
                        <div v-bind:class="{ 'hidden': openTab !== 1, 'block': openTab === 1 }">
                            <form class="row g-3" v-on:submit.prevent="store(sensortipo)">
                                <div class="grid gap-6 mb-6 md:grid-cols-2">
                                    <div class="flex flex-col items-start">
                                        <div class="flex flex-col items-center justify-center">
                                            <template v-if="sensortipo.icone == null && img == ''">
                                                <img class="border-2 max-h-36 border-gray-500  shadow-md duration-200"
                                                    src="../../assets/img/sem-foto.png">
                                            </template>
                                            <template v-else-if="img">
                                                <img id="img-empresa"
                                                    class="border-2 max-h-36 border-gray-500  shadow-md duration-200"
                                                    :src="imagem">

                                            </template>
                                            <template v-else>
                                                <img class="border-2 max-h-36 border-gray-500  shadow-md duration-200"
                                                    :src="sensortipo.icone" width="150">

                                            </template>
                                            <div>
                                                <label title="Click to upload" for="file"
                                                    class="bg-gray-200 py-1 text-sm font-semibold rounded-md px-5 cursor-pointer hover:bg-gray-300 duration-200">
                                                    Escolher imagem
                                                </label>


                                                <input @change="uploadFile()" hidden="" name="inputFoto" type="file"
                                                    ref="file" id="file">
                                            </div>
                                            {{ img.name ? img.name.slice(0, 15) + '...' : '' }}
                                        </div>
                                    </div>
                                </div>
                                <div class="grid gap-6 mb-6 md:grid-cols-2">


                                    <div>
                                        <label
                                            class="label-form">Nome</label>
                                        <input type="text" v-model="sensortipo.nome" v-on:keyup="habilitarSalvar()"
                                            class="input-form"
                                            placeholder="" required>
                                    </div>




                                    <div v-if="user.tipo == 4">
                                        <label
                                            class="label-form">Conta</label>
                                        <input type="text" v-model="sensortipo.conta" disabled
                                            class="input-form"
                                            placeholder="" required>
                                    </div>

                                    <div>
                                        <label
                                            class="label-form">Habilitado</label>
                                        <select class="input-form" v-model="sensortipo.is_active"
                                            @change="habilitarSalvar()">
                                            <option :value="true">Sim</option>
                                            <option :value="false">Não</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label
                                            class="label-form">Geolocalização</label>
                                        <select class="input-form" v-model="sensortipo.geolocalizacao" disabled>
                                            <option :value="true">Sim</option>
                                            <option :value="false">Não</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label
                                            class="label-form">Descrição</label>
                                        <textarea rows="4" v-model="sensortipo.descricao" v-on:keyup="habilitarSalvar()"
                                            class="input-form"
                                            placeholder=""></textarea>
                                    </div>
                                </div>

                                <button type="submit" v-bind:disabled="isDisabled"
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  disabled:bg-gray-300">Salvar</button>
                                <button type="button" @click="cancelar()"
                                    class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">Cancelar</button>
                            </form>
                        </div>
                        <div v-bind:class="{ 'hidden': openTab !== 2, 'block': openTab === 2 }">
                            <form class="row g-3" v-on:submit.prevent="updateTipoSensor(sensortipo)">
                                <div class="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label
                                            class="label-form">Label</label>
                                        <input type="text" v-on:keyup="habilitarSalvar()"
                                            v-model="sensortipo.atributos.valor_ref1.label"
                                            class="input-form"
                                            placeholder="">
                                    </div>
                                    <div>
                                        <label
                                            class="label-form">Parâmetro</label>
                                        <input type="text" v-on:keyup="habilitarSalvar()"
                                            v-model="sensortipo.atributos.valor_ref1.parametro"
                                            class="input-form"
                                            placeholder="">
                                    </div>
                                </div>
                                <div class="grid gap-6 mb-6 md:grid-cols-2">

                                    <div>
                                        <label
                                            class="label-form">Label</label>
                                        <input type="text" v-on:keyup="habilitarSalvar()"
                                            v-model="sensortipo.atributos.valor_ref2.label"
                                            class="input-form"
                                            placeholder="">
                                    </div>
                                    <div>
                                        <label
                                            class="label-form">Parâmetro</label>
                                        <input type="text" v-on:keyup="habilitarSalvar()"
                                            v-model="sensortipo.atributos.valor_ref2.parametro"
                                            class="input-form"
                                            placeholder="">
                                    </div>
                                </div>
                                <div class="grid gap-6 mb-6 md:grid-cols-2">

                                    <div>
                                        <label
                                            class="label-form">Label</label>
                                        <input type="text" v-on:keyup="habilitarSalvar()"
                                            v-model="sensortipo.atributos.valor_ref3.label"
                                            class="input-form"
                                            placeholder="">
                                    </div>
                                    <div>
                                        <label
                                            class="label-form">Parâmetro</label>
                                        <input type="text" v-on:keyup="habilitarSalvar()"
                                            v-model="sensortipo.atributos.valor_ref3.parametro"
                                            class="input-form"
                                            placeholder="">
                                    </div>
                                </div>
                                <div class="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label
                                            class="label-form">Label</label>
                                        <input type="text" v-on:keyup="habilitarSalvar()"
                                            v-model="sensortipo.atributos.valor_ref4.label"
                                            class="input-form"
                                            placeholder="">
                                    </div>
                                    <div>
                                        <label
                                            class="label-form">Parâmetro</label>
                                        <input type="text" v-on:keyup="habilitarSalvar()"
                                            v-model="sensortipo.atributos.valor_ref4.parametro"
                                            class="input-form"
                                            placeholder="">
                                    </div>
                                </div>
                                <div class="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label
                                            class="label-form">Label</label>
                                        <input type="text" v-on:keyup="habilitarSalvar()"
                                            v-model="sensortipo.atributos.valor_ref5.label"
                                            class="input-form"
                                            placeholder="">
                                    </div>
                                    <div>
                                        <label
                                            class="label-form">Parâmetro</label>
                                        <input type="text" v-on:keyup="habilitarSalvar()"
                                            v-model="sensortipo.atributos.valor_ref5.parametro"
                                            class="input-form"
                                            placeholder="">
                                    </div>
                                </div>
                                <div class="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label
                                            class="label-form">Label</label>
                                        <input type="text" v-on:keyup="habilitarSalvar()"
                                            v-model="sensortipo.atributos.valor_ref6.label"
                                            class="input-form"
                                            placeholder="">
                                    </div>
                                    <div>
                                        <label
                                            class="label-form">Parâmetro</label>
                                        <input type="text" v-on:keyup="habilitarSalvar()"
                                            v-model="sensortipo.atributos.valor_ref6.parametro"
                                            class="input-form"
                                            placeholder="">
                                    </div>
                                </div>
                                <div class="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label
                                            class="label-form">Label</label>
                                        <input type="text" v-on:keyup="habilitarSalvar()"
                                            v-model="sensortipo.atributos.valor_ref7.label"
                                            class="input-form"
                                            placeholder="">
                                    </div>
                                    <div>
                                        <label
                                            class="label-form">Parâmetro</label>
                                        <input type="text" v-on:keyup="habilitarSalvar()"
                                            v-model="sensortipo.atributos.valor_ref7.parametro"
                                            class="input-form"
                                            placeholder="">
                                    </div>
                                </div>
                                <div class="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label
                                            class="label-form">Label</label>
                                        <input type="text" v-on:keyup="habilitarSalvar()"
                                            v-model="sensortipo.atributos.valor_ref8.label"
                                            class="input-form"
                                            placeholder="">
                                    </div>
                                    <div>
                                        <label
                                            class="label-form">Parâmetro</label>
                                        <input type="text" v-on:keyup="habilitarSalvar()"
                                            v-model="sensortipo.atributos.valor_ref8.parametro"
                                            class="input-form"
                                            placeholder="">
                                    </div>
                                </div>
                                <div class="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label
                                            class="label-form">Label</label>
                                        <input type="text" v-on:keyup="habilitarSalvar()"
                                            v-model="sensortipo.atributos.valor_ref9.label"
                                            class="input-form"
                                            placeholder="">
                                    </div>
                                    <div>
                                        <label
                                            class="label-form">Parâmetro</label>
                                        <input type="text" v-on:keyup="habilitarSalvar()"
                                            v-model="sensortipo.atributos.valor_ref9.parametro"
                                            class="input-form"
                                            placeholder="">
                                    </div>
                                </div>
                                <div class="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                        <label
                                            class="label-form">Label</label>
                                        <input type="text" v-on:keyup="habilitarSalvar()"
                                            v-model="sensortipo.atributos.valor_ref10.label"
                                            class="input-form"
                                            placeholder="">
                                    </div>
                                    <div>
                                        <label
                                            class="label-form">Parâmetro</label>
                                        <input type="text" v-on:keyup="habilitarSalvar()"
                                            v-model="sensortipo.atributos.valor_ref10.parametro"
                                            class="input-form"
                                            placeholder="">
                                    </div>
                                </div>
                                <button type="submit" v-bind:disabled="isDisabled"
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  disabled:bg-gray-300">Salvar</button>
                                <button type="button" @click="cancelar()"
                                    class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">Cancelar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
            teste: true,
            openTab: 1,
            sensortipo: {
                atributos: {
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
                }
            },
            user: {},
            isDisabled: true,
            contas: {},
            img: '',
            imagem: ''
        };
    },
    methods: {
        toggleTabs: function (tabNumber) {
            console.log(tabNumber)
            if (tabNumber == 1) {
                this.openTab = tabNumber
            } else if (tabNumber == 2 && this.teste) {
                this.openTab = tabNumber
            }


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
        updateTipoSensor() {
            let formData = new FormData()
            formData.append('nome', this.sensortipo.nome)
            formData.append('atributos', JSON.stringify(this.sensortipo.atributos))
            formData.append('is_active', this.sensortipo.is_active)
            const headers = { 'Content-Type': 'multipart/form-data' };
            http.put('/sensortipos/' + this.sensortipo.id + '/', formData, { headers })
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Tipo de sensor atualizado com sucesso',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    router.push({ name: 'tiposensores' })
                })
                .catch(e => {
                    console.log(e)
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        store(formD) {
            let formData = new FormData()
            if (this.img) {
                formData.append('icone', this.img)
            }
            formData.append('nome', formD.nome)
            formData.append('descricao', formD.descricao)
            formData.append('is_active', formD.is_active)
            const headers = { 'Content-Type': 'multipart/form-data' };
            http.put('/sensortipos/' + this.sensortipo.id + '/', formData, { headers })
                .then(res => {
                    this.toggleTabs(2);

                })
                .catch(e => {
                    console.log(e);
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        cancelar() {
            this.$router.push('/tiposensores');
        },
        setTipoSensor() {
            http.get('/sensortipos/' + this.$route.params.id)
                .then(res => {
                    this.sensortipo = res.data
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
    },
    mounted() {
        this.setUser();
        this.chamadasGet();
        this.setTipoSensor();
    }
}

</script>


<style scoped></style>