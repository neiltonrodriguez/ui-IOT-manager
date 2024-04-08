<template>
    <form v-on:submit.prevent="addForArray">
        <div class="h-full border my-4 rounded-md px-2 py-2 grid grid-cols-3 gap-2">
            <div v-if="permissoes.usuario" id="accordion-collapse" data-accordion="collapse">
                <h2 id="btn-usuario">
                    <button type="button" @click="checkAll(permissoes.usuario, 'usuario')"
                        class="hover:bg-slate-300 flex items-center justify-between w-full p-2 font-medium text-left text-gray-500 border border-b-0 border-gray-200  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400  dark:hover:bg-gray-800"
                        data-accordion-target="#accordio-usuario" aria-expanded="true" aria-controls="accordio-usuario">
                        <span class="flex items-center">Permissões de usuario <svg xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="w-6 h-6 mx-3">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                            </svg></span>

                    </button>
                </h2>
                <div id="accordio-usuario" class="" aria-labelledby="accordion-open-heading-1">
                    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <span v-for="usuario in permissoes.usuario" :key="usuario.id"
                            class="mb-2 text-gray-500 dark:text-gray-400">
                            <input type="checkbox" @change="habilitarSalvar()" class="checkPermission"
                                :value="usuario.id" :checked="usuario.is_active">
                            {{ usuario.apelido }}<br>
                        </span>

                    </div>
                </div>

            </div>
            <div v-if="permissoes.conta" id="accordion-collapse" data-accordion="collapse">

                <h2 id="btn-conta">
                    <button type="button" @click="checkAll(permissoes.conta, 'conta')"
                        class="hover:bg-slate-300 flex items-center justify-between w-full p-2 font-medium text-left text-gray-500 border border-b-0 border-gray-200  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400  dark:hover:bg-gray-800"
                        data-accordion-target="#accordio-conta" aria-expanded="true" aria-controls="accordio-conta">
                        <span class="flex items-center">Permissões de Conta <svg xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="w-6 h-6 mx-3">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                            </svg></span>

                    </button>
                </h2>
                <div id="accordio-conta" class="" aria-labelledby="accordion-open-heading-1">
                    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <span v-for="conta in permissoes.conta" :key="conta.id"
                            class="mb-2 text-gray-500 dark:text-gray-400">
                            <input type="checkbox" @change="habilitarSalvar()" class="checkPermission" :value="conta.id"
                                :checked="conta.is_active">
                            {{ conta.apelido }}<br>
                        </span>

                    </div>
                </div>
            </div>
            <div v-if="permissoes.group" id="accordion-collapse" data-accordion="collapse">
                <h2 id="btn-group">
                    <button type="button" @click="checkAll(permissoes.group, 'group')"
                        class="hover:bg-slate-300 flex items-center justify-between w-full p-2 font-medium text-left text-gray-500 border border-b-0 border-gray-200  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400  dark:hover:bg-gray-800"
                        data-accordion-target="#accordio-group" aria-expanded="true" aria-controls="accordio-group">
                        <span class="flex items-center">Permissões de grupo <svg xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="w-6 h-6 mx-3">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                            </svg></span>
                    </button>
                </h2>
                <div id="accordio-group" class="" aria-labelledby="accordion-open-heading-1">
                    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <span v-for="group in permissoes.group" :key="group.id"
                            class="mb-2 text-gray-500 dark:text-gray-400">
                            <input type="checkbox" @change="habilitarSalvar()" class="checkPermission" :value="group.id"
                                :checked="group.is_active">
                            {{ group.apelido }}<br>
                        </span>

                    </div>
                </div>
            </div>
            <div v-if="permissoes.cldap" id="accordion-collapse" data-accordion="collapse">
                <h2 id="btn-cldap">
                    <button type="button" @click="checkAll(permissoes.cldap, 'cldap')"
                        class="hover:bg-slate-300 flex items-center justify-between w-full p-2 font-medium text-left text-gray-500 border border-b-0 border-gray-200  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400  dark:hover:bg-gray-800"
                        data-accordion-target="#accordio-cldap" aria-expanded="true" aria-controls="accordio-cldap">
                        <span class="flex items-center">Permissões de cldap <svg xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="w-6 h-6 mx-3">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                            </svg></span>

                    </button>
                </h2>
                <div id="accordio-cldap" class="" aria-labelledby="accordion-open-heading-1">
                    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <span v-for="cldap in permissoes.cldap" :key="cldap.id"
                            class="mb-2 text-gray-500 dark:text-gray-400">
                            <input type="checkbox" @change="habilitarSalvar()" class="checkPermission" :value="cldap.id"
                                :checked="cldap.is_active">
                            {{ cldap.apelido }}<br>
                        </span>

                    </div>
                </div>
            </div>
            <div v-if="permissoes.empresa" id="accordion-collapse" data-accordion="collapse">
                <h2 id="btn-empresa">
                    <button type="button" @click="checkAll(permissoes.empresa, 'empresa')"
                        class="hover:bg-slate-300 flex items-center justify-between w-full p-2 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400  dark:hover:bg-gray-800"
                        data-accordion-target="#accordio-empresa" aria-expanded="true" aria-controls="accordio-empresa">
                        <span class="flex items-center">Permissões de empresa <svg xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="w-6 h-6 mx-3">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                            </svg></span>

                    </button>
                </h2>
                <div id="accordio-empresa" class="" aria-labelledby="accordion-open-heading-1">
                    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <span v-for="empresa in permissoes.empresa" :key="empresa.id"
                            class="mb-2 text-gray-500 dark:text-gray-400">
                            <input type="checkbox" @change="habilitarSalvar()" class="checkPermission"
                                :value="empresa.id" :checked="empresa.is_active">
                            {{ empresa.apelido }}<br>
                        </span>

                    </div>
                </div>
            </div>
            <div v-if="permissoes.sensor" id="accordion-collapse" data-accordion="collapse">
                <h2 id="btn-sensor">
                    <button type="button" @click="checkAll(permissoes.sensor, 'sensor')"
                        class="hover:bg-slate-300 flex items-center justify-between w-full p-2 font-medium text-left text-gray-500 border border-b-0 border-gray-200  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400  dark:hover:bg-gray-800"
                        data-accordion-target="#accordio-sensor" aria-expanded="true" aria-controls="accordio-sensor">
                        <span class="flex items-center">Permissões de sensor <svg xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="w-6 h-6 mx-3">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                            </svg></span>

                    </button>
                </h2>
                <div id="accordio-sensor" class="" aria-labelledby="accordion-open-heading-1">
                    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <span v-for="sensor in permissoes.sensor" :key="sensor.id"
                            class="mb-2 text-gray-500 dark:text-gray-400">
                            <input type="checkbox" @change="habilitarSalvar()" class="checkPermission"
                                :value="sensor.id" :checked="sensor.is_active">
                            {{ sensor.apelido }}<br>
                        </span>

                    </div>
                </div>
            </div>
            <div v-if="permissoes.sensorgrupos" id="accordion-collapse" data-accordion="collapse">
                <h2 id="btn-sensorgrupos">
                    <button type="button" @click="checkAll(permissoes.sensorgrupos, 'sensorgrupos')"
                        class="hover:bg-slate-300 flex items-center justify-between w-full p-2 font-medium text-left text-gray-500 border border-b-0 border-gray-200  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400  dark:hover:bg-gray-800"
                        data-accordion-target="#accordio-sensorgrupos" aria-expanded="true"
                        aria-controls="accordio-sensorgrupos">
                        <span class="flex items-center">Permissões de sensorgrupos <svg
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6 mx-3">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                            </svg></span>

                    </button>
                </h2>
                <div id="accordio-sensorgrupos" class="" aria-labelledby="accordion-open-heading-1">
                    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <span v-for="sensorgrupos in permissoes.sensorgrupos" :key="sensorgrupos.id"
                            class="mb-2 text-gray-500 dark:text-gray-400">
                            <input type="checkbox" @change="habilitarSalvar()" class="checkPermission"
                                :value="sensorgrupos.id" :checked="sensorgrupos.is_active">
                            {{ sensorgrupos.apelido }}<br>
                        </span>

                    </div>
                </div>
            </div>
            <div v-if="permissoes.usuariogrupos" id="accordion-collapse" data-accordion="collapse">
                <h2 id="btn-usuariogrupos">
                    <button type="button" @click="checkAll(permissoes.usuariogrupos, 'usuariogrupos')"
                        class="hover:bg-slate-300 flex items-center justify-between w-full p-2 font-medium text-left text-gray-500 border border-b-0 border-gray-200  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400  dark:hover:bg-gray-800"
                        data-accordion-target="#accordio-usuariogrupos" aria-expanded="true"
                        aria-controls="accordio-usuariogrupos">
                        <span class="flex items-center">Permissões de usuariogrupos <svg
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6 mx-3">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                            </svg></span>

                    </button>
                </h2>
                <div id="accordio-usuariogrupos" class="" aria-labelledby="accordion-open-heading-1">
                    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <span v-for="usuariogrupos in permissoes.usuariogrupos" :key="usuariogrupos.id"
                            class="mb-2 text-gray-500 dark:text-gray-400">

                            <input class="checkPermission" type="checkbox" @change="habilitarSalvar()"
                                :value="usuariogrupos.id" :checked="usuariogrupos.is_active">
                            {{ usuariogrupos.apelido }}<br>
                        </span>

                    </div>
                </div>
            </div>
            <div v-if="permissoes.sensorscripts" id="accordion-collapse" data-accordion="collapse">
                <h2 id="btn-sensorscripts">
                    <button type="button" @click="checkAll(permissoes.sensorscripts, 'sensorscripts')"
                        class="hover:bg-slate-300 flex items-center justify-between w-full p-2 font-medium text-left text-gray-500 border border-b-0 border-gray-200  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400  dark:hover:bg-gray-800"
                        data-accordion-target="#accordio-sensorscripts" aria-expanded="true"
                        aria-controls="accordio-sensorscripts">
                        <span class="flex items-center">Permissões de sensorscripts <svg
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6 mx-3">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                            </svg></span>

                    </button>
                </h2>
                <div id="accordio-sensorscripts" class="" aria-labelledby="accordion-open-heading-1">
                    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <span v-for="sensorscripts in permissoes.sensorscripts" :key="sensorscripts.id"
                            class="mb-2 text-gray-500 dark:text-gray-400">

                            <input class="checkPermission" type="checkbox" @change="habilitarSalvar()"
                                :value="sensorscripts.id" :checked="sensorscripts.is_active">
                            {{ sensorscripts.apelido }}<br>
                        </span>

                    </div>
                </div>
            </div>
            <div v-if="permissoes.ativo" id="accordion-collapse" data-accordion="collapse">
                <h2 id="btn-sensorscripts">
                    <button type="button" @click="checkAll(permissoes.ativo, 'ativo')"
                        class="hover:bg-slate-300 flex items-center justify-between w-full p-2 font-medium text-left text-gray-500 border border-b-0 border-gray-200  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400  dark:hover:bg-gray-800"
                        data-accordion-target="#accordio-sensorscripts" aria-expanded="true"
                        aria-controls="accordio-sensorscripts">
                        <span class="flex items-center">Permissões de ativos <svg xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="w-6 h-6 mx-3">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                            </svg></span>

                    </button>
                </h2>
                <div id="accordio-sensorscripts" class="" aria-labelledby="accordion-open-heading-1">
                    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <span v-for="ativo in permissoes.ativo" :key="ativo.id"
                            class="mb-2 text-gray-500 dark:text-gray-400">

                            <input class="checkPermission" type="checkbox" @change="habilitarSalvar()" :value="ativo.id"
                                :checked="ativo.is_active">
                            {{ ativo.apelido }}<br>
                        </span>

                    </div>
                </div>
            </div>
            <div v-if="permissoes.configuracao" id="accordion-collapse" data-accordion="collapse">
                <h2 id="btn-sensorscripts">
                    <button type="button" @click="checkAll(permissoes.configuracao, 'configuracao')"
                        class="hover:bg-slate-300 flex items-center justify-between w-full p-2 font-medium text-left text-gray-500 border border-b-0 border-gray-200  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400  dark:hover:bg-gray-800"
                        data-accordion-target="#accordio-sensorscripts" aria-expanded="true"
                        aria-controls="accordio-sensorscripts">
                        <span class="flex items-center">Permissões de configurações <svg
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6 mx-3">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                            </svg></span>

                    </button>
                </h2>
                <div id="accordio-sensorscripts" class="" aria-labelledby="accordion-open-heading-1">
                    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <span v-for="sensorscripts in permissoes.configuracao" :key="sensorscripts.id"
                            class="mb-2 text-gray-500 dark:text-gray-400">

                            <input class="checkPermission" type="checkbox" @change="habilitarSalvar()"
                                :value="sensorscripts.id" :checked="sensorscripts.is_active">
                            {{ sensorscripts.apelido }}<br>
                        </span>

                    </div>
                </div>
            </div>
            <div v-if="permissoes.camera" id="accordion-collapse" data-accordion="collapse">
                <h2 id="btn-sensorscripts">
                    <button type="button" @click="checkAll(permissoes.camera, 'camera')"
                        class="hover:bg-slate-300 flex items-center justify-between w-full p-2 font-medium text-left text-gray-500 border border-b-0 border-gray-200  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400  dark:hover:bg-gray-800"
                        data-accordion-target="#accordio-sensorscripts" aria-expanded="true"
                        aria-controls="accordio-sensorscripts">
                        <span class="flex items-center">Permissões de Camera <svg
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6 mx-3">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                            </svg></span>

                    </button>
                </h2>
                <div id="accordio-sensorscripts" class="" aria-labelledby="accordion-open-heading-1">
                    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <span v-for="c in permissoes.camera" :key="c.id"
                            class="mb-2 text-gray-500 dark:text-gray-400">

                            <input class="checkPermission" type="checkbox" @change="habilitarSalvar()"
                                :value="c.id" :checked="c.is_active">
                            {{ c.apelido }}<br>
                        </span>

                    </div>
                </div>
            </div>
            <div v-if="permissoes.permission" id="accordion-collapse" data-accordion="collapse">
                <h2 id="btn-sensorscripts">
                    <button type="button" @click="checkAll(permissoes.permission, 'permission')"
                        class="hover:bg-slate-300 flex items-center justify-between w-full p-2 font-medium text-left text-gray-500 border border-b-0 border-gray-200  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400  dark:hover:bg-gray-800"
                        data-accordion-target="#accordio-sensorscripts" aria-expanded="true"
                        aria-controls="accordio-sensorscripts">
                        <span class="flex items-center">Permissão para alterar permissões <svg
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6 mx-3">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                            </svg>
                        </span>

                    </button>
                </h2>
                <div id="accordio-sensorscripts" class="" aria-labelledby="accordion-open-heading-1">
                    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <span v-for="p in permissoes.permission" :key="p.id"
                            class="mb-2 text-gray-500 dark:text-gray-400">

                            <input @change="habilitarSalvar()" class="checkPermission" type="checkbox" :value="p.id"
                                :checked="p.is_active">
                            {{ p.apelido }}<br>
                        </span>

                    </div>
                </div>
            </div>

        </div>
        <button type="submit" :disabled="isDisabled"
            class="disabled:bg-gray-300 w-30 h-8 px-4 py-2 font-semibold text-sm bg-blue-700 hover:bg-blue-900 text-white rounded-md shadow-sm">Salvar</button>
        <span></span> <button @click="cancelar()" type="button"
            class=" w-30 h-8 px-4 py-2 font-semibold text-sm bg-red-700 hover:bg-red-900 text-white rounded-md shadow-sm">Cancelar</button>
    </form>
