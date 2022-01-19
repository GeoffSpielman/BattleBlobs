<template>
  <div id="gameMapOutermost">
    <div id="columnLabels">
      <p
        class="rowColLabel"
        v-for="i in mapSize"
        :key="i"
        :style="{
          color: hoveredColIdx !== i - 1 ? 'black' : 'red',
          fontSize: hoveredColIdx !== i - 1 ? '11pt' : '12pt',
        }"
      >
        {{ i }}
      </p>
    </div>
    <div id="rowLabels">
      <p
        class="rowColLabel"
        v-for="i in mapSize"
        :key="i"
        :style="{
          color: hoveredRowIdx !== i - 1 ? 'black' : 'red',
          fontSize: hoveredRowIdx !== i - 1 ? '11pt' : '12pt',
        }"
      >
        {{ alphabet[i - 1] }}
      </p>
    </div>
    <div id="mapArea" @mouseleave="mouseLeftMapArea()">
      <div class="mapRowDiv" v-for="(rowNum, rowIdx) in mapSize" :key="rowIdx">
        <map-square
          v-for="(colNum, colIdx) in mapSize"
          :key="rowNum + ',' + colNum"
          :squareData="mapData[rowIdx + ',' + colIdx]"
          @squareHovered="squareHovered"
          @powerupRevealed="showPowerupAnimation"
        >
        </map-square>
      </div>
    </div>
    <powerup-to-map-center
    :selectedSquareData="selectedSquareData"
    :mapCenterTop="mapCenterTop"
    :mapCenterLeft="mapCenterLeft"
    :showAnimation="showSelectedToCenterPowerupAnimation"
    @animationComplete="selectedToCenterAnimationComplete">
    
    </powerup-to-map-center>


  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MapSquare from "@/components/game/map/MapSquare.vue";
import powerupToMapCenter from "@/components/game/map/powerupToMapCenter.vue";
import { GridSquare, SelectedSquareData } from "@/models/interfaces";


@Component({
  name: "GameMap",
  components: { MapSquare, powerupToMapCenter},
})
export default class GameMap extends Vue {
  alphabet: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  hoveredRowIdx: number = -1;
  hoveredColIdx: number = -1;
  
  showSelectedToCenterPowerupAnimation: boolean = false;
  selectedSquareData: SelectedSquareData = {'top': -1, 'left': -1, 'width': -1};
  mapCenterTop: number = -1;
  mapCenterLeft: number = -1;

  get mapSize(): number {
    return this.$store.getters["mapStore/getMapSize"];
  }

  get mapData(): { [coords: string]: GridSquare } {
    return this.$store.getters["mapStore/getMapData"];
  }

  squareHovered(rowIdx: number, colIdx: number) {
    this.hoveredRowIdx = rowIdx;
    this.hoveredColIdx = colIdx;
  }

  mouseLeftMapArea() {
    this.hoveredRowIdx = -1;
    this.hoveredColIdx = -1;
  }

  showPowerupAnimation(payload: SelectedSquareData) {
    this.selectedSquareData = payload;
    let mapObj: DOMRect = document
      .getElementById("mapArea")!
      .getBoundingClientRect();
    this.mapCenterTop = mapObj.top + mapObj.height/2;
    this.mapCenterLeft = mapObj.left + mapObj.width/2;
    this. showSelectedToCenterPowerupAnimation = true;   
  }

  selectedToCenterAnimationComplete(){
    console.log("top level sees animation is finished");
    this.showSelectedToCenterPowerupAnimation = false;
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

  background-image: url("../../../assets/game/seaBackground.gif");
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
