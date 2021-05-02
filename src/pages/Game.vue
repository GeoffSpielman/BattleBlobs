<template>
  <div id="gameOutermost">
    <div id="chatContainer">
      <chat-window></chat-window>
    </div>
    <div id="mapContainer">
      <div id="mapSquare"><game-map></game-map></div>
    </div>

    <div id="powerupsContainer">powerups</div>
    <div id="playerDisplayContainer">who's turn?</div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { PlayerStatus } from "@/models/enums";
import ChatWindow from "@/components/game/chat/ChatWindow.vue";
import SoundboardBar from "@/components/game/SoundboardBar.vue";
import GameMap from "@/components/game/GameMap.vue";
import PowerupsDisplay from "@/components/game/PowerupsDisplay.vue";
import PlayersBar from "@/components/game/PlayersBar.vue";

@Component({
  name: "Game",
  components: {
    ChatWindow,
    SoundboardBar,
    GameMap,
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
#gameOutermost {
  display: grid;
  grid-template-columns: 25vw 1fr 150px;
  grid-template-rows: 1fr 110px;
  width: 100%;
  height: 100%;
}

#chatContainer {
  grid-column: 1/2;
  grid-row: 1/2;
}

#mapContainer {
  grid-column: 2/3;
  grid-row: 1/2;

  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

#powerupsContainer {
  grid-column: 3/4;
  grid-row: 1/2;
}

#playerDisplayContainer {
  grid-column: 1/4;
  grid-row: 2/3;
}

#mapSquare {
  aspect-ratio: 1;
  height: 100%;
}
</style>
