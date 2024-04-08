import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuth } from './../stores/auth.js'
const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
        meta: {
            auth: false
        }
    },
    {
        path: '/',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
        meta: {
            auth: true
        },
        children: [
            {
                path: '/',
                name: 'overview',
                component: () => import(/* webpackChunkName: "overview" */ '../views/Overview.vue'),
                meta: { auth: true }
            },
            {
                path: '/usuarios',
                name: 'usuarios',
                component: () => import(/* webpackChunkName: "usuarios" */ '../views/usuarios/ListUsuarios.vue'),
                meta: { auth: true }
            },
            {
                path: '/create-usuario',
                name: 'create-usuario',
                component: () => import(/* webpackChunkName: "create-usuario" */ '../views/usuarios/CreateUsuario.vue'),
                meta: { auth: true }
            },
            {
                path: '/details-usuario/:id',
                name: 'details-usuario',
                component: () => import(/* webpackChunkName: "details-usuario" */ '../views/usuarios/DetailsUsuario.vue'),
                meta: { auth: true }
            },
            {
                path: '/perfil',
                name: 'perfil',
                component: () => import(/* webpackChunkName: "perfil" */ '../views/perfil/DetailsPerfil.vue'),
                meta: { auth: true }
            },
            {
                path: '/add-usuario-grupo',
                name: 'add-usuario-grupo',
                component: () => import(/* webpackChunkName: "add-usuario-grupo" */ '../views/usuarios/AddUsuarioGrupo.vue'),
                meta: { auth: true }
            },
            {
                path: '/contas',
                name: 'contas',
                component: () => import(/* webpackChunkName: "contas" */ '../views/contas/ListContas.vue'),
                meta: { auth: true }
            },
            {
                path: '/create-conta',
                name: 'create-conta',
                component: () => import(/* webpackChunkName: "create-conta" */ '../views/contas/CreateConta.vue'),
                meta: { auth: true }
            },
            {
                path: '/details-conta/:id',
                name: 'details-conta',
                component: () => import(/* webpackChunkName: "details-conta" */ '../views/contas/DetailsConta.vue'),
                meta: { auth: true }
            },
            {
                path: '/empresas',
                name: 'empresas',
                component: () => import(/* webpackChunkName: "empresas" */ '../views/empresas/ListEmpresas.vue'),
                meta: { auth: true }
            },
            {
                path: '/create-empresa',
                name: 'create-empresa',
                component: () => import(/* webpackChunkName: "create-empresa" */ '../views/empresas/CreateEmpresa.vue'),
                meta: { auth: true }
            },
            {
                path: '/details-empresa/:id',
                name: 'details-empresa',
                component: () => import(/* webpackChunkName: "details-empresa" */ '../views/empresas/DetailsEmpresa.vue'),
                meta: { auth: true }
            },
            {
                path: '/grupousuarios',
                name: 'grupousuarios',
                component: () => import(/* webpackChunkName: "grupousuarios" */ '../views/grupousuarios/ListGrupoUsuarios.vue'),
                meta: { auth: true }
            },
            {
                path: '/create-grupousuario',
                name: 'create-grupousuario',
                component: () => import(/* webpackChunkName: "create-grupousuario" */ '../views/grupousuarios/CreateGrupoUsuario.vue'),
                meta: { auth: true }
            },
            {
                path: '/details-grupousuario/:id',
                name: 'details-grupousuario',
                component: () => import(/* webpackChunkName: "details-grupousuario" */ '../views/grupousuarios/DetailsGrupoUsuario.vue'),
                meta: { auth: true }
            },
            {
                path: '/ldaps/:tipo/',
                name: 'ldaps',
                component: () => import(/* webpackChunkName: "ldaps" */ '../views/ldaps/ListLdaps.vue'),
                meta: { auth: true }
            },
            {
                path: '/create-ldap/:tipo',
                name: 'create-ldap',
                component: () => import(/* webpackChunkName: "create-ldap" */ '../views/ldaps/CreateLdap.vue'),
                meta: { auth: true }
            },
            {
                path: '/details-ldap/:tipo/:id',
                name: 'details-ldap',
                component: () => import(/* webpackChunkName: "details-ldap" */ '../views/ldaps/DetailsLdap.vue'),
                meta: { auth: true }
            },

            {
                path: '/sensores',
                name: 'sensores',
                component: () => import(/* webpackChunkName: "sensores" */ '../views/sensores/ListSensores.vue'),
                meta: { auth: true }
            },
            {
                path: '/create-sensor',
                name: 'create-sensor',
                component: () => import(/* webpackChunkName: "create-sensor" */ '../views/sensores/CreateSensor.vue'),
                meta: { auth: true }
            },
            {
                path: '/details-sensor/:id',
                name: 'details-sensor',
                component: () => import(/* webpackChunkName: "details-sensor" */ '../views/sensores/DetailsSensor.vue'),
                meta: { auth: true }
            },
            {
                path: '/gruposensores',
                name: 'gruposensores',
                component: () => import(/* webpackChunkName: "gruposensores" */ '../views/gruposensores/ListGrupoSensores.vue'),
                meta: { auth: true }
            },
            {
                path: '/create-gruposensor/',
                name: 'create-gruposensor',
                component: () => import(/* webpackChunkName: "create-gruposensor" */ '../views/gruposensores/CreateGrupoSensor.vue'),
                meta: { auth: true }
            },
            {
                path: '/details-gruposensor/:id',
                name: 'details-gruposensor',
                component: () => import(/* webpackChunkName: "details-gruposensor" */ '../views/gruposensores/DetailsGrupoSensor.vue'),
                meta: { auth: true }
            },
            {
                path: '/tiposensores',
                name: 'tiposensores',
                component: () => import(/* webpackChunkName: "tiposensores" */ '../views/tiposensores/ListTipoSensor.vue'),
                meta: { auth: true }
            },
            {
                path: '/create-tiposensor',
                name: 'create-tiposensor',
                component: () => import(/* webpackChunkName: "create-tiposensor" */ '../views/tiposensores/CreateTipoSensor.vue'),
                meta: { auth: true }
            },
            {
                path: '/details-tiposensor/:id',
                name: 'details-tiposensor',
                component: () => import(/* webpackChunkName: "details-tiposensor" */ '../views/tiposensores/DetailsTipoSensor.vue'),
                meta: { auth: true }
            },
            {
                path: '/cameras',
                name: 'cameras',
                component: () => import(/* webpackChunkName: "cameras" */ '../views/cameras/ListCameras.vue'),
                meta: { auth: true }
            },
            {
                path: '/create-camera',
                name: 'create-camera',
                component: () => import(/* webpackChunkName: "create-camera" */ '../views/cameras/CreateCamera.vue'),
                meta: { auth: true }
            },
            {
                path: '/details-camera/:id',
                name: 'details-camera',
                component: () => import(/* webpackChunkName: "details-camera" */ '../views/cameras/DetailsCamera.vue'),
                meta: { auth: true }
            },
            {
                path: '/grupocameras',
                name: 'grupocameras',
                component: () => import(/* webpackChunkName: "grupocameras" */ '../views/grupocameras/ListGrupoCameras.vue'),
                meta: { auth: true }
            },
            {
                path: '/create-grupocamera',
                name: 'create-grupocamera',
                component: () => import(/* webpackChunkName: "create-grupocamera" */ '../views/grupocameras/CreateGrupoCamera.vue'),
                meta: { auth: true }
            },
            {
                path: '/details-grupocamera/:id',
                name: 'details-grupocamera',
                component: () => import(/* webpackChunkName: "details-camera" */ '../views/grupocameras/DetailsGrupoCamera.vue'),
                meta: { auth: true }
            },
            {
                path: '/ativos',
                name: 'ativos',
                component: () => import(/* webpackChunkName: "ativos" */ '../views/ativos/ListAtivo.vue'),
                meta: { auth: true }
            },
            {
                path: '/create-ativo',
                name: 'create-ativo',
                component: () => import(/* webpackChunkName: "create-ativo" */ '../views/ativos/CreateAtivo.vue'),
                meta: { auth: true }
            },
            {
                path: '/details-ativo/:id',
                name: 'details-ativo',
                component: () => import(/* webpackChunkName: "details-ativo" */ '../views/ativos/DetailsAtivo.vue'),
                meta: { auth: true }
            },
            {
                path: '/tipoativos',
                name: 'tipoativos',
                component: () => import(/* webpackChunkName: "tipoativos" */ '../views/tipoativos/ListTipoAtivo.vue'),
                meta: { auth: true }
            },
            {
                path: '/create-tipoativo',
                name: 'create-tipoativo',
                component: () => import(/* webpackChunkName: "create-tipoativo" */ '../views/tipoativos/CreateTipoAtivo.vue'),
                meta: { auth: true }
            },
            {
                path: '/details-tipoativo/:id',
                name: 'details-tipoativo',
                component: () => import(/* webpackChunkName: "details-tipoativo" */ '../views/tipoativos/DetailsTipoAtivo.vue'),
                meta: { auth: true }
            },
            {
                path: '/grupoativos',
                name: 'grupoativos',
                component: () => import(/* webpackChunkName: "grupoativos" */ '../views/grupoativos/ListGrupoAtivo.vue'),
                meta: { auth: true }
            },
            {
                path: '/create-grupoativo',
                name: 'create-grupoativo',
                component: () => import(/* webpackChunkName: "create-grupoativo" */ '../views/grupoativos/CreateGrupoAtivo.vue'),
                meta: { auth: true }
            },
            {
                path: '/details-grupoativo/:id',
                name: 'details-grupoativo',
                component: () => import(/* webpackChunkName: "details-grupoativo" */ '../views/grupoativos/DetailsGrupoAtivo.vue'),
                meta: { auth: true }
            },
            {
                path: '/lista-customizada',
                name: 'lista-customizada',
                component: () => import(/* webpackChunkName: "lista-customizada" */ '../views/configuracoes/listacustomizada/ListaCustomizada.vue'),
                meta: { auth: true }
            },
            {
                path: '/details-lista/:lista/:id',
                name: 'details-lista',
                component: () => import(/* webpackChunkName: "details-lista" */ '../views/configuracoes/listacustomizada/DetailsListaCustomizada.vue'),
                meta: { auth: true }
            },
            {
                path: '/emailintegracao',
                name: 'emailintegracao',
                component: () => import(/* webpackChunkName: "emailintegracao" */ '../views/configuracoes/integracaoemail/ListIntegracaoEmail.vue'),
                meta: { auth: true }
            },
            {
                path: '/create-integracaoemail/',
                name: 'create-integracaoemail',
                component: () => import(/* webpackChunkName: "create-integracaoemail" */ '../views/configuracoes/integracaoemail/CreateIntegracaoEmail.vue'),
                meta: { auth: true }
            },
            {
                path: '/details-integracao/:id',
                name: 'details-integracao',
                component: () => import(/* webpackChunkName: "details-integracao" */ '../views/configuracoes/integracaoemail/DetailsIntegracaoEmail.vue'),
                meta: { auth: true }
            },
            {
                path: '/mensagemintegracao',
                name: 'mensagemintegracao',
                component: () => import(/* webpackChunkName: "mensagemintegracao" */ '../views/configuracoes/integracaomensagem/ListIntegracaoMensagem.vue'),
                meta: { auth: true }
            },
            {
                path: '/create-integracaomensagem/',
                name: 'create-integracaomensagem',
                component: () => import(/* webpackChunkName: "create-integracaomensagem" */ '../views/configuracoes/integracaomensagem/CreateIntegracaoMensagem.vue'),
                meta: { auth: true }
            },
            {
                path: '/details-integracaomensagem/:id',
                name: 'details-integracaomensagem',
                component: () => import(/* webpackChunkName: "details-integracaomensagem" */ '../views/configuracoes/integracaomensagem/DetailsIntegracaoMensagem.vue'),
                meta: { auth: true }
            },
            {
                path: '/notificacoes',
                name: 'notificacoes',
                component: () => import(/* webpackChunkName: "notificacoes" */ '../views/configuracoes/notificacoes/ListNotificacoes.vue'),
                meta: { auth: true }
            },
            {
                path: '/details-notificacao/:id',
                name: 'details-notificacao',
                component: () => import(/* webpackChunkName: "details-notificacao" */ '../views/configuracoes/notificacoes/DetailsNotificacao.vue'),
                meta: { auth: true }
            },
            {
                path: '/create-notificacao/',
                name: 'create-notificacao',
                component: () => import(/* webpackChunkName: "create-notificacao" */ '../views/configuracoes/notificacoes/CreateNotificacao.vue'),
                meta: { auth: true }
            },
            {
                path: '/monitoriot',
                name: 'monitoriot',
                component: () => import(/* webpackChunkName: "monitoriot" */ '../views/configuracoes/monitoriot/ListMonitorIot.vue'),
                meta: { auth: true }
            },
            {
                path: '/create-monitoriot',
                name: 'create-monitoriot',
                component: () => import(/* webpackChunkName: "create-monitoriot" */ '../views/configuracoes/monitoriot/CreateMonitorIot.vue'),
                meta: { auth: true }
            },
            {
                path: '/details-monitoriot/:id',
                name: 'details-monitoriot',
                component: () => import(/* webpackChunkName: "details-monitoriot" */ '../views/configuracoes/monitoriot/DetailsMonitorIot.vue'),
                meta: { auth: true }
            },
            {
                path: '/gatewayiot',
                name: 'gatewayiot',
                component: () => import(/* webpackChunkName: "gatewayiot" */ '../views/configuracoes/gatewayiot/ListGatewayIot.vue'),
                meta: { auth: true }
            },
            {
                path: '/create-gatewayiot',
                name: 'create-gatewayiot',
                component: () => import(/* webpackChunkName: "create-gatewayiot" */ '../views/configuracoes/gatewayiot/CreateGatewayIot.vue'),
                meta: { auth: true }
            },
            {
                path: '/details-gatewayiot/:id',
                name: 'details-gatewayiot',
                component: () => import(/* webpackChunkName: "details-gatewayiot" */ '../views/configuracoes/gatewayiot/DetailsGatewayIot.vue'),
                meta: { auth: true }
            },
        ]

    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    if (to.meta?.auth) {
        const auth = useAuth()
        if (auth.token) {
            const isAutenticated = await auth.checkToken()
            if (isAutenticated) {
                next()
            } else {
                next({ name: 'login' })
            }
        } else {
            next({ name: 'login' })
        }
    } else {
        next()
    }
})

export default router
