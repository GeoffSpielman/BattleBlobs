<template>
  <div class="outermostDiv">
    <the-header></the-header>
    <v-container id="hostMainDiv">
      <v-row no-gutters>
        <v-col cols="3">
          <v-card class="mx-15 mt-4" max-width="100%" outlined elevation="2">
            <v-card-title class="justify-center pb-1"> Whose Turn? </v-card-title>
            <v-card-text class="text-center font-weight-medium text-h5 pt-0 pb-2">
              Garry
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
          <v-card class="mx-15 mt-4" max-width="100%" outlined elevation="2">
            <v-card-title class="justify-center pb-1"> Round </v-card-title>
            <v-card-text class="text-center font-weight-medium text-h5 pt-0">
              5
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="8">
          <v-simple-table class="mt-2">
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-center">Status</th>
                <th class="text-center">Key</th>
                <th class="text-center">Override</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="player in playersList" :key="player.key">
                <td>{{ player.name }}</td>
                <td class="text-center">{{ player.status }}</td>
                <td class="text-center">{{ player.key }}</td>
                <td class="text-center">
                  <v-btn
                    key="player.key + removeBtn"
                    @click="removeBtnClicked(player.key)"
                    color="error lighten-1"
                    class="pr-3 pl-2 py-1 text-none"
                    style="color: black"
                    ><v-icon dense class="pr-2"> mdi-delete-forever</v-icon
                    >Remove
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
          <v-row class="mt-10 justify-space-around">
            <v-btn elevation="2" color="success"> <v-icon dense class="pr-3" > mdi-play</v-icon>Start Game</v-btn>
            <v-btn elevation="2">  <v-icon dense class="pr-3" > mdi-restore</v-icon>Reset Game (return players to lobby)</v-btn>
          </v-row>
          <v-row class="mt-15 justify-space-around">
            <h4>Game Status: In Progress</h4>
          </v-row>
        </v-col>
        <v-col cols="1"> 
          Next Round:
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { PlayerEntry } from "@/models/interfaces";
import { PlayerStatus } from '@/models/enums'

@Component({
  name: "Host",
})
export default class Host extends Vue {
  
  mounted(){
    this.$store.dispatch('playerStore/setMyStatus', PlayerStatus.Hosting)
  }
  
  get playersList(): PlayerEntry[] {
    return this.$store.getters["playerStore/getPlayersList"];
  }

  skipBtnClicked() {
    console.log("skipped current player");
  }

  removeBtnClicked(playerKey: string) {
    this.$store.dispatch("playerStore/removePlayer", playerKey)
  }
}
</script>

<style scoped>
.outermostDiv {
  align-items: center;
}

#pageTitle {
  text-align: center;
  margin-top: 10px;
}

.leftLabel {
  width: 70%;
  margin-top: 10px;
}

#hostMainDiv {
  max-width: 100%;
  padding: 0px;
}
</style>
