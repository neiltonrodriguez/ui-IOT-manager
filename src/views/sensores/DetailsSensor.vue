<template>
    <div>
        <h3 class="detalhes">DETALHES SENSORES</h3>
    </div>

    <div class="container-fluid p-5">
        <div class="flex flex-wrap">
            <div class="w-full">
                <ul class="flex mb-0 list-none flex-wrap flex-row">
                    <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                            v-on:click="toggleTabs(1)"
                            v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 1, 'text-white bg-gray-800 dark:bg-gray-600': openTab === 1 }">
                            Detalhes do Sensor
                        </a>
                    </li>
                    <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                            v-on:click="toggleTabs(2)"
                            v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 2, 'text-white bg-gray-800 dark:bg-gray-600': openTab === 2 }">
                            Sensor scripts
                        </a>
                    </li>
                    <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                            v-on:click="toggleTabs(3)"
                            v-bind:class="{ 'text-gray-800 bg-gray-300': openTab !== 3, 'text-white bg-gray-800 dark:bg-gray-600': openTab === 3 }">
                            Dados lidos
                        </a>
                    </li>

                </ul>
                <div
                    class="relative flex flex-col min-w-0 break-words  dark:bg-slate-800 w-full mb-6 shadow-lg rounded">
                    <div class="px-4 py-5 flex-auto">
                        <div class="tab-content tab-space">

                            <div v-bind:class="{ 'hidden': openTab !== 1, 'block': openTab === 1 }">

                                <form class="row g-3" v-on:submit.prevent="store(sensor)">
                                    <div class="grid gap-3 mb-3 md:grid-cols-2">
                                        <div>
                                            <label class="label-form">Nome</label>
                                            <input type="text" v-model="sensor.nome" v-on:keyup="habilitarSalvar()"
                                                class="input-form  " placeholder="" required>
                                        </div>
                                        <div v-if="user.tipo == 4">
                                            <label class="label-form ">Conta</label>
                                            <select v-model="sensor.conta" disabled class="input-form">
                                                <option value="" disabled selected>Escolha a conta</option>
                                                <option v-for="c in contas" :key="c.id" :value="c.conta">{{ c.conta }}
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label class="label-form ">Descrição</label>
                                            <textarea rows="4" v-model="sensor.descricao" v-on:keyup="habilitarSalvar()"
                                                class="input-form  " placeholder=""></textarea>
                                        </div>
                                        <div>
                                            <label class="label-form ">Serial</label>
                                            <input type="text" v-model="sensor.serial" disabled
                                                v-on:keyup="habilitarSalvar()" class="input-form  " placeholder="">
                                        </div>
                                        <div v-if="user.tipo == 4">
                                            <label class="label-form ">Criado
                                                por</label>
                                            <input type="text" v-model="sensor.criadopor" disabled class="input-form  "
                                                placeholder="">
                                        </div>
                                        <div v-if="user.tipo == 4">
                                            <label class="label-form ">Modificado
                                                por</label>
                                            <input type="text" v-model="sensor.modificadopor" disabled
                                                class="input-form" placeholder="" required>
                                        </div>
                                        <div>
                                            <label class="label-form ">Empresa</label>
                                            <select class="input-form" v-model="sensor.empresa"
                                                @change="habilitarSalvar()">
                                                <option value="" disabled>Escolha uma empresa</option>
                                                <template v-for="e in empresas" :key="e.id">
                                                    <option selected v-if="e.id == sensor.empresa" :value="e.id">{{
                                                        e.nome
                                                    }}</option>
                                                </template>
                                            </select>
                                        </div>

                                        <div>
                                            <label class="label-form ">Departamento</label>
                                            <select v-model="sensor.departamento" @change="habilitarSalvar()"
                                                class="input-form">
                                                <option value="" disabled selected>Escolha a conta</option>
                                                <option v-for="dp in departamentos" :key="dp.id" :value="dp.id">{{
                                                    dp.titulo
                                                }}
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label class="label-form ">Fabricante</label>
                                            <select v-model="sensor.fabricante" @change="habilitarSalvar()"
                                                class="input-form">
                                                <option value="" disabled selected>Escolha a conta</option>
                                                <option v-for="f in fabricantes" :key="f.id" :value="f.id">{{ f.titulo
                                                    }}
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label class="label-form ">Modelo</label>
                                            <select v-model="sensor.modelo" @change="habilitarSalvar()"
                                                class="input-form">
                                                <option value="" disabled selected>Escolha a conta</option>
                                                <option v-for="m in modelos" :key="m.id" :value="m.id">{{ m.titulo }}
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            <label class="label-form ">Ativos</label>
                                            <select v-model="sensor.ativo" class="input-form"
                                                @change="habilitarSalvar()">
                                                <option value="" disabled selected>Escolha um</option>
                                                <option v-for="v in ativos" :key="v.id" :value="v.id">{{ v.nome
                                                    }}
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label class="label-form ">Habilitado</label>
                                            <select class="input-form" v-model="sensor.is_active"
                                                @change="habilitarSalvar()">
                                                <option :value="true">Sim</option>
                                                <option :value="false">Não</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label class="label-form ">Sensor
                                                em alerta</label>
                                            <select class="input-form" v-model="sensor.sensoremalerta"
                                                @change="habilitarSalvar()">
                                                <option :value="true">Sim</option>
                                                <option :value="false">Não</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label class="label-form ">Grupo
                                                do sensor</label>
                                            <select class="input-form" v-model="sensor.grupo"
                                                @change="habilitarSalvar()">
                                                <option selected value="" disabled>Escolha um grupo</option>
                                                <option v-for="sg in sensorgrupos" :value="sg.id" :key="sg.id">{{
                                                    sg.nome
                                                }}</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label class="label-form ">Tipo</label>
                                            <select disabled v-model="sensor.tipo" @change="habilitarSalvar()"
                                                class="input-form">
                                                <option value="" disabled selected>Escolha a conta</option>
                                                <option v-for="t in tipos" :key="t.id" :value="t.id">{{ t.nome }}
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label class="label-form ">Gateway
                                                IOT</label>
                                            <select required v-model="sensor.gatewayiot" @change="habilitarSalvar()"
                                                class="input-form">
                                                <option value="" disabled selected>Escolha a conta</option>
                                                <option v-for="t in gatewayiot" :key="t.id" :value="t.id">{{ t.titulo }}
                                                </option>
                                            </select>
                                        </div>
                                        <div v-if="sensor.atributos.valor_ref1">
                                            <label class="label-form ">{{
                                                sensor.atributos.valor_ref1.label }}</label>
                                            <input type="text" v-model="sensor.valor_ref1" class="input-form"
                                                placeholder="" required>
                                        </div>
                                        <div v-if="sensor.atributos.valor_ref2">
                                            <label class="label-form ">{{
                                                sensor.atributos.valor_ref2.label }}</label>
                                            <input type="text" v-model="sensor.valor_ref2" class="input-form"
                                                placeholder="" required>
                                        </div>
                                        <div v-if="sensor.atributos.valor_ref3">
                                            <label class="label-form ">{{
                                                sensor.atributos.valor_ref3.label }}</label>
                                            <input type="text" v-model="sensor.valor_ref3" class="input-form"
                                                placeholder="" required>
                                        </div>
                                        <div v-if="sensor.atributos.valor_ref4">
                                            <label class="label-form ">{{
                                                sensor.atributos.valor_ref4.label }}</label>
                                            <input type="text" v-model="sensor.valor_ref4" class="input-form"
                                                placeholder="" required>
                                        </div>
                                        <div v-if="sensor.atributos.valor_ref5">
                                            <label class="label-form ">{{
                                                sensor.atributos.valor_ref5.label }}</label>
                                            <input type="text" v-model="sensor.valor_ref5" class="input-form"
                                                placeholder="" required>
                                        </div>
                                        <div v-if="sensor.atributos.valor_ref6">
                                            <label class="label-form ">{{
                                                sensor.atributos.valor_ref6.label }}</label>
                                            <input type="text" v-model="sensor.valor_ref6" class="input-form"
                                                placeholder="" required>
                                        </div>
                                        <div v-if="sensor.atributos.valor_ref7">
                                            <label class="label-form ">{{
                                                sensor.atributos.valor_ref7.label }}</label>
                                            <input type="text" v-model="sensor.valor_ref7" class="input-form"
                                                placeholder="" required>
                                        </div>
                                        <div v-if="sensor.atributos.valor_ref8">
                                            <label class="label-form ">{{
                                                sensor.atributos.valor_ref8.label }}</label>
                                            <input type="text" v-model="sensor.valor_ref8" class="input-form"
                                                placeholder="" required>
                                        </div>
                                        <div v-if="sensor.atributos.valor_ref9">
                                            <label class="label-form ">{{
                                                sensor.atributos.valor_ref9.label }}</label>
                                            <input type="text" v-model="sensor.valor_ref9" class="input-form"
                                                placeholder="" required>
                                        </div>
                                        <div v-if="sensor.atributos.valor_ref10">
                                            <label class="label-form ">{{
                                                sensor.atributos.valor_ref10.label }}</label>
                                            <input type="text" v-model="sensor.valor_ref10" class="input-form"
                                                placeholder="" required>
                                        </div>
                                        <div v-if="sensor.tipo == 3">
                                            <a class="cursor-pointer" @click="mostrarModalMapa()"><img
                                                    src="../../assets/img/map.png"
                                                    class="duration-200 w-20 hover:scale-110"></a>

                                        </div>
                                    </div>
                                    <div v-if="modal" class="mb-3">
                                        <div>
                                            <Iframe :link="sensor.mapa" />
                                        </div>

                                    </div>
                                    <button type="submit" v-bind:disabled="isDisabled"
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  disabled:bg-gray-300">Salvar</button>
                                    <button type="button" @click="cancelar()"
                                        class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  mx-3">Cancelar</button>
                                </form>
                            </div>
                            <div v-bind:class="{ 'hidden': openTab !== 2, 'block': openTab === 2 }">
                                <div>

                                    <button
                                        class="mx-3 my-3 px-4 py-2 font-semibold text-sm bg-green-800 text-white rounded-md shadow-sm"
                                        @click="mostrarFormScript()">Adicionar scripts</button>
                                </div>
                                <div class="bg-slate-200 p-2 rounded-lg">
                                    <table class="border-collapse w-full">
                                        <thead>
                                            <tr>

                                                <th class="border-b  font-medium p-2 text-slate-400 text-left">
                                                    Título</th>
                                                <th class="border-b  font-medium p-2 text-slate-400 text-left">
                                                    Alerta</th>
                                                <th class="border-b  font-medium p-2 text-slate-400 text-left">
                                                    Enviar Notificação</th>
                                                <th class="border-b  font-medium p-2 text-slate-400 text-left">
                                                    Notificação</th>
                                                <th class="border-b  font-medium p-2 text-slate-400 text-left">
                                                    Habilitado</th>
                                                <th class="border-b  font-medium p-2 text-slate-400 text-left">
                                                    Ação</th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white">
                                            <tr class="hover:bg-gray-100 cursor-pointer duration-200"
                                                v-for="u in sensorscripts" :key="u.id"
                                                :class="sc.id === u.id ? 'bg-slate-300' : ''">
                                                <td @click="detailsSC(u.id)"
                                                    class="border-b border-slate-100  p-2 text-slate-500 ">
                                                    {{ u.titulo }}
                                                </td>

                                                <td @click="detailsSC(u.id)"
                                                    class="border-b border-slate-100   p-2 text-slate-500  ">
                                                    <template v-if="u.alerta == 0">
                                                        Não alterar
                                                    </template>
                                                    <template v-if="u.alerta == 1">
                                                        Gerar alerta
                                                    </template>
                                                    <template v-else>
                                                        remover alerta
                                                    </template>
                                                </td>
                                                <td @click="detailsSC(u.id)"
                                                    class="border-b border-slate-100   p-2 text-slate-500  ">
                                                    <template v-if="u.enviar_notificacao">
                                                        <div class="flex items-center">
                                                            <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2">
                                                            </div>
                                                            Sim
                                                        </div>
                                                    </template>
                                                    <template v-else>
                                                        <div class="flex items-center">
                                                            <div class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                                                            Não
                                                        </div>
                                                    </template>
                                                </td>
                                                <td @click="detailsSC(u.id)"
                                                    class="border-b border-slate-100   p-2 text-slate-500  ">
                                                    <span v-for="n in notificacoes" :key="n.id">{{ u.notificacao == n.id
                                                        ?
                                                        n.titulo : '' }}</span>
                                                </td>

                                                <td @click="detailsSC(u.id)"
                                                    class="border-b border-slate-100  p-2 text-slate-500 ">
                                                    <template v-if="u.is_active">
                                                        <div class="flex items-center">
                                                            <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2">
                                                            </div>
                                                            Sim
                                                        </div>
                                                    </template>
                                                    <template v-else>
                                                        <div class="flex items-center">
                                                            <div class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                                                            Não
                                                        </div>
                                                    </template>
                                                </td>
                                                <td class="border-b border-slate-100  p-2 text-slate-500 ">
                                                    <button @click="detailsSC(u.id)" class="btn">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke-width="1" stroke="currentColor"
                                                            class="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    </button>
                                                    <button @click="deleteSC(u.id)" class="btn">
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

                                <div class="py-4">
                                    <button v-for="(page, index) in pages" :key="page"
                                        class="px-3 mx-1 py-2 text-sm bg-blue-700 hover:bg-blue-900 focus:bg-violet-700 text-white"
                                        :class="{ current: page === current }" @click="changePage(index)">
                                        {{ page }}
                                    </button>
                                    <span class="mx-4 text-xd font-semibold text-blue-700">Total:</span> {{
                                        total }}
                                </div>
                                <div v-if="mostrarFormSC" class="p-2 rounded-lg bg-slate-200">
                                    <div class="flex mb-3 items-center justify-between">
                                        <h3 class="detalhes2">SCRIPT</h3>
                                        <div @click="mostrarFormScript()"
                                            class="text-right text-red-600 font-bold cursor-pointer hover:text-red-400 duration-200 mb-0">
                                            X
                                        </div>
                                    </div>

                                    <form class="row g-3" v-on:submit.prevent="createSensorScript(sc)">
                                        <div class="grid gap-3 mb-3 md:grid-cols-2">
                                            <div>
                                                <label class="label-form ">Título</label>
                                                <input v-on:keyup="habilitarSalvar()" type="text" v-model="sc.titulo"
                                                    class="input-form" placeholder="" required>

                                            </div>


                                            <div>
                                                <label class="label-form ">Descrição</label>
                                                <textarea rows="4" v-on:keyup="habilitarSalvar()" type="text"
                                                    v-model="sc.descricao" class="input-form"
                                                    placeholders=""></textarea>

                                            </div>


                                            <div v-if="sc.id">
                                                <label class="label-form ">Habilitado</label>
                                                <select class="input-form" v-model="sc.is_active"
                                                    @change="habilitarSalvar()">
                                                    <option :value="true">Sim</option>
                                                    <option :value="false">Não</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label class="label-form ">Enviar
                                                    Notificação</label>
                                                <select @change="listarNotificacoes()" class="input-form"
                                                    v-model="sc.enviar_notificacao">
                                                    <option :value="true">Sim</option>
                                                    <option :value="false">Não</option>
                                                </select>
                                            </div>
                                            <div v-if="!mostrarNotificacoes">

                                            </div>
                                            <div v-if="mostrarNotificacoes">
                                                <label class="label-form ">Notificações</label>
                                                <select v-model="sc.notificacao" @change="habilitarSalvar()"
                                                    class="input-form">
                                                    <option value="" disabled selected>Escolha a conta</option>
                                                    <option v-for="c in notificacoes" :key="c.id" :value="c.id">{{
                                                        c.titulo }}
                                                    </option>
                                                </select>
                                            </div>
                                            <div>
                                                <label class="label-form ">Alerta</label>
                                                <select class="input-form" @change="habilitarSalvar()"
                                                    v-model="sc.alerta">
                                                    <option :value="0">Não alterar</option>
                                                    <option :value="1">Gerar alerta</option>
                                                    <option :value="2">Remover alerta</option>
                                                </select>
                                            </div>
                                            <div v-if="!sc.id">


                                            </div>

                                            <div>

                                                <button type="button" @click="mostrarDivRegra()"
                                                    class="text-white w-full mt-3 mb-5 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                                    :class="showDivRegra ? 'bg-gray-800' : 'bg-green-800'">
                                                    Regra</button>

                                            </div>
                                            <div>
                                                <button type="button" @click="mostrarDivAcao()"
                                                    class="text-white w-full mt-3 mb-5  hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                                    :class="showDivAcao ? 'bg-gray-800' : 'bg-green-800'">
                                                    Ação</button>
                                            </div>
                                        </div>

                                        <div v-if="showDivRegra" :class="cont > 2 ? 'h-[400px]' : ''"
                                            class="overflow-y-auto rounded-lg mt-3  bg-slate-300">
                                            <div class="flex mb-3 items-center justify-between">
                                                <h3 class="detalhes2">REGRA</h3>
                                                <div @click="fecharRegra()"
                                                    class="text-right text-red-600 font-bold cursor-pointer hover:text-red-400 duration-200 mr-3">
                                                    X
                                                </div>
                                            </div>

                                            <div v-for="(c, index) in cont" :key="index" class="p-2 rounded-lg">

                                                <div v-if="c > 1" class="grid gap-3 mb-3 md:grid-cols-3">
                                                    <div></div>
                                                    <div class="text-center">
                                                        <label class="label-form">Conectores lógicos</label>
                                                        <select class="input-form text-center" :id="'conector' + c"
                                                            required>
                                                            <option value="AND">E</option>
                                                            <option value="OR">OU</option>

                                                        </select>
                                                    </div>
                                                    <div></div>
                                                </div>

                                                <div class="grid gap-3 mb-3 md:grid-cols-4  p-2">

                                                    <div>
                                                        <label class="label-form">Sensor</label>
                                                        <select class="input-form" :id="'sensor' + c" :disabled="c == 1"
                                                            @change="selectedSensorAtributes(c)">
                                                            <option v-for="se in sensores" :key="se.id"
                                                                :value="se.serial" required
                                                                :selected="se.id === sensor.id">
                                                                {{ se.nome }}
                                                            </option>
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <label class="label-form">Parâmetro</label>
                                                        <select class="input-form" required :id="'atributos' + c"
                                                            @change="selectedSensorOperator(c)">
                                                            <option v-for="a in buscarParametros()" :key="a.id"
                                                                :value="a.parametro">
                                                                {{ a.label }}
                                                            </option>


                                                        </select>
                                                    </div>

                                                    <div>
                                                        <label class="label-form">Condição</label>
                                                        <select class="input-form" required :id="'operador' + c"
                                                            @change="verificaCondicao(c)">
                                                            <option value="" selected>escolha</option>

                                                        </select>
                                                    </div>

                                                    <div :id="'mostrarValue' + c">
                                                        <div>
                                                            <label class="label-form">Valor</label>
                                                            <input type="text" required :id="'value' + c"
                                                                class="input-form" placeholder="">
                                                        </div>
                                                    </div>
                                                    <div :id="'mostrarValueEntre' + c" class="hidden">
                                                        <div class="grid gap-3 md:grid-cols-2 ">
                                                            <div>
                                                                <label class="label-form">valor 1</label>
                                                                <input type="text" required :id="'value1Entre' + c"
                                                                    class="input-form" placeholder="">
                                                            </div>

                                                            <div>
                                                                <label class="label-form">valor 2</label>
                                                                <input type="text" required :id="'value2Entre' + c"
                                                                    class="input-form" placeholder="">
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                            <div v-if="cont >= 1">
                                                <button type="button" @click="cont++"
                                                    class="text-white mt-3 mb-5 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 ml-3 py-2.5 text-center ">Adicionar
                                                    mais condições </button>
                                                <button type="button" @click="finalizarRegra()"
                                                    class="text-white mt-3 ml-3 mb-5 bg-blue-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Salvar
                                                    regra</button>

                                            </div>
                                        </div>
                                        <div v-if="showDivAcao" :class="cont2 > 2 ? 'h-[400px]' : ''"
                                            class="overflow-y-auto bg-slate-300 rounded-lg mt-3">
                                            <div class="flex mb-3 items-center justify-between">
                                                <h3 class="detalhes2">AÇÃO</h3>
                                                <div @click="fecharAcao()"
                                                    class="text-right text-red-600 font-bold cursor-pointer hover:text-red-400 duration-200 mr-3">
                                                    X
                                                </div>
                                            </div>
                                            <div v-for="(c, index) in cont2" :key="index" class="p-2 rounded-lg">
                                                <div class="grid gap-3 mb-3 md:grid-cols-4  p-2">

                                                    <div>
                                                        <label class="label-form">Sensor</label>
                                                        <select class="input-form" :id="'sensorAcao' + c"
                                                            :disabled="c == 1">
                                                            <option v-for="se in sensores" :key="se.id"
                                                                :value="se.serial" required
                                                                :selected="se.id === sensor.id">
                                                                {{ se.nome }}
                                                            </option>
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <div>
                                                            <label class="label-form">Valor</label>
                                                            <input type="text" required :id="'valueAcao' + c"
                                                                class="input-form" placeholder="">
                                                        </div>
                                                    </div>


                                                </div>

                                            </div>
                                            <div v-if="cont2 >= 1">
                                                <button type="button" @click="cont2++"
                                                    class="text-white mt-3 mb-5 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 ml-3 py-2.5 text-center ">Adicionar
                                                    mais ações</button>
                                                <button type="button" @click="finalizarAcao()"
                                                    class="text-white mt-3 ml-3 mb-5 bg-blue-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Salvar
                                                    ação</button>
                                            </div>
                                        </div>

                                        <button type="submit" :disabled="isDisabled"
                                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-3 disabled:bg-gray-300">Salvar</button>

                                    </form>
                                </div>

                            </div>
                            <div v-bind:class="{ 'hidden': openTab !== 3, 'block': openTab === 3 }">

                                <div class="w-full mb-2">
                                    <div class="flex items-center gap-5 mb-3">
                                        <div>
                                            <button type="button" @click="getDadosLidos()"
                                                class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  mb-3">Atualizar
                                                lista
                                            </button>
                                        </div>

                                    </div>
                                    <div class="bg-slate-200 p-2 duration-200
                                        rounded-md">
                                        <template v-for="(d, index) in dados" :key="d">


                                            <table class="border-collapse table-fixed w-full">

                                                <tr v-if="index === 0">
                                                    <td class="border-b  font-medium text-slate-400 text-left">
                                                        Hora do registro</td>
                                                    <td v-for="x in d.leituras" :key="x"
                                                        class="border-b  font-medium text-slate-400 text-left">
                                                        {{ x.label }}</td>

                                                </tr>

                                                <tbody class="bg-white">
                                                    <tr :class="d.alerta ? 'bg-red-300' : ''">
                                                        <td class="border-b border-slate-100  text-slate-500 ">

                                                            {{ d.horaregistro }}

                                                        </td>
                                                        <td v-for="x in d.leituras" :key="x"
                                                            class="border-b border-slate-100  text-slate-500 ">

                                                            <template v-if="x.label == 'Link'">
                                                                <a class="text-red-600" target="_blank"
                                                                    :href="x.valor">Ver
                                                                    mapa</a>
                                                            </template>
                                                            <template v-else>

                                                                {{ x.valor }}
                                                            </template>
                                                        </td>

                                                    </tr>
                                                </tbody>
                                            </table>
                                        </template>

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
                                <hr>
                                <div v-if="sensor.tipo == 3" class="mt-5 mb-5">
                                    <a class="cursor-pointer" @click="mostrarModalMapa()"><img
                                            src="../../assets/img/map.png"
                                            class="duration-200 h-12 hover:scale-110"></a>

                                </div>
                                <div v-if="modal" class="mb-3">
                                    <div>
                                        <Iframe :link="sensor.mapa" />
                                    </div>

                                </div>

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
import Iframe from '../../components/Iframe.vue'
import moment from 'moment'
import axios from 'axios'
import { watchEffect } from 'vue'

