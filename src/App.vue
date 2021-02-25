<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "App"
})
export default class App extends Vue {
  //name: 'App';
}
</script>

<style>
*{
  box-sizing: border-box;
}
.outermostDiv {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
