<template>
    <div class="w-[400px] h-full  bg-gray-200 text-white " v-show="showSide">
        <div @click="home()" title="Voltar para HOME"
            class="cursor-pointer duration-200 hover:bg-slate-500 h-auto w-auto bg-gray-900 flex justify-center  items-center py-5">
            <div class="px-[20px]">
                <!-- <img class="flex items-center justify-center" src="./../assets/img/logomarca.jpg" alt=""> -->
                <h3 class="font-bold text-xl">Admin Dashboard</h3>
            </div>
        </div>
        <div class="h-screen bg-gray-800 py-[20px]">
            <div class="flex flex-col justify-between px-[20px] space-y-[10px]">
                <div class=" flex flex-col justify-between space-y-[10px]">

                    <div v-if="usuario == 'True'">
                        <router-link @click="mostrarSubMenuUsuario()" to=""
                            class="inline-flex  relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="mr-2 w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                            </svg>

                            Usuários
                        </router-link>
                        <ul v-if="subMenuUsuario">
                            <li>
                                <router-link to="/usuarios"
                                :class="rotaAtual === '/usuarios' ? 'bg-slate-500' : ''"
                                    class="mx-5 active:bg-slate-500  focus:bg-slate-500 inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
                                    - Usuários
                                </router-link>
                            </li>
                            <li v-if="usuariogrupo == 'True'">
                                <router-link to="/grupousuarios"
                                :class="rotaAtual === '/grupousuarios' ? 'bg-slate-500' : ''"
                                    class="mx-5 inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
                                    - Grupos de usuários
                                </router-link>
                            </li>
                        </ul>

                    </div>

                    <div @click="fecharMenus()" v-if="conta == 'True'">
                        <router-link to="/contas"
                        :class="rotaAtual === '/contas' ? 'bg-slate-500' : ''"
                            class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-300  hover:text-gray-800 transition duration-400 ease-in-out">
                            <svg aria-hidden="true" class="mr-2 w-[25px] h-[25px] fill-current" fill="currentColor"
                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z">
                                </path>
                            </svg>
                            Contas
                        </router-link>
                    </div>
                    <div @click="fecharMenus()" v-if="empresa == 'True'">
                        <router-link to="/empresas"
                        :class="rotaAtual === '/empresas' ? 'bg-slate-500' : ''"
                            class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-300  hover:text-gray-800 transition duration-400 ease-in-out">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="mr-2 w-[25px] h-[25px] fill-current">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                            </svg>


                            Empresas
                        </router-link>
                    </div>
                    <div v-if="sensor == 'True'">
                        <router-link @click="mostrarSubMenuSensores()" to=""
                            class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md rounded-b-lg hover:bg-gray-300  hover:text-gray-800 transition duration-400 ease-in-out">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="mr-2 w-[25px] h-[25px] fill-current">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
                            </svg>

                            Sensores
                        </router-link>
                        <ul v-if="subMenuSensor">

                            <li>
                                <router-link to="/sensores"
                                :class="rotaAtual === '/sensores' ? 'bg-slate-500' : ''"
                                    class="mx-5 inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
                                    - Sensores
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/tiposensores"
                                :class="rotaAtual === '/tiposensores' ? 'bg-slate-500' : ''"
                                    class="mx-5 inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
                                    - Tipos de sensores
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/gruposensores"
                                :class="rotaAtual === '/gruposensores' ? 'bg-slate-500' : ''"
                                    class="mx-5 inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
                                    - Grupos de sensores
                                </router-link>
                            </li>

                        </ul>
                    </div>

                    <div v-if="camera == 'True'">
                        <router-link @click="mostrarSubMenuCamera()" to=""
                            class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md rounded-b-lg hover:bg-gray-300  hover:text-gray-800 transition duration-400 ease-in-out">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="mr-2 w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                            </svg>
                            Câmeras
                        </router-link>
                        <ul v-if="subMenuCamera">
                            <li>
                                <router-link to="/cameras"
                                :class="rotaAtual === '/cameras' ? 'bg-slate-500' : ''"
                                    class="mx-5 inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
                                    - Câmeras
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/grupocameras"
                                :class="rotaAtual === '/grupocameras' ? 'bg-slate-500' : ''"
                                    class="mx-5 inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
                                    - Grupos de câmeras
                                </router-link>
                            </li>
                        </ul>
                    </div>

                    <div v-if="cldap == 'True'">
                        <router-link @click="mostrarSubMenuLdap()" to=""
                            class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md rounded-b-lg hover:bg-gray-300  hover:text-gray-800 transition duration-400 ease-in-out">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="mr-2 w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                            </svg>
                            LDAP
                        </router-link>
                        <ul v-if="subMenuLdap">
                            <li>
                                <router-link to="/ldaps/1/"
                                :class="rotaAtual === '/ldaps/1/' ? 'bg-slate-500' : ''"
                                    class="mx-5 inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
                                    - Usuários e grupos
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/ldaps/2/"
                                :class="rotaAtual === '/ldaps/2/' ? 'bg-slate-500' : ''"
                                    class="mx-5 inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
                                    - Sensores
                                </router-link>
                            </li>

                        </ul>
                    </div>
                    <div v-if="ativo == 'True'">
                        <router-link @click="mostrarSubMenuAtivo()" to=""
                            class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="mr-2 w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                            </svg>

                            Ativos
                        </router-link>
                        <ul v-if="subMenuAtivo">
                            <li>
                                <router-link to="/ativos"
                                :class="rotaAtual === '/ativos' ? 'bg-slate-500' : ''"
                                    class="mx-5 inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
                                    - Ativos
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/tipoativos"
                                :class="rotaAtual === '/tipoativos' ? 'bg-slate-500' : ''"
                                    class="mx-5 inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
                                    - Tipos de ativos
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/grupoativos"
                                :class="rotaAtual === '/grupoativos' ? 'bg-slate-500' : ''"
                                    class="mx-5 inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
                                    - Grupos de ativos
                                </router-link>
                            </li>
                        </ul>

                    </div>
                    <div v-if="configuracao == 'True'">
                        <router-link @click="mostrarSubMenuConfiguracao()" to=""
                            class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="mr-2 w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                            </svg>

                            Configurações
                        </router-link>
                        <ul v-if="subMenuConfiguracao">
                            <li>
                                <router-link to="/lista-customizada"
                                :class="rotaAtual === '/lista-customizada' ? 'bg-slate-500' : ''"
                                    class="mx-5 inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
                                    - Listas customizadas
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/emailintegracao"
                                :class="rotaAtual === '/emailintegracao' ? 'bg-slate-500' : ''"
                                    class="mx-5 inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
                                    - Integração com e-mail
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/mensagemintegracao"
                                :class="rotaAtual === '/mensagemintegracao' ? 'bg-slate-500' : ''"
                                    class="mx-5 inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
                                    - Integração com mensagem
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/notificacoes"
                                :class="rotaAtual === '/notificacoes' ? 'bg-slate-500' : ''"
                                    class="mx-5 inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
                                    - Notificações
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/monitoriot"
                                :class="rotaAtual === '/monitoriot' ? 'bg-slate-500' : ''"
                                    class="mx-5 inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
                                    - Monitor IoT
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/gatewayiot"
                                :class="rotaAtual === '/gatewayiot' ? 'bg-slate-500' : ''"
                                    class="mx-5 inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
                                    - Gateway IoT
                                </router-link>
                            </li>

                        </ul>

                    </div>
                   
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { useAuth } from './../stores/auth.js'
import { ref, reactive } from 'vue'
import router from './../router'

