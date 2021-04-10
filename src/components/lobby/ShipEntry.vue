<template>
  <div id="shipsOutermost">
    <h2>Ships:</h2>
    <div id="shipBuildersRow">
      <single-ship-builder :whichShipAmI="1" @shipvalidupdate="childShipValidUpdate('left', ...arguments)"></single-ship-builder>
      <single-ship-builder :whichShipAmI="2" @shipvalidupdate="childShipValidUpdate('right', ...arguments)"></single-ship-builder>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Watch} from "vue-property-decorator";
import SingleShipBuilder from "@/components/lobby/SingleShipBuilder.vue";

@Component({
  name: "ShipEntry",
  components: { SingleShipBuilder},
})
export default class ShipEntry extends Vue {

  leftShipValid: boolean = false;
  rightShipValid: boolean = false;
  bothShipsValid: boolean = false;

  childShipValidUpdate(side: string, recVal: boolean){
    if (side === 'left'){
      this.leftShipValid = recVal;
    }
    else if (side === 'right'){
      this.rightShipValid = recVal;
    }
    this.bothShipsValid = this.rightShipValid && this.leftShipValid ? true: false;
  }

  @Watch('bothShipsValid')
  bothShipsValidChanged(newVal: boolean){
    this.$emit('shipsvalidupdate', newVal);
  }
}
</script>

<style scoped>
#shipsOutermost {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

#shipsOutermost h2 {
  font-size: 19px;
  font-weight: bold;
}
#shipBuildersRow {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  padding-left: 40px;
}
</style>