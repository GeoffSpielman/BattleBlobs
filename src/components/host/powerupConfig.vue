<template>
  <div id="powerupConfigOutermost">
    <div id="powerupName" class="mb-1">{{ powerupName }}</div>
    <div id="picAndQty">
      <img id="iconImg" class="ml-3" :src="myIconPath" />
      <v-text-field class="powerupInput"
        type="number"
        outlined
        dense
        :rules="[rules.greaterThanZero, rules.lessThanTen, rules.validInteger]"
        v-model="deployedVal"
      ></v-text-field>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop, Mixins } from "vue-property-decorator";
import { PowerupIconPathMixin } from "@/mixins/PowerupIconPathMixin";

@Component({
  name: "PowerupConfig",
})
export default class PowerupConfig extends Mixins(PowerupIconPathMixin) {
  @Prop({ required: true }) readonly powerupName!: string;

  get myIconPath(): string {
    return this.iconPath(this.powerupName) || "Not good";
  }

  rules = {
    greaterThanZero: (value: number) => value >= 0 || "Minimum is 0",
    lessThanTen: (value: number) => value <= 10 || "Maximum is 10",
    validInteger: (value: number) =>
      Number.isInteger(Number(value)) || "Invalid integer",
  };
  
  get deployedVal(): number {
    return this.$store.getters["powerupStore/getDeployedCount"](this.powerupName);
  }
  set deployedVal(value: number) {
    if (value >=0 && value <= 10 && Number.isInteger(Number(value))){ 
    this.$store.dispatch("powerupStore/updatePowerupDeployed", {'powerupName': this.powerupName, 'newDeployedVal': Number(value)});
    }
    else{
      //ToDo someday (maybe) - emit an event so that the "start game" button is disabled until a valid number is input
    }
  }
}
</script>

<style scoped>
#powerupConfigOutermost {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 24px 65px;
}

#powerupName {
  grid-column: 1/2;
  grid-row: 1/2;
  justify-self: center;
  align-self: center;

  font-weight: bold;
  font-size: 11pt;
}

#picAndQty {
  grid-column: 1/2;
  grid-row: 2/3;
  display: flex;
  flex-direction: row;
}

#iconImg {
  width: 35px;
  height: 35px;
}

.powerupInput{
  margin: 0px 6px 0px 6px;
}

</style>
