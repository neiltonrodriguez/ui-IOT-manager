<template>
    <div>
        <h3 class="detalhes">CADASTRO DE LDAP {{  tipo == 1 ? 'USUÁRIOS' : 'SENSORES' }}</h3>
    </div>
    <div class="divide-x my-5">
        <hr>
    </div>
    <div class="container-fluid p-5">
        <div class="flex flex-wrap">
            <div class="w-full">
                <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
                    <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                            v-on:click="toggleTabs(1)"
                            v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 1, 'text-white bg-gray-800': openTab === 1 }">
                            Cadastro de LDAP
                        </a>
                    </li>
                    <li v-if="this.tipo == 1" class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                            v-on:click="toggleTabs(2)"
                            v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 2, 'text-white bg-gray-800': openTab === 2 }">
                            Atributos
                        </a>
                    </li>
                    <li v-if="this.tipo == 1" class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                            v-on:click="toggleTabs(3)"
                            v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 3, 'text-white bg-gray-800': openTab === 3 }">
                            OU Usuário
                        </a>
                    </li>
                    <li v-if="this.tipo == 1" class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                            v-on:click="toggleTabs(4)"
                            v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 4, 'text-white bg-gray-800': openTab === 4 }">
                            OU Grupo
                        </a>
                    </li>
                    <li v-if="this.tipo == 2" class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                            v-on:click="toggleTabs(5)"
                            v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 5, 'text-white bg-gray-800': openTab === 5 }">
                            Atributos
                        </a>
                    </li>
                    <li v-if="this.tipo == 2" class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                            v-on:click="toggleTabs(6)"
                            v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 6, 'text-white bg-gray-800': openTab === 6 }">
                            OU Sensores
                        </a>
                    </li>
                </ul>
                <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
                    <div class="px-4 py-5 flex-auto">
                        <div class="tab-content tab-space">
                            <div v-bind:class="{ 'hidden': openTab !== 1, 'block': openTab === 1 }">
                                <form class="row g-3" v-on:submit.prevent="createLdap(formData)">
                                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                                        <div>
                                            <label
                                                class="label-form">Título</label>
                                            <input type="text" v-model="formData.titulo" v-bind:disabled="isDisabled"
                                                class="input-form"
                                                placeholder="" required>
                                        </div>
                                        <div v-if="user.tipo == 4">
                                            <label
                                                class="label-form">Conta</label>
                                            <select v-model="formData.conta" @change="getEmpresas()"
                                                v-bind:disabled="isDisabled"
                                                class="input-form">
                                                <option value="" disabled selected>Escolha a conta</option>
                                                <option v-for="c in contas" :key="c.id" :value="c.conta">{{ c.conta }}
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                class="label-form">Ldap
                                                Tipo</label>
                                            <select v-model="formData.ldap_tipo" required class="input-form">
                                                <option :value="tipo" selected>{{ tipo == 1 ? 'Usuários/grupos' :
                                                    'Sensores'
                                                    }}</option>

                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                class="label-form">Empresa</label>
                                            <select v-model="formData.empresa" v-bind:disabled="isDisabled"
                                                class="input-form">
                                                <option value="" disabled selected>Escolha a conta</option>
                                                <option v-for="e in empresas" :key="e.id" :value="e.id">{{ e.nome }}
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                class="label-form">Host</label>
                                            <input type="text" v-model="formData.host" v-bind:disabled="isDisabled"
                                                class="input-form"
                                                placeholder="" required>
                                        </div>
                                        <div>
                                            <label
                                                class="label-form">Porta</label>
                                            <input type="number" v-model="formData.porta" v-bind:disabled="isDisabled"
                                                class="input-form"
                                                placeholder="" required>
                                        </div>
                                        <div>
                                            <label
                                                class="label-form">Tipo
                                                de Autenticação</label>
                                            <select v-model="formData.tipo_autenticacao" v-bind:disabled="isDisabled"
                                                class="input-form">
                                                <option value="" disabled selected>Escolha um tipo de autenticação
                                                </option>
                                                <option value="1">Simples</option>
                                                <option value="2">Digest-MD5</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                class="label-form">Usuário</label>
                                            <input type="text" v-model="formData.usuario" v-bind:disabled="isDisabled"
                                                class="input-form"
                                                placeholder="" required>
                                        </div>
                                        <div>
                                            <label
                                                class="label-form">Senha</label>
                                            <input type="password" v-model="formData.senha" v-bind:disabled="isDisabled"
                                                class="input-form"
                                                placeholder="" required>
                                        </div>
                                        <div>
                                            <label
                                                class="label-form">Domínio</label>
                                            <input type="text" v-model="formData.dominio" v-bind:disabled="isDisabled"
                                                class="input-form"
                                                placeholder="" required>
                                        </div>
                                        <div>
                                            <label
                                                class="label-form">Provedor</label>
                                            <select v-model="formData.provedor" v-bind:disabled="isDisabled"
                                                class="input-form">
                                                <option value="" disabled selected>Escolha um provedor</option>
                                                <option value="1">Microsoft LDAP</option>
                                                <option value="2">Open LDAP</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                class="label-form">Base
                                                DN</label>
                                            <input type="text" v-model="formData.base_dn" v-bind:disabled="isDisabled"
                                                class="input-form"
                                                placeholder="" required>
                                        </div>
                                    </div>
                                    <button type="submit" v-bind:disabled="isDisabledA"
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Salvar</button>
                                    <button type="button" @click="testarConexao(formData)"
                                        class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Testar
                                        Conexão</button>
                                    <button type="button" @click="cancelar()"
                                        class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Cancelar</button>
                                </form>
                            </div>
                            <div v-bind:class="{ 'hidden': openTab !== 2, 'block': openTab === 2 }">
                                <form class="row g-3" v-on:submit.prevent="createAtributo(formAtributo)">
                                    <div>
                                        <button type="button" @click="inputAtributo++"
                                            class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 mb-10 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Adicionarrr
                                            mais campos</button>

                                    </div>
                                    <div class="grid gap-6 mb-6 md:grid-cols-1">
                                        <div class="flez">
                                            <div class="grid gap-6 mb-6 md:grid-cols-2">

                                                <template v-for="i in inputAtributo" :key="i">
                                                    <div>
                                                        <label
                                                            class="label-form">Campo
                                                            LDAP</label>
                                                        <input :id='"campoLdap" + i' type="text"
                                                            v-bind:disabled="isDisabledA"
                                                            class="input-form"
                                                            placeholder="" required>
                                                    </div>

                                                    <div>
                                                        <label
                                                            class="label-form">Campo
                                                            Sistemasss</label>
                                                        <div class="flex"><select :id='"campoSistema" + i'
                                                                v-bind:disabled="isDisabledA"
                                                                class="input-form">
                                                                <option value="" disabled selected>Escolha uma opção
                                                                </option>
                                                                <option v-for="cs in camposistema" :key="cs.id"
                                                                    :value="cs.idcampoform">{{ cs.label }}</option>
                                                            </select><button type="button" @click="inputAtributo--"><svg
                                                                    xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="red"
                                                                    class="w-6 h-full my-1">
                                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                                        d="M6 18L18 6M6 6l12 12" />
                                                                </svg></button></div>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" v-bind:disabled="isDisabledA"
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Aplicar</button>
                                    <button type="button" @click="cancelar()"
                                        class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Cancelar</button>
                                </form>

                            </div>
                            <div v-bind:class="{ 'hidden': openTab !== 3, 'block': openTab === 3 }">
                                <form class="row g-3" v-on:submit.prevent="createOUusuario()">

                                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                                        <div>
                                            <label
                                                class="label-form">Caminho
                                                OU usuários<button type="button" @click="inputA++"
                                                    class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Adicionar
                                                    mais campos</button></label>
                                            <template v-for="i in inputA" :key="i">
                                                <div class="flex">
                                                    <input type="text" :id='"itemA" + i'
                                                        class="bg-gray-50 border border-gray-300 my-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="" required>
                                                    <button type="button" @click="inputA--"><svg
                                                            xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="red"
                                                            class="w-6 h-6 my-5">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>

                                            </template>
                                        </div>
                                    </div>
                                    <button type="submit"
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Aplicar</button>
                                    <button type="button" @click="cancelar()"
                                        class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Voltar</button>
                                </form>
                            </div>
                            <div v-bind:class="{ 'hidden': openTab !== 4, 'block': openTab === 4 }">
                                <form class="row g-3" v-on:submit.prevent="createOUgrupo()">
                                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                                        <div>

                                            <label
                                                class="label-form">Caminho
                                                OU Grupos <button type="button" @click="input++"
                                                    class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Adicionar
                                                    mais campos</button></label>
                                            <template v-for="i in input" :key="i">
                                                <div class="flex"><input type="text" :id='"item" + i'
                                                        class="bg-gray-50 border border-gray-300 my-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="" required>
                                                    <button type="button" @click="input--"><svg
                                                            xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="red"
                                                            class="w-6 h-6 my-5">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M6 18L18 6M6 6l12 12" />
                                                        </svg></button>
                                                </div>

                                            </template>
                                        </div>
                                        <div>


                                        </div>

                                    </div>
                                    <button type="submit"
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Salvar</button>
                                    <button type="button" @click="cancelar()"
                                        class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Voltar</button>
                                </form>
                            </div>
                            <div v-bind:class="{ 'hidden': openTab !== 5, 'block': openTab === 5 }">
                                <form class="row g-3" v-on:submit.prevent="createAtributoSensor(formAtributo)">
                                    <div>
                                        <button type="button" @click="inputAtributoS++"
                                            class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 mb-10 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Adicionar
                                            mais campos</button>

                                    </div>
                                    <div class="grid gap-6 mb-6 md:grid-cols-1">
                                        <div class="flez">
                                            <div class="grid gap-6 mb-6 md:grid-cols-2">

                                                <template v-for="i in inputAtributoS" :key="i">
                                                    <div>
                                                        <label
                                                            class="label-form">Campo
                                                            LDAP</label>
                                                        <input :id='"campoLdapS" + i' type="text" class="input-form"
                                                            placeholder="" required
                                                            v-bind:disabled="isDisabledAtributoSensor">
                                                    </div>

                                                    <div>
                                                        <label
                                                            class="label-form">Campo
                                                            Sensor</label>
                                                        <div class="flex"><select :id='"campoSensor" + i'
                                                                class="input-form">
                                                                <option value="" disabled selected>Escolha uma opção
                                                                </option>
                                                                <option v-for="cs in camposensor" :key="cs.id"
                                                                    :value="cs.idcampoform">{{ cs.label }}</option>
                                                            </select><button type="button"
                                                                @click="inputAtributoS--"><svg
                                                                    xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="red"
                                                                    class="w-6 h-full my-1">
                                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                                        d="M6 18L18 6M6 6l12 12" />
                                                                </svg></button></div>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" v-bind:disabled="isDisabledA"
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Aplicar</button>
                                    <button type="button" @click="cancelar()"
                                        class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Cancelar</button>
                                </form>
                            </div>
                            <div v-bind:class="{ 'hidden': openTab !== 6, 'block': openTab === 6 }">
                                <form class="row g-3" v-on:submit.prevent="createOUsensor()">

                                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                                        <div>
                                            <label
                                                class="label-form">Caminho
                                                OU sensores<button type="button" @click="inputS++"
                                                    class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Adicionar
                                                    mais campos</button></label>
                                            <template v-for="i in inputS" :key="i">
                                                <div class="flex"><input type="text" :id='"itemS" + i'
                                                        class="bg-gray-50 border border-gray-300 my-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="" required>
                                                    <button type="button" @click="inputS--"><svg
                                                            xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1.5" stroke="red"
                                                            class="w-6 h-6 my-5">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M6 18L18 6M6 6l12 12" />
                                                        </svg></button>
                                                </div>

                                            </template>
                                        </div>
                                    </div>
                                    <button type="submit"
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Aplicar</button>
                                    <button type="button" @click="cancelar()"
                                        class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Voltar</button>
                                </form>
                            </div>
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
import router from '../../router'

