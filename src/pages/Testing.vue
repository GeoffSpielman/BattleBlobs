<template>
  <div class="outermostDiv">
    <p class="leftLabel">Store State/Database:</p>
    <p style="width: 300px"><strong>Game Status:</strong> {{ gameStatus }}</p>
    <br />
    <v-card class="mx-auto" width="300">
      <v-list>
        <v-subheader>Players List</v-subheader>
        <v-list-item-group>
          <v-list-item v-for="player in playerList" :key="player.key">
            <v-list-item-content>
              <v-list-item-title v-text="player.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="removePlayerClicked(player.key)">
                <v-icon>mdi-minus-circle-outline</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <br />
    <hr style="width: 80%" />
    <p class="leftLabel">Client Controls:</p>

    <v-container fluid>
      <v-row justify="center">
        <v-col cols="4">
          <v-select
            :items="statusOptions"
            label="Game Status"
            outlined
            dense
            @change="userChangedGameStatus"
          ></v-select>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="2" align-self="center" style="text-align: right">
          Add to list:
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="itemEntry"
            :rules="rulesForTestList"
            counter="25"
            hint="It's time to get funky!"
          ></v-text-field>
        </v-col>
        <v-col cols="2" align-self="center">
          <v-btn @click="submitClicked" elevation="2" text>Submit</v-btn>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="2" align-self="center">
          <v-btn @click="clearListClicked" elevation="2" text>Clear List</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { PlayerEntry } from "@/interfaces/PlayerEntry";

@Component({
  name: "Testing",
})
export default class Testing extends Vue {
  statusOptions: string[] = ["Loading...", "Ready to Start", "Game has Begun"];

  itemEntry: string = "Tomato";
  rulesForTestList = [(val: string) => val.length <= 25 || "Max 25 characters"];

  get gameStatus(): string {
    return this.$store.getters.getGameStatus;
  }

  get playerList(): PlayerEntry[] {
    return this.$store.getters.getPlayersList;
  }

  removePlayerClicked(key: string){
    this.$store.dispatch("removePlayerFromList", key)
  }

  userChangedGameStatus(val: string) {
    this.$store.dispatch("setGameStatus", val);
  }

  submitClicked() {
    this.$store.dispatch("addPlayerToList", this.itemEntry);
    this.itemEntry = "";
  }

  clearListClicked() {
    this.$store.dispatch("clearPlayersList", null);
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
</style>
