<template>
  <div id="gameMapOutermost">
    <div id="columnLabels">1 2 3 4 5 6</div>
    <div id="rowLabels">A</div>
    <div id="mapArea"></div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "GameMap",
  components: {},
})
export default class GameMap extends Vue {}
</script>

<style scoped>
#gameMapOutermost {
  display: grid;
  grid-template-columns: 20px 1fr;
  grid-template-rows: 20px 1fr;
  width: 100%;
  height: 100%;
}

#columnLabels {
  grid-column: 2/3;
  grid-row: 1/2;
  background-color: green;
}

#rowLabels{
  grid-column: 1/2;
  grid-row: 2/3;
  background-color: yellow;
}

#mapArea{
  grid-column: 2/3;
  grid-row: 2/3;
  background-color: rebeccapurple;
}

</style>
