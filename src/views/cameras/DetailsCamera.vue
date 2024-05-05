<template>
    <div>
        <h3 class="detalhes">DETALHES CÂMERAS</h3>
    </div>
  
    <div class="container-fluid p-5">
        <div class="w-full">
            <ul class="flex mb-0 list-none flex-wrap flex-row">
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                        v-on:click="toggleTabs(1)"
                        v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 1, 'text-white bg-gray-800': openTab === 1 }">
                        Detalhes camera
                    </a>
                </li>
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                        v-on:click="toggleTabs(2)"
                        v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 2, 'text-white bg-gray-800': openTab === 2 }">
                        agendamento
                    </a>
                </li>
                <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                        v-on:click="toggleTabs(3)"
                        v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 3, 'text-white bg-gray-800': openTab === 3 }">
                        dados lidos
                    </a>
                </li>

            </ul>
            <div class="relative flex flex-col min-w-0 break-words  w-full mb-6 shadow-lg rounded">
                <div class="px-4 py-5 flex-auto">
                    <div class="tab-content tab-space">
                        <div v-bind:class="{ 'hidden': openTab !== 1, 'block': openTab === 1 }">
                            <form class="row g-3" v-on:submit.prevent="store(camera)">
                                <div class="grid gap-3 mb-3 md:grid-cols-2">
                                    <div v-if="user.tipo == 4">
                                        <label
                                            class="label-form">Conta</label>
                                        <input type="text" v-model="camera.conta" disabled
                                            class="input-form"
                                            placeholder="" required>
                                    </div>
                                    <div>
                                        <label
                                            class="label-form">Título</label>
                                        <input type="text" v-model="camera.titulo" v-on:keyup="habilitarSalvar()"
                                            class="input-form"
                                            placeholder="" required>
                                    </div>
                                    <div>
                                        <label
                                            class="label-form">Descrição</label>
                                        <textarea rows="4" v-model="camera.descricao" v-on:keyup="habilitarSalvar()"
                                            class="input-form"
                                            placeholder=""></textarea>
                                    </div>

                                    <div>
                                        <label
                                            class="label-form">Serial</label>
                                        <input type="text" v-model="camera.serial" v-on:keyup="habilitarSalvar()"
                                            class="input-form"
                                            placeholder="" required>
                                    </div>
                                    <div>
                                        <label
                                            class="label-form">Protocolo</label>
                                        <input type="text" v-model="camera.protocolo" v-on:keyup="habilitarSalvar()"
                                            class="input-form"
                                            placeholder="" required>
                                    </div>

                                    <div>
                                        <label
                                            class="label-form">Usuário</label>
                                        <input type="text" v-model="camera.usuario" v-on:keyup="habilitarSalvar()"
                                            class="input-form"
                                            placeholder="" required>
                                    </div>
                                    <div>
                                        <label
                                            class="label-form">Senha</label>
                                        <input type="password" v-model="camera.senha" v-on:keyup="habilitarSalvar()"
                                            class="input-form"
                                            placeholder="" required>
                                    </div>
                                    <div>
                                        <label
                                            class="label-form">Url</label>
                                        <input type="text" v-model="camera.url" v-on:keyup="habilitarSalvar()"
                                            class="input-form"
                                            placeholder="" required>
                                    </div>
                                    <div>
                                        <label
                                            class="label-form">Empresa</label>
                                        <select class="input-form" v-model="camera.empresa" @change="habilitarSalvar()">
                                            <option value="" disabled>Escolha uma empresa</option>
                                            <template v-for="e in empresas" :key="e.id">
                                                <option selected v-if="e.id == camera.empresa" :value="e.id">{{
                                                    e.nome
                                                    }}</option>
                                            </template>
                                        </select>
                                    </div>
                                    <div>
                                        <label
                                            class="label-form">Ativos</label>
                                        <select v-model="camera.ativo" class="input-form" @change="habilitarSalvar()">
                                            <option value="" disabled selected>Escolha um</option>
                                            <option v-for="v in ativos" :key="v.id" :value="v.id">{{ v.nome
                                                }}
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label
                                            class="label-form">Fabricante</label>
                                        <select v-model="camera.fabricante" @change="habilitarSalvar()"
                                            class="input-form">
                                            <option value="" disabled selected>Escolha a conta</option>
                                            <option v-for="f in fabricantes" :key="f.id" :value="f.id">{{ f.titulo
                                                }}
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                            <label
                                                class="label-form">Modelo</label>
                                            <select v-model="camera.modelo" class="input-form">
                                                <option value="" disabled selected>Escolha um</option>
                                                <option v-for="m in modelos" :key="m.id" :value="m.id">{{ m.titulo
                                                    }}
                                                </option>
                                            </select>
                                        </div>
                                    <div>
                                        <label
                                            class="label-form">Departamento</label>
                                        <select v-model="camera.departamento" @change="habilitarSalvar()"
                                            class="input-form">
                                            <option value="" disabled selected>Escolha a conta</option>
                                            <option v-for="dp in departamentos" :key="dp.id" :value="dp.id">{{
                                                dp.titulo
                                                }}
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label
                                            class="label-form">Grupo</label>
                                        <select v-model="camera.grupo" @change="habilitarSalvar()" class="input-form">
                                            <option value="" disabled selected>Escolha a conta</option>
                                            <option v-for="gp in grupos" :key="gp.id" :value="gp.id">{{
                                                gp.nome
                                                }}
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label
                                            class="label-form">Gateway
                                            IOT</label>
                                        <select v-model="camera.gatewayiot" class="input-form" required>
                                            <option value="" disabled selected>Escolha um</option>
                                            <option v-for="v in gatewayiot" :key="v.id" :value="v.id">{{ v.titulo
                                                }}
                                            </option>
                                        </select>
                                    </div>

                                

                                    <div>
                                        <label class="label-form">Habilitado</label>
                                        <select v-model="camera.is_active" class="input-form"
                                            @change="habilitarSalvar()">
                                            <option :value="true">Sim</option>
                                            <option :value="false">Não</option>
                                        </select>
                                    </div>

                                </div>
                                <button type="submit" v-bind:disabled="isDisabled"
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  disabled:bg-gray-300">Salvar</button>
                                <button type="button" @click="cancelar()"
                                    class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">Cancelar</button>
                            </form>
                        </div>
                        <div v-bind:class="{ 'hidden': openTab !== 2, 'block': openTab === 2 }">
                            <button type="button" @click="mostrarForm()"
                                class="text-white bg-green-700 mb-5 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">Novo
                                Agendamento</button>

                            <table class="border-collapse w-full text-sm">
                                <thead>
                                    <tr>
                                        <th
                                            class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                            Título</th>
                                        <th
                                            class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                            Dias de captura</th>

                                        <th v-if="user.tipo == 4"
                                            class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                            Conta</th>


                                        <th
                                            class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                            Habilitado</th>
                                        <th
                                            class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                            Ação</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white dark:bg-slate-800">
                                    <tr class="hover:bg-gray-100 cursor-pointer duration-200" v-for="li in agendamentos" :key="li.id">
                                        <td @click="detailsAgendamento(li.id)"
                                            class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                                            {{ li.titulo }}</td>
                                        <td @click="detailsAgendamento(li.id)"
                                            class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                                            {{ li.diascaptura }}</td>


                                        <td @click="detailsAgendamento(li.id)" v-if="user.tipo == 4"
                                            class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                                            {{ li.criadopor }}</td>
                                        <td @click="detailsAgendamento(li.id)" 
                                            class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                                            <template v-if="li.is_active">
                                                <div class="flex items-center">
                                                    <div
                                                        class="h-2.5 w-2.5 rounded-full                     bg-green-500 mr-2">
                                                    </div> Sim
                                                </div>
                                            </template>
                                            <template v-else>
                                                <div class="flex items-center">
                                                    <div class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div> Não
                                                </div>
                                            </template>
                                        </td>
                                        <td
                                            class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                                            <button @click="detailsAgendamento(li.id)" class="btn">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </button>
                                            <button @click="deleteAgendamento(li.id)" class="btn">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke-width="1" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                            <div class="py-4">
                                <button v-for="(page, index) in pages" :key="page"
                                    class="px-3 mx-1 py-2 text-sm bg-blue-700 hover:bg-blue-900 focus:bg-violet-700 text-white"
                                    :class="{ current: page === current }" @click="changePage(index)">
                                    {{ page }}
                                </button>
                                <span class="mx-4 text-xd font-semibold text-blue-700">Total:</span> {{
                                    total }}
                            </div>

                            <div v-if="mostrarFormAgenda">
                                <form class="row g-3" v-on:submit.prevent="updateAgendamento(agenda)">
                                    <div class="grid gap-3 mb-3 md:grid-cols-2">
                                        <div v-if="user.tipo == 4">
                                            <label
                                                class="label-form">Conta</label>
                                            <select v-model="agenda.conta" class="input-form" @change="escolherConta()"
                                                disabled>
                                                <option value="" disabled selected>Escolha a conta</option>
                                                <option v-for="c in contas" :key="c.id" :value="c.conta">{{ c.conta }}
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                class="label-form">ID
                                                Camera</label>
                                            <input disabled type="text" v-model="agenda.camera" class="input-form"
                                                placeholder="" required>
                                        </div>

                                        <div>
                                            <label
                                                class="label-form">Título</label>
                                            <input type="text" v-model="agenda.titulo" class="input-form" placeholder=""
                                                required>
                                        </div>
                                        <div>
                                            <label
                                                class="label-form">Descrição</label>
                                            <textarea rows="4" v-model="agenda.descricao" class="input-form"
                                                placeholder=""></textarea>
                                        </div>
                                        <div>
                                            <label
                                                class="label-form">Dias
                                                de Captura</label>
                                            <span v-for="d in diasSemana" :key="d.index"><input v-model="d.ativo"
                                                    @change="escolherDia()" type="checkbox"
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ml-2 my-auto">
                                                {{ d.dia }} </span>
                                        </div>
                                        <div>
                                            <label
                                                class="label-form">Hora
                                                Início</label>
                                            <input type="text" v-model="agenda.periodoinicio" class="input-form"
                                                placeholder="08:00:00" required v-mask="'##:##:##'">
                                        </div>
                                        <div>
                                            <label
                                                class="label-form">Hora
                                                Fim</label>
                                            <input type="text" v-model="agenda.periodofim" class="input-form"
                                                placeholder="12:00:00" required v-mask="'##:##:##'">
                                        </div>
                                        <div>
                                            <label
                                                class="label-form">Intervalo
                                                entre Capturas (minutos)</label>
                                            <input type="number" v-model="agenda.intervaloentrecapturas"
                                                class="input-form" placeholder="" required>
                                        </div>
                                        <div>
                                            <label
                                                class="label-form">Quantidade
                                                de Imagens</label>
                                            <input type="number" v-model="agenda.quantidadeimagem" class="input-form"
                                                placeholder="" required>
                                        </div>
                                        <div>
                                            <label
                                                class="label-form">Intervalo
                                                entre Imagens (segundos)</label>
                                            <input type="number" v-model="agenda.intervaloentreimagens"
                                                class="input-form" placeholder="" required>
                                        </div>
                                        <div v-if="agenda.id">
                                            <label class="label-form">Habilitado</label>
                                            <select v-model="agenda.is_active" class="input-form"
                                                @change="habilitarSalvar()">
                                                <option :value="true">Sim</option>
                                                <option :value="false">Não</option>
                                            </select>
                                        </div>

                                    </div>
                                    <button type="submit"
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Salvar</button>
                                    <button type="button" @click="cancelar()"
                                        class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-3">Cancelar</button>
                                </form>
                            </div>
                        </div>
                        <div v-bind:class="{ 'hidden': openTab !== 3, 'block': openTab === 3 }">
                            <div class="w-full mb-2">
                                <button type="button" @click="getDadosLidos()"
                                    class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3">Atualizar
                                    lista
                                </button>
                                <div class="bg-slate-200 p-2 duration-200
                                        rounded-md">

                                    <table class="border-collapse table-fixed w-full">

                                        <tr>
                                            <th
                                                class="border-b dark:border-slate-600 font-medium p-2 text-slate-400 dark:text-slate-200 text-left">
                                                Hora Início</th>
                                            <th
                                                class="border-b dark:border-slate-600 font-medium p-2 text-slate-400 dark:text-slate-200 text-left">
                                                Hora Fim</th>
                                            <th
                                                class="border-b dark:border-slate-600 font-medium p-2 text-slate-400 dark:text-slate-200 text-left">
                                                Quantidade de Imagens</th>
                                            <th
                                                class="border-b dark:border-slate-600 font-medium p-2 text-slate-400 dark:text-slate-200 text-left">
                                                Hora do Registro</th>

                                        </tr>

                                        <tbody class="bg-white dark:bg-slate-800">
                                            <tr v-for="x in dadoslidos" :key="x">
                                                <td
                                                    class="border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                                                    {{ x.horainicio }}

                                                </td>
                                                <td
                                                    class="border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                                                    {{ x.horafim }}

                                                </td>
                                                <td
                                                    class="border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                                                    {{ x.qtdimagens }} </td>
                                                <td
                                                    class="border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                                                    {{ x.horaregistro }}

                                                </td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="py-4">

                                <button :disabled="prev1 == null" @click="nextPage('previous')"
                                    class="px-3 mx-1 py-2 text-sm bg-blue-700 hover:bg-blue-900 disabled:bg-gray-300 focus:bg-violet-700 text-white">
                                    Anterior
                                </button>
                                <template v-for="(page, index) in pages1" :key="page">

                                    <template v-if="page === '.....'">
                                        {{ page }}
                                    </template>

                                    <template v-else>
                                        <button
                                            class="px-3 mx-1 py-2 text-sm bg-blue-700 hover:bg-blue-900 focus:bg-violet-700 text-white"
                                            :class="page === atual ? 'bg-violet-700' : 'bg-blue-700'"
                                            @click="changePage1(page)">
                                            {{ page }}
                                        </button>
                                    </template>


                                </template>

                                <button :disabled="next1 == null" @click="nextPage('next')"
                                    class="px-3 mx-1 py-2 text-sm bg-blue-700 hover:bg-blue-900 disabled:bg-gray-300 focus:bg-violet-700 text-white">
                                    Próximo
                                </button>

                                <span class="mx-4 text-xd font-semibold text-blue-700">Total: </span> {{
                                    total1 }}
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
import { ref } from 'vue'
import router from '../../router'
import { useAuth } from '../../stores/auth.js'
import moment from 'moment'