const auth = useAuth();

export default {
    props: {
        showSide: Boolean,
        cldap: String,
        conta: String,
        empresa: String,
        configuracao: String,
        sensor: String,
        camera: String,
        usuario: String,
        ativo: String,
        usuariogrupo: String,
        atual: String
    },
    data() {
        return {
            rotaAtual: '',
            subMenuLdap: false,
            subMenuSensor: false,
            subMenuCamera: false,
            subMenuUsuario: false,
            subMenuAtivo: false,
            subMenuConfiguracao: false
        }
    },
    methods: {
        setarRota() {
            this.rotaAtual = this.$route.fullPath
        },
        home() {
            this.$router.push('/')
        },
        fecharMenus() {
            this.subMenuUsuario = false
            this.subMenuLdap = false
            this.subMenuCamera = false
            this.subMenuSensor = false
            this.subMenuAtivo = false
            this.subMenuConfiguracao = false
        },
        mostrarSubMenuLdap() {
            this.fecharMenus();
            this.subMenuLdap = !this.subMenuLdap
        },
        mostrarSubMenuCamera() {
            this.fecharMenus();
            this.subMenuCamera = !this.subMenuCamera
        },
        mostrarSubMenuSensores() {
            this.fecharMenus();
            this.subMenuSensor = !this.subMenuSensor
        },
        mostrarSubMenuUsuario() {
            this.fecharMenus();
            this.subMenuUsuario = !this.subMenuUsuario
        },
        mostrarSubMenuAtivo() {
            this.fecharMenus();
            this.subMenuAtivo = !this.subMenuAtivo
        },
        mostrarSubMenuConfiguracao() {
            this.fecharMenus();
            this.subMenuConfiguracao = !this.subMenuConfiguracao
        }

    },
    created() {
        this.$watch(
            () => this.$route.fullPath,
            (toParams, previousParams) => {
                this.setarRota();
            }
        )
    },
    

}


</script>
<style scoped>
.title {
    color: white;
    font-size: 24px;
    margin-top: 5px;
}

.menu-items {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    margin-left: 6px;
}

.menu-items>* {
    margin-top: 10px;
}

.side-btn {
    border: none;
    padding: 16px 0px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: white;
    background-color: transparent;
}

.side-btn:focus {
    outline: none;
}

.side-btn.active {
    position: relative;
    background-color: white;
    color: teal;
    font-weight: 600;
    margin-left: 10px;
    border-radius: 30px 0 0 30px;
}

.side-btn.active::before {
    top: -30px;
}

.side-btn.active::after {
    bottom: -30px;
}

.side-btn.active::before,
.side-btn.active::after {
    position: absolute;
    content: "";
    right: 0;
    height: 30px;
    width: 30px;
    background-color: white;
}

.side-btn.active .link-container::before {
    top: -60px;
}

.side-btn.active .link-container::after {
    bottom: -60px;
    z-index: 99;
}

.side-btn.active .link-container::before,
.side-btn.active .link-container::after {
    position: absolute;
    content: "";
    right: 0px;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: rgb(55, 55, 55);
}
</style>
