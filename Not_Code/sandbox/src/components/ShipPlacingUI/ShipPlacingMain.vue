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
        <p>numRows: {{ numRows }}</p>
        <p>numCols: {{ numCols }}</p>
        <br />
        <p>curShip: {{ curShip }}</p>
        <br />
        <p>dropPoint: {{ dropPoint }}</p>
      </div>
      <div id="centerGridCol">
        <div v-for="(rowArray, rowIdx) in map" :key="rowIdx" class="mapRowDiv">
          <button
            v-for="(value, colIdx) in rowArray"
            :key="colIdx"
            @click="mapButtonClicked(rowIdx, colIdx)"
            :class="[
              'mapBtn',
              {
                mapSquareOccupied: map[rowIdx][colIdx] === 99,
                redShipSquare: map[rowIdx][colIdx] === 0,
                blueShipSquare: map[rowIdx][colIdx] === 1,
                greenShipSquare: map[rowIdx][colIdx] === 2,
                yellowShipSquare: map[rowIdx][colIdx] === 3,
                purpleShipSquare: map[rowIdx][colIdx] === 4,
                orangeShipSquare: map[rowIdx][colIdx] === 5,
              },
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
          colour: "salmon",
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
          colour: "deepskyblue",
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
          colour: "mediumorchid",
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
      numRows: 13,
      numCols: 13,
      map: [],
      dropPoint: [0, 0],
      curShip: 0,
      testedDrops: [],
      toAttempt: [],
      shipAttemptsCount: 0,
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

    randDropPoint() {
      return [
        Math.floor(
          Math.random() *
            (this.ships[this.curShip].rowMax -
              this.ships[this.curShip].rowMin +
              1)
        ) + this.ships[this.curShip].rowMin,
        Math.floor(
          Math.random() *
            (this.ships[this.curShip].colMax -
              this.ships[this.curShip].colMin +
              1)
        ) + this.ships[this.curShip].colMin,
      ];
    },

    mapButtonClicked(rowIdx, colIdx) {
      if (this.map[rowIdx][colIdx] === -1) {
        this.map[rowIdx][colIdx] = 99;
      } else {
        this.map[rowIdx][colIdx] = -1;
      }
    },

    async placeShipsOnMap() {

      const maxShipAttempts = 200;

     
      for (this.curShip = 0; this.curShip < this.ships.length; this.curShip ++){
        
        this.toAttempt = [this.randDropPoint()];
        this.testedDrops = [];
        this.shipAttemptsCount = 0;
        let shipPlacedSuccessfully = false;

        console.log("Working on ship " + this.curShip)

        while (
          this.toAttempt.length > 0 &&
          this.shipAttemptsCount < maxShipAttempts
        ) {
          this.formatDropZoneBorders(this.dropPoint, "1px", "black");
          this.dropPoint = this.toAttempt.shift();
          this.formatDropZoneBorders(
            this.dropPoint,
            "3px",
            this.ships[this.curShip].colour
          );

          /*
          console.log("curShip: " + this.curShip + ".   dropPoint: [" + this.dropPoint[0] + ", " + this.dropPoint[1] + "]")
          console.log("testedDrops: " + this.prettyCoordList(this.testedDrops));
          console.log("toAttempt: " + this.prettyCoordList(this.toAttempt))
          console.log("testedDrops.length: " + this.testedDrops.length + "    shipAttempts: " + this.shipAttemptsCount);
          */
          await new Promise(r => setTimeout(r, 200));



          let interferingOffsets = [];
          let i;

          //determine if the current point is clear (no interferences)
          for (i = 0; i < this.ships[this.curShip].offsets.length; i++) {
            let curOffset = this.ships[this.curShip].offsets[i];
            if (
              this.map[this.dropPoint[0] + curOffset[0]][
                this.dropPoint[1] + curOffset[1]
              ] > -1
            ) {
              interferingOffsets.push(curOffset);
            }
          }

          //add the ship to the map if there were no interferences
          if (interferingOffsets.length === 0) {
            let offetsList = this.ships[this.curShip].offsets;
            for (i = 0; i < offetsList.length; i++) {
              this.map[this.dropPoint[0] + offetsList[i][0]][
                this.dropPoint[1] + offetsList[i][1]
              ] = this.ships[this.curShip].id;
            }
            shipPlacedSuccessfully = true;
            break;
          }

          //if there were interferences, explore alternative placements...
          else {
            this.shipAttemptsCount++;
            this.testedDrops.push(this.dropPoint);
            let interferenceWithShipExterior = false;

            //interference is along top
            if (interferingOffsets.some((element) => element[0] === 0)) {
              this.tentativeExplore(this.dropPoint, [1, 0]);
              interferenceWithShipExterior = true;
            }
            //interference is along left
            if (interferingOffsets.some((element) => element[1] === 0)) {
              this.tentativeExplore(this.dropPoint, [0, 1]);
              interferenceWithShipExterior = true;
            }
            //interference is along right
            if (interferingOffsets.some((element) => element[1] === 3)) {
              this.tentativeExplore(this.dropPoint, [0, -1]);
              interferenceWithShipExterior = true;
            }
            //interference is along bottom
            if (interferingOffsets.some((element) => element[0] === 3)) {
              this.tentativeExplore(this.dropPoint, [-1, 0]);
              interferenceWithShipExterior = true;
            }
            
            //if the interference is ONLY with the core of the ship
            if (!interferenceWithShipExterior){
              //interference is along inner top
              if (interferingOffsets.some((element) => element[0] === 1)) {
              this.tentativeExplore(this.dropPoint, [1, 0]);
              }
              //interference is along inne left
              if (interferingOffsets.some((element) => element[1] === 1)) {
                this.tentativeExplore(this.dropPoint, [0, 1]);
              }
              //interference is along inner right
              if (interferingOffsets.some((element) => element[1] === 2)) {
                this.tentativeExplore(this.dropPoint, [0, -1]);
              }
              //interference is along inner bottom
              if (interferingOffsets.some((element) => element[0] === 2)) {
                this.tentativeExplore(this.dropPoint, [-1, 0]);
              }
            }

            //if we've already tried 18 locations in this area and out attempts count for this ship is fairly low, our initial placement was probably congested
            //lets reset everything except the attempts counter and pick a new random drop point to start over somewhere else
            if (this.testedDrops.length === 18 && this.shipAttemptsCount < 20){
              console.log("Moving to a less congested area (resetting at a random drop point)")
              this.toAttempt = [this.randDropPoint()];
              this.testedDrops = [];
            }
            //if we're at 50 attempts, throw in two more random points on the map to explore
            if (this.shipAttemptsCount === 50){
              console.log("Wow busy map, adding two more random points to the mix")
              this.toAttempt.push(this.randDropPoint());
              this.toAttempt.push(this.randDropPoint());
            }
          }
        }
        if (shipPlacedSuccessfully){
          console.log("Successfully placed ship " + this.curShip);
        }
        else{
          console.log("Failed to place ship  " + this.curShip + ". Map is too congested")
          console.log("Tested drop points: " +  this.prettyCoordList(this.testedDrops))
        }
        
      }
    },

    formatDropZoneBorders(dropPoint, borderWidth, borderColour) {
      var i;
      //top borders
      if (dropPoint[0] >= 0) {
        for (i = 0; i < 4; i++) {
          if (dropPoint[1] + i < 0 || dropPoint[1] + i > this.numCols - 1)
            continue;

          let btn = document.getElementById(
            "btn-" + dropPoint[0] + "-" + (dropPoint[1] + i)
          );
          btn.style.borderTop = borderWidth + " solid " + borderColour;
        }
      }
      //bottom borders
      if (dropPoint[0] + 3 < this.numRows) {
        for (i = 0; i < 4; i++) {
          if (dropPoint[1] + i < 0 || dropPoint[1] + i > this.numCols - 1)
            continue;

          let btn = document.getElementById(
            "btn-" + (dropPoint[0] + 3) + "-" + (dropPoint[1] + i)
          );
          btn.style.borderBottom = borderWidth + " solid " + borderColour;
        }
      }
      //left borders
      if (dropPoint[1] >= 0) {
        for (i = 0; i < 4; i++) {
          if (dropPoint[0] + i < 0 || dropPoint[0] + i > this.numRows - 1)
            continue;

          let btn = document.getElementById(
            "btn-" + (dropPoint[0] + i) + "-" + dropPoint[1]
          );
          btn.style.borderLeft = borderWidth + " solid " + borderColour;
        }
      }
      //right borders
      if (dropPoint[1] + 3 < this.numCols) {
        for (i = 0; i < 4; i++) {
          if (dropPoint[0] + i < 0 || dropPoint[0] + i > this.numRows - 1)
            continue;

          let btn = document.getElementById(
            "btn-" + (dropPoint[0] + i) + "-" + (dropPoint[1] + 3)
          );
          btn.style.borderRight = borderWidth + " solid " + borderColour;
        }
      }
    },

    tentativeExplore(curPoint, shiftDir) {
      //if it's possible to simply move in the shift direction, do that
      if (this.shiftWithinShipRanges(curPoint, shiftDir) && this.shiftUnexplored(curPoint, shiftDir)){
        this.toAttempt.push([
          curPoint[0] + shiftDir[0],
          curPoint[1] + shiftDir[1],
        ]);
      }
      //can't move in the shift direction, need to 'branch out'
      else {
        //if the shift direction was up or down, time to branch out horizontally
        if (shiftDir[0] !== 0 && shiftDir[1] === 0) {
          //can we move right?
          if (
            this.shiftWithinShipRanges(curPoint, [0, 1]) &&
            this.shiftUnexplored(curPoint, [0, 1])
          ) {
            this.toAttempt.push([curPoint[0], curPoint[1] + 1]);
          }
          //can we move left?
          if (
            this.shiftWithinShipRanges(curPoint, [0, -1]) &&
            this.shiftUnexplored(curPoint, [0, -1])
          ) {
            this.toAttempt.push([curPoint[0], curPoint[1] - 1]);
          }
        }

        //if the shift direction was right or left, time to branch out vertically
        else if (shiftDir[0] === 0 && shiftDir[1] !== 0) {
          //can we move up?
          if (
            this.shiftWithinShipRanges(curPoint, [-1, 0]) &&
            this.shiftUnexplored(curPoint, [-1, 0])
          ) {
            this.toAttempt.push([curPoint[0] - 1, curPoint[1]]);
          }
          //can we move down?
          if (
            this.shiftWithinShipRanges(curPoint, [1, 0]) &&
            this.shiftUnexplored(curPoint, [1, 0])
          ) {
            this.toAttempt.push([curPoint[0] + 1, curPoint[1]]);
          }
        } else {
          console.log(
            "Logic Error: tentative explore received a faulty shiftDir"
          );
        }
      }
    },

    shiftWithinShipRanges(curPoint, shiftDir) {
      if (
        curPoint[0] + shiftDir[0] <= this.ships[this.curShip].rowMax &&
        curPoint[0] + shiftDir[0] >= this.ships[this.curShip].rowMin &&
        curPoint[1] + shiftDir[1] <= this.ships[this.curShip].colMax &&
        curPoint[1] + shiftDir[1] >= this.ships[this.curShip].colMin
      ) {
        return true;
      }
      return false;
    },

    shiftUnexplored(curPoint, shiftDir) {
      if (
        this.testedDrops.some(
          (element) =>
            element[0] === curPoint[0] + shiftDir[0] &&
            element[1] === curPoint[1] + shiftDir[1]
        ) ||
        this.toAttempt.some(
          (element) =>
            element[0] === curPoint[0] + shiftDir[0] &&
            element[1] === curPoint[1] + shiftDir[1]
        )
      ) {
        return false;
      }
      return true;
    },

    prettyCoordList(recArray) {
      let listString = ""
      let i;
      for (i = 0; i < recArray.length; i++) {
        listString += "[" + recArray[i][0] + "," + recArray[i][1] + "]";
        if (i < recArray.length - 1){
          listString += ", "
        }
      }
      return listString;
    },
  },

  created() {
    this.map = new Array(this.numRows)
      .fill(-1)
      .map(() => new Array(this.numCols).fill(-1));
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
  height: 40px;
  width: 40px;
  font-size: 8.5pt;
  padding: 1pt;
  border: 1px solid black;
  border-radius: 0px;
}

.mapSquareOccupied {
  background-color: darkgray;
}

.redShipSquare {
  background-color: salmon;
}

.blueShipSquare {
  background-color: deepskyblue;
}

.greenShipSquare {
  background-color: green;
}

.yellowShipSquare {
  background-color: yellow;
}

.purpleShipSquare {
  background-color: mediumorchid;
}

.orangeShipSquare {
  background-color: orange;
}
</style>
