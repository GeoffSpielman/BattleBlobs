<template>
  <div id="shipPlacingOutermost">
    <div id="shipRow">
      <ship-builder
        v-for="ship in ships"
        :key="ship.id"
        :ID="ship.id"
        :shipColour="ship.colour"
        :offsets="ship.offsets"
        :rowMin="ship.rowMin"
        :rowMax="ship.rowMax"
        :colMin="ship.colMin"
        :colMax="ship.colMax"
        :numRows="numRows"
        :numCols="numCols"
        @updateShipOffsets="updateShipOffets"
        @updateShipRanges="updateShipRanges"
      >
      </ship-builder>
    </div>
    <div id="mainRow">
      <div id="leftStatusCol">
        <h3>Status:</h3>
        <p>numRows:</p>
        <p>numCols:</p>
        <label for="nextDrop"> Next drop point: </label>
        <input
          type="text"
          ref="nextDropPointTxt"
          id="nextDrop"
          name="nextDrop"
        />
      </div>
      <div id="centerGridCol">
        <div v-for="(rowArray, rowIdx) in map" :key="rowIdx" class="mapRowDiv">
          <button
            v-for="(value, colIdx) in rowArray"
            :key="colIdx"
            @click="mapButtonClicked(rowIdx, colIdx)"
            :class="[
              'mapBtn',
              { mapSquareOccupied: map[rowIdx][colIdx] === 1 },
            ]"
            :id="'btn-' + rowIdx + '-' + colIdx"
          >
            {{ rowIdx + ", " + colIdx }}
          </button>
        </div>
      </div>
      <div id="rightActionsCol">
        <h3>Actions:</h3>
        <button @click="placeShipsOnMap">Start</button>
      </div>
    </div>
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
            [1, 0],
            [2, 0],
            [3, 0],
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
            [1, 0],
            [1, 1],
            [2, 0],
            [2, 1],
            [3, 0],
            [3, 1],
            [2, 2],
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
            [0, 2],
            [0, 3],
            [1, 0],
            [1, 1],
            [1, 2],
            [2, 0],
            [2, 2],
          ],
          rowMin: 0,
          rowMax: 0,
          colMin: 0,
          colMax: 0,
        },
        {
          id: 3,
          colour: "yellow",
          offsets: [
            [1, 1],
            [1, 2],
            [1, 3],
            [2, 1],
            [2, 2],
            [2, 3],
            [3, 1],
            [3, 2],
            [3, 3],
          ],
          rowMin: 0,
          rowMax: 0,
          colMin: 0,
          colMax: 0,
        },
        {
          id: 4,
          colour: "purple",
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
          id: 5,
          colour: "orange",
          offsets: [
            [0, 0],
            [1, 0],
            [1, 1],
            [1, 2],
            [1, 3],
            [2, 0],
            [2, 1],
            [2, 2],
            [2, 3],
          ],
          rowMin: 0,
          rowMax: 0,
          colMin: 0,
          colMax: 0,
        },
      ],
      numRows: 14,
      numCols: 14,
      map: [],
      dropPoint: [0,0],
    };
  },
  methods: {
    updateShipOffets(ID, newOffsets) {
      this.ships[ID].offsets = newOffsets;
    },
    updateShipRanges(ID, newRowMin, newRowMax, newColMin, newColMax) {
      this.ships[ID].rowMin = newRowMin;
      this.ships[ID].rowMax = newRowMax;
      this.ships[ID].colMin = newColMin;
      this.ships[ID].colMax = newColMax;
    },
    mapButtonClicked(rowIdx, colIdx) {
      console.log("clicked [" + rowIdx + "," + colIdx + "]");
      if (this.map[rowIdx][colIdx] === 0) {
        this.map[rowIdx][colIdx] = 1;
      } else {
        this.map[rowIdx][colIdx] = 0;
      }
    },

    placeShipsOnMap() {
      this.dropPoint = this.$refs.nextDropPointTxt.value.split(',').map(Number);
  
      /*
       //simulate passing these in as arguments (for separate module later)
      let map = this.map
      let ships = this.ships
      let dropPoint = this.dropPoint

      console.log("drop point: " + dropPoint)
      
      let i;
      for (i = 0; i < ships[shipIdx].offsets.length; i ++){
        
      }

      */
      //put the next drop point into the input box (which I can change if needed)
      this.$refs.nextDropPointTxt.value =
      (Math.floor(Math.random() * (this.numRows- 1))  - 1).toString() +
      "," +
      (Math.floor(Math.random() * (this.numCols - 1)) - 1).toString();
    },

    formatDropZoneBorders(dropPoint, borderWidth, borderColour){
      var i;
      //top borders
      if (dropPoint[0] >= 0){
        for (i = 0; i < 4; i++) {
        if (dropPoint[1] + i < 0 || dropPoint[1] + i > (this.numCols - 1)) continue;

        console.log("Looking for a button with an id of: btn-" + dropPoint[0] + "-" + (dropPoint[1] + i));
        let btn = document.getElementById("btn-" + dropPoint[0] + "-" + (dropPoint[1] + i))
        btn.style.borderTop = borderWidth + " solid " + borderColour;
        }
      }
      //bottom borders

    }
      
  },

  watch: {
    dropPoint(dropPoint, prevDropPoint) {
      console.log("dropPoint watcher fired. prev: " + prevDropPoint + "    new: " + dropPoint)

      if (
        dropPoint[0] < -1 ||
        dropPoint[0] > this.numRows - 3 ||
        dropPoint[1] < -1 ||
        dropPoint[1] > this.numCols - 3
      ) {
        console.log(
          "Logic Error: invalid drop point"
        );
        return;
      }
      
      this.formatDropZoneBorders(prevDropPoint, '1px', 'black');
      this.formatDropZoneBorders(dropPoint, '4px', 'yellow');
      
    }
  },

  created() {
    this.map = new Array(this.numRows)
      .fill(0)
      .map(() => new Array(this.numCols).fill(0));
  },
  mounted() {
    this.$refs.nextDropPointTxt.value =
      (Math.floor(Math.random() * (this.numRows- 1))  - 1).toString() +
      "," +
      (Math.floor(Math.random() * (this.numCols - 1)) - 1).toString();
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
  flex-direction: row;
  flex-grow: 1;
}

#leftStatusCol,
#rightActionsCol {
  width: 20%;
  display: flex;
  flex-direction: column;
  padding: 25px;
}

h3 {
  margin: 10px;
  text-decoration: underline;
}

#centerGridCol {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}

.rowDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.mapBtn {
  height: 42px;
  width: 42px;
  font-size: 9pt;
  padding: 1pt;
  border: 1px solid black;
  border-radius: 0px;
  
}

.mapSquareOccupied {
  background-color: darkgray;
}
</style>
