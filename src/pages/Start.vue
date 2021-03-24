<template>
  <div class="outermostDiv">
    <div id="buttonsRow">
      <transition-group :name="transitionToUse" appear>
        <v-btn key="instructionsBtn" @click="changePage('/instructions')" x-large color="primary" class="mx-10 px-5" elevation="7"
          ><v-icon class="pr-3"> mdi-information-outline</v-icon>Learn How To
          Play</v-btn
        >
        <v-btn key="lobbyBtn" @click="changePage('/lobby')" x-large color="primary" class="mx-10 px-5" elevation="7"
          ><v-icon class="pr-3"> mdi-fast-forward</v-icon>Skip To Lobby</v-btn
        >
      </transition-group>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { playerStatus } from '@/models/enums'

@Component({
})
export default class Home extends Vue {
  
  get transitionToUse(){
    return this.$store.getters["clientSpecificStore/getStartPageButtonFade"];
  }


  changePage(pagePath: string){
    this.$router.push(pagePath);
    this.$store.dispatch("clientSpecificStore/setStartPageButtonFade", 'quickFade')
  }

  mounted(){
    this.$store.dispatch('playerStore/setMyStatus', playerStatus.StartScreen)
  }

  
}
</script>

<style scoped>
.outermostDiv {
  background-image: url("../assets/home/homepage_backdrop.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center bottom;
}

#buttonsRow {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  background-image: url("../assets/home/homepage.jpg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.initialFade-enter{
  opacity: 0;
}

.initialFade-enter-active {
  transition: opacity 2s;
  transition-delay: 3.2s;
}

.quickFade-enter{
  opacity: 0;
}

.quickFade-enter-active {
  transition: opacity 1.5s;
}

</style>