<template>
  <div class="outermostDiv">
    <div id="mainTopRow">
      <div id="leftColumn">I am left column</div>
      <div id="centerColumn">
  
          <div id="gridOuterSquare">
            I am the content
            <br />
            that goes in
            <br />
            the square
          </div>
      </div>
      <div id="rightColumn">I am right column</div>
    </div>
    <div id="bottomRow">I am bottom row</div>
  </div>
</template>


<style scoped>
.outermostDiv {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

#mainTopRow {
  flex-grow: 1;
  display: flex;
}
#bottomRow {
  height: 120px;
  width: 100%;
  background-color: lightblue;
}

#leftColumn {
  width: 25vw;
  background-color: lightgreen;
}

#centerColumn {
  flex-grow: 1;
  height: 10px;
}

#rightColumn {
  width: 150px;
  background-color: lightgray;
}

#gridOuterSquare {
  background-color: red;
  width: 80%;
  aspect-ratio: 1/1;
  margin: auto;
}

#gridOuterSquareContent {
  position: absolute;
  left: 10px;
  right: 10px;
  top: 10px;
  bottom: 10px;
}
</style>