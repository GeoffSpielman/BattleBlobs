<template>
  <div class="outermostDiv">
    <div id="mainTopRow">
      <div id="chatAndSoundsColumn">
         <div id="soundboardContainer">
          <soundboard-bar></soundboard-bar>
        </div>
        <div id="chatContainer">
          <chat-window></chat-window>
        </div>
       
   
      </div>
      <div id="mapColumn">Map</div>
      <div id="powerupsColumn">Powerups</div>
    </div>
    <div id="playersBottomRow">Players</div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { PlayerStatus } from "@/models/enums";
import ChatWindow from "@/components/game/ChatWindow.vue";
import SoundboardBar from "@/components/game/SoundboardBar.vue"
import GameGrid from "@/components/game/GameGrid.vue";
import PowerupsDisplay from "@/components/game/PowerupsDisplay.vue";
import PlayersBar from "@/components/game/PlayersBar.vue";

@Component({
  name: "Game",
  components: {
    ChatWindow,
    SoundboardBar,
    GameGrid,
    PowerupsDisplay,
    PlayersBar,
  },
})
export default class Game extends Vue {
  mounted() {
    this.$store.dispatch("playerStore/setMyStatus", PlayerStatus.InGame);
  }
}
</script>

<style scoped>
.outermostDiv {
}

#mainTopRow {
  flex-grow: 1;
  display: flex;
}
#playersBottomRow {
  height: 120px;
  width: 100%;
}

#chatAndSoundsColumn {
  display: flex;
  width: 25vw;
  flex-direction: column;
}

#mapColumn {
  display: flex;
  flex-grow: 1;
}

#powerupsColumn {
  display: flex;
  width: 100px;
  background-color: blue;
}

#chatContainer {
  flex-grow: 1;
  height: 10px;
  width: 100%;
  display: flex;
}

#soundboardContainer{
  width: 100%;
  display: flex;
}
</style>