const auth = useAuth();

export default {
    data() {
        return {
            next1: null,
            prev1: null,
            mostrarFormAgenda: false,
            dadosCamera: [],
            camera: {
                complemento: "",
                fabricante: "",
                modelo: "",
                grupo: "",
                ativo: "",
                departamento: ""
            },
            gatewayiot: [],
            offset: 0,
            limit: 5,
            pages: [],
            total: 0,
            openTab: 1,
            user: {},
            isDisabled: true,
            contas: {},
            fabricantes: [],
            modelos: [],
            departamentos: [],
            empresas: [],
            ativos: [],
            grupos: [],
            teste: true,
            diasStr: "",
            agenda: {},
            agendamentos: [],
            diasSemana: [
                {
                    dia: "dom",
                    ativo: false,
                    value: 0,
                    indice: 0
                },
                {
                    dia: "seg",
                    ativo: false,
                    value: 0,
                    indice: 1
                },
                {
                    dia: "ter",
                    ativo: false,
                    value: 0,
                    indice: 2
                },
                {
                    dia: "qua",
                    ativo: false,
                    value: 0,
                    indice: 3
                },
                {
                    dia: "qui",
                    ativo: false,
                    value: 0,
                    indice: 4
                },
                {
                    dia: "sex",
                    ativo: false,
                    value: 0,
                    indice: 5
                },
                {
                    dia: "sab",
                    ativo: false,
                    value: 0,
                    indice: 6
                }

            ],
            diasStr: "",
            dadoslidos: [],
            dados: [],
            offset1: 0,
            limit1: 20,
            pages1: [],
            total1: 0,
            atual: 1

        };
    },
    methods: {
        nextPage(n) {
            let i = 0;
            if (n === "next") {
                let x = this.next1.indexOf("&");
                i = this.next1.substring(x + 8, 100).trim();
            } else {
                let x = this.prev1.indexOf("&");
                if (x != -1) {
                    i = this.prev1.substring(x + 8, 100).trim();
                }
                //console.log(x);

            }
            if (i === 0) {
                this.offset1 = 0;
                this.getDadosLidos();
            } else {
                this.getDadosLidos(i / this.limit1);
            }

        },
        abreviarPages() {
            const qty = this.pages1.length; // quantidade total de páginas
            const firstPages = 15; // número de páginas para manter no início
            const lastPages = 3; // número de páginas para manter no final

            let pages = [];
            for (let i = 1; i <= qty; i++) {
                if (i <= firstPages || i > qty - lastPages) {
                    pages.push(i);
                } else if (i === firstPages + 1) {
                    pages.push(".....");
                }
            }
            this.pages1 = pages
        },
        mostrarForm() {
            if (!this.mostrarFormAgenda) {
                this.mostrarFormAgenda = true
            }
            this.agenda = {}
            this.agenda.conta = this.camera.conta
            this.agenda.camera = this.camera.id
            for (let i = 0; i < this.diasSemana.length; i++) {
                this.diasSemana[i].ativo = false;
            }
        },
        createAgendamento(form) {
            const x = {
                titulo: form.titulo,
                camera: this.camera.id,
                diascaptura: this.diasStr,
                periodoinicio: form.periodoinicio,
                periodofim: form.periodofim,
                descricao: form.descricao,
                intervaloentrecapturas: form.intervaloentrecapturas,
                quantidadeimagem: form.quantidadeimagem,
                intervaloentreimagens: form.intervaloentreimagens,
                conta: form.conta,
            }
            http.post('/cameras/' + this.camera.id + '/cameraagendas/', x)
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Agendamento criado com sucesso',
                        showConfirmButton: false,
                        timer: 1500
                    })

                    this.mostrarFormAgenda = false
                    this.getAgendamentos();
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        setarDia(diascaptura) {
            this.diasStr = diascaptura
            for (let x = 0; x < this.diasSemana.length; x++) {
                if (diascaptura.includes(this.diasSemana[x].dia)) {
                    this.diasSemana[x].ativo = true
                }
            }
        },
        escolherDia() {
            let str = []
            for (let x = 0; x < this.diasSemana.length; x++) {
                if (this.diasSemana[x].ativo) {
                    str.push(this.diasSemana[x].dia)
                }
            }
            this.diasStr = str.toString()

        },
        detailsAgendamento(id) {
            if (!this.mostrarFormAgenda) {
                this.mostrarFormAgenda = true
            }

            http.get('/cameras/' + this.camera.id + '/cameraagendas/' + id)
                .then(res => {
                    this.agenda = res.data;
                    this.setarDia(this.agenda.diascaptura);
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        updateAgendamento(form) {
            console.log(form)
            if (!form.id) {
                this.createAgendamento(form);
            } else {
                const x = {
                    titulo: form.titulo,
                    diascaptura: this.diasStr,
                    periodoinicio: form.periodoinicio,
                    descricao: form.descricao,
                    periodofim: form.periodofim,
                    intervaloentrecapturas: form.intervaloentrecapturas,
                    quantidadeimagem: form.quantidadeimagem,
                    intervaloentreimagens: form.intervaloentreimagens,
                    is_active: form.is_active
                }
                // console.log(x);
                http.put('/cameras/' + this.camera.id + '/cameraagendas/' + form.id + '/', x)
                    .then(res => {
                        this.$swal.fire({
                            icon: 'success',
                            title: 'Agendamento atualizado com sucesso',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        // this.toggleTabs(3);
                        this.mostrarFormAgenda = false
                        this.getAgendamentos();
                    })
                    .catch(e => {
                        this.$swal("Oops...", e.response.data.detail, "error");
                        if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                            this.$router.push('/')
                        }
                    });
            }
        },
        verLeituras(hora) {
            if (document.getElementById('mostrar' + hora).style.display === "none") {
                document.getElementById('mostrar' + hora).style.display = "block"
            } else {
                document.getElementById('mostrar' + hora).style.display = "none"
            }
        },
        getDadosLidos(i = null) {
            this.dados = []
            if (i) {
                this.offset1 = i
            }

            const url = `/cameras/${this.camera.id}/dadoslidos?limit=${this.limit1}&offset=${this.limit1 * this.offset1}&ordering=-id`
            http.get(url)
                .then(res => {
                    this.dadosCamera = res.data.results
                    this.total1 = res.data.count
                    const qty = Math.ceil(this.total1 / this.limit1);
                    if (qty <= 1) return [1];
                    this.pages1 = Array.from(Array(qty).keys(), (i) => i + 1);

                    this.next1 = res.data.next;
                    this.prev1 = res.data.previous;
                    this.abreviarPages();
                    this.montarDadosLidos();

                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        montarDadosLidos() {
            let arr = []
            for (let i = 0; i < this.dadosCamera.length; i++) {

                let x = moment(this.dadosCamera[i].horaregistro).format('DD/MM/YYYY HH:mm:ss');
                let horainicio = this.dadosCamera[i].horainicio.slice(0, 8);
                let horafim = this.dadosCamera[i].horafim.slice(0, 8);
                this.dadosCamera[i].horaregistro = x;
                this.dadosCamera[i].horainicio = horainicio;
                this.dadosCamera[i].horafim = horafim;

                arr.push(this.dadosCamera[i]);
            }
            this.dadoslidos = arr
        },
        escolherDia() {
            let str = []
            for (let x = 0; x < this.diasSemana.length; x++) {
                if (this.diasSemana[x].ativo) {
                    str.push(this.diasSemana[x].dia)
                }
            }
            this.diasStr = str.toString()

        },
        toggleTabs: function (tabNumber) {
            if (tabNumber == 1) {
                this.openTab = tabNumber
            } else if (tabNumber == 2 && this.teste) {
                this.openTab = tabNumber
                this.getAgendamentos();
            } else if (tabNumber == 3) {
                this.getDadosLidos();
                this.openTab = tabNumber
            }


        },
        store(formD) {
            const x = {
                titulo: formD.titulo,
                descricao: formD.descricao,
                serial: formD.serial,
                protocolo: formD.protocolo,
                url: formD.url,
                usuario: formD.usuario,
                senha: formD.senha,
                is_active: formD.is_active,
                grupo: formD.grupo,
                empresa: formD.empresa,
                departamento: formD.departamento,
                fabricante: formD.fabricante,
                modelo: formD.modelo,
                ativo: formD.ativo,
                gatewayiot: formD.gatewayiot
            }
            http.put('/cameras/' + this.camera.id + '/', x)
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Dados Atualizados',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.toggleTabs(2);
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        cancelar() {
            this.$router.push('/cameras');
        },
        habilitarSalvar() {
            this.isDisabled = false
        },
        getGatewayIot() {
            let query = '?'
            if (this.user.tipo == 4) {
                query = `?conta=${this.user.conta}&`
            }

            const url = `/listaitens/gatewayiot/lista/${query}so_ativos=true`;
            http.get(url)
                .then(res => {
                    this.gatewayiot = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });

        },
        setCamera() {
            http.get('/cameras/' + this.$route.params.id + '/')
                .then(res => {
                    this.camera = res.data
                    this.getDepartamentos();
                    this.getModelos();
                    this.getFabricantes();
                    this.getAtivos();
                    this.getGrupos();
                    this.getEmpresas();
                    // this.getDadosLidos();
                    this.getGatewayIot();
                    this.getAgendamentos();
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        changePage(i) {
            // this.getAgendamentos(i);
            this.offset = 0
        },
        current() {
            return this.offset ? this.offset + 1 : 1;
        },
        changePage1(i) {
            if (i == 1) {
                this.offset1 = 0;
                this.atual = 1;
                this.getDadosLidos();
                
            } else {
                this.getDadosLidos(i - 1);
                this.atual = i;
            }
            this.offset1 = 0;

        },
        current1() {
            return this.offset1 ? this.offset1 + 1 : 1;
        },
        getAgendamentos(i = null) {
            if (i) {
                this.offset = i
            }
            const url = `cameras/${this.$route.params.id}/cameraagendas?limit=${this.limit}&offset=${this.limit * this.offset}`;
            http.get(url)
                .then(res => {
                    this.agendamentos = res.data.results
                    this.total = res.data.count
                    const qty = Math.ceil(this.total / this.limit);
                    if (qty <= 1) return [1];
                    this.pages = Array.from(Array(qty).keys(), (i) => i + 1);
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
        getDepartamentos() {
            let query = '?modulo=camera'
            if (this.user.tipo == 4) {
                query = `?conta=${this.camera.conta}&modulo=camera`
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
        getModelos() {
            let query = '?modulo=camera'
            if (this.user.tipo == 4) {
                query = `?conta=${this.camera.conta}&modulo=camera`
            }
            const url = `/listaitens/modelo/lista${query}&so_ativos=true`
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
        getGrupos() {
            let query = ''
            if (this.user.tipo == 4) {
                query = `?conta=${this.camera.conta}`
            }
            const url = `/listaitens/cameragrupo/lista${query}&so_ativos=true`
            http.get(url)
                .then(res => {
                    this.grupos = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        getFabricantes() {
            let query = '?modulo=camera'
            if (this.user.tipo == 4) {
                query = `?conta=${this.camera.conta}&modulo=camera`
            }
            const url = `/listaitens/fabricante/lista${query}&so_ativos=true`
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
        getAtivos() {
            let query = `?conta=${this.user.conta}`
            if (this.user.tipo == 4) {
                query = `?conta=${this.camera.conta}`
            }
            http.get('/ativos' + query)
                .then(res => {
                    this.ativos = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });

        },
        deleteAgendamento(id) {
            this.$swal.fire({
                title: 'Deseja Realmente Excluir?',
                text: "Essa ação não pode ser revertida!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Sim, excluir!'
            }).then((result) => {
                if (result.isConfirmed) {
                    http.delete('/cameras/' + this.camera.id + '/cameraagendas/' + id + '/')
                        .then(res => {
                            this.getAgendamentos();
                            this.$swal.fire({
                                icon: 'success',
                                title: res.data.detail,
                                showConfirmButton: false,
                                timer: 1500
                            })
                        })
                        .catch(e => {
                            this.$swal("Oops...", e.response.data.detail, "error");
                            if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                                this.$router.push('/')
                            }
                        });
                }
            })
        }
    },

    mounted() {
        this.setUser();
        this.chamadasGet();
        this.setCamera();
    }
}

</script>


<style scoped></style>