const auth = useAuth();

export default {
    components: {
        Iframe
    },
    data() {
        return {
            cont2: 0,
            showDivRegra: false,
            tipoCondicao: '',
            conditions: [],
            notificacoes: [],
            operators: [],
            operadores: [
                {
                    label: "Diferente de",
                    value: "!=",
                    tipo: 'number'
                },
                {
                    label: "Entre",
                    value: "between",
                    tipo: 'number'
                },
                {
                    label: "Igual a",
                    value: "==",
                    tipo: 'number'
                },
                {
                    label: "Maior que",
                    value: ">",
                    tipo: 'number'
                },
                {
                    label: "Menor que",
                    value: "<",
                    tipo: 'number'
                },
                {
                    label: "Maior ou igual a",
                    value: ">=",
                    tipo: 'number'
                },
                {
                    label: "Menor ou igual a",
                    value: "<=",
                    tipo: 'number'
                },
                {
                    label: "É",
                    value: 'IS',
                    tipo: 'boolean'
                },
                {
                    label: "Não é",
                    value: 'IS NOT',
                    tipo: 'boolean'
                },
                {
                    label: "Contém",
                    value: "IN",
                    tipo: 'text'
                },
                {
                    label: "Não Contém",
                    value: "NOT IN",
                    tipo: 'text'
                },
                {
                    label: "Diferente de",
                    value: "!=",
                    tipo: 'text'
                },
                {
                    label: "Igual a",
                    value: "==",
                    tipo: 'text'
                }
            ],
            sensores: [

            ],
            cont: 0,
            operador: "",
            atual: 1,
            modal: false,
            contas: [],
            mostrarFormSC: false,
            inputSC: 1,
            notificacoes: [],
            sc: {
                enviar_notificacao: false,
                notificacao: null
            },
            dadoslidos: [],
            sensor: {
                valor_ref1: '',
                valor_ref2: '',
                valor_ref3: '',
                valor_ref4: '',
                valor_ref5: '',
                valor_ref6: '',
                valor_ref7: '',
                valor_ref8: '',
                valor_ref9: '',
                valor_ref10: '',
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
                complemento: "",
                fabricante: "",
                modelo: "",
                tipo: "",
                ativo: "",
                departamento: "",
                gatewayiot: ""
            },
            sensorgrupos: [],
            sensoresgruposcript: [],
            departamentos: [],
            tipos: [],
            fabricantes: [],
            modelos: [],
            openTab: 1,
            user: {},
            empresas: [],
            isDisabled: true,
            isDisabled2: true,
            sensorscripts: [],
            ativos: [],
            offset: 0,
            limit: 5,
            pages: [],
            total: 0,
            next1: null,
            prev1: null,
            offset1: 0,
            limit1: 20,
            pages1: [],
            total1: 0,
            gatewayiot: [],
            dados: [],
            mostrarLeituras: false,
            mostrarNotificacoes: false,
            listaDeAtributos: [],
            atributes: [],
            tipooperador: '',
            regra: '',
            acao: '',
            showDivAcao: false,
            sensoresgruposcriptTeste: [],
            low: {},
        };
    },
    methods: {
        fecharRegra() {
            this.showDivRegra = false
        },
        fecharAcao() {
            this.showDivAcao = false;
        },
        maisCondicao() {
            this.cont++;
        },
        mostrarDivRegra() {
            let cont = 1
            if (this.cont != 0) {
                let tam = JSON.parse(this.sc.regra);
                cont = tam.length
            }
           
            if (!this.showDivRegra) {
                this.showDivRegra = true;
                this.showDivAcao = false;
                this.cont = cont;
            }

            if (this.sc.regra) {
                const detailsRegra = JSON.parse(this.sc.regra);

                const regra = [];

                detailsRegra.forEach((detail, index) => {
                    const x = {
                        sensor: detail.sensor,
                        parametro: detail.parametro,
                        operador: detail.operador,
                        valor: detail.operador === 'between' ? null : detail.valor,
                        valorEntre1: detail.operador === 'between' ? detail.valorEntre1 : null,
                        valorEntre2: detail.operador === 'between' ? detail.valorEntre2 : null,
                        conector: detail.conector
                    };

                    regra.push(x);
                });

                this.regra = JSON.stringify(regra);

                setTimeout(() => {
                    if (detailsRegra.length > 1) {
                        this.cont = detailsRegra.length

                    }

                    regra.forEach((x, index) => {

                        const i = index + 1; // Assumindo que os ids começam em 1


                        setTimeout(() => {
                            document.getElementById(`sensor${i}`).value = x.sensor;

                            document.getElementById(`atributos${i}`).value = x.parametro;

                            document.getElementById(`operador${i}`).value = x.operador;

                            document.getElementById(`value${i}`).value = x.valor;

                            document.getElementById(`value1Entre${i}`).value = x.valorEntre1;

                            document.getElementById(`value2Entre${i}`).value = x.valorEntre2;

                            document.getElementById(`conector${i}`).value = x.conector;
                            this.verificaCondicao(i, x.operador);
                        }, 2500);
                        if (i > 1) {
                            setTimeout(() => {
                                this.selectedSensorAtributes(i)

                            }, 2500);
                        } else {
                            this.selectedSensorAtributes(i)

                        }

                    });
                }, 2500);

            }
        },
        mostrarDivAcao() {
            if (!this.showDivAcao) {
                this.showDivAcao = true;
                this.showDivRegra = false;
                this.cont2 = 1;

            }
            if (this.sc.acao) {
                const detailsAcao = JSON.parse(this.sc.acao);

                const acao = [];

                detailsAcao.forEach((detail, index) => {
                    const x = {
                        sensor: detail.sensor,
                        acao: detail.acao,
                    };

                    acao.push(x);
                });

                this.acao = JSON.stringify(acao);

                console.log(this.acao)

                setTimeout(() => {
                    if (detailsAcao.length > 1) {
                        this.cont2 = detailsAcao.length

                    }

                    acao.forEach((x, index) => {

                        const i = index + 1; // Assumindo que os ids começam em 1


                        setTimeout(() => {
                            document.getElementById(`sensorAcao${i}`).value = x.sensor;

                            document.getElementById(`valueAcao${i}`).value = x.acao;


                        }, 2000);
                        // if (i > 1) {
                        //     setTimeout(() => {
                        //         this.selectedSensorAtributes(i)

                        //     }, 2500);
                        // } else {
                        //     this.selectedSensorAtributes(i)

                        // }

                    });
                }, 2000);

            }
        },
        finalizarAcao() {
            this.habilitarSalvar();
            let acao = [];
            for (let i = 1; i <= this.cont2; i++) {
                let s = null
                if (this.cont2 === 1) {
                    s = this.sensores.find((sensor) => sensor.serial === this.sensor.serial);
                } else {
                    const sen = document.getElementById('sensorAcao' + i);
                    s = this.sensores.find(sensor => sensor.serial === sen.value);
                }

                let valor = document.getElementById('valueAcao' + i).value != '' ? document.getElementById('valueAcao' + i).value : null;

                const x = {
                    sensor: s.serial,
                    acao: valor,
                }

                acao.push(x);
            }
            this.acao = JSON.stringify(acao)
            this.showDivAcao = false;

        },
        finalizarRegra() {
            this.habilitarSalvar();
            let regra = [];
            for (let i = 1; i <= this.cont; i++) {
                let s = null
                if (this.cont === 1) {
                    s = this.sensores.find((sensor) => sensor.serial === this.sensor.serial);
                } else {
                    const sen = document.getElementById('sensor' + i);
                    s = this.sensores.find(sensor => sensor.serial === sen.value);
                }

                let parametro = document.getElementById('atributos' + i).value;
                let operador = document.getElementById('operador' + i).value;
                let valor = document.getElementById('value' + i).value != '' ? document.getElementById('value' + i).value : null;
                let valorEntre1 = document.getElementById('value1Entre' + i).value != '' ? document.getElementById('value1Entre' + i).value : null;
                let valorEntre2 = document.getElementById('value2Entre' + i).value != '' ? document.getElementById('value2Entre' + i).value : null;
                let conector = document.getElementById('conector' + i) ? document.getElementById('conector' + i).value : null
                const x = {
                    sensor: s.serial,
                    parametro: parametro,
                    operador: operador,
                    valor: operador === 'between' ? null : valor,
                    valorEntre1: operador === 'between' ? valorEntre1 : null,
                    valorEntre2: operador === 'between' ? valorEntre2 : null,
                    conector: conector
                }

                regra.push(x);
            }
            this.regra = JSON.stringify(regra)
            this.showDivRegra = false;

        },
        verificaCondicao(i, condicao) {
            const operadorElem = document.getElementById('operador' + i);
            const mostrarValueEntreElem = document.getElementById('mostrarValueEntre' + i);
            const mostrarValueElem = document.getElementById('mostrarValue' + i);

            if (operadorElem) {
                if (condicao) {
                    operadorElem.value = condicao;
                }

                const condiValue = operadorElem.value;

                if (condiValue === 'between' || condicao === 'between') {
                    if (mostrarValueEntreElem) {
                        mostrarValueEntreElem.style.display = 'block';
                    }
                    if (mostrarValueElem) {
                        mostrarValueElem.style.display = 'none';
                    }
                } else {
                    if (mostrarValueEntreElem) {
                        mostrarValueEntreElem.style.display = 'none';
                    }
                    if (mostrarValueElem) {
                        mostrarValueElem.style.display = 'block';
                    }
                }
            }
        },


        buscarParametros(s = null) {
            console.log(this.cont + ' - fffddf')
            if (this.cont == 1) {
                const sensoress = this.sensores.find((sensor) => sensor.serial === this.sensor.serial);
                // this.selectedSensorAtributes(1)
                this.selectedSensorOperator(1);
                return sensoress.atributos;
            } else if (this.cont > 1 && s != null) {
                const sensoress = this.sensores.find((sensor) => sensor.serial === s);
                this.selectedSensorAtributes(this.cont);
                this.selectedSensorOperator(this.cont);

                return sensoress.atributos;
            } else {
                const sensoress = this.sensores.find((sensor) => sensor.serial === this.sensor.serial);
                this.selectedSensorOperator(this.cont);
                return sensoress.atributos
            }


        },
        selecionarParametro() {


        },

        selectedSensorAcao(i) {
            const sen = document.getElementById('sensorAcao' + i);
            const sensores = this.sensores.find(sensor => sensor.serial === sen.value);
            // const att = document.getElementById('atributos' + i);
            // let opt = ''
            // for (let x = 0; x < sensores.atributos.length; x++) {
            //     opt += `<option value="${sensores.atributos[x].parametro}">${sensores.atributos[x].label}</option>`
            // }
            // att.innerHTML = opt


        },

        selectedSensorAtributes(i) {
            let ok = false
            let reg = []
            if (i > 1 && this.regra != undefined && this.regra != '') {
                reg = JSON.parse(this.regra);
                ok = true

            }

            const sen = document.getElementById('sensor' + i);
            const sensores = this.sensores.find(sensor => sensor.serial === sen.value);
            const att = document.getElementById('atributos' + i);
            let opt = ''
            console.log(sensores)
            for (let x = 0; x < sensores.atributos.length; x++) {
                if (ok && this.cont == reg.length) {
                    opt += `<option ${sensores.atributos[x].parametro === reg[i - 1].parametro ? 'selected' : ''} value="${sensores.atributos[x].parametro}">${sensores.atributos[x].label}</option>`
                } else {
                    opt += `<option value="${sensores.atributos[x].parametro}">${sensores.atributos[x].label}</option>`
                }
            }
            att.innerHTML = opt

            this.selectedSensorOperator(i);
        },
        selectedSensorOperator(i) {
            // console.log(i)
            // console.log(this.regra)
            let ok = false
            let reg = []
            if (i > 1 && this.regra != undefined && this.regra != '') {
                reg = JSON.parse(this.regra);
                ok = true
            }
            let selectedSensor = null
            if (this.cont === 1) {
                selectedSensor = this.sensores.find(sensor => sensor.serial === this.sensor.serial);

            } else {
                setTimeout(() => {
                    const sen = document.getElementById('sensor' + i);
                    selectedSensor = this.sensores.find(sensor => sensor.serial === sen.value);
                }, 2000);
            }
            let op = ''
            setTimeout(() => {
                const param = document.getElementById('atributos' + i);

                const typeOperator = selectedSensor.atributos.find(op => op.parametro === param.value);
                for (let y = 0; y < this.operadores.length; y++) {


                    if (this.operadores[y].tipo == typeOperator.datatype) {

                        if (ok && this.cont == reg.length) {
                            // console.log(reg.length + ' --- ' + this.cont + ' --- ' + reg[i - 1].operador)
                            op += `<option ${this.operadores[y].value === reg[i - 1].operador ? 'selected' : ''} value="${this.operadores[y].value}">${this.operadores[y].label}</option>`
                        } else {
                            op += `<option value="${this.operadores[y].value}">${this.operadores[y].label}</option>`
                        }



                    }

                }
                const optOperador = document.getElementById('operador' + i)
                optOperador.innerHTML = op

            }, 2500);
        },
        listarAtributos() {
            let arr = []
            for (let i = 0; i < this.sensores.length; i++) {
                var a = document.getElementById('sensorSelected' + this.sensores[i].id)
                if (a.selected && this.sensores[i].id != this.$route.params.id) {
                    arr = this.sensores[i].atributos;
                }
                this.listaDeAtributos.push(arr);
            }

        },
        listarNotificacoes() {
            if (this.sc.enviar_notificacao) {
                this.mostrarNotificacoes = true
                this.isDisabled = false
                this.getNotificacoes();
            } else {
                this.mostrarNotificacoes = false

            }
        },
        getNotificacoes() {
            let query = `?so_ativos=true`
            if (this.user.tipo == 4) {
                query = `?conta=${this.sensor.conta}&so_ativos=true`
            }
            const url = `/listaitens/notificacao/lista${query}`
            http.get(url)
                .then(res => {
                    this.notificacoes = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        mostrarModalMapa() {
            this.modal = !this.modal
        },
        store(formD) {
            let formData = new FormData()
            formData.append('nome', formD.nome)
            formData.append('descricao', formD.descricao)
            formData.append('is_active', formD.is_active)
            formData.append('sensoremalerta', formD.sensoremalerta)
            formData.append('gatewayiot', formD.gatewayiot)
            if (formD.valor_ref1 != "") {
                formData.append('valor_ref1', formD.valor_ref1)
            }
            if (formD.valor_ref2 != "") {
                formData.append('valor_ref2', formD.valor_ref2)
            }
            if (formD.valor_ref3 != "") {
                formData.append('valor_ref3', formD.valor_ref3)
            }
            if (formD.valor_ref4 != "") {
                formData.append('valor_ref4', formD.valor_ref4)
            }
            if (formD.valor_ref5 != "") {
                formData.append('valor_ref5', formD.valor_ref5)
            }
            if (formD.valor_ref6 != "") {
                formData.append('valor_ref6', formD.valor_ref6)
            }
            if (formD.valor_ref7 != "") {
                formData.append('valor_ref7', formD.valor_ref7)
            }
            if (formD.valor_ref8 != "") {
                formData.append('valor_ref8', formD.valor_ref8)
            }
            if (formD.valor_ref9 != "") {
                formData.append('valor_ref9', formD.valor_ref9)
            }
            if (formD.valor_ref10 != "") {
                formData.append('valor_ref10', formD.valor_ref10)
            }
            if (formD.empresa != "" && formD.empresa != null) {
                formData.append('empresa', formD.empresa)
            }
            if (formD.departamento != '' && formD.departamento != null) {
                formData.append('departamento', formD.departamento)
            }
            if (formD.grupo != '' && formD.grupo != null) {
                formData.append('grupo', formD.grupo)
            }
            if (formD.fabricante != '' && formD.fabricante != null) {
                formData.append('fabricante', formD.fabricante)
            }
            if (formD.modelo != '' && formD.modelo != null) {
                formData.append('modelo', formD.modelo)
            }
            if (formD.tipo != '' && formD.tipo != null) {
                formData.append('tipo', formD.tipo)
            }
            if (formD.ativo != '' && formD.ativo != null) {
                formData.append('ativo', formD.ativo)
            }
            formData.append('valorreferencia', formD.valorreferencia)
            const headers = { 'Content-Type': 'multipart/form-data' };
            http.put('/sensores/' + this.sensor.id + '/', formData, { headers })
                .then(res => {
                    this.sensor = res.data
                    this.toggleTabs(2);
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        verLeituras(hora) {
            if (document.getElementById('mostrar' + hora).style.display === "none") {
                document.getElementById('mostrar' + hora).style.display = "block"
            } else {
                document.getElementById('mostrar' + hora).style.display = "none"
            }
        },
        getGatewayIot() {
            let query = '?'
            if (this.user.tipo == 4) {
                query = `?conta=${this.sensor.conta}&`
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

            }
            if (i === 0) {
                this.offset1 = 0;
                this.getDadosLidos();
                this.atual = 1;
            } else {
                this.getDadosLidos(i / this.limit1);
                this.atual = i / this.limit1 + 1;
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
        getDadosLidos(i = null) {
            if (i) {
                this.offset1 = i
            }
            const url = `/sensores/${this.sensor.id}/dadoslidos?limit=${this.limit1}&offset=${this.limit1 * this.offset1}&ordering=-id`
            http.get(url)
                .then(res => {
                    this.dadoslidos = res.data.results
                    this.total1 = res.data.count
                    this.next1 = res.data.next;
                    this.prev1 = res.data.previous;
                    this.montarDadosLidos();
                    const qty = Math.ceil(this.total1 / this.limit1);
                    if (qty <= 1) return [1];
                    this.pages1 = Array.from(Array(qty).keys(), (i) => i + 1);

                    this.abreviarPages();

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
        changePage(i) {
            this.getSensorScripts(i);
            this.offset = 0;

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

        toggleTabs: function (tabNumber) {

            if (tabNumber == 1) {
                this.openTab = tabNumber
            }
            if (tabNumber == 2) {
                this.getSensorScripts();
                this.openTab = tabNumber
            }
            if (tabNumber == 3) {
                this.getDadosLidos();
                this.modal = false
                this.openTab = tabNumber
            }
        },
        montarAtributosSensores() {
            let arr = []
            let a = {}

            for (let i = 0; i < this.sensoresgruposcript.length; i++) {
                let b = []
                const y = this.sensoresgruposcript[i].atributos;
                for (let x = 0; x < this.sensoresgruposcript[i].atributos.length; x++) {
                    const j = [...Object.values(this.sensoresgruposcript[i].atributos[x])];
                    a = {
                        parametro: j[0].parametro,
                        label: j[0].label,
                        datatype: j[0].datatype,
                        nome: 'valor_lido' + (x + 1)
                    }
                    b.push(a);
                }
                const z = {
                    id: this.sensoresgruposcript[i].id,
                    nome: this.sensoresgruposcript[i].nome,
                    serial: this.sensoresgruposcript[i].serial,
                    atributos: b
                }
                arr.push(z)

            }

            this.sensores = arr;



        },
        getDadosParaAsRegras() {
            const url = `/sensores/${this.$route.params.id}/sensoresgruposcript/`;
            http.get(url)
                .then(res => {
                    this.sensoresgruposcript = res.data
                    this.montarAtributosSensores();
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });

        },
        montarDadosLidos() {
            this.dados = []
            let arr = []
            for (let i = 0; i < this.dadoslidos.length; i++) {
                let x = this.dadoslidos[i]
                let a = {
                    horaregistro: moment(x.horaregistro).format('DD/MM/YYYY HH:mm:ss'),
                    alerta: x.sensoremalerta,
                    leituras: []
                }
                if (x.atributos.valor_lido1) {
                    let b = {
                        label: x.atributos.valor_lido1,
                        valor: x.valor_lido1
                    }
                    a.leituras.push(b)
                }
                if (x.atributos.valor_lido2) {
                    let b = {
                        label: x.atributos.valor_lido2,
                        valor: x.valor_lido2
                    }
                    a.leituras.push(b)
                }
                if (x.atributos.valor_lido3) {
                    let b = {
                        label: x.atributos.valor_lido3,
                        valor: x.valor_lido3
                    }
                    a.leituras.push(b)
                }
                if (x.atributos.valor_lido4) {
                    let b = {
                        label: x.atributos.valor_lido4,
                        valor: x.valor_lido4
                    }
                    a.leituras.push(b)
                }
                if (x.atributos.valor_lido5) {
                    let b = {
                        label: x.atributos.valor_lido5,
                        valor: x.valor_lido5
                    }
                    a.leituras.push(b)
                }
                if (x.atributos.valor_lido6) {
                    let b = {
                        label: x.atributos.valor_lido6,
                        valor: x.valor_lido6
                    }
                    a.leituras.push(b)
                }
                if (x.atributos.valor_lido7) {
                    let b = {
                        label: x.atributos.valor_lido7,
                        valor: x.valor_lido7
                    }
                    a.leituras.push(b)
                }
                if (x.atributos.valor_lido8) {
                    let b = {
                        label: x.atributos.valor_lido8,
                        valor: x.valor_lido8
                    }
                    a.leituras.push(b)
                }
                if (x.atributos.valor_lido9) {
                    let b = {
                        label: x.atributos.valor_lido9,
                        valor: x.valor_lido9
                    }
                    a.leituras.push(b)
                }
                if (x.atributos.valor_lido10) {
                    let b = {
                        label: x.atributos.valor_lido10,
                        valor: x.valor_lido10
                    }
                    a.leituras.push(b)
                }
                // arr.push(a);
                this.dados.push(a)

            }
            // this.dados = arr

            this.acrescentarLinkMap();
        },
        acrescentarLinkMap() {
            let long = ""
            let lat = ""

            for (let i = 0; i < this.dados.length; i++) {
                for (let x = 0; x < this.dados[i].leituras.length; x++) {
                    if (this.dados[i].leituras[x].label == 'Longitude') {
                        long = this.dados[i].leituras[x].valor
                    } else if (this.dados[i].leituras[x].label == 'Latitude') {
                        lat = this.dados[i].leituras[x].valor
                    }

                }
                if (long != "" && lat != "") {
                    let link = `https://maps.google.com/maps?q=${lat}%2C${long}&z=17&hl=pt-BR`
                    let b = {
                        label: 'Link',
                        valor: link
                    }
                    this.dados[i].leituras.push(b)
                }
            }



        },
        current() {
            return this.offset ? this.offset + 1 : 1;
        },
        current1() {
            return this.offset1 ? this.offset1 + 1 : 1;
        },
        mostrarFormScript() {
            this.mostrarFormSC = !this.mostrarFormSC
            this.sc = {}
            this.sc.enviar_notificacao = false;
            this.sc.notificacao = null;
            this.showDivAcao = false;
            this.showDivRegra = false
        },

        setSensor() {
            http.get('/sensores/' + this.$route.params.id)
                .then(res => {
                    this.sensor = res.data
                    this.getSensorGrupos();
                    this.getDepartamentos();
                    this.getModelos();
                    this.getTipos();
                    this.getFabricantes();
                    this.getAtivos();
                    this.getGatewayIot();
                    // this.getDadosLidos();

                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        createSensorScript(sc) {
            if (sc.id) {
                this.updateSensorScripts(sc);
            } else {
                const u = {
                    is_active: sc.is_active,
                    titulo: sc.titulo,
                    descricao: sc.descricao,
                    regra: this.regra,
                    acao: this.acao,
                    alerta: sc.alerta,
                    enviar_notificacao: sc.enviar_notificacao,
                    notificacao: sc.notificacao
                }
                http.post('/sensores/' + this.sensor.id + '/sensorscripts/', u)
                    .then(res => {
                        this.$swal.fire({
                            icon: 'success',
                            title: 'Criado com sucesso',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.getSensorScripts()
                        this.sc = {
                            titulo: "",
                            regra: "",
                            acao: "",
                            descricao: "",
                            enviar_notificacao: false
                        }
                    })
                    .catch(e => {
                        this.$swal("Oops...", e.response.data.detail, "error");
                        if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                            this.$router.push('/')
                        }
                    });
            }
        },
        cancelar() {
            this.$router.push('/sensores');
        },
        editarInputSensor() {
            this.isDisabled2 = !this.isDisabled2
        },
        getAtivos() {
            let query = `?conta=${this.user.conta}`
            if (this.user.tipo == 4) {
                query = `?conta=${this.sensor.conta}`
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
        chamadasGet() {
            if (this.user.tipo == 4) {
                this.getContas();
            }
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
        getSensorScripts(i = null) {
            if (i) {
                this.offset = i
            }

            const url = `/sensores/${this.$route.params.id}/sensorscripts/?limit=${this.limit}&offset=${this.limit * this.offset}&ordering=-id`
            http.get(url)
                .then(res => {
                    this.getDadosParaAsRegras();
                    this.sensorscripts = res.data.results
                    this.regra = res.data.results.regra
                    this.acao = res.data.results.acao
                    this.getNotificacoes();
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
        updateSensorScripts(form) {
            const u = {
                is_active: form.is_active,
                titulo: form.titulo,
                descricao: form.descricao,
                regra: this.regra,
                acao: this.acao,
                alerta: form.alerta,
                enviar_notificacao: form.enviar_notificacao,
                notificacao: form.notificacao
            }
            http.put('sensores/' + this.$route.params.id + '/sensorscripts/' + form.id + '/', u)
                .then(res => {

                    this.$swal.fire({
                        icon: 'success',
                        title: 'Alteração feita com sucesso',
                        showConfirmButton: false,
                        timer: 1500
                    })

                    this.getSensorScripts();
                    this.sc = {}
                    this.mostrarFormSC = false
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        detailsSC(id) {
            http.get('sensores/' + this.$route.params.id + '/sensorscripts/' + id)
                .then(res => {
                    this.mostrarFormSC = true
                    this.sc = res.data
                    this.listarNotificacoes();

                    //TODO: fecha regra
                    this.fecharRegra()
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        deleteSC(id) {
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
                    http.delete('sensores/' + this.$route.params.id + '/sensorscripts/' + id)
                        .then(res => {
                            this.getSensorScripts();
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
        getSensorGrupos() {
            let query = '?'
            if (this.user.tipo == 4) {
                query = `?conta=${this.sensor.conta}&`
            }
            const url = `/listaitens/sensorgrupo/lista${query}so_ativos=true`
            http.get(url)
                .then(res => {
                    this.sensorgrupos = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        getDepartamentos() {
            let query = '?modulo=sensor'
            if (this.user.tipo == 4) {
                query = `?conta=${this.sensor.conta}&modulo=sensor`
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
            let query = '?modulo=sensor'
            if (this.user.tipo == 4) {
                query = `?conta=${this.sensor.conta}&modulo=sensor`
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
        getFabricantes() {
            let query = '?modulo=sensor'
            if (this.user.tipo == 4) {
                query = `?conta=${this.sensor.conta}&modulo=sensor`
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
        getTipos() {
            let query = '?'
            if (this.user.tipo == 4) {
                query = `?conta=${this.sensor.conta}&`
            }
            const url = `/listaitens/sensortipo/lista${query}so_ativos=true`
            http.get(url)
                .then(res => {
                    this.tipos = res.data.results
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
    },
    created() {
        this.setSensor();
    },
    mounted() {

        this.setUser();
        this.chamadasGet();
        this.getEmpresas();


    },
}

</script>


<style scoped></style>