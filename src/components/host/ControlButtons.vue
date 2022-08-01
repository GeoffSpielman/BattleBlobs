<template>
  <div id="ControlsButtonsOutermostDiv">
    <v-btn elevation="2" color="success" @click="startBtnClicked">
      <v-icon dense class="pr-3"> mdi-play</v-icon>Start Game</v-btn
    >
    <v-btn elevation="2">
      <v-icon dense class="pr-3"> mdi-restore</v-icon>Reset Game (return players
      to lobby)</v-btn
    >
    <v-btn elevation="2" color="warning" @click="resetDatabaseClicked">
      <v-icon dense class="pr-3"> mdi-delete-alert</v-icon>Reset Database</v-btn
    >
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GameStatus } from "@/models/enums";

@Component({
  name: "ControlsButtons",
  components: {},
})
export default class ControlsButtons extends Vue {
  startBtnClicked() {
    console.log("start the game!");
    //this.$store.dispatch("playerStore/addPlayersToGame");
    this.$store.dispatch("mapStore/initializeMap");
    this.$store.dispatch("gameDataStore/setGameStatus", GameStatus.GameInProgress);
  }

  resetDatabaseClicked() {
    //TODO: add an 'are you sure' prompt
    this.$store.dispatch("playerStore/deleteAllPlayersExceptMe");
    this.$store.dispatch("lobbyStore/resetColoursInDatabase");
    this.$store.dispatch("lobbyStore/resetAliasesInDatabase");
    this.$store.dispatch("gameDataStore/setGameStatus", GameStatus.WaitingOnPlayers
    );
    this.$store.dispatch("shipsStore/deleteAllShips");
    this.$store.dispatch("gameDataStore/setCurrentPlayersList", null);
    this.$store.dispatch("chatStore/deleteAllChats");
    this.$store.dispatch("gameDataStore/setWhoseTurn", "TBD");
    this.$store.dispatch("mapStore/eraseMap");
  }
}
</script>

<style scoped>
#ControlsButtonsOutermostDiv {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 10px;
}
</style>
