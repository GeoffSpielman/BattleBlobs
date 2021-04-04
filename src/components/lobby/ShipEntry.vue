<template>
  <div id="shipsOutermost">
      <h2>Ships:</h2>
      <div id="shipBuildersRow">
        <div class="builderContainer">
          <single-ship-builder></single-ship-builder>
        </div>
        <div class="builderContainer">
          <single-ship-builder></single-ship-builder>
        </div>
      </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SingleShipBuilder from "@/components/lobby/SingleShipBuilder.vue";


@Component({
  name: "ShipEntry",
  components: {SingleShipBuilder}
})
export default class ShipEntry extends Vue {
  
}
</script>

<style scoped>
#shipsOutermost {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

#shipsOutermost h2{
  font-size: 19px;
  font-weight: bold;
}
#shipBuildersRow{
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}

.builderContainer{
  flex-grow: 1;
  display: flex;
}

</style>