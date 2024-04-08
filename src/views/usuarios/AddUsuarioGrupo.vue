<template>
    <div class="container-fluid p-5">
        <div>
            <h3 class="text-start">ADICIONAR USUÁRIO AO GRUPO </h3>

        </div>
        <div class="divide-x my-5">
            <hr>
        </div>
        <div>
            <select class="edit-form" v-model="grupo.id">
                <option value="" disabled selected>selecione o grupo para ser adicionado</option>
                <option v-for="g in grupousuarios" :key="g.id" :value="g.id"  @change="listarMembros(0, g.id)">{{ g.nome }}</option>

            </select>
        </div>
        <div class="my-5">
            <button type="button" @click="addUserForGroup()"
                class="px-4 py-2 font-semibold text-sm bg-green-700 hover:bg-green-900 text-white rounded-md shadow-sm">Adicionar
                usuários ao Grupo</button>
        </div>
        <form>
            <div class="flex flex-row">
                <div class="basis-1/2">
                    <table class="border-collapse table-fixed w-400 text-sm">
                        <thead>
                            <tr>
                                <th
                                    class="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                    ID</th>
                                <th
                                    class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                    Nome Completo</th>
                                <th
                                    class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                    Remover da lista</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white dark:bg-slate-800">
                            <tr v-for="u in users" :key="u.id">
                                <td
                                    class="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400">
                                    {{
                                        u.id }}</td>
                                <td
                                    class="border-b border-slate-100 dark:border-slate-700 p-2 pr-3 text-slate-500 dark:text-slate-400">
                                    {{ u.nomecompleto }}</td>
                                <td
                                    class="border-b border-slate-100 dark:border-slate-700 p-2 pr-3 text-slate-500 dark:text-slate-400">
                                    <button type="button" class="mx-1 px-1" @click="removeItem(u.id, i)"><svg
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:bg-red-100">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="basis-1/2">
                    <div class="border">
                        <table class="border-collapse table-fixed w-full text-sm">
                            <thead>

                            </thead>
                            <tbody class="bg-white dark:bg-slate-800">
                                <tr v-for="u in membros" :key="u.id">
                                    <td
                                        class="border-b border-slate-100 dark:border-slate-700 p-2 pr-3 text-slate-500 dark:text-slate-400">
                                        {{ u.nomecompleto }}</td>
                                    <td
                                        class="border-b text-right border-slate-100 dark:border-slate-700 p-2 pr-3 text-slate-500 dark:text-slate-400">
                                        <button type="button" class="mx-1 px-1" @click="removeMembro(u.id)"><svg
                                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:bg-red-100">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
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
                            <span class="mx-4 text-xd font-semibold text-blue-700">total:</span> {{
                                total }}
                        </div>
                    </div>


                </div>
            </div>

        </form>

    </div>
</template>
<script>
import http from '../../services/http.js'
import { userStores } from '../../stores/usuarios.js'
import { ref } from 'vue'
import router from '../../router'

const userStore = userStores();

export default {
    data() {
        return {
            grupousuarios: {},
            membros: {},
            grupo: {},
            users: [],
            isDisabled: true,
            offset: 0,
            limit: 5,
            pages: [],
            total: 0,
        };
    },
    methods: {
        editar() {
            this.isDisabled = !this.isDisabled
        },
        removeItem(id, i) {
            this.users.splice(i, 1);
        },
        addUserForGroup() {
            let usuario = 0
            let u = {
                usuarios: []
            }
            for (let i = 0; i < this.users.length; i++) {
                usuario = this.users[i].id
                u.usuarios.push(usuario)
            }
            http.put('/usuariogrupos/' + this.grupo.id + '/membros/add/', u)
                .then(res => {
                    this.getMembros();
                })
                .catch(e => {
                    console.log(e);
                });
        },
        getGrupoUsuarios() {
            http.get('/usuariogrupos/?limit=150&ordering=-id')
                .then(res => {
                    this.grupousuarios = res.data.results
                })
                .catch(e => {
                    console.log(e);
                });

        },
        setUsers() {
            const u = ref(userStore.users)
            this.users = u.value
        },
         current() {
            return this.offset ? this.offset + 1 : 1;
        },
        changePage(i) {
            this.getMembros(i);
            this.offset = 0
        },
        listarMembros(i = null, id){
            console.log(id);
            this.getMembros(null, id)
        },
        getMembros(i = null, id) {
            if (i) {
                this.offset = i
            }
            const url = `/usuariogrupos/${id}/membros/?limit=${this.limit}&offset=${this.limit * this.offset}&ordering=-id`;
            http.get(url)
                .then(res => {
                    this.membros = res.data.results
                    this.total = res.data.count
                    const qty = Math.ceil(this.total / this.limit);
                    if (qty <= 1) return [1];
                    this.pages = Array.from(Array(qty).keys(), (i) => i + 1);
                })
                .catch(e => {
                    console.log(e);
                });
        },

    },
    mounted() {
        this.setUsers();
        this.getMembros();
        this.getGrupoUsuarios();

    }

}


</script>


<style scoped></style>