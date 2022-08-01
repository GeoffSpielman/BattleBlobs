<template>
  <div id="AccessDeniedOutermost">
    <h1 class="pageHeader">Access Denied</h1>
    <v-img :src="require('@/assets/misc/notAuthorizedFingerWave.gif')" height="400px" contain></v-img>
    <div id="textArea">
    <h3 class="instructionHeader">
      If you are trying to <strong> play</strong> the game...
    </h3>
    <p class="nextStepsExplanation">
        You Clusterfuck&trade; account is linked to the following email address: <code>{{getAuthEmail()}}</code>
        <br>
        Please provide this email address to your host and ask them to authorize you.
    </p>
    <h3 class="instructionHeader">
      If you are trying to <strong> host</strong> the game...
    </h3>
    <p class="nextStepsExplanation">
        Please contact Geoff Spielman.
    </p>
    </div>
    <v-btn id="tryAgainBtn" @click="tryAgainClicked"><v-icon class="pr-3"> mdi-sync</v-icon>Try Again</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "AccessDenied",
  components: {},
})
export default class AccessDenied extends Vue {

  getAuthEmail(): string{
    return this.$store.getters["clientSpecificStore/getAuthEmail"];
  }

  tryAgainClicked(){
    console.log("attempting to go to " + this.$store.getters["clientSpecificStore/getSignedInDestination"])
    this.$router.push({name: this.$store.getters["clientSpecificStore/getSignedInDestination"]}).catch(() => {console.log("User clicked 'Try Again' from the 'Access Denied' page but they are still not authroized.")});
  }
}
</script>

<style scoped>
#AccessDeniedOutermost {
  width: 100%;
  height: 100%;
  text-align: center;
}

#textArea{
  width: 65%;
  display: flex;
  flex-direction: column;
  margin: 30px auto 0px auto;
  text-align: left;
}

.instructionHeader{
  font-weight: normal;
  font-size: 18pt;
  margin-top: 10px;
}

.nextStepsExplanation{
  font-size: 14pt;
  margin-left: 18px;
}

#tryAgainBtn{
  margin-top: 20px;
}
</style>