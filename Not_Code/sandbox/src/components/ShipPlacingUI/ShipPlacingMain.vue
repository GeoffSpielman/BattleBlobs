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
        <p>numRows: {{numRows}}</p>
        <p>numCols: {{numCols}}</p>
        <br>
        <p>curShip: {{curShip}}</p>
        <br>
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
              { mapSquareOccupied: map[rowIdx][colIdx] > 0 },
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
      curShip: 0,
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

    randDropPointAsString(){
      return (Math.floor(Math.random() * (this.ships[this.curShip].rowMax - this.ships[this.curShip].rowMin + 1))  + this.ships[this.curShip].rowMin).toString() +
      "," +
      (Math.floor(Math.random() * (this.ships[this.curShip].colMax - this.ships[this.curShip].colMin + 1))  + this.ships[this.curShip].colMin).toString();
    },

    mapButtonClicked(rowIdx, colIdx) {
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
      this.$refs.nextDropPointTxt.value = this.randDropPointAsString()
    },

    formatDropZoneBorders(dropPoint, borderWidth, borderColour){
      var i;
      //top borders
      if (dropPoint[0] >= 0){
        for (i = 0; i < 4; i++) {
        if (dropPoint[1] + i < 0 || dropPoint[1] + i > (this.numCols - 1)) continue;

        let btn = document.getElementById("btn-" + dropPoint[0] + "-" + (dropPoint[1] + i))
        btn.style.borderTop = borderWidth + " solid " + borderColour;
        }
      }
      //bottom borders
      if (dropPoint[0] + 3 < this.numRows){
        for (i = 0; i < 4; i ++){
          if (dropPoint[1] + i < 0 || dropPoint[1] + i > (this.numCols - 1)) continue;

          let btn = document.getElementById("btn-" + (dropPoint[0] + 3) + "-" + (dropPoint[1] + i))
          btn.style.borderBottom = borderWidth + " solid " + borderColour;
        }
      }
      //left borders
      if (dropPoint[1] >= 0){
        for (i = 0; i < 4; i++){
          if (dropPoint[0] + i < 0 || dropPoint[0] + i > (this.numRows - 1)) continue;

          let btn = document.getElementById("btn-" + (dropPoint[0] + i) + "-" + dropPoint[1])
          btn.style.borderLeft = borderWidth + " solid " + borderColour;
        }
      }
      //right borders
      if (dropPoint[1] + 3 < this.numCols){
        for (i = 0; i < 4; i++){
          if (dropPoint[0] + i < 0 || dropPoint[0] + i > (this.numRows - 1)) continue;

          let btn = document.getElementById("btn-" + (dropPoint[0] + i) + "-" + (dropPoint[1] + 3))
          btn.style.borderRight = borderWidth + " solid " + borderColour;
        }
      }
    }
      
  },

  watch: {
    dropPoint(dropPoint, prevDropPoint) {
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
      this.formatDropZoneBorders(dropPoint, '3px', this.ships[this.curShip].colour);
    }
  },

  created() {
    this.map = new Array(this.numRows)
      .fill(0)
      .map(() => new Array(this.numCols).fill(0));
  },
  mounted() {
    this.$refs.nextDropPointTxt.value = this.randDropPointAsString()
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

.mapRowDiv {
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
