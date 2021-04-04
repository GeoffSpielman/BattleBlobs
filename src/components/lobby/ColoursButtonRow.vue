<template>
  <div id="colourRow">
    <v-btn
      v-for="(n, i) in 5"
      :key="coloursArr[i].name"
      :style="{ backgroundColor: coloursArr[i].hexCode }"
      tile
      :class="{
        takenBorder: coloursArr[i].status === 'taken',
        selectedColour: coloursArr[i].status === 'mine',
      }"
      @click="buttonClicked(coloursArr[i].hexCode)"
      :disabled="coloursArr[i].status === 'taken'"
      :elevation="coloursArr[i].status === 'mine' ? 10 : 2"
    >
      {{ coloursArr[i].status === "taken" ? "taken" : "" }}
    </v-btn>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ColourEntry } from "@/models/interfaces";

@Component({
  name: "ColourSelector",
})
export default class ColourSelector extends Vue {
  @Prop({ required: true }) readonly coloursArr!: ColourEntry[];

  buttonClicked(recHexCode: string) {
    this.$store.dispatch("lobbyStore/reserveColour", recHexCode);
  }
}
</script>

<style scoped>
#colourRow {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 6vh;
  min-height: 38px;
  margin-top: 2px;
}

.v-btn {
  width: 20%;
  border: 1px solid RGBA(0, 0, 0, 0.54);
  margin-right: 2px;
  height: 100% !important;
}

.selectedColour {
  border: 5px solid black;
  border-radius: 4px;
  padding: 14px;
}

.takenLabel {
  text-align: center;
  margin: auto;
}

.takenBorder {
  background-image: radial-gradient(white 50%, gainsboro 75%);
}
</style>
