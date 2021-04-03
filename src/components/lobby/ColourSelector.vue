<template>
  <div id="colourOutermost">
    <div id="iconColumn">
      <slot name="iconImage"> </slot>
    </div>
    <div id="mainColumn">
      <h2>Colour:</h2>
      <div id="coloursContainer">
        <div class="coloursRow">
          <div
            v-for="(n, i) in 5"
            :key="coloursList[i].name"
            :class="{
              buttonDiv: true,
              takenBorder: coloursList[i].status === 'taken',
            }"
          >
            <p
              :style="{
                display: coloursList[i].status === 'taken' ? 'block' : 'none',
              }"
              class="takenLabel"
            >
              Taken
            </p>
            <button
              class="colourButton"
              :style="{
                backgroundColor: coloursList[i].hexCode,
                display:
                  coloursList[i].status === 'taken' ? 'none' : 'inline-block',
              }"
              @click="buttonClicked(coloursList[i].hexCode)"
              :class="{ selectedColour: coloursList[i].status === 'mine' }"
            ></button>
          </div>
        </div>
        <div class="coloursRow">
          <div
            v-for="(n, i) in 5"
            :key="coloursList[i + 5].name"
            :class="{
              buttonDiv: true,
              takenBorder: coloursList[i+5].status === 'taken',
            }"
          >
          <p
              :style="{
                display: coloursList[i+5].status === 'taken' ? 'block' : 'none',
              }"
              class="takenLabel"
            >
              Taken
            </p>
            <button
              class="colourButton"
              :style="{ backgroundColor: coloursList[i + 5].hexCode,
              display:
                  coloursList[i+5].status === 'taken' ? 'none' : 'inline-block',}"
              @click="buttonClicked(coloursList[i + 5].hexCode)"
              :class="{ selectedColour: coloursList[i + 5].status === 'mine' }"
            ></button>
          </div>
        </div>
        <div class="coloursRow">
          <div
            v-for="(n, i) in 5"
            :key="coloursList[i + 10].name"
            :class="{
              buttonDiv: true,
              takenBorder: coloursList[i+10].status === 'taken',
            }"
          >
          <p
              :style="{
                display: coloursList[i+10].status === 'taken' ? 'block' : 'none',
              }"
              class="takenLabel"
            >
              Taken
            </p>
            <button
              class="colourButton"
              :style="{ backgroundColor: coloursList[i + 10].hexCode,
              display:
                  coloursList[i+10].status === 'taken' ? 'none' : 'inline-block',}"
              @click="buttonClicked(coloursList[i + 10].hexCode)"
              :class="{ selectedColour: coloursList[i + 10].status === 'mine' }"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ColourEntry } from "@/models/interfaces";

@Component({
  name: "ColourSelector",
})
export default class ColourSelector extends Vue {
  get coloursList(): ColourEntry[] {
    return this.$store.getters["lobbyStore/getColoursList"];
  }

  buttonClicked(recHexCode: string) {
    this.$store.dispatch("lobbyStore/reserveColour", recHexCode);
  }
}
</script>

<style scoped>
#colourOutermost {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
#iconColumn {
  width: 10vh;
  padding-top: 15px;
}

#mainColumn {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
#mainColumn h2 {
  font-size: 19px;
  font-weight: bold;
  margin-bottom: 10px;
}

#coloursContainer {
  padding-left: 40px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.coloursRow {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 33%;
}

.buttonDiv {
  width: 20%;
  display: flex;
  margin: 1px;
}
.colourButton {
  width: 100%;
  border: 1px solid black;
  border-radius: 0px;
}

.selectedColour {
  border: 5px solid black;
  border-radius: 4px;
}

.takenLabel {
  text-align: center;
  margin: auto;
}

.takenBorder {
  box-sizing: border-box;
  background-image: radial-gradient(white 50%,gainsboro 75%);
}
</style>
