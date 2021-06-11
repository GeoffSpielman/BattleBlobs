<template>
  <div id="individualPowerupOutermost">
    <v-card width="130" elevation="3" id="cardOutermost" @click="cardClicked">
      <p id="powerupName">{{ powerupDetails.name }}</p>
      <img id="iconImg" :src="myIconPath" />
      <p id="countDisplay">
        {{ powerupDetails.remaining }} / {{ powerupDetails.deployed }}
      </p>
    </v-card>
    <transition name="popOutTrans">
      <div id="popout" v-if="showInfo">
        I am information about the powerup
      </div>
    </transition>
  </div>
</template>


<script lang="ts">
import { PowerupEntry } from "@/models/interfaces";
import { Component, Vue, Prop, Mixins } from "vue-property-decorator";
import { PowerupIconPathMixin } from "@/mixins/PowerupIconPathMixin";

@Component({
  name: "IndividualPowerup",
})
export default class IndividualPowerup extends Mixins(PowerupIconPathMixin) {
  @Prop({ required: true }) readonly powerupDetails!: PowerupEntry;

  showInfo: boolean = false;

  get myIconPath(): string {
    return this.iconPath(this.powerupDetails.name);
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
  z-index: 2;
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
  background-color: rgba(240, 240, 240, 0.6);

  border: 1px solid silver;
  border-radius: 10px 2px 2px 10px;
  box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%),
    0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%) !important;
}

.popOutTrans-enter-active {
  animation: slide-in-info 0.4s ease-out;
  animation-fill-mode: backwards;
}
@keyframes slide-in-info {
  from {
    right: 60px;
    opacity: 0
  }
  to {
    right: 190px;
    opacity: 1;
  }
}

.popOutTrans-leave-active {
  animation: slide-out-info 0.4s ease-out;
  animation-fill-mode: backwards;
}
@keyframes slide-out-info {
  from {
    right: 190px;
    opacity: 1
  }
  to {
    right: 60px;
    opacity: 0;
  }
}

</style>
