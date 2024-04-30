<template>
    <div>
        <h3 class="detalhes">CADASTRO DE TIPO DE SENSORES</h3>
    </div>

    <div class="container-fluid p-5">
        <div class="w-full">

            <ul class="flex mb-0 list-none flex-wrap flex-row">
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                        v-on:click="toggleTabs(1)"
                        v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 1, 'text-white bg-gray-800': openTab === 1 }">
                        Cadastrar tipo sensor
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
            <div class="relative flex flex-col min-w-0 break-words  w-full mb-6 shadow-lg rounded">
                <div class="px-4 py-5 flex-auto">
                    <div class="tab-content tab-space">
                        <div v-bind:class="{ 'hidden': openTab !== 1, 'block': openTab === 1 }">
                            <form class="row g-3" v-on:submit.prevent="createTipoSensor(formData)">
                                <div class="grid gap-3 mb-3 md:grid-cols-2">
                                    <div class="flex flex-col items-start">
                                        <div class="flex flex-col items-center justify-center">
                                            <template v-if="img">
                                                <img id="img-empresa"
                                                    class="border-2 max-h-28 border-gray-500  shadow-md duration-200"
                                                    :src="imagem">
                                            </template>
                                            <template v-else="">
                                                <img class="border-2 max-h-28 border-gray-500  shadow-md duration-200"
                                                    src="../../assets/img/sem-foto.png">
                                            </template>
                                            <div>
                                                <label title="Click to upload" for="file"
                                                    class="bg-gray-200 py-1 text-sm font-semibold rounded-md px-5 cursor-pointer hover:bg-gray-300 duration-200">
                                                    Escolher imagem
                                                </label>
                                                <input @change="uploadFile()" hidden="" name="inputFoto" type="file"
                                                    ref="file" id="file">
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="grid gap-3 mb-3 md:grid-cols-2">
                                    <div v-if="user.tipo == 4">
                                        <label class="label-form">Conta</label>
                                        <select v-model="formData.conta" class="input-form">
                                            <option value="" disabled selected>Escolha a conta</option>
                                            <option v-for="c in contas" :key="c.id" :value="c.conta">{{ c.conta }}
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="label-form">Nome</label>
                                        <input type="text" v-model="formData.nome" class="input-form" placeholder=""
                                            required>
                                    </div>


                                    <div>
                                        <label class="label-form">Geolocalização</label>
                                        <select class="input-form" v-model="formData.geolocalizacao">
                                            <option :value="true">Sim</option>
                                            <option :value="false">Não</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="label-form">Descrição</label>
                                        <textarea rows="4" v-model="formData.descricao" class="input-form"
                                            placeholder=""></textarea>
                                    </div>

                                </div>
                                <button type="submit"
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Salvar</button>
                                <button type="button" @click="cancelar()"
                                    class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">Cancelar</button>
                            </form>

                        </div>
                        <div v-bind:class="{ 'hidden': openTab !== 2, 'block': openTab === 2 }">

                            <form class="" v-on:submit.prevent="updateTipoSensor()">

                                <div class="">


                                    <div class="flex gap-3 items-center justify-center">
                                        <div class="flex-1">
                                            <label class="label-form">Label</label>
                                            <input type="text" v-model="atributos.valor_ref1.label" class="input-form"
                                                placeholder="">
                                        </div>
                                        <div class="flex-1">
                                            <label class="label-form">Parametro</label>
                                            <input type="text" v-model="atributos.valor_ref1.parametro"
                                                class="input-form" placeholder="">
                                        </div>
                                        <div class="flex items-center justify-center">
                                            <button class="" type="button" @click="incrementQuantity(1)">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="red" class="w-6 h-6 mt-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                    </div>
                                    <div class="flex gap-3 items-center justify-center">
                                        <div class="flex-1">
                                            <label class="label-form">Label</label>
                                            <input type="text" v-model="atributos.valor_ref2.label" class="input-form"
                                                placeholder="">
                                        </div>
                                        <div class="flex-1">
                                            <label class="label-form">Parametro</label>
                                            <input type="text" v-model="atributos.valor_ref2.parametro"
                                                class="input-form" placeholder="">
                                        </div>
                                        <div class="flex items-center justify-center">
                                            <button class="" type="button" @click="incrementQuantity(2)">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="red" class="w-6 h-6 mt-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                    </div>
                                    <div class="flex gap-3 items-center justify-center">
                                        <div class="flex-1">
                                            <label class="label-form">Label</label>
                                            <input type="text" v-model="atributos.valor_ref3.label" class="input-form"
                                                placeholder="">
                                        </div>
                                        <div class="flex-1">
                                            <label class="label-form">Parametro</label>
                                            <input type="text" v-model="atributos.valor_ref3.parametro"
                                                class="input-form" placeholder="">
                                        </div>
                                        <div class="flex items-center justify-center">
                                            <button class="" type="button" @click="incrementQuantity(3)">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="red" class="w-6 h-6 mt-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                    </div>
                                    <div class="flex gap-3 items-center justify-center">
                                        <div class="flex-1">
                                            <label class="label-form">Label</label>
                                            <input type="text" v-model="atributos.valor_ref4.label" class="input-form"
                                                placeholder="">
                                        </div>
                                        <div class="flex-1">
                                            <label class="label-form">Parametro</label>
                                            <input type="text" v-model="atributos.valor_ref4.parametro"
                                                class="input-form" placeholder="">
                                        </div>
                                        <div class="flex items-center justify-center">
                                            <button class="" type="button" @click="incrementQuantity(4)">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="red" class="w-6 h-6 mt-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                    </div>
                                    <div class="flex gap-3 items-center justify-center">
                                        <div class="flex-1">
                                            <label class="label-form">Label</label>
                                            <input type="text" v-model="atributos.valor_ref5.label" class="input-form"
                                                placeholder="">
                                        </div>
                                        <div class="flex-1">
                                            <label class="label-form">Parametro</label>
                                            <input type="text" v-model="atributos.valor_ref5.parametro"
                                                class="input-form" placeholder="">
                                        </div>
                                        <div class="flex items-center justify-center">
                                            <button class="" type="button" @click="incrementQuantity(5)">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="red" class="w-6 h-6 mt-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                    </div>
                                    <div class="flex gap-3 items-center justify-center">
                                        <div class="flex-1">
                                            <label class="label-form">Label</label>
                                            <input type="text" v-model="atributos.valor_ref6.label" class="input-form"
                                                placeholder="">
                                        </div>
                                        <div class="flex-1">
                                            <label class="label-form">Parametro</label>
                                            <input type="text" v-model="atributos.valor_ref6.parametro"
                                                class="input-form" placeholder="">
                                        </div>
                                        <div class="flex items-center justify-center">
                                            <button class="" type="button" @click="incrementQuantity(6)">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="red" class="w-6 h-6 mt-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                    </div>
                                    <div class="flex gap-3 items-center justify-center">
                                        <div class="flex-1">
                                            <label class="label-form">Label</label>
                                            <input type="text" v-model="atributos.valor_ref7.label" class="input-form"
                                                placeholder="">
                                        </div>
                                        <div class="flex-1">
                                            <label class="label-form">Parametro</label>
                                            <input type="text" v-model="atributos.valor_ref7.parametro"
                                                class="input-form" placeholder="">
                                        </div>
                                        <div class="flex items-center justify-center">
                                            <button class="" type="button" @click="incrementQuantity(7)">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="red" class="w-6 h-6 mt-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                    </div>
                                    <div class="flex gap-3 items-center justify-center">
                                        <div class="flex-1">
                                            <label class="label-form">Label</label>
                                            <input type="text" v-model="atributos.valor_ref8.label" class="input-form"
                                                placeholder="">
                                        </div>
                                        <div class="flex-1">
                                            <label class="label-form">Parametro</label>
                                            <input type="text" v-model="atributos.valor_ref8.parametro"
                                                class="input-form" placeholder="">
                                        </div>
                                        <div class="flex items-center justify-center">
                                            <button class="" type="button" @click="incrementQuantity(8)">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="red" class="w-6 h-6 mt-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                    </div>
                                    <div class="flex gap-3 items-center justify-center">
                                        <div class="flex-1">
                                            <label class="label-form">Label</label>
                                            <input type="text" v-model="atributos.valor_ref9.label" class="input-form"
                                                placeholder="">
                                        </div>
                                        <div class="flex-1">
                                            <label class="label-form">Parametro</label>
                                            <input type="text" v-model="atributos.valor_ref9.parametro"
                                                class="input-form" placeholder="">
                                        </div>
                                        <div class="flex items-center justify-center">
                                            <button class="" type="button" @click="incrementQuantity(9)">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="red" class="w-6 h-6 mt-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                    </div>
                                    <div class="flex gap-3 items-center justify-center">
                                        <div class="flex-1">
                                            <label class="label-form">Label</label>
                                            <input type="text" v-model="atributos.valor_ref10.label" class="input-form"
                                                placeholder="">
                                        </div>
                                        <div class="flex-1">
                                            <label class="label-form">Parametro</label>
                                            <input type="text" v-model="atributos.valor_ref10.parametro"
                                                class="input-form" placeholder="">
                                        </div>
                                        <div class="flex items-center justify-center">
                                            <button class="" type="button" @click="incrementQuantity(10)">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1.5" stroke="red" class="w-6 h-6 mt-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                    </div>


                                </div>
                                <button type="submit"
                                    class="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Salvar</button>
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
import { useAuth } from '../../stores/auth.js'
import { ref } from 'vue'

