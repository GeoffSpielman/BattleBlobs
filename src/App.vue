<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';


export default Vue.extend({
  name: 'App',

  

  data: () => ({
    //
  }),
});
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
