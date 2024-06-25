<template>
    <div class="w-full bg-gray-800 flex">
        <!-- Side bar -->
        <Sidebar @click="closeDrop()" :showSide="showSide" :conta="modulos.conta" :ativo="modulos.ativo" :configuracao="modulos.configuracao"
            :empresa="modulos.empresa" :sensor="modulos.sensor" :cldap="modulos.cldap" :usuario="modulos.usuario"
            :usuariogrupo="modulos.usuariogrupo" :camera="modulos.camera" />
        <div class="w-full bg-gray-400">
            <div class="h-[50px] bg-gray-100 flex items-center shadow-sm px-[20px] w-full py-[10px] z-10 border-b ">
                <!-- Hambuger menu -->
                <div class="cursor-pointer w-[30px]" @click="toggleSideBar">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class=" w-[25px] h-[25px]">
                        <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                        <path
                            d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                    </svg>
                </div>
                <!-- Search bar -->

                <div class="w-[calc(100%-30px)] flex">
                    <div class="w-[calc(100%-200px)] flex justify-center ">
                        <!-- Search bar -->

                    </div>
                    <!-- User login -->
                    <div class="w-[200px]">
                        <div class="flex items-center justify-start space-x-4" @click="toggleDrop">
                            <template v-if="user.foto == null">
                                <img class="w-10 h-10 rounded-full border-2 border-gray-50"
                                    src="./../assets/img/logomarca.jpg" alt=""></template>
                            <template v-else>
                                <img class="w-10 h-10 rounded-full border-2 border-gray-100" :src="user.foto"
                                    alt=""></template>
                            <div class="font-semibold dark:text-white text-left">
                                <div>{{ user.nomecompleto }}
                                </div>

                            </div>
                        </div>
                        <!-- Drop down -->
                        <div v-show="showDropDown"
                            class="absolute right-[10px] z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div class="py-1 text-left" role="none">
                                <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->

                                <a href="#" @click="destroy()"
                                    class="text-gray-700 hover:bg-slate-200 block px-4 py-2 text-sm" role="menuitem"
                                    tabindex="-1" id="menu-item-2">Sair do sistema</a>
                                <router-link to="/perfil" @click="closeDrop()"
                                    class="text-gray-700  hover:bg-slate-200 block px-4 py-2 text-sm">
                                    Perfil</router-link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 dark:bg-slate-800 p-[10px] h-screen">
                <div class="border border-gray-300 rounded-md p-[10px] h-[900px] overflow-y-auto" @click="closeDrop()">
                    <router-view ></router-view>
                </div>
            </div>
        </div>
        <!-- Main  -->
    </div>
   
</template>
<script>
import { useAuth } from './../stores/auth.js'
import router from '../router/index.js'
import { ref } from 'vue'

const auth = useAuth();

import Sidebar from './../components/Sidebar.vue'
export default {
    components: {
        Sidebar,
    },
    data() {
        return {
            showDropDown: false,
            showSide: true,
            user: '',
            modulos: {}
        }
    },
    methods: {
        toggleSideBar() {
            this.showSide = !this.showSide

        },
        accessRoute(nameRoute) {
            console.log(nameRoute);
            router.push('/perfil')
        },
        toggleDrop() {
            this.showDropDown = !this.showDropDown

        },
        closeDrop() {
            this.showDropDown = false

        },
        destroy() {
            auth.clear()
            router.push({ name: 'login' })
        },
        setUser() {
            const u = ref(auth.user)
            const p = ref(auth.modulos)
            this.user = u.value
            this.modulos = p.value
        },
    },
    mounted() {
        this.setUser();
    }

}
</script>

<style></style>