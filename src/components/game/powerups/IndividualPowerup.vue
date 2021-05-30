<template>
  <div id="individualPowerupOutermost">
    <v-card width="130" elevation="3" id="cardOutermost" @click="cardClicked">
      <p id="powerupName">{{ powerupDetails.name }}</p>
      <img id="iconImg" :src="iconPath" />
      <p id="countDisplay">
        {{ powerupDetails.remaining }} / {{ powerupDetails.deployed }}
      </p>
    </v-card>
    <transition name="popOutTrans">
      <div id="popout" :style="{ display: showInfo ? 'block' : 'none' }">
        I am information about the powerup
      </div>
    </transition>
  </div>
</template>


<script lang="ts">
import { PowerupEntry } from "@/models/interfaces";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "IndividualPowerup",
})
export default class IndividualPowerup extends Vue {
  @Prop({ required: true }) readonly powerupDetails!: PowerupEntry;

  showInfo: boolean = false;

  get iconPath(): string {
    switch (this.powerupDetails.name) {
      case "Sneak-A-Peak":
        return require("@/assets/game/sneak_a_peak.png");

      case "Umbrella":
        return require("@/assets/game/umbrella.png");

      case "Big Shot":
        return require("@/assets/game/missile.png");

      case "Move It Minor":
        return require("@/assets/game/move_it_minor.png");

      case "Move It Major":
        return require("@/assets/game/move_it_major.png");

      case "Uh-Oh":
        return require("@/assets/game/uh_oh.png");

      default:
        return "ERROR";
    }
  }

  cardClicked() {
    this.showInfo = !this.showInfo;
  }
}
</script>

<style scoped>
#cardOutermost {
  text-align: center;
  margin-top: 5px;
  margin: auto;
}

#individualPowerupOutermost >>> .v-card--link:focus:before {
  opacity: 0 !important;
}

#powerupName {
  font-weight: bold;
  font-size: 11pt;
  margin: 5px 0px 4px 0px;
  padding-top: 2px;
}

#iconImg {
  width: 40px;
}
#countDisplay {
  font-size: 12pt;
  margin: 1px 0px 4px 0px;
}

#popout {
  position: relative;
  /* these must match */
  top: -104px;
  margin-bottom: -104px;
  /*  ****   */
  right: 190px;
  width: 200px;
  height: 100px;
  background-color: rgba(240, 240, 240, 0.5);

  border: 1px solid silver;
  border-radius: 10px 2px 2px 10px;
  box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%),
    0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%) !important;
}




/* tranisitons */
.popOutTrans-enter {
  right: 0px !important;
}

.popOutTrans-enter-active {
  right: 190px;
  transition: right 0.5s !important;
}

.popOutTrans-leave-active {
  transition: right 0.5s ease;
  right: 0px !important;
}

.popOutTrans-leave-to {
  height: 0px !important;
}
</style>
