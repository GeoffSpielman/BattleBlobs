<template>
  <div id="outermost">
    <div id="buttonGrid">
      <div v-for="(rowArray, rowIdx) in canvasGrid" :key="rowIdx" class="rowDiv">
        <button v-for="(btn, colIdx) in rowArray" :key="colIdx" class="gridBtn">
          {{ rowIdx + ", " + colIdx }}
        </button>
      </div>
    </div>
    <p id="outputStatement">Looks great!</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvasGrid: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    };
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

.rowDiv{
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.gridBtn{
    height: 40px;
    width: 40px;
}

#outputStatement{
    text-align: center;
}
</style>