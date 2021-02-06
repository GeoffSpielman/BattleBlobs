import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import MainMenuPage from './pages/MainMenu.vue'
import InstructionsPage from './pages/Instructions.vue'
import LobbyPage from './pages/Lobby.vue'
import GamePage from './pages/GameScreen.vue'
import NotFoundPage from './pages/NotFound.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: MainMenuPage },
        { path: "/instructions", component: InstructionsPage},
        { path: "/lobby", component: LobbyPage},
        { path: "/game", component: GamePage},
        { path: "/:notFound(.*)", component: NotFoundPage}
    ],
});


const app = createApp(App);
app.use(router)
app.mount('#app');
