<template>
    
    <div id="individualPowerupOutermost">
    <v-card width="130" elevation="3" id="cardOutermost" :style="{order: displayDetails.displayOrder}">
        <p id="powerupName"> {{powerupDetails.name}} </p>
        <img id="iconImg" :src="displayDetails.iconPath" />
        <p id="countDisplay"> {{powerupDetails.remaining}} / {{powerupDetails.deployed}} </p>
    </v-card>
    <div id="popout">

    </div>
    </div>
  

</template>


<script lang="ts">
import { PowerupEntry } from "@/models/interfaces";
import { Component, Vue, Prop} from "vue-property-decorator";

@Component({
  name: "IndividualPowerup",
})
export default class IndividualPowerup extends Vue {
  @Prop({ required: true }) readonly powerupDetails!: PowerupEntry;

  get displayDetails(): {'iconPath': string; 'displayOrder': number} {
    switch(this.powerupDetails.name){
      case "Sneak-A-Peak":
        return {'iconPath': require("@/assets/game/sneak_a_peak.png"), 'displayOrder': 1};

      case "Umbrella":
        return {'iconPath': require("@/assets/game/umbrella.png"), 'displayOrder': 2};

      case "Big Shot":
        return {'iconPath': require("@/assets/game/missile.png"), 'displayOrder': 3};
      
      case "Move It Minor":
        return {'iconPath': require("@/assets/game/move_it_minor.png"), 'displayOrder': 4};

      case "Move It Major":
        return {'iconPath': require("@/assets/game/move_it_major.png"), 'displayOrder': 5};

      case "Uh-Oh":
        return {'iconPath': require("@/assets/game/uh_oh.png"), 'displayOrder': 6};
      
      default:
        return {'iconPath': 'ERROR', 'displayOrder': 50}
    }
  }
  


}
</script>

<style scoped>
#cardOutermost{
    text-align: center;
    margin-top: 5px;
    margin: auto;
}

#powerupName{
  font-weight: bold;
  font-size: 11pt;
  margin: 5px 0px 4px 0px;
}

#iconImg{
    width: 40px;
}
#countDisplay{
    font-size: 12pt;
    margin: 1px 0px 4px 0px;
}

#popout{
  position: relative;
  top: -102px;
  right:200px;
  width: 190px;
  height: 98px;
  background-color: red;
  margin-bottom: -98px;
}

</style>
