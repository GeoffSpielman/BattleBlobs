<template>
  <v-app>
    <v-main class="outermostDiv">
      <the-header :startPageDisplay= "onStartPage"></the-header>
      <div id="pageContainingDiv">
        <router-view></router-view>
      </div>
      <the-footer :startPageDisplay= "onStartPage"></the-footer>
    </v-main>
  </v-app>
</template>

<script lang="ts">

import { Component, Vue, Watch } from "vue-property-decorator";
import {Route} from 'vue-router';
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";

@Component({
  name: "App",
  components: {
    TheHeader,
    TheFooter,
  },
})
export default class App extends Vue {

  onStartPage: boolean = true;

  @Watch('$route', { immediate: true})
   onRouteChange(newRoute: Route) {
     this.onStartPage = (newRoute.name) === "Start" ? true : false; 
    }

  created(){
    this.$store.dispatch('playerStore/getFirebaseDatabase')
    /*this.$store.dispatch('playerStore/intializeClient')*/
  }
}
</script>

<style>
*{
  box-sizing: border-box;
}

.v-main__wrap{
  display: flex;
  flex-direction: column;
}
.outermostDiv {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

#pageContainingDiv{
  flex-grow: 1;
}
</style>
