import { createApp } from 'vue'

import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import ShipPlacingMain from "./components/ShipPlacingUI/ShipPlacingMain.vue"
import NotFound from "./components/NotFound.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/ShipPlacing", component: ShipPlacingMain},
        {path: "/:notFound(.*)", component: NotFound}
    ]
});

const app = createApp(App)
app.use(router)
app.mount("#app")
