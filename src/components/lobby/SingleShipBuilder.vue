<template>
  <div id="shipBuilderOutermost">
    <div id="buttonGrid">
      <div
        v-for="(rowArray, rowIdx) in canvasGrid"
        :key="rowIdx"
        class="rowDiv"
      >
        <v-btn
          v-for="(val, colIdx) in rowArray"
          :key="colIdx"
          @click="gridButtonClicked(rowIdx, colIdx)"
          :style="{
            backgroundColor:
              canvasGrid[rowIdx][colIdx] === true ? shipColour : '#f9f9f9',
          }"
          min-width="50px"
          width="50px"
          height="50px"
          tile
        >
        </v-btn>
      </div>
    </div>
    <h3 id="outputStatement" :class="{confirmationText: shipValid}">{{ shipStatement }}</h3>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {validateShipDesign} from "@/algorithms/validateShipDesign"

@Component({
  name: "SingleShipBuilder",
})
export default class SingleShipBuilder extends Vue {
  numSegsInShip: number = 9;
  shipValid: boolean = false;

  canvasGrid: boolean[][] = [
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
  ];

  shipOffsets: number[][] = [];
  shipStatement: string = "0/" + this.numSegsInShip + " segments built";

  get shipColour(): string {
    return this.$store.getters["clientSpecificStore/getSelectedColourHex"];
  }

  gridButtonClicked(rowIdx: number, colIdx: number) {
    this.canvasGrid[rowIdx].splice(colIdx, 1, !this.canvasGrid[rowIdx][colIdx]);

    const entryInOffsets: boolean = this.shipOffsets.some(
      (entry) => entry[0] === rowIdx && entry[1] === colIdx
    );

    //clicked square not in offsets already
    if (this.canvasGrid[rowIdx][colIdx] && !entryInOffsets) {
      this.shipOffsets.push([rowIdx, colIdx]);

      //remove deselected square
    } else if (!this.canvasGrid[rowIdx][colIdx] && entryInOffsets) {
      this.shipOffsets = this.shipOffsets.filter(
        (entry) => !(entry[0] === rowIdx && entry[1] === colIdx)
      );
    } else {
      console.log(
        "ERROR: shipOffsets is out of sync with canvasGrid. Are both being re-initialized properly?"
      );
      return;
    }
    //determine statement under ship
    if (this.shipOffsets.length < this.numSegsInShip) {
        this.shipStatement = this.shipOffsets.length + "/" + this.numSegsInShip + " segments built";
        this.shipValid = false;
    } else if (this.shipOffsets.length > this.numSegsInShip) {
        this.shipStatement = "Ship is too big! Please remove " + (this.shipOffsets.length - this.numSegsInShip) + " segments";
        this.shipValid = false;
    } else {
      let validationResult = validateShipDesign(this.shipOffsets, this.numSegsInShip);
      this.shipStatement = validationResult.message;
      this.shipValid = validationResult.valid;
    }
  }
}
</script>

<style scoped>
#shipBuilderOutermost {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

#buttonGrid {
  display: flex;
  flex-direction: column;
}

.rowDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.selectedGridBtn {
  background-color: yellow !important;
}

#outputStatement {
  margin-top: 20px;
  text-align: center;
  font-weight: normal;
  font-size: 16px;
}

.confirmationText{
  color: darkgreen;
  text-shadow: 0px 3px 8px #7dd481;
}
</style>