const auth = useAuth();

export default {
    data() {
        return {
            formData: {
                geolocalizacao: false
            },
            idSensor: 0,
            is_active: false,
            quantity: 1,
            formAtributo: {
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
            },
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
            },
            user: {},
            formDataSC: {},
            contas: [],
            openTab: 1,
            idSensor: 0,
            img: '',
            imagem: '',
            nome: "",
            teste: false,
            icone: ""
        };
    },
    methods: {
        // preencherCamposAtributos() {
        //     for (let i = 1; i <= 3; i++) {
        //         let label = document.getElementById('valor_ref_label' + i)
        //         let param = document.getElementById('valor_ref_param' + i)


        //         switch (i) {
        //             case 1:
        //                 label.value = this.atributos.valor_ref1.label ? this.atributos.valor_ref1.label : '';
        //                 param.value = this.atributos.valor_ref1.parametro ? this.atributos.valor_ref1.parametro : '';
        //                 label.disabled = true;
        //                 param.disabled = true;
        //                 break;
        //             case 2:
        //                 label.value = this.atributos.valor_ref2.label ? this.atributos.valor_ref2.label : '';
        //                 param.value = this.atributos.valor_ref2.parametro ? this.atributos.valor_ref2.parametro : '';
        //                 label.disabled = true;
        //                 param.disabled = true;
        //                 break;
        //             case 3:
        //                 label.value = this.atributos.valor_ref3.label ? this.atributos.valor_ref3.label : '';
        //                 param.value = this.atributos.valor_ref3.parametro ? this.atributos.valor_ref3.parametro : '';
        //                 label.disabled = true;
        //                 param.disabled = true;
        //                 break;
        //         }


        //     }
        //     console.log('llfldfldfldfldfdlfl')
        // },
        createTipoSensor(formD) {
            let formData = new FormData()
            formData.append('icone', this.img)
            formData.append('nome', formD.nome)
            formData.append('descricao', formD.descricao)
            formData.append('geolocalizacao', formD.geolocalizacao)
            if (this.user.tipo == 4) {
                formData.append('conta', formD.conta)
            }
            const headers = { 'Content-Type': 'multipart/form-data' };
            http.post('/sensortipos/', formData, { headers })
                .then(res => {
                    console.log(res)
                    this.getAtributos(res.data.id)
                    if (res.data.geolocalizacao) {
                        this.quantity = 3;
                        // this.preencherCamposAtributos();
                    }
                    this.teste = true
                    this.toggleTabs(2);


                })
                .catch(e => {
                    console.log(e)
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        updateTipoSensor() {
            // for (let i = 1; i <= this.quantity; i++) {
            //     const label = document.getElementById('valor_ref_label' + i);
            //     const parametro = document.getElementById('valor_ref_param' + i);
            //     switch (i) {
            //         case 1:
            //             this.formAtributo.valor_ref1.label = label.value
            //             this.formAtributo.valor_ref1.parametro = parametro.value
            //             break;
            //         case 2:
            //             this.formAtributo.valor_ref2.label = label.value
            //             this.formAtributo.valor_ref2.parametro = parametro.value
            //             break;
            //         case 3:
            //             this.formAtributo.valor_ref3.label = label.value
            //             this.formAtributo.valor_ref3.parametro = parametro.value
            //             break;
            //         case 4:
            //             this.formAtributo.valor_ref4.label = label.value
            //             this.formAtributo.valor_ref4.parametro = parametro.value
            //             break;
            //         case 5:
            //             this.formAtributo.valor_ref5.label = label.value
            //             this.formAtributo.valor_ref5.parametro = parametro.value
            //             break;
            //         case 6:
            //             this.formAtributo.valor_ref6.label = label.value
            //             this.formAtributo.valor_ref6.parametro = parametro.value
            //             break;
            //         case 7:
            //             this.formAtributo.valor_ref7.label = label.value
            //             this.formAtributo.valor_ref7.parametro = parametro.value
            //             break;
            //         case 8:
            //             this.formAtributo.valor_ref8.label = label.value
            //             this.formAtributo.valor_ref8.parametro = parametro.value
            //             break;
            //         case 9:
            //             this.formAtributo.valor_ref9.label = label.value
            //             this.formAtributo.valor_ref9.parametro = parametro.value
            //             break;
            //         case 10:
            //             this.formAtributo.valor_ref10.label = label.value
            //             this.formAtributo.valor_ref10.parametro = parametro.value
            //             break;
            //         default:
            //             console.log("erro")
            //     }
            // }
            let formData = new FormData()
            formData.append('nome', this.nome)
            formData.append('atributos', JSON.stringify(this.atributos))
            formData.append('is_active', this.is_active)
            formData.append('geolocalizacao', this.formData.geolocalizacao)

            const headers = { 'Content-Type': 'multipart/form-data' };
            http.put('/sensortipos/' + this.idSensor + '/', formData, { headers })
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Tipo de sensor criado com sucesso',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.$router.push('/tiposensores');
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        incrementQuantity(number) {
            switch (number) {
                case 1:
                    this.atributos.valor_ref1.label = "";
                    this.atributos.valor_ref1.parametro = "";
                    break;
                case 2:
                    this.atributos.valor_ref2.label = "";
                    this.atributos.valor_ref2.parametro = "";
                    break;
                case 3:
                    this.atributos.valor_ref3.label = "";
                    this.atributos.valor_ref3.parametro = "";
                    break;
                case 4:
                    this.atributos.valor_ref4.label = "";
                    this.atributos.valor_ref4.parametro = "";
                    break;
                case 5:
                    this.atributos.valor_ref5.label = "";
                    this.atributos.valor_ref5.parametro = "";
                    break;
                case 6:
                    this.atributos.valor_ref6.label = "";
                    this.atributos.valor_ref6.parametro = "";
                    break;
                case 7:
                    this.atributos.valor_ref7.label = "";
                    this.atributos.valor_ref7.parametro = "";
                    break;
                case 8:
                    this.atributos.valor_ref8.label = "";
                    this.atributos.valor_ref8.parametro = "";
                    break;
                case 9:
                    this.atributos.valor_ref9.label = "";
                    this.atributos.valor_ref9.parametro = "";
                    break;
                case 10:
                    this.atributos.valor_ref10.label = "";
                    this.atributos.valor_ref10.parametro = "";
                    break;
                default:
                    console.log('numero inválido')
                    break;
            }
        },
        toggleTabs: function (tabNumber) {
            if (tabNumber == 1) {
                this.openTab = tabNumber
            } else if (tabNumber == 2 && this.teste) {
                // if(this.quantity == 3){
                // this.preencherCamposAtributos();
                // }
                this.openTab = tabNumber

            }


        },
        getAtributos(id) {
            const url = `sensortipos/${id}/`
            http.get(url)
                .then(res => {
                    this.atributos = res.data.atributos
                    this.is_active = res.data.is_active
                    this.idSensor = res.data.id
                    this.nome = res.data.nome
                    this.icone = res.data.icone
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
            this.$router.push('/tiposensores');
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
    },
    // watch: {
    //     quantity() {
    //         if (this.quantity == 3) {
    //             console.log("aquiosoo")
    //             this.preencherCamposAtributos();
    //         }

    //     }

    // }
};
</script>


<style scoped></style>