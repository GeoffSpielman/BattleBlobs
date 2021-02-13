import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.use(VueRouter);

import MainMenuPage from './pages/MainMenu.vue'
import InstructionsPage from './pages/Instructions.vue'
import LobbyPage from './pages/Lobby.vue'
import GamePage from './pages/GameScreen.vue'
import NotFoundPage from './pages/NotFound.vue'

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: "/", component: MainMenuPage },
        { path: "/instructions", component: InstructionsPage},
        { path: "/lobby", component: LobbyPage},
        { path: "/game", component: GamePage},
        { path: "/:notFound(.*)", component: NotFoundPage}
    ],
});



new Vue({
    router: router,
    render: h => h(App),
}).$mount('#app')