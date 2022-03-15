<template>
  <div id="currentPlayersTableOutermostDiv">
    <div id="titleRow">
      <h2>Current Players</h2>
      <div id="toggleArea">
        <p id="toggleLabel">
        Debug Mode
        </p>
        <v-switch
          v-model="debugMode"
          inset
          dense
        ></v-switch>
      </div>
    </div>
    <div id="tableArea">
      <v-simple-table id="activePlayersTable" fixed-header height="100%">
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-center">Status</th>     
            <th class="text-center">UID</th>
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
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { PlayerEntry } from "@/models/interfaces";
import { PlayerStatus } from "@/models/enums";
import { GameStatus } from "@/models/enums";

@Component({
  name: "CurrentPlayersTable",
  components: {},
})
export default class CurrentPlayersTable extends Vue {
  PlayerStatus = PlayerStatus;

  debugMode: boolean  = false;

  get playersList(): PlayerEntry[] {
    return this.$store.getters["playerStore/getPlayersList"];
  }

  get myKey(): string {
    return this.$store.getters["playerStore/getMyKey"];
  }

  removeBtnClicked(playerKey: string) {
    this.$store.dispatch("playerStore/removePlayer", playerKey);
    if (
      this.$store.getters["gameDataStore/getGameStatus"] ===
      GameStatus.GameInProgress
    ) {
      this.$store.dispatch("gameDataStore/removeCurrentPlayer", playerKey);
    }
  }
}
</script>

<style scoped>
#currentPlayersTableOutermostDiv {
  display: flex;
  flex-direction: column;
  width: 100%;
}

#titleRow {
  display: flex;
  flex-direction: row;
  height: 30px;
  justify-content: space-between;
}

#titleRow h2 {
  font-size: 20px;
  font-family: "Roboto", sans-serif;
  margin-left: 10px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
  padding-top: 1px;
}

#tableArea {
  display: flex;
  flex-grow: 1;
  overflow-y: auto;
  width: 100%;
}

#activePlayersTable {
  width: 100%;
  margin: 0px 0px 2px 5px;
}

#activePlayersTable th {
  font-size: 11.5pt;
}

#activePlayersTable td {
  height: 36px;
}

#toggleArea{
  display: none;/*flex;*/
  flex-direction: row;
  align-items: center;
}

#toggleLabel{
  margin: 0px 5px 0px 0px;
  font-size: 10pt;
}

#tableArea th{
  z-index: 1;
}
</style>
