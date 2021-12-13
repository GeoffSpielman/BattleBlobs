<template>
  <div id="hostStatusColumOuterMost">
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
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GameStatus } from "@/models/enums";

@Component({
  name: "StatusColumn",
  components: {},
})
export default class StatusColumn extends Vue {
  GameStatus = GameStatus;

  get gameStatus(): string {
    return this.$store.getters["gameStore/getGameStatus"];
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

  skipBtnClicked() {
    console.log("skipped current player");
  }
}
</script>

<style scoped>
#hostStatusColumOuterMost {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-end;
}

.statusCard {
  width: 170px;
  margin: 10px;
  border-radius: 10px;
}
</style>
