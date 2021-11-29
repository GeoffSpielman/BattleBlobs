<template>
  <div class="outermostDiv">
    <h1 class="pageHeader">Host:</h1>
    <div id="hostContentDiv">
      <div id="statusColumn">
        <v-card class="statusCard" outlined elevation="2">
          <v-card-title class="justify-center py-1"> Game Status </v-card-title>
          <v-card-text class="text-center font-weight-medium text-h6 pt-0 pb-2">
            {{ gameStatus }}
          </v-card-text>
        </v-card>

        <v-card class="statusCard" outlined elevation="2">
          <v-card-title class="justify-center py-1"> Whose Turn? </v-card-title>
          <v-card-text class="text-center font-weight-medium text-h6 pt-1 pb-2">
            {{ whoseTurn }}
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
              key="player.key + skipBtn"
              @click="skipBtnClicked()"
              color="primary lighten-4"
              class="pr-3 pl-2 py-1 mr-2 text-none"
              style="color: black"
              ><v-icon dense class="pr-2"> mdi-debug-step-over</v-icon>Skip
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card class="statusCard" outlined elevation="2">
          <v-card-title class="justify-center py-1"> Round </v-card-title>
          <v-card-text class="text-center font-weight-medium text-h5 pt-0 pb-2">
            5
          </v-card-text>
        </v-card>
      </div>
      <div id="centerColumn">
        <v-simple-table class="mt-2" id="playersTable">
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-center">Status</th>
              <th class="text-center">Captain Num</th>
              <th class="text-center">Key</th>
              <th class="text-center">Override</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="player in playersList"
              :key="player.key"
              :style="{
                color:
                  player.status === PlayerStatus.Disconnected ? 'red' : 'black',
              }"
            >
              <td>{{ player.name }}</td>
              <td class="text-center">{{ player.status }}</td>
              <td class="text-center">{{ player.captainNum }}</td>
              <td class="text-center">{{ player.key }}</td>
              <td class="text-center">
                <v-btn
                  v-if="player.key !== myKey"
                  :key="player.key + 'removeBtn'"
                  @click="removeBtnClicked(player.key)"
                  small
                  color="error lighten-1"
                  class="py-1 text-none"
                  style="color: black"
                  ><v-icon dense class="pr-2"> mdi-delete-forever</v-icon>Remove
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <div id="hostButtonsRow">
          <v-btn elevation="2" color="success" @click="startBtnClicked">
            <v-icon dense class="pr-3"> mdi-play</v-icon>Start Game</v-btn
          >
          <v-btn elevation="2">
            <v-icon dense class="pr-3"> mdi-restore</v-icon>Reset Game (return
            players to lobby)</v-btn
          >
          <v-btn elevation="2" color="warning" @click="resetDatabaseClicked">
            <v-icon dense class="pr-3"> mdi-delete-alert</v-icon>Reset
            Database</v-btn
          >
        </div>
      </div>
      <div id="powerupConfigColumn">
        <v-card
          class="statusCard"
          outlined
          elevation="2"
          :disabled="gameStatus === GameStatus.GameInProgress"
        >
          <v-card-title class="justify-center py-1"> Map Size </v-card-title>
          <v-text-field
            class="pl-5 pr-5"
            type="number"
            outlined
            dense
            :rules="[
              mapSizeRules.greaterThanZero,
              mapSizeRules.lessThanTen,
              mapSizeRules.validInteger,
            ]"
            v-model="mapSizeVal"
            @change="mapSizeChanged()"
          ></v-text-field>
        </v-card>
        <v-card
          class="statusCard"
          outlined
          elevation="2"
          :disabled="gameStatus === GameStatus.GameInProgress"
        >
          <v-card-title class="justify-center py-1"> Powerups</v-card-title>
          <powerup-config
            v-for="(powerup, i) in powerupsList"
            :key="i"
            :powerupDetails="powerup"
          ></powerup-config>
        </v-card>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { PlayerEntry } from "@/models/interfaces";