const auth = useAuth();

export default {
    data() {
        return {
            formData: {},
            user: {},
            tipo: '',
            camposistema: [],
            camposensor: [],
            input: 1,
            inputA: 1,
            inputS: 1,
            inputAtributo: 1,
            inputAtributoS: 1,
            formAtributo: {},
            formOUusuario: {},
            formOUgrupo: {},
            idLdap: 0,
            empresas: [],
            caminhoU: [],
            openTab: 1,
            teste2: false,
            teste3: false,
            teste4: false,
            teste5: false,
            teste6: false,
            contas: [],
            isDisabled: false,
            isDisabledA: false,
            isDisabledO: false,
            isDisabledAtributoSensor: false

        };
    },
    methods: {
        createLdap(formData) {
            http.post('/ldaps/', formData)
                .then(res => {
                    if (this.tipo == 1) {
                        this.teste2 = true
                        this.toggleTabs(2);
                        this.idLdap = res.data.id
                        this.editar();
                    } else {
                        this.teste5 = true
                        this.toggleTabs(5);
                        this.idLdap = res.data.id
                        this.editar();
                    }

                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        testarConexao(formData) {
            http.post('/ldaps/teste/testeconexao/', formData)
                .then(res => {
                    if (res.data.detail == "Conexão bem sucedida!") {
                        this.$swal.fire({
                            icon: 'success',
                            title: res.data.detail,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    } else {
                        this.$swal("Oops...", res.data.detail, "error");
                    }
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        createAtributo() {
            try {
                for (let i = 1; i <= this.inputAtributo; i++) {
                    const campoLdap = document.getElementById('campoLdap' + i);
                    const campoSistema = document.getElementById('campoSistema' + i);
                    const atributo = {
                        campo_ldap: campoLdap.value,
                        campo_sistema: campoSistema.value
                    }
                    console.log(atributo);
                    http.post('/ldaps/' + this.idLdap + '/atributosmapeamento/', atributo)
                        .then(res => {

                        })
                        .catch(e => {
                            this.$swal("Oops...", e.response.data.detail, "error");
                            if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                                this.$router.push('/')
                            }
                        });
                }
                this.teste3 = true
                this.toggleTabs(3);
                this.editarA();
            } catch (error) {
                this.$swal("Oops...", e.response.data.detail, "error");
                if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                    this.$router.push('/')
                }
            }
        },
        createAtributoSensor() {
            try {
                for (let i = 1; i <= this.inputAtributoS; i++) {
                    const campoLdap = document.getElementById('campoLdapS' + i);
                    const campoSistema = document.getElementById('campoSensor' + i);
                    const atributo = {
                        campo_ldap: campoLdap.value,
                        campo_sistema: campoSistema.value
                    }
                    http.post('/ldaps/' + this.idLdap + '/atributosmapeamento/', atributo)
                        .then(res => {
                            console.log(res);
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }

                this.teste6 = true
                this.toggleTabs(6);
            } catch (error) {
                this.$swal("Oops...", e.response.data.detail, "error");
                if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                    this.$router.push('/')
                }
            }
        },

        createOUusuario() {
            try {
                for (let i = 1; i <= this.inputA; i++) {
                    const caminho = document.getElementById('itemA' + i);
                    const u = {
                        caminho: caminho.value
                    }
                    http.post('/ldaps/' + this.idLdap + '/ouusuarios/', u)
                        .then(res => {
                            this.teste4 = true
                            this.toggleTabs(4);
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            } catch (error) {
                this.$swal("Oops...", e.response.data.detail, "error");
                if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                    this.$router.push('/')
                }
            }
        },
        createOUsensor() {
            try {
                for (let i = 1; i <= this.inputS; i++) {
                    const caminho = document.getElementById('itemS' + i);
                    const s = {
                        caminho: caminho.value
                    }
                    http.post('/ldaps/' + this.idLdap + '/ousensores/', s)
                        .then(res => {
                            this.$swal.fire({
                                icon: 'success',
                                title: 'LDAP criado com sucesso',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
                this.$router.push('/ldaps/' + this.tipo);
            } catch (error) {
                this.$swal("Oops...", e.response.data.detail, "error");
                if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                    this.$router.push('/')
                }
            }
        },
        createOUgrupo() {
            try {
                for (let i = 1; i <= this.input; i++) {
                    const caminho = document.getElementById('item' + i);
                    const g = {
                        caminho: caminho.value
                    }
                    http.post('/ldaps/' + this.idLdap + '/ougrupos/', g)
                        .then(res => {
                            this.$router.push('/ldaps/' + this.tipo);
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
                this.$swal.fire({
                    icon: 'success',
                    title: 'LDAP criado com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                })
            } catch (error) {
                this.$swal("Oops...", e.response.data.detail, "error");
                if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                    this.$router.push('/')
                }
            }
        },
        toggleTabs: function (tabNumber) {
            if (tabNumber == 1) {
                this.openTab = tabNumber
            } else if (tabNumber == 2 && this.teste2) {
                this.openTab = tabNumber
            } else if (tabNumber == 3 && this.teste3) {
                this.openTab = tabNumber
            } else if (tabNumber == 4 && this.teste4) {
                this.openTab = tabNumber
            } else if (tabNumber == 5 && this.teste5) {
                this.openTab = tabNumber
            } else if (tabNumber == 6 && this.teste6) {
                this.openTab = tabNumber
            }
        },
        cancelar() {
            this.$router.push('/ldaps/' + this.$route.params.tipo );
        },
        editar() {
            this.isDisabled = !this.isDisabled

        },
        setTipo() {
            this.tipo = this.$route.params.tipo
            console.log('create' + this.tipo);

            console.log('route: ' + this.$route.params.tipo);
        },
        setUser() {
            const u = ref(auth.user)
            this.user = u.value
        },
        getCampoSistema() {
            http.get('/customcampos/usuario/campos/')
                .then(res => {
                    this.camposistema = res.data.results
                })
                .catch(e => {
                   this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });

        },
        getCampoSensor() {
            http.get('/customcampos/sensor/campos/')
                .then(res => {
                    this.camposensor = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });

        },
        getEmpresas() {
            let conta = '?'
            if (this.user.tipo == 4) {
                conta = `?conta=${this.formData.conta}&`
            }

            const url = `/listaitens/empresa/lista${conta}so_ativos=true`
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
        editarA() {
            this.isDisabledA = !this.isDisabledA
        },
        editarO() {
            this.isDisabledO = !this.isDisabledO
        },
        editarAtributoSensor() {
            this.isDisabledAtributoSensor = !this.isDisabledAtributoSensor
        },
        chamadasGet() {
            if (this.user.tipo == 4) {
                this.getContas();
            } else {
                this.getEmpresas();
            }
        }

    },
    mounted() {
        this.setTipo();
        this.setUser();
        this.chamadasGet();
        this.getCampoSistema();
        this.getCampoSensor();
    }
};
</script>


<style scoped></style>