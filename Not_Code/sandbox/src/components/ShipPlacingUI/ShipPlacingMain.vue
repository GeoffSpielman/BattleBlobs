<template>
  <div id="shipPlacingOutermost">
    <div id="shipRow">
      <ship-builder
        v-for="ship in ships"
        :key="ship.id"
        :ID="ship.id"
        :colour="ship.colour"
        :offsets="ship.offsets"
        :rowMin="ship.rowMin"
        :rowMax="ship.rowMax"
        :colMin="ship.colMin"
        :colMax="ship.colMax"
      >
      </ship-builder>
    </div>
    <div id="mainRow"></div>
  </div>
</template>

<script>
import ShipBuilder from "./ShipBuilder.vue";

export default {
  components: {
    "ship-builder": ShipBuilder,
  },
  data() {
    return {
      ships: [
        {
          id: 0,
          colour: "red",
          offsets: [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 3],
            [2, 1],
            [2, 2],
            [2, 3],
            [3, 1],
            [3, 3],
          ],
          rowMin: 0,
          rowMax: 0,
          colMin: 0,
          colMax: 0,
        },
        {
          id: 1,
          colour: "blue",
          offsets: [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 3],
            [2, 1],
            [2, 2],
            [2, 3],
            [3, 1],
            [3, 3],
          ],
          rowMin: 0,
          rowMax: 0,
          colMin: 0,
          colMax: 0,
        },
        {
          id: 2,
          colour: "green",
          offsets: [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 3],
            [2, 1],
            [2, 2],
            [2, 3],
            [3, 1],
            [3, 3],
          ],
          rowMin: 0,
          rowMax: 0,
          colMin: 0,
          colMax: 0,
        },
      ],
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0px;
}
#shipPlacingOutermost {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
#shipRow {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

#mainRow {
  background-color: lightblue;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
