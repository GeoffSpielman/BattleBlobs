<template>
  <transition name="footerTrans">
    <v-footer
      color="primary lighten-1"
      padless
      id="footerOutermost"
      v-if="startPageDisplay"
    >
      <div id="copyrightDiv" class="footerDiv pl-1">
        Copyright
        <v-icon dense color="white" class="px-1"> mdi-copyright</v-icon> 2021
        Geoff Spielman
      </div>
      <div id="poweredByDiv" class="footerDiv">
        Powered by:
        <a class="linkTag" href="https://vuejs.org/">
          <img class="linkImage" src="@/assets/home/vue_js_logo.png" /><img />
        </a>
        <a class="linkTag" href="https://firebase.google.com/">
          <img class="linkImage" src="@/assets/home/firebase_logo.png" /><img />
        </a>
        <a class="linkTag" href="https://vuetifyjs.com/en/">
          <img class="linkImage" src="@/assets/home/vuetify_logo.png" /><img />
        </a>
      </div>
      <div id="imageCreditsDiv" class="footerDiv">
        <v-btn
          dense
          color="#e3f2fd"
          class="text-none"
          height="31px"
          @click="imageCreditsBtnClicked()"
        >
          Image Credits
        </v-btn>
      </div>
      <div id="sourceCodeDiv" class="footerDiv">
        Source code:
        <a class="linkTag" href="https://github.com/GeoffSpielman/BattleBlobs">
          <img id="githubImage" src="@/assets/home/github_logo.png" /><img />
        </a>
      </div>
    </v-footer>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class HomeFooter extends Vue {
  @Prop({ required: true, type: Boolean })
  readonly startPageDisplay: boolean = true;

  imageCreditsBtnClicked() {
    this.$router.push("/imageCredits");
  }
}
</script>

<style scoped>
#footerOutermost {
  justify-content: space-between;
  height: 37px;
}
.footerDiv {
  color: white;
  display: flex;
  align-items: center;
}

.linkTag {
  display: flex;
  align-items: center;
  justify-content: center;
}
.linkImage {
  height: 31px;
  border-radius: 15px;
  background-color: #e3f2fd;
  padding: 2px 8px;
  margin: 3px 0px 3px 10px;
}

.linkImage:hover {
  background-color: white;
}

#githubImage {
  height: 31px;
  margin: 3px 5px 3px 7px;
}

#githubImage:hover {
  background-color: #64b5f6;
}

/* tranisitons */
.footerTrans-enter{
  height: 0px !important;
}

.footerTrans-enter-active{
  height: 37px;
  transition: height 0.5s !important;
}

.footerTrans-leave-active{
  transition: height 0.5s ease-in;
  height: 0px !important;
}

.footerTrans-leave-to{
  height: 0px !important;
}
</style>