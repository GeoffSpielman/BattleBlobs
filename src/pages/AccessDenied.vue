<template>
  <div id="AccessDeniedOutermost">
    <h1 class="pageHeader">Access Denied</h1>
    <v-img :src="require('@/assets/misc/notAuthorizedFingerWave.gif')" height="450px" contain></v-img>
    <h3 class="instructionHeader">
      If you are trying to <strong> play</strong> the game...
    </h3>
    <h3 class="instructionHeader">
      If you are trying to <strong> host</strong> the game...
    </h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "AccessDenied",
  components: {},
})
export default class AccessDenied extends Vue {

  
}
</script>

<style scoped>
#AccessDeniedOutermost {
  width: 100%;
  height: 100%;
}
/*
#contentColumm{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
*/
.instructionHeader{
  font-weight: normal;
}
</style>