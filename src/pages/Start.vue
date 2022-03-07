<template>
  <div class="outermostDiv">
    <div id="buttonsRow">
      <transition-group :name="transitionToUse" appear>
        <v-btn key="instructionsBtn" @click="instructionsClicked" x-large color="primary" class="mx-12 px-5" elevation="7" 
          ><v-icon class="pr-3"> mdi-information-outline</v-icon>Learn How to Play</v-btn
        >
        <v-btn key="playBtn" @click="lobbyClicked" x-large color="primary" class="mx-12 px-5" elevation="7"
          ><v-icon class="pr-3"> mdi-fast-forward</v-icon>Skip to Lobby</v-btn
        >
      </transition-group>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { PlayerStatus } from '@/models/enums'

@Component({
})
export default class Home extends Vue {
  
  get transitionToUse(){
    return this.$store.getters["clientSpecificStore/getStartPageButtonFade"];
  }

  instructionsClicked(){
    this.$store.dispatch("clientSpecificStore/setStartPageButtonFade", 'quickFade')
    this.$router.push('/instructions');
    
  }

  lobbyClicked(){
    this.$store.dispatch("clientSpecificStore/setStartPageButtonFade", 'quickFade')
    this.$router.push('/lobby').catch(() => {console.log("User tried to enter lobby without signing in. Redirecting to sign in page.")});
  }


 

  mounted(){
    this.$store.dispatch('playerStore/setMyStatus', PlayerStatus.StartScreen)
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