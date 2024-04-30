<template>
    <div class="flex items-center my-auto">
        <h3 class="detalhes">DETALHES DE LDAP {{  tipo == 1 ? 'USUÁRIOS' : 'SENSORES' }}</h3>

    </div>

    <div class="container-fluid p-5">
        <div class="flex flex-wrap">
            <div class="flex items-center justify-center flex-col">
                <div class='has-tooltip'>
                    <span class='tooltip rounded shadow-lg p-1 bg-gray-100 text-blue-800 -mt-10 -mx-8'>Atualizar base
                        Ldap</span>
                    <button type="button" @click="atualizarBase(formData)"
                        class="text-whit focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto text-center hover:scale-105 duration-200 hover:shadow-md"><img
                            width="50" src="../../assets/img/icone-update.png"></button>
                </div>

            </div>

            <div class="w-full">
                <ul class="flex mb-0 list-none flex-wrap flex-row">
                    <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                            v-on:click="toggleTabs(1)"
                            v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 1, 'text-white bg-gray-800': openTab === 1 }">
                            Detalhes do LDAP
                        </a>
                    </li>
                    <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                            v-on:click="toggleTabs(2)"
                            v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 2, 'text-white bg-gray-800': openTab === 2 }">
                            Configurações LDAP
                        </a>
                    </li>
                    <li v-if="tipo == 1" class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                            v-on:click="toggleTabs(3)"
                            v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 3, 'text-white bg-gray-800': openTab === 3 }">
                            Atributos
                        </a>
                    </li>
                    <li v-if="tipo == 1" class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                            v-on:click="toggleTabs(4)"
                            v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 4, 'text-white bg-gray-800': openTab === 4 }">
                            OU Usuário
                        </a>
                    </li>
                    <li v-if="tipo == 1" class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                            v-on:click="toggleTabs(5)"
                            v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 5, 'text-white bg-gray-800': openTab === 5 }">
                            OU Grupo
                        </a>
                    </li>
                    <li v-if="tipo == 2" class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                            v-on:click="toggleTabs(6)"
                            v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 6, 'text-white bg-gray-800': openTab === 6 }">
                            Atributos
                        </a>
                    </li>
                    <li v-if="tipo == 2" class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                            v-on:click="toggleTabs(7)"
                            v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 7, 'text-white bg-gray-800': openTab === 7 }">
                            OU Sensor
                        </a>
                    </li>

                </ul>
                <div class="relative flex flex-col min-w-0 break-words  w-full mb-6 shadow-lg rounded">
                    <div class="px-4 py-5 flex-auto">
                        <div class="tab-content tab-space">
                            <div v-bind:class="{ 'hidden': openTab !== 1, 'block': openTab === 1 }">

                                <form class="row g-3" v-on:submit.prevent="storeLdap(ldap)">
                                    <div class="grid gap-3 mb-3 md:grid-cols-2">
                                        <div>
                                            <label class="label-form">Título</label>
                                            <input type="text" v-model="ldap.titulo" class="input-form"
                                                v-on:keyup="habilitarSalvar()" placeholder="">
                                        </div>
                                        <div v-if="user.tipo == 4">
                                            <label class="label-form">Conta</label>
                                            <select v-model="ldap.conta" disabled class="input-form">
                                                <option value="" disabled>Escolha a conta</option>
                                                <option v-for="c in contas" :key="c.id" :value="c.conta">{{ c.conta }}
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label class="label-form">Ldap Tipo</label>
                                            <select v-model="ldap.ldap_tipo" @change="habilitarSalvar()" class="input-form">
                                                <option value="">Escolha uma tipo</option>
                                                <option value="1">Usuarios/Grupos</option>
                                                <option value="2">Sensores</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label class="label-form">Empresa</label>
                                            <select v-model="ldap.empresa" @change="habilitarSalvar()" class="input-form">
                                                <option value="" disabled>Escolha a conta</option>
                                                <option v-for="e in empresas" :key="e.id" :value="e.id">{{ e.nome }}
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label class="label-form">Host</label>
                                            <input type="text" v-model="ldap.host" v-on:keyup="habilitarSalvar()"
                                                class="input-form" placeholder="">
                                        </div>
                                        <div>
                                            <label class="label-form">Porta</label>
                                            <input type="number" v-model="ldap.porta" v-on:keyup="habilitarSalvar()"
                                                class="input-form" placeholder="">
                                        </div>
                                        <div>
                                            <label class="label-form">Tipo de Autenticação</label>
                                            <select v-model="ldap.tipo_autenticacao" @change="habilitarSalvar()"
                                                class="input-form">
                                                <option value="" disabled selected>Escolha um tipo de autenticação</option>
                                                <option value="1">Simples</option>
                                                <option value="2">Digest-MD5</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label class="label-form">Usuário</label>
                                            <input v-on:keyup="habilitarSalvar()" type="text" v-model="ldap.usuario"
                                                class="input-form" placeholder="">
                                        </div>
                                        <div v-if="ldap.origemusuario != 'ldap'">
                                            <label class="label-form">Senha</label>
                                            <input v-on:keyup="habilitarSalvar()" type="password" v-model="ldap.senha"
                                                class="input-form" placeholder="">
                                        </div>
                                        <div>
                                            <label class="label-form">Domínio</label>
                                            <input v-on:keyup="habilitarSalvar()" type="text" v-model="ldap.dominio"
                                                class="input-form" placeholder="">
                                        </div>
                                        <div>
                                            <label class="label-form">Provedor</label>
                                            <select v-model="ldap.provedor" @change="habilitarSalvar()" class="input-form">
                                                <option value="" disabled>Escolha um provedor</option>
                                                <option value="1">Microsoft LDAP</option>
                                                <option value="2">Open LDAP</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label class="label-form">Habilitado</label>
                                            <select v-model="ldap.is_active" class="input-form" @change="habilitarSalvar()">
                                                <option :value="true">Sim</option>
                                                <option :value="false">Não</option>
                                            </select>
                                        </div>
                                        <div>
                                                <label class="label-form">Base DN</label>
                                                <input type="text" v-model="ldap.base_dn" v-on:keyup="habilitarSalvar()"
                                                    class="input-form" placeholder="">
                                            </div>

                                    </div>
                                    <button type="submit" v-bind:disabled="isDisabled"
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-300">Salvar</button>
                                    <button type="button" @click="testarConexao(ldap)"
                                        class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Testar
                                        Conexão</button>
                                    <button type="button" @click="cancelar()"
                                        class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Cancelar</button>
                                </form>
                            </div>
                            <div v-bind:class="{ 'hidden': openTab !== 2, 'block': openTab === 2 }">
                                <form class="row g-3" v-on:submit.prevent="storeConfigurations(ldap)">
                                    <div class="grid gap-3 mb-3 md:grid-cols-2">
                                        <div @click="ocultarCalendario()">
                                            <label class="label-form">Agendar Scan</label>
                                            <select v-model="ldap.agendar_scan" class="input-form"
                                                @change="habilitarSalvar()">
                                                <option :value="true">Sim</option>
                                                <option :value="false">Não</option>
                                            </select>
                                        </div>
                                        <div v-if="ldap.agendar_scan === true">
                                            <label class="label-form">Data de início</label>
                                            <input type="text" v-model="ldap.hora_inicio_agenda"
                                                @click="mostrarCalendario()" @blur="habilitarSalvar()" class="input-form"
                                                placeholder="">
                                            <div class="flex" v-if="mostrarCalendar">
                                                <DatePicker v-model="ldap.hora_inicio_agenda" mode="dateTime"
                                                    v-on:keyup="habilitarSalvar()" is24hr timezone="UTC" />
                                            </div>
                                        </div>
                                        <div v-if="ldap.agendar_scan === true" @click="ocultarCalendario()">
                                            <label class="label-form">Tipo de repetição</label>
                                            <select v-model="ldap.tipo_repeticao_agenda" class="input-form"
                                                @change="habilitarSalvar()">
                                                <option value="1">Diário</option>
                                                <option value="2">Semanal</option>
                                                <option value="3">Mensal</option>

                                            </select>
                                        </div>
                                        <div @click="ocultarCalendario()"
                                            v-if="ldap.tipo_repeticao_agenda === '2' || ldap.tipo_repeticao_agenda === 2 && ldap.agendar_scan == true">
                                            <label class="label-form">Ciclo de repetição</label>
                                            <span v-for="d in diasSemana" :key="d.index"><input v-model="d.ativo"
                                                    @change="escolherDia()" type="checkbox"
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ml-2 my-auto">
                                                {{ d.dia }} </span>
                                        </div>
                                        <div @click="ocultarCalendario()">
                                            <label class="label-form">Importar Grupos</label>
                                            <select v-model="ldap.importar_grupos" class="input-form"
                                                @change="habilitarSalvar()">
                                                <option :value="true" selected>Sim</option>
                                                <option :value="false">Não</option>

                                            </select>
                                        </div>
                                        <div @click="ocultarCalendario()">
                                            <label class="label-form">Incluir Subs OUs</label>
                                            <select v-model="ldap.incluir_sub_ous" class="input-form"
                                                @change="habilitarSalvar()">
                                                <option :value="true" selected>Sim</option>
                                                <option :value="false">Não</option>

                                            </select>
                                        </div>
                                        <div @click="ocultarCalendario()">
                                            <label class="label-form">Salvar senha em cache</label>
                                            <select v-model="ldap.salvar_senha_cache" class="input-form"
                                                @change="habilitarSalvar()">
                                                <option :value="true" selected>Sim</option>
                                                <option :value="false">Não</option>

                                            </select>
                                        </div>


                                        <div @click="ocultarCalendario()">
                                            <label class="label-form">Filtro Classe</label>
                                            <input type="text" v-model="ldap.filtro_classe" v-on:keyup="habilitarSalvar()"
                                                class="input-form" placeholder="">
                                        </div>

                                        <div @click="ocultarCalendario()">
                                            <label class="label-form">Filtro Usuário</label>
                                            <input type="text" v-model="ldap.filtro_usuario" v-on:keyup="habilitarSalvar()"
                                                class="input-form" placeholder="">
                                        </div>
                                        <div @click="ocultarCalendario()">
                                            <label class="label-form">Atributo CN</label>
                                            <input type="text" v-model="ldap.atributo_cn" v-on:keyup="habilitarSalvar()"
                                                class="input-form" placeholder="">
                                        </div>
                                        <div @click="ocultarCalendario()">
                                            <label class="label-form">Atributo DN</label>
                                            <input type="text" v-model="ldap.atributo_dn" v-on:keyup="habilitarSalvar()"
                                                class="input-form" placeholder="">
                                        </div>
                                        <div @click="ocultarCalendario()">
                                            <label class="label-form">Atributo Nome</label>
                                            <input type="text" v-model="ldap.atributo_nome" v-on:keyup="habilitarSalvar()"
                                                class="input-form" placeholder="">
                                        </div>
                                        <div @click="ocultarCalendario()">
                                            <label class="label-form">DN Login</label>
                                            <input type="text" v-model="ldap.dn_login" v-on:keyup="habilitarSalvar()"
                                                class="input-form" placeholder="">
                                        </div>
                                        <div @click="ocultarCalendario()">
                                            <label class="label-form">Open Ldap Atributo Estado</label>
                                            <input type="text" v-model="ldap.open_ldap_atributo_state"
                                                v-on:keyup="habilitarSalvar()" class="input-form" placeholder="">
                                        </div>
                                        <div @click="ocultarCalendario()">
                                            <label class="label-form">Open Ldap AtributoF Estado DU</label>
                                            <input type="text" v-model="ldap.open_ldap_atributo_state_du"
                                                v-on:keyup="habilitarSalvar()" class="input-form" placeholder="">
                                        </div>

                                    </div>
                                    <button type="submit" v-bind:disabled="isDisabled"
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-300">Salvar</button>
                                    <button type="button" @click="cancelar()"
                                        class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Cancelar</button>
                                </form>
                            </div>
                            <div v-bind:class="{ 'hidden': openTab !== 3, 'block': openTab === 3 }">
                                <div>
                                    <button
                                        class="mx-1 my-5 px-4 py-2 font-semibold text-sm bg-green-800 text-white rounded-md shadow-sm"
                                        @click="btnMostrarAddAtributo()">Adicionar mais Atributos</button>

                                </div>

                                <div v-if="mostrarAddAtributo">
                                    <form class="row g-3" v-on:submit.prevent="createAtributo(formAtributo)">
                                        <div class="border px-3 py-3 my-3 rounded-lg">

                                            <div class="grid gap-3 mb-3 md:grid-cols-2">
                                                <div>
                                                    <label
                                                        class="label-form">Campo
                                                        LDAP</label>
                                                    <input v-on:key="habilitarSalvar()" type="text"
                                                        v-model="formAtributo.campo_ldap"
                                                        class="input-form"
                                                        placeholder="" required>
                                                </div>
                                                <div>
                                                    <label
                                                        class="label-form">Caminho</label>
                                                    <div class="flex"><select v-model="formAtributo.campo_sistema"
                                                            @change="habilitarSalvar()"
                                                            class="input-form">
                                                            <option value="" disabled selected>Escolha uma opção
                                                            </option>
                                                            <option v-for="cs in camposistema" :key="cs.id"
                                                                :value="cs.idcampoform">{{ cs.label }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>

                                            </div>
                                            <button type="submit" v-bind:disabled="isDisabled"
                                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">salvar</button><button
                                                type="submit" @click="btnMostrarAddAtributo()"
                                                class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mx-3 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Fechar</button>
                                        </div>


                                    </form>
                                </div>
                                <form class="row g-3">
                                    <div class="grid gap-6 mb-6 md:grid-cols-1">
                                        <table class="border-collapse table-fixed w-full text-sm">
                                            <thead>
                                                <tr>
                                                    <th
                                                        class="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                        ID</th>
                                                    <th
                                                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                        Campo Ldap</th>
                                                    <th
                                                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                        Campo Sistema</th>
                                                    <th
                                                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                        Conta</th>
                                                    <th
                                                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                        Ação</th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white dark:bg-slate-800">
                                                <tr v-for="u in atributo" :key="u.id">
                                                    <td
                                                        class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                                                        {{ u.id }}</td>
                                                    <td
                                                        class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                                                        <input @blur="updateAtributo(u.id)" type="text"
                                                            :id='"campoLdap" + u.id' :class='"item" + u.id'
                                                            :value="u.campo_ldap" class="input-form" placeholder="">
                                                    </td>
                                                    <td
                                                        class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                                                        <select @blur="updateAtributo(u.id)" :id='"campoSistema" + u.id'
                                                            v-model="u.campo_sistema" class="input-form">
                                                            <option value="" disabled selected>Escolha uma opção
                                                            </option>
                                                            <option v-for="cs in camposistema" :key="cs.id"
                                                                :value="cs.idcampoform">{{ cs.label }}</option>

                                                        </select>
                                                    </td>
                                                    <td
                                                        class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                                                        {{ u.conta }}</td>
                                                    <td
                                                        class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">

                                                        <button type="button" class="btn" @click="deleteAtributo(u.id)">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1" stroke="currentColor"
                                                                class="w-6 h-6">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <button type="button" @click="toggleTabs(4)"
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Avançar</button>
                                    <button type="button" @click="cancelar()"
                                        class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Cancelar</button>
                                </form>

                            </div>
                            <div v-bind:class="{ 'hidden': openTab !== 4, 'block': openTab === 4 }">
                                <div>

                                    <button
                                        class="mx-1 my-5 px-4 py-2 font-semibold text-sm bg-green-800 text-white rounded-md shadow-sm"
                                        @click="btnMostrarAddOUusuario()">Adicionar mais OU de usuário</button>

                                </div>

                                <div v-if="mostrarAddOUusuario">
                                    <form class="row g-3" v-on:submit.prevent="createOUusuario()">
                                        <div class="border px-3 py-3 my-3 rounded-lg">

                                            <div class="grid gap-3 mb-3 md:grid-cols-2">
                                                <div>
                                                    <label
                                                        class="label-form">Caminho
                                                        OU usuários<button type="button" @click="inputOUusuario++"
                                                            class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Adicionar
                                                            mais campos</button></label>
                                                    <template v-for="i in inputOUusuario" :key="i">
                                                        <div class="flex"><input v-on:keyup="habilitarSalvar()" type="text"
                                                                :id='"itemOUusuario" + i'
                                                                class="bg-gray-50 border border-gray-300 my-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                placeholder="" required>
                                                            <button type="button" @click="inputOUusuario--"><svg
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
                                            <button type="submit" v-bind:disabled="isDisabled"
                                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">salvar</button><button
                                                type="button" @click="btnMostrarAddAtributo()"
                                                class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mx-3 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">fechar</button>
                                        </div>


                                    </form>
                                </div>
                                <form class="row g-3">
                                    <div class="grid gap-6 mb-6 md:grid-cols-1">
                                        <table class="border-collapse table-fixed w-full text-sm">
                                            <thead>
                                                <tr>

                                                    <th
                                                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                        Caminho</th>
                                                    <th
                                                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                        Conta</th>
                                                    <th
                                                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                        Ação</th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white dark:bg-slate-800">
                                                <tr v-for="u in  ouUsuario" :key="u.id">

                                                    <td
                                                        class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                                                        <input @blur="updateOUusuario(u.id)" type="text" :id='"item" + u.id'
                                                            :class='"item" + u.id' :value="u.caminho" class="input-form"
                                                            placeholder="">
                                                    </td>
                                                    <td
                                                        class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                                                        {{ u.conta }}</td>
                                                    <td
                                                        class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">

                                                        <button class="btn" @click="deleteOUusuario(u.id)">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1" stroke="currentColor"
                                                                class="w-6 h-6">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                    <button type="button" @click="toggleTabs(5)"
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Avançar</button>
                                    <button type="button" @click="cancelar()"
                                        class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Voltar</button>
                                </form>


                            </div>
                            <div v-bind:class="{ 'hidden': openTab !== 5, 'block': openTab === 5 }">
                                <div>

                                    <button
                                        class="mx-1 my-5 px-4 py-2 font-semibold text-sm bg-green-800 text-white rounded-md shadow-sm"
                                        @click="btnMostrarAddOUgrupo()">Adicionar mais OU de grupo</button>

                                </div>
                                <div v-if="mostrarAddOUgrupo">
                                    <form class="row g-3" v-on:submit.prevent="createOUgrupo()">
                                        <div class="border px-3 py-3 my-3 rounded-lg">

                                            <div class="grid gap-3 mb-3 md:grid-cols-2">
                                                <div>
                                                    <label
                                                        class="label-form">Caminho
                                                        OU usuários<button type="button" @click="inputOUgrupo++"
                                                            class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Adicionar
                                                            mais campos</button></label>
                                                    <template v-for="i in inputOUgrupo" :key="i">
                                                        <div class="flex"><input v-on:keyup="habilitarSalvar()" type="text"
                                                                :id='"itemOUgrupo" + i'
                                                                class="bg-gray-50 border border-gray-300 my-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                placeholder="" required>
                                                            <button type="button" @click="inputOUgrupo--"><svg
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
                                            <button type="submit" v-bind:disabled="isDisabled"
                                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">salvar</button>
                                            <button type="button" @click="btnMostrarAddAtributo()"
                                                class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mx-3 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">fechar</button>
                                        </div>


                                    </form>
                                </div>
                                <form class="row g-3">
                                    <div class="grid gap-6 mb-6 md:grid-cols-1">
                                        <table class="border-collapse table-fixed w-full text-sm">
                                            <thead>
                                                <tr>

                                                    <th
                                                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                        Caminho</th>
                                                    <th
                                                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                        Conta</th>
                                                    <th
                                                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                        Ação</th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white dark:bg-slate-800">
                                                <tr v-for="u in  ouGrupo" :key="u.id">

                                                    <td
                                                        class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                                                        <input @blur="updateOUgrupo(u.id)" type="text" :id='"item" + u.id'
                                                            :class='"item" + u.id' :value="u.caminho" class="input-form"
                                                            placeholder="">
                                                    </td>
                                                    <td
                                                        class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                                                        {{ u.conta }}</td>
                                                    <td
                                                        class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">

                                                        <button class="btn" @click="deleteOUgrupo(u.id)">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1" stroke="currentColor"
                                                                class="w-6 h-6">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>

                                    <button type="button" @click="cancelar()"
                                        class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Voltar</button>
                                </form>
                            </div>
                            <div v-bind:class="{ 'hidden': openTab !== 6, 'block': openTab === 6 }">
                                <div>

                                    <button
                                        class="mx-1 my-5 px-4 py-2 font-semibold text-sm bg-green-800 text-white rounded-md shadow-sm"
                                        @click="btnMostrarAddAtributo()">Adicionar mais Atributos</button>

                                </div>

                                <div v-if="mostrarAddAtributo">
                                    <form class="row g-3" v-on:submit.prevent="createAtributo(formAtributo)">
                                        <div class="border px-3 py-3 my-3 rounded-lg">

                                            <div class="grid gap-3 mb-3 md:grid-cols-2">
                                                <div>
                                                    <label
                                                        class="label-form">Campo
                                                        LDAP</label>
                                                    <input v-on:keyup="habilitarSalvar()" type="text"
                                                        v-model="formAtributo.campo_ldap"
                                                        class="input-form"
                                                        placeholder="" required>
                                                </div>

                                                <div>
                                                    <label
                                                        class="label-form">Campo
                                                        Sensor</label>
                                                    <div class="flex"><select v-model="formAtributo.campo_sistema"
                                                            @change="habilitarSalvar()"
                                                            class="input-form">
                                                            <option value="" disabled selected>Escolha uma opção
                                                            </option>
                                                            <option v-for="cs in camposensor" :key="cs.id"
                                                                :value="cs.idcampoform">{{ cs.label }}</option>

                                                        </select></div>
                                                </div>
                                            </div>
                                            <button type="submit" v-bind:disabled="isDisabled"
                                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">salvar</button>
                                            <button type="submit" @click="btnMostrarAddAtributo()"
                                                class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mx-3 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Cancelar</button>
                                        </div>


                                    </form>
                                </div>
                                <form class="row g-3">
                                    <div class="grid gap-6 mb-6 md:grid-cols-1">
                                        <table class="border-collapse table-fixed w-full text-sm">
                                            <thead>
                                                <tr>

                                                    <th
                                                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                        Campo Ldap</th>
                                                    <th
                                                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                        Campo Sistema</th>
                                                    <th
                                                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                        Conta</th>
                                                    <th
                                                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                        Ação</th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white dark:bg-slate-800">
                                                <tr v-for="u in atributo" :key="u.id">

                                                    <td
                                                        class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                                                        <input @blur="updateAtributoSensor(u.id)" type="text"
                                                            :id='"campoLdapS" + u.id' :class='"item" + u.id'
                                                            :value="u.campo_ldap" class="input-form" placeholder="">
                                                    </td>
                                                    <td
                                                        class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                                                        <select @change="updateAtributoSensor(u.id)"
                                                            :id='"campoSensorI" + u.id' v-model="u.campo_sistema"
                                                            class="input-form">
                                                            <option value="" disabled selected>Escolha uma opção
                                                            </option>
                                                            <option v-for="cs in camposensor" :key="cs.id"
                                                                :value="cs.idcampoform">{{ cs.label }}</option>

                                                        </select>
                                                    </td>
                                                    <td
                                                        class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                                                        {{ u.conta }}</td>
                                                    <td
                                                        class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">

                                                        <button type="button" class="btn" @click="deleteAtributo(u.id)">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1" stroke="currentColor"
                                                                class="w-6 h-6">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <button type="button" @click="toggleTabs(7)"
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Avançar</button>
                                    <button type="button" @click="cancelar()"
                                        class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Cancelar</button>
                                </form>
                            </div>
                            <div v-bind:class="{ 'hidden': openTab !== 7, 'block': openTab === 7 }">
                                <div>
                                    <button
                                        class="mx-1 my-5 px-4 py-2 font-semibold text-sm bg-green-800 text-white rounded-md shadow-sm"
                                        @click="btnMostrarAddOUsensor()">Adicionar mais Atributos</button>
                                    <div v-if="mostrarAddOUsensor">
                                        <form class="row g-3" v-on:submit.prevent="createOUsensor()">
                                            <div class="border px-3 py-3 my-3 rounded-lg">

                                                <div class="grid gap-3 mb-3 md:grid-cols-2">
                                                    <div>
                                                        <label
                                                            class="label-form">Caminho
                                                            OU usuários<button type="button" @click="inputOUgrupo++"
                                                                class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center">Adicionar
                                                                mais campos</button></label>
                                                        <template v-for="i in inputOUsensor" :key="i">
                                                            <div class="flex"><input v-on:keyup="habilitarSalvar()"
                                                                    type="text" :id='"itemOUsensor" + i'
                                                                    class="bg-gray-50 border border-gray-300 my-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                    placeholder="" required>
                                                                <button type="button" @click="inputOUsensor--"><svg
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
                                                <button type="submit" v-bind:disabled="isDisabled"
                                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">salvar</button><button
                                                    type="button" @click="btnMostrarAddAtributo()"
                                                    class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mx-3 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">fechar</button>
                                            </div>


                                        </form>
                                    </div>
                                </div>
                                <form class="row g-3">
                                    <div class="grid gap-6 mb-6 md:grid-cols-1">
                                        <table class="border-collapse table-fixed w-full text-sm">
                                            <thead>
                                                <tr>

                                                    <th
                                                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                        Caminho</th>
                                                    <th
                                                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                        Conta</th>
                                                    <th
                                                        class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                                        Ação</th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white dark:bg-slate-800">
                                                <tr v-for="s in  ouSensores" :key="s.id">

                                                    <td
                                                        class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                                                        <input @blur="updateOUsensor(s.id)" type="text" :id='"itemS" + s.id'
                                                            :class='"itemS" + s.id' :value="s.caminho" class="input-form"
                                                            placeholder="">
                                                    </td>
                                                    <td
                                                        class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                                                        {{ s.conta }}</td>
                                                    <td
                                                        class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">

                                                        <button class="btn" @click="deleteOUsensor(s.id)">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1" stroke="currentColor"
                                                                class="w-6 h-6">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>

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
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

const auth = useAuth();


export default {
    components: {
        Calendar,
        DatePicker,
    },
    data() {
        return {
            inputOUusuario: 1,
            diasStr: "",
            mostrarCalendar: false,
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
            inputOUgrupo: 1,
            inputOUsensor: 1,
            ldap: {
                is_active: false
            },
            user: {},
            tipo: '',
            camposistema: [],
            camposensor: [],
            contas: {},
            atributo: [],
            formAtributo: {},
            formOUusuario: {},
            ouGrupo: [],
            ouSensores: [],
            ouUsuario: [],
            empresas: {},
            formOUs: {},
            openTab: 1,
            isDisabled: true,
            isDisabledInput: true,
            isDisabledInput2: true,
            isDisabledInput3: true,
            isDisabledA: true,
            isDisabledO: true,
            isModalVisible: false,
            isDisabledAtributoSensor: true,
            mostrarAddAtributo: false,
            mostrarAddOUusuario: false,
            mostrarAddOUgrupo: false,
            mostrarAddOUsensor: false,
            teste: ""
        };
    },
    methods: {
        testarConexao(ldap) {
            const u = {
                conta: ldap.conta,
                dominio: ldap.dominio,
                empresa: ldap.empresa,
                host: ldap.host,
                ldap_tipo: ldap.ldap_tipo,
                base_dn: ldap.base_dn,
                porta: ldap.porta,
                provedor: ldap.provedor,
                senha: ldap.senha,
                tipo_autenticacao: ldap.tipo_autenticacao,
                titulo: ldap.titulo,
                usuario: ldap.usuario
            }
            http.post('/ldaps/teste/testeconexao/', u)
                .then(res => {
                    console.log(res)
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
        mostrarCalendario() {
            this.mostrarCalendar = !this.mostrarCalendar
        },
        ocultarCalendario() {
            if (this.mostrarCalendar == true) {
                this.mostrarCalendar = false
            }
        },
        setarDia() {
            let arr = this.ldap.ciclo_repeticao_agenda.split(',');
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == "1" && this.diasSemana[i].indice == i) {
                    this.diasSemana[i].ativo = true
                    this.diasSemana[i].value = 1
                } else {
                    this.diasSemana[i].ativo = false
                    this.diasSemana[i].value = 0
                }
            }
        },
        escolherDia() {
            for (let i = 0; i < this.diasSemana.length; i++) {
                if (this.diasSemana[i].ativo == true) {
                    this.diasSemana[i].value = 1
                } else {
                    this.diasSemana[i].value = 0
                }
            }
            console.log(this.diasSemana);
            let arrr = []
            for (let x = 0; x < this.diasSemana.length; x++) {
                arrr.push(this.diasSemana[x].value)
            }
            this.diasStr = arrr.toString();
            console.log(this.diasStr)
            this.isDisabled = false
        },
        storeLdap(l) {

            let senha = this.ldap.senha
            if (!this.ldap.origemusuario == "ldap") {
                senha = l.senha
            }
            const ld = {
                titulo: l.titulo,
                ldap_tipo: l.ldap_tipo,
                tipo_autenticacao: l.tipo_autenticacao,
                usuario: l.usuario,
                empresa: l.empresa,
                host: l.host,
                porta: l.porta,
                dominio: l.dominio,
                provedor: l.provedor,
                senha: senha,
                is_active: l.is_active,
                base_dn: l.base_dn,
                agendar_scan: l.agendar_scan,
                hora_inicio_agenda: l.hora_inicio_agenda,
                tipo_repeticao_agenda: l.tipo_repeticao_agenda,
                ciclo_repeticao_agenda: l.ciclo_repeticao_agenda,
                importar_grupos: l.importar_grupos,
                incluir_sub_ous: l.incluir_sub_ous,
                salvar_senha_cache: l.salvar_senha_cache,
                filtro_classe: l.filtro_classe,
                filtro_usuario: l.filtro_usuario,
                atributo_cn: l.atributo_cn,
                atributo_dn: l.atributo_dn,
                atributo_nome: l.atributo_nome,
                dn_login: l.dn_login,
                open_ldap_atributo_state: l.open_ldap_atributo_state,
                open_ldap_atributo_state_du: l.open_ldap_atributo_state_du
            }
            const result = Object.fromEntries(Object.entries(ld).filter(([_, v]) => v != null))

            http.put('/ldaps/' + this.ldap.id + '/', result)
                .then(res => {

                    this.toggleTabs(2)
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        storeConfigurations(l) {
            let ciclo = ""
            if (this.diasStr == "") {
                ciclo = l.ciclo_repeticao_agenda
            } else {
                ciclo = this.diasStr
            }
            const ld = {
                titulo: l.titulo,
                ldap_tipo: l.ldap_tipo,
                tipo_autenticacao: l.tipo_autenticacao,
                usuario: l.usuario,
                empresa: l.empresa,
                host: l.host,
                porta: l.porta,
                dominio: l.dominio,
                provedor: l.provedor,
                senha: l.senha,
                is_active: l.is_active,
                base_dn: l.base_dn,
                agendar_scan: l.agendar_scan,
                hora_inicio_agenda: l.hora_inicio_agenda,
                tipo_repeticao_agenda: l.tipo_repeticao_agenda,
                ciclo_repeticao_agenda: ciclo,
                importar_grupos: l.importar_grupos,
                incluir_sub_ous: l.incluir_sub_ous,
                salvar_senha_cache: l.salvar_senha_cache,
                filtro_classe: l.filtro_classe,
                filtro_usuario: l.filtro_usuario,
                atributo_cn: l.atributo_cn,
                atributo_dn: l.atributo_dn,
                atributo_nome: l.atributo_nome,
                dn_login: l.dn_login,
                open_ldap_atributo_state: l.open_ldap_atributo_state,
                open_ldap_atributo_state_du: l.open_ldap_atributo_state_du
            }
            http.put('/ldaps/' + this.ldap.id + '/', ld)
                .then(res => {
                    if (this.$route.params.tipo == 2) {
                        this.toggleTabs(6)
                    } else {
                        this.toggleTabs(3)
                    }
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        btnMostrarAddAtributo() {
            this.mostrarAddAtributo = !this.mostrarAddAtributo
        },
        btnMostrarAddOUusuario() {
            this.mostrarAddOUusuario = !this.mostrarAddOUusuario
        },
        btnMostrarAddOUgrupo() {
            this.mostrarAddOUgrupo = !this.mostrarAddOUgrupo
        },
        btnMostrarAddOUsensor() {
            this.mostrarAddOUsensor = !this.mostrarAddOUsensor
        },
        habilitarSalvar() {
            this.isDisabled = false
        },
        cancelar() {
            this.$router.push('/ldaps/' + this.$route.params.tipo);
        },
        abrirModal() {
            this.isModalVisible = true
        },
        getCampoSistema() {
            http.get('/customcampos/usuario/campos')
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
        atualizarBase() {
            let tipo = "usuariosupdate"
            if (this.$route.params.tipo == 2){
                tipo = "sensoresupdate"
            }
            const url = `/ldaps/${this.ldap.id}/${tipo}/`
            http.post(url)
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: res.data.mensagem,
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

        },
        getCampoSensor() {
            http.get('/customcampos/sensor/campos')
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
        fecharModal() {
            this.isModalVisible = false
        },
        toggleTabs: function (tabNumber) {
            if (tabNumber == 2) {
                this.setLdap();
            }
            this.openTab = tabNumber
        },
        getAtributo(id) {
            http.get('/ldaps/' + id + '/atributosmapeamento/')
                .then(res => {
                    this.atributo = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        createAtributo(formAtributo) {
            http.post('/ldaps/' + this.ldap.id + '/atributosmapeamento/', formAtributo)
                .then(res => {
                    this.getAtributo(this.ldap.id);
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Atributo criado com sucesso',
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


        },
        getOuGrupo(id) {
            http.get('/ldaps/' + id + '/ougrupos/')
                .then(res => {
                    this.ouGrupo = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        getOuUsuario(id) {
            http.get('/ldaps/' + id + '/ouusuarios/')
                .then(res => {
                    this.ouUsuario = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        getOUsensores(id) {
            http.get('/ldaps/' + id + '/ousensores/')
                .then(res => {
                    this.ouSensores = res.data.results
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
        getEmpresas() {
            let conta = '?'
            if (this.user.tipo == 4) {
                conta = `?conta=${this.user.conta}&`
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
        updateOUusuario(id) {
            const v = document.getElementById('item' + id)
            const u = {
                caminho: v.value
            }
            http.put('/ldaps/' + this.ldap.id + '/ouusuarios/' + id + '/', u)
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Dados Atualizados',
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
        },
        deleteOUusuario(id) {
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
                    http.delete('/ldaps/' + this.ldap.id + '/ouusuarios/' + id + '/')
                        .then(res => {
                            console.log("deletado")
                            this.getOuUsuario(this.ldap.id)
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

        },
        deleteOUgrupo(id) {
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
                    http.delete('/ldaps/' + this.ldap.id + '/ougrupos/' + id + '/')
                        .then(res => {
                            console.log("deletado")
                            this.getOuGrupo(this.ldap.id)
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
        },
        deleteOUsensor(id) {
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
                    http.delete('/ldaps/' + this.ldap.id + '/ousensores/' + id + '/')
                        .then(res => {
                            console.log("deletado")
                            this.getOUsensores(this.ldap.id)
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
        },
        updateOUgrupo(id) {
            const v = document.getElementById('item' + id)
            const g = {
                caminho: v.value
            }
            http.put('/ldaps/' + this.ldap.id + '/ougrupos/' + id + '/', g)
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Dados Atualizados',
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
        },
        updateOUsensor(id) {
            const v = document.getElementById('itemS' + id)
            const s = {
                caminho: v.value
            }
            http.put('/ldaps/' + this.ldap.id + '/ousensores/' + id + '/', s)
                .then(res => {
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Dados Atualizados',
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
        },
        updateAtributo(id) {
            const cs = document.getElementById('campoSistema' + id)
            const cl = document.getElementById('campoLdap' + id)
            const a = {
                campo_ldap: cl.value,
                campo_sistema: cs.value
            }
            console.log(a)
            http.put('/ldaps/' + this.ldap.id + '/atributosmapeamento/' + id + '/', a)
                .then(res => {
                    this.getAtributo(this.ldap.id);
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Dados Atualizados',
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
        },
        updateAtributoSensor(id) {
            const cs = document.getElementById('campoSensorI' + id)
            const cl = document.getElementById('campoLdapS' + id)
            const a = {
                campo_ldap: cl.value,
                campo_sistema: cs.value
            }
            console.log(a)
            http.put('/ldaps/' + this.ldap.id + '/atributosmapeamento/' + id + '/', a)
                .then(res => {
                    this.getAtributo(this.ldap.id);
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Dados Atualizados',
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
        },
        deleteAtributo(id) {
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
                    http.delete('/ldaps/' + this.ldap.id + '/atributosmapeamento/' + id + '/')
                        .then(res => {
                            console.log("deletado")
                            this.getAtributo(this.ldap.id)
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
        },
        createOUusuario() {
            try {
                for (let i = 1; i <= this.inputOUusuario; i++) {
                    const caminho = document.getElementById('itemOUusuario' + i);
                    const u = {
                        caminho: caminho.value
                    }
                    http.post('/ldaps/' + this.ldap.id + '/ouusuarios/', u)
                        .then(res => {
                            this.getOuUsuario(this.ldap.id)
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }

                this.$swal.fire({
                    icon: 'success',
                    title: 'Criado com sucesso',
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
        createOUgrupo() {
            try {
                for (let i = 1; i <= this.inputOUgrupo; i++) {
                    const caminho = document.getElementById('itemOUgrupo' + i);
                    const u = {
                        caminho: caminho.value
                    }
                    http.post('/ldaps/' + this.ldap.id + '/ougrupos/', u)
                        .then(res => {
                            this.getOuGrupo(this.ldap.id)
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }

                this.$swal.fire({
                    icon: 'success',
                    title: 'Criado com sucesso',
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
        createOUsensor() {
            try {
                for (let i = 1; i <= this.inputOUsensor; i++) {
                    const caminho = document.getElementById('itemOUsensor' + i);
                    const u = {
                        caminho: caminho.value
                    }
                    http.post('/ldaps/' + this.ldap.id + '/ousensores/', u)
                        .then(res => {
                            this.getOUsensores(this.ldap.id)
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }

                this.$swal.fire({
                    icon: 'success',
                    title: 'Criado com sucesso',
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
        setLdap() {
            http.get('/ldaps/' + this.$route.params.id)
                .then(res => {
                    this.ldap = res.data
                    this.tipo = this.ldap.ldap_tipo
                    this.getAtributo(this.ldap.id);
                    this.getOuGrupo(this.ldap.id);
                    this.getOuUsuario(this.ldap.id);
                    this.getOUsensores(this.ldap.id);
                    this.getCampoSistema();
                    this.getCampoSensor();
                    this.setarDia();
                    // this.getAtributo(this.ldap.id);
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
        editar() {
            this.isDisabled = !this.isDisabled
        },
        editarInput() {
            this.isDisabledInput = !this.isDisabledInput
        },
        editarInput2() {
            this.isDisabledInput2 = !this.isDisabledInput2
        },
        editarInputSensor() {
            this.isDisabledInput3 = !this.isDisabledInput3
        },
        editarInputAtributoSensor() {
            this.isDisabledAtributoSensor = !this.isDisabledAtributoSensor
        },
        editarA() {
            this.isDisabledA = !this.isDisabledA
        },
        editarO() {
            this.isDisabledO = !this.isDisabledO
        },
        chamadasGet() {
            if (this.user.tipo == 4) {
                this.getContas();
            }
        }
    },
    mounted() {
        this.setUser();
        this.chamadasGet();
        this.setLdap();
        this.getEmpresas();
    }
}

</script>


<style scoped></style>