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
                                        class="mx-3 my-5 px-4 py-2 font-semibold text-sm bg-green-800 text-white rounded-md shadow-sm"
                                        @click="mostrarFormScript()">Adicionar scripts</button>
                                </div>
                                <div v-if="mostrarFormSC">
                                    <form class="row g-3" v-on:submit.prevent="createSensorScript(sc)">
                                        <div v-for="c in cont" class="border p-2 rounded-lg bg-slate-200">
                                            <div v-if="cont >= 2 && c != 1" class="grid gap-3 mb-3 md:grid-cols-3">
                                                <div></div>
                                                <div>
                                                    <label class="label-form">Conectores lógicos</label>
                                                    <select class="input-form" required>
                                                        <option selected value="AND"> AND </option>
                                                        <option value="AND"> OR </option>

                                                    </select>
                                                </div>
                                                <div></div>
                                            </div>
                                            <div class="grid gap-3 mb-3 md:grid-cols-3">
                                                <div>
                                                    <label class="label-form">Condicional IF/ELSE</label>
                                                    <select class="input-form">
                                                        <option value="" selected disabled>escolher parâmetro
                                                        </option>
                                                        <option v-for="(a, index) in atributos" :key="index"
                                                            :value="a.nome">{{ a.label }}</option>


                                                    </select>
                                                </div>
                                                <div>
                                                    <label class="label-form">Tipo de condição</label>
                                                    <select class="input-form">
                                                        <option value="" selected disabled>(numero)
                                                        </option>
                                                        <option v-for="(o, index) in operatorNumber" :key="index"
                                                            :value="o.value">{{ o.label }}
                                                        </option>

                                                    </select>
                                                </div>

                                                <div>
                                                    <label class="label-form">Valor</label>
                                                    <input type="text" class="input-form" placeholder="">
                                                </div>
                                            </div>
                                            
                                            <!-- <div v-if="cont == 2" class="grid gap-3 mb-3 md:grid-cols-3">
                                                <div>
                                                    <label class="label-form">Condicional IF/ELSE</label>
                                                    <select class="input-form">
                                                        <option value="" selected disabled>escolher parâmetro
                                                        </option>
                                                        <option v-for="(a, index) in atributos" :key="index"
                                                            :value="a.nome">{{ a.label }}</option>


                                                    </select>
                                                </div>
                                                <div>
                                                    <label class="label-form">tipo de condição</label>
                                                    <select class="input-form">
                                                        <option value="" selected disabled>(numero)
                                                        </option>
                                                        <option v-for="(o, index) in operatorNumber" :key="index"
                                                            :value="o.value">{{ o.label }}
                                                        </option>

                                                    </select>
                                                </div>

                                                <div>
                                                    <label class="label-form">Valor</label>
                                                    <input type="text" class="input-form" placeholder="">
                                                </div>
                                            </div> -->
                                            

                                        </div>
                                        <button type="button" @click="cont++"
                                                class="text-white mt-3 mb-5 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Adicionar mais condições</button>
                                        <div class="grid gap-3 mb-3 md:grid-cols-2">
                                            <div>
                                                <label class="label-form ">Título</label>
                                                <input v-on:keyup="habilitarSalvar()" type="text" v-model="sc.titulo"
                                                    class="input-form" placeholder="" required>

                                            </div>

                                            <div>
                                                <label class="label-form ">Ação</label>
                                                <input v-on:keyup="habilitarSalvar()" type="text" v-model="sc.acao"
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
                                        </div>


                                        <button type="submit" :disabled="isDisabled"
                                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  disabled:bg-gray-300">salvar</button>
                                        <button type=" button" @click="mostrarFormScript()"
                                            class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mx-3 text-center ">fechar</button>



                                    </form>
                                </div>
                                <table class="border-collapse table-fixed w-full">
                                    <thead>
                                        <tr>

                                            <th
                                                class="border-b  font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left">
                                                Título</th>
                                            <th
                                                class="border-b  font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left">
                                                Regra</th>
                                            <th
                                                class="border-b  font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left">
                                                Ação</th>
                                            <th
                                                class="border-b  font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left">
                                                Habilitado</th>
                                            <th
                                                class="border-b  font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left">
                                                Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white">
                                        <tr class="hover:bg-gray-100 cursor-pointer duration-200"
                                            v-for="u in sensorscripts" :key="u.id">
                                            <td @click="detailsSC(u.id)"
                                                class="border-b border-slate-100  p-4 pr-8 text-slate-500 ">
                                                {{ u.titulo }}
                                            </td>
                                            <td @click="detailsSC(u.id)"
                                                class="border-b border-slate-100   p-4 pr-8 text-slate-500  ">
                                                {{ u.regra }}
                                            </td>
                                            <td @click="detailsSC(u.id)"
                                                class="border-b border-slate-100   p-4 pr-8 text-slate-500  ">
                                                {{ u.acao }}
                                            </td>

                                            <td @click="detailsSC(u.id)"
                                                class="border-b border-slate-100  p-4 pr-8 text-slate-500 ">
                                                <template v-if="u.is_active">
                                                    <div class="flex items-center">
                                                        <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                                        Sim
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="flex items-center">
                                                        <div class="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div> Não
                                                    </div>
                                                </template>
                                            </td>
                                            <td class="border-b border-slate-100  p-4 pr-8 text-slate-500 ">
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
                                <div class="py-4">
                                    <button v-for="(page, index) in pages" :key="page"
                                        class="px-3 mx-1 py-2 text-sm bg-blue-700 hover:bg-blue-900 focus:bg-violet-700 text-white"
                                        :class="{ current: page === current }" @click="changePage(index)">
                                        {{ page }}
                                    </button>
                                    <span class="mx-4 text-xd font-semibold text-blue-700">Total:</span> {{
                                        total }}
                                </div>
                                <button type="button" @click="cancelar()"
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Voltar</button>
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

const auth = useAuth();

export default {
    components: {
        Iframe
    },
    data() {
        return {
            operatorNumber: [
                {
                    label: "maior que",
                    value: ">"
                },
                {
                    label: "menor que",
                    value: "<"
                },
                {
                    label: "igual a",
                    value: "=="
                }
            ],
            atributos: [
                {
                    label: "Temperatura",
                    parametro: "temperatura",
                    nome: "valor_ref1"
                },
                {
                    label: "Umidade",
                    parametro: "umidade",
                    nome: "valor_ref2"
                },
                {
                    label: "Frio",
                    parametro: "frio",
                    nome: "valor_ref3"
                },
                {
                    label: "Frieza",
                    parametro: "frieza",
                    nome: "valor_ref4"
                },
                {
                    label: "Quintura",
                    parametro: "quintura",
                    nome: "valor_ref5"
                }
            ],
            cont: 1,
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
            mostrarNotificacoes: false
        };
    },
    methods: {
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
                console.log(tabNumber)
                this.getDadosLidos();
                this.modal = false
                this.openTab = tabNumber
            }
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
                http.post('/sensores/' + this.sensor.id + '/sensorscripts/', sc)
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
                    this.sensorscripts = res.data.results
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
                regra: form.regra,
                acao: form.acao,
                alerta: form.alerta,
                enviar_notificacao: form.enviar_notificacao,
                notificacao: form.notificacao
            }
            http.put('sensores/' + this.$route.params.id + '/sensorscripts/' + form.id + '/', u)
                .then(res => {
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

    }
}

</script>


<style scoped></style>