import { PlayerStatus } from "@/models/enums";
import { GameStatus } from "@/models/enums";
import powerupConfig from "@/components/host/powerupConfig.vue";
import { PowerupEntry } from "@/models/interfaces";

@Component({
  name: "Host",
  components: {
    powerupConfig,
  },
})
export default class Host extends Vue {
  PlayerStatus = PlayerStatus;
  GameStatus = GameStatus;

  mapSizeVal: number = 16;

  powerupsList: PowerupEntry[] =
    this.$store.getters["powerupStore/getPowerupsList"];

  mounted() {
    this.$store.dispatch("playerStore/setMyStatus", PlayerStatus.Hosting);
    this.$store.dispatch("playerStore/setMyName", "== HOST ==");
    this.mapSizeVal = this.mapSize;
  }

  get playersList(): PlayerEntry[] {
    return this.$store.getters["playerStore/getPlayersList"];
  }

  get gameStatus(): string {
    return this.$store.getters["gameStore/getGameStatus"];
  }

  get mapSize(): number {
    return this.$store.getters["mapStore/getMapSize"];
  }
  get whoseTurn(): string {
    let whoseTurnPlayerKey = this.$store.getters["gameStore/getWhoseTurn"];
    if (whoseTurnPlayerKey === "TBD") {
      return "TBD";
    } else {
      return this.$store.getters["playerStore/getAliasUsingKey"](
        whoseTurnPlayerKey
      );
    }
  }

  get myKey(): string {
    return this.$store.getters["playerStore/getMyKey"];
  }

  skipBtnClicked() {
    console.log("skipped current player");
  }

  removeBtnClicked(playerKey: string) {
    this.$store.dispatch("playerStore/removePlayer", playerKey);
    if (this.gameStatus === GameStatus.GameInProgress) {
      this.$store.dispatch("gameStore/removeCurrentPlayer", playerKey);
    }
  }

  startBtnClicked() {
    console.log("start the game!");
    this.$store.dispatch("playerStore/addPlayersToGame");
    this.$store.dispatch("gameStore/setGameStatus", GameStatus.GameInProgress);
  }

  resetDatabaseClicked() {
    //TODO: add an 'are you sure' prompt
    this.$store.dispatch("playerStore/deleteAllPlayersExceptMe");
    this.$store.dispatch("lobbyStore/resetColoursInDatabase");
    this.$store.dispatch("lobbyStore/resetAliasesInDatabase");
    this.$store.dispatch(
      "gameStore/setGameStatus",
      GameStatus.WaitingOnPlayers
    );
    this.$store.dispatch("shipsStore/deleteAllShips");
    this.$store.dispatch("gameStore/setCurrentPlayersList", null);
    this.$store.dispatch("chatStore/deleteAllChats");
    this.$store.dispatch("gameStore/setWhoseTurn", "TBD");
  }

  mapSizeRules = {
    greaterThanZero: (value: number) => value >= 8 || "Minimum is 8",
    lessThanTen: (value: number) => value <= 20 || "Maximum is 20",
    validInteger: (value: number) =>
      Number.isInteger(Number(value)) || "Invalid integer",
  };

  mapSizeChanged() {
    if (
      this.mapSizeVal >= 8 &&
      this.mapSizeVal <= 20 &&
      Number.isInteger(Number(this.mapSizeVal))
    ) {
      this.$store.dispatch("mapStore/updateMapSize", Number(this.mapSizeVal));
    }
  }
}
</script>

<style scoped>
#hostContentDiv {
  display: flex;
  flex-direction: row;
  width: 90vw;
  height: 200px;
  flex-grow: 1;
  margin-left: auto;
  margin-right: auto;
}

#statusColumn {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-right: 50px;
}

#centerColumn {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

#powerupConfigColumn {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-left: 50px;
}

.statusCard {
  max-width: 100%;
  margin: 10px;
  border-radius: 10px;
}

#playersTable {
  overflow-y: auto;
}
#playersTable th {
  font-size: 12pt;
}

#playersTable td {
  height: 36px;
}

#hostButtonsRow {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
  height: 60px;
}
</style>
