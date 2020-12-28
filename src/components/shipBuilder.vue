<template>
  <div id="outermost">
    <div id="buttonGrid">
      <div
        v-for="(rowArray, rowIdx) in canvasGrid"
        :key="rowIdx"
        class="rowDiv"
      >
        <button
          v-for="(btn, colIdx) in rowArray"
          :key="btn"
          @click="gridButtonClicked(rowIdx, colIdx)"
          :class="{
            gridBtn: true,
            selectedGridBtn: canvasGrid[rowIdx][colIdx],
          }"
        >
          {{ rowIdx + ", " + colIdx }}
        </button>
      </div>
    </div>
    <p id="outputStatement">{{ shipStatement }}</p>
  </div>
</template>

<script>
export default {
  props: {
    numSegsInShip: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      canvasGrid: [
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
      ],
      shipOffsets: [],
      shipStatement: "0/" + this.numSegsInShip + " segments built",
    };
  },
  methods: {
    gridButtonClicked(rowIdx, colIdx) {
      this.canvasGrid[rowIdx][colIdx] = !this.canvasGrid[rowIdx][colIdx];

      const entryInOffsets = this.shipOffsets.some(
        (entry) => entry[0] === rowIdx && entry[1] === colIdx
      );

      if (this.canvasGrid[rowIdx][colIdx] && !entryInOffsets) {
        this.shipOffsets.push([rowIdx, colIdx]);
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

      if (this.shipOffsets.length < this.numSegsInShip) {
        this.shipStatement = 
          this.shipOffsets.length +
          "/" +
          this.numSegsInShip +
          " segments built";
      } else if (this.shipOffsets.length > this.numSegsInShip) {
        this.shipStatement =
          "Ship it too big! Please remove " +
          (this.shipOffsets.length - this.numSegsInShip) +
          " segments";
      } else {
        //'traversed index' and 'traversed segments of ship'
        let travIdx = 0;
        let travSegs = [this.shipOffsets[0]];

        while (travIdx < travSegs.length) {
          let curSeg = travSegs[travIdx];

          //possible to go 'up'  AND 'up' isin't already in the travSegs list AND 'up' is part of the ship
          if (
            curSeg[0] > 0 &&
            !travSegs.some(
              (entry) => entry[0] === curSeg[0] - 1 && entry[1] === curSeg[1]
            ) &&
            this.shipOffsets.some(
              (entry) => entry[0] === curSeg[0] - 1 && entry[1] === curSeg[1]
            )
          ) {
            travSegs.push([curSeg[0] - 1, curSeg[1]]);
          }
          //possible to go 'down'  AND 'down' isin't already in the travSegs list AND 'down' is part of the ship
          if (
            curSeg[0] < 3 &&
            !travSegs.some(
              (entry) => entry[0] === curSeg[0] + 1 && entry[1] === curSeg[1]
            ) &&
            this.shipOffsets.some(
              (entry) => entry[0] === curSeg[0] + 1 && entry[1] === curSeg[1]
            )
          ) {
            travSegs.push([curSeg[0] + 1, curSeg[1]]);
          }
          //possible to go 'left'  AND 'left' isin't already in the travSegs list AND 'left' is part of the ship
          if (
            curSeg[1] > 0 &&
            !travSegs.some(
              (entry) => entry[0] === curSeg[0] && entry[1] === curSeg[1] - 1
            ) &&
            this.shipOffsets.some(
              (entry) => entry[0] === curSeg[0] && entry[1] === curSeg[1] - 1
            )
          ) {
            travSegs.push([curSeg[0], curSeg[1] - 1]);
          }
          if (
            curSeg[1] < 3 &&
            !travSegs.some(
              (entry) => entry[0] === curSeg[0] && entry[1] === curSeg[1] + 1
            ) &&
            this.shipOffsets.some(
              (entry) => entry[0] === curSeg[0] && entry[1] === curSeg[1] + 1
            )
          ) {
            travSegs.push([curSeg[0], curSeg[1] + 1]);
          }
          travIdx++;
        }

        if (travIdx === this.numSegsInShip) {
          this.shipStatement = "Looks good";
        } else {
          this.shipStatement = "All segments must be connected by shared edges";
        }
      }
    },
    prettyCoordList(recArray) {
      let listString = "";
      let i;
      for (i = 0; i < recArray.length; i++) {
        listString += "[" + recArray[i][0] + ", " + recArray[i][1] + "], ";
      }
      return listString;
    },
  },
};
</script>

<style scoped>
#outermost {
  background-color: lightblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.rowDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.gridBtn {
  height: 40px;
  width: 40px;
}

.selectedGridBtn {
  background-color: yellow;
}

#outputStatement {
  text-align: center;
}
</style>