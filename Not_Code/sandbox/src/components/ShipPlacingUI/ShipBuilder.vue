<template>
  <div id="outermostShipBuilder">
    <div id="topMainRow">
      <div id="leftInfoCol">
        <h4>ID: {{ ID }}</h4>
        <p :class="{invalidNumSegs: offsets.length !== 9}">segs: {{ offsets.length }}/9</p>
        <p>rowMin: {{ rowMin }}</p>
        <p>rowMax: {{ rowMax }}</p>
        <p>colMin: {{ colMin }}</p>
        <p>colMax: {{ colMax }}</p>
      </div>
      <div id="rightGridCol">
        <div id="buttonGrid">
          <div
            v-for="(rowArray, rowIdx) in gridVals"
            :key="'ship' + ID + '-row' + rowIdx"
            class="rowDiv"
          >
            <button
              v-for="(value, colIdx) in rowArray"
              :key="'ship' + ID + '-row' + rowIdx + '-col' + colIdx"
              @click="gridButtonClicked(rowIdx, colIdx)"
              class="gridBtn"
              :style="{backgroundColor: gridVals[rowIdx][colIdx] ? shipColour: '#EFEFEF'}"
            >
              {{ rowIdx + ", " + colIdx }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="bottomOffsetRow">
      {{ offsets }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ID: {
      type: Number,
      required: true,
    },
    shipColour: {
      type: String,
      required: true,
    },
    offsets: {
      type: Array,
      required: true,
    },
    rowMin: {
      type: Number,
      required: true,
    },
    rowMax: {
      type: Number,
      required: true,
    },
    colMin: {
      type: Number,
      required: true,
    },
    colMax: {
      type: Number,
      required: true,
    },
    numRows: {
      type: Number,
      required: true,
    },
    numCols: {
      type: Number,
      required: true
    }
  },
  emits: [
    "updateShipOffsets",  //(shipID, newOffsets)
    "updateShipRanges",   //(shipID, newRowMin, newRowMax, newColMin, newColMax)
  ],

  data() {
    return {
      gridVals: [
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
      ],
    };
  },
  methods: {
    gridButtonClicked(rowIdx, colIdx) {
      this.gridVals[rowIdx][colIdx] = !this.gridVals[rowIdx][colIdx];

      var newOffsets = [];

      //grid square turned on
      if (
        this.gridVals[rowIdx][colIdx] &&
        !this.offsets.some(
          (entry) => entry[0] === rowIdx && entry[1] === colIdx
        )
      ) {
        newOffsets = this.offsets;
        newOffsets.push([rowIdx, colIdx]);
      }
      //grid square turned off
      else if (
        !this.gridVals[rowIdx][colIdx] &&
        this.offsets.some((entry) => entry[0] === rowIdx && entry[1] === colIdx)
      ) {
        newOffsets = this.offsets.filter(
          (entry) => !(entry[0] === rowIdx && entry[1] === colIdx)
        );
      } else {
        console.log(
          "Logic Error: removing something from offsets that isn't there OR adding something to offsets that is already present"
        );
        return;
      }
      this.$emit('updateShipOffsets', this.ID, newOffsets)
      this.calculateNewRanges();
    },

    initializeGrid() {
      let row;
      let col;
      for (row = 0; row < this.gridVals.length; row++) {
        for (col = 0; col < this.gridVals[0].length; col++) {
          this.gridVals[row][col] = this.offsets.some(
            (entry) => entry[0] === row && entry[1] === col
          );
        }
      }
      this.calculateNewRanges();
    },
    calculateNewRanges() {
      let rowMin = 0
      let rowMax = this.numRows - 4;
      let colMin = 0
      let colMax = this.numCols - 4;

      //top row is empty
      if (this.gridVals[0].every((val) => val === false)){
        rowMin = -1;
      }
      //bottom row is empty
      else if (this.gridVals[3].every((val) => val === false)){
        rowMax = this.numRows - 3;
      }

      //left column is empty
      if (this.gridVals.every((rowArray) => rowArray[0] === false)){
        colMin = -1
      }
      //right column is empty
      else if (this.gridVals.every((rowArray) => rowArray[3] === false)){
        colMax = this.numCols - 3;
      }
      this.$emit('updateShipRanges', this.ID, rowMin, rowMax, colMin, colMax);
    },
  },

  mounted() {
    this.initializeGrid();
  },
};
</script>

<style scoped>
#outermostShipBuilder {
  display: flex;
  width: 30%;
  flex-direction: column;
  justify-content: center;
}

#topMainRow {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

#bottomOffsetRow {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 3px 18px;
  text-align: center;
  font-size: 10pt;
}

#leftInfoCol {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: 5px;
}

#leftInfoCol > p {
  margin: 2px 1px;
  font-size: 10.5pt;
}
#leftInfoCol > h4 {
  margin: 5px 2px;
}

#rightGridCol {
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
  height: 30px;
  width: 30px;
  font-size: 9pt;
  padding: 1pt;
}

.selectedGridBtn {
  background-color: yellow;
}

.invalidNumSegs{
  color: red
}
</style>