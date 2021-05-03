<template>
  <div id="gameMapOutermost">
    <div id="columnLabels">
      <p class="rowColLabel" v-for="i in mapSize" :key="i" :style="{color: hoveredColIdx !== (i - 1) ? 'black' : 'red'}">
        {{ i }}
      </p>
    </div>
    <div id="rowLabels">
      <p class="rowColLabel" v-for="i in mapSize" :key="i" :style="{color: hoveredRowIdx !== (i - 1) ? 'black' : 'red'}">
        {{ alphabet[i - 1] }}
      </p>
    </div>
    <div id="mapArea" @mouseleave="mouseLeftMapArea()">
      <div class="mapRowDiv" v-for="(rowNum, rowIdx) in mapSize" :key="rowIdx">
        <v-btn
          tile
          class="singleCell"
          v-for="(colNum, colIdx) in mapSize"
          :key="rowNum + ',' + colNum"
          :style="{
            visibility: map[rowIdx][colIdx] === 1 ? 'visible' : 'hidden',
          }"
          @click="mapTileClicked(rowIdx, colIdx)"
          @mouseover="mapTileHovered(rowIdx, colIdx)"
        >
        </v-btn>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "GameMap",
  components: {},
})
export default class GameMap extends Vue {
  mapSize: number = 16;
  alphabet: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  hoveredRowIdx: number = -1;
  hoveredColIdx: number = -1;

  map: number[][] = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  mapTileClicked(rowIdx: number, colIdx: number) {
    /*this.map[rowIdx][colIdx] = 0;*/
    let newRow: number[] = this.map[rowIdx].slice(0);
    newRow[colIdx] = 0;
    this.$set(this.map, rowIdx, newRow);
  }

  mapTileHovered(rowIdx: number, colIdx: number) {
    this.hoveredRowIdx = rowIdx;
    this.hoveredColIdx = colIdx;
  }

  mouseLeftMapArea() {
    this.hoveredRowIdx = -1;
    this.hoveredColIdx= -1;
  }
}
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
  display: flex;
  flex-direction: row;
}

.rowColLabel {
  flex-grow: 1;
  flex-basis: 1px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 11pt;
}

#rowLabels {
  grid-column: 1/2;
  grid-row: 2/3;
  display: flex;
  flex-direction: column;
}

#mapArea {
  grid-column: 2/3;
  grid-row: 2/3;
  display: flex;
  flex-direction: column;

  background-image: url("../../assets/game/seaBackground.gif");
  background-color: lightskyblue;
  background-size: cover;
}

.mapRowDiv {
  display: flex;
  flex-grow: 1;
  flex-direction: row;
}
.singleCell {
  flex-grow: 1;
  min-width: 10px !important;
  padding: 0px !important;
  height: 100% !important;
}
</style>
