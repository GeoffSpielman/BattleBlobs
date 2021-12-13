<template>
  <div id="ConfigColumnOutermostDiv">
       <map-size-config></map-size-config>
        <v-card
          class="configColumnCard"
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
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GameStatus } from "@/models/enums";
import PowerupConfig from "@/components/host/PowerupConfig.vue";
import MapSizeConfig from "@/components/host/MapSizeConfig.vue"
import { PowerupEntry } from "@/models/interfaces";

@Component({
  name: "ConfigColumn",
  components: {
    PowerupConfig,
    MapSizeConfig,
  },
})
export default class ConfigColumn extends Vue {
  GameStatus = GameStatus;

  powerupsList: PowerupEntry[] =
    this.$store.getters["powerupStore/getPowerupsList"];

  get gameStatus(): string {
    return this.$store.getters["gameStore/getGameStatus"];
  }
}
</script>

<style scoped>

#ConfigColumnOutermostDiv {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
}

.configColumnCard {
  width: 150px;
  margin: 10px;
  border-radius: 10px;
}
</style>