</template>
<script>
import http from '../services/http.js'
import router from '../router'

export default {
    props: {
        idGrupo: Number,
        tabNumber: Number,
    },
    data() {
        return {
            permissoes: [],
            isDisabled: true
        };
    },
    methods: {
        checkAll(x, name) {
            this.isDisabled = false
            let arr = x
            let origim = this.permissoes
            for (let i = 0; i < arr.length; i++) {

                arr[i].is_active = true

            }
            switch (name) {
                case "permission":
                    this.permissoes.permission = x
                    break;
                case "configuracao":
                    this.permissoes.configuracao = x
                    break;
                case "sensor":
                    this.permissoes.sensor = x
                    break;
                case "cldap":
                    this.permissoes.cldap = x
                    break;
                case "conta":
                    this.permissoes.conta = x
                    break;
                case "usuario":
                    this.permissoes.usuario = x
                    break;
                case "empresa":
                    this.permissoes.empresa = x
                    break;
                case "ativo":
                    this.permissoes.ativo = x
                    break;
                case "usuariogrupos":
                    this.permissoes.usuariogrupo = x
                    break;
                case "camera":
                    this.permissoes.camera = x
                    break;
                default:
                    this.permissoes = origim

            }

        },
        habilitarSalvar() {
            this.isDisabled = false
        },
        enviarParaPai(numero) {
            this.$emit('muda-tab', numero)
        },

        getPermissoes() {
            http.get('/usuariogrupos/' + this.idGrupo + '/permissoes')
                .then(res => {
                    this.permissoes = res.data.permissoes[0]
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        addForArray() {
            let self = this
            const collection = document.getElementsByClassName("checkPermission");
            let id = 0
            let ids = []
            for (let i = 0; i < collection.length; i++) {
                if (collection[i].checked) {
                    id = collection[i].value;
                    ids.push(id)
                }
            }
            const i = {
                permissoes: ids
            }

            http.put('/usuariogrupos/' + this.idGrupo + '/permissoes/update/', i)
                .then(res => {
                    this.enviarParaPai(3);
                })
                .catch(e => {
                    this.$swal("Oops...", e.response.data.detail, "error");
                    if (e.response.data.detail == "Você não tem permissão para executar essa ação.") {
                        this.$router.push('/')
                    }
                });
        },
        cancelar() {
            router.push({ name: 'grupousuarios' })
        },
    },
    watch: {
        tabNumber() {
            if (this.tabNumber == 2) {
                this.getPermissoes();
            }

        }

    }
};
</script>


<style scoped></style>