<template>
  <div id="colourOutermost">
    <h2>Colour:</h2>
    <div id="coloursContainer">
      <colours-button-row
        :coloursArr="coloursList.slice(0,5)">
      </colours-button-row>
      <colours-button-row
        :coloursArr="coloursList.slice(5,10)">
      </colours-button-row>
      <colours-button-row
        :coloursArr="coloursList.slice(10,15)">
      </colours-button-row>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ColourEntry } from "@/models/interfaces";
import ColoursButtonRow from "@/components/lobby/ColoursButtonRow.vue"

@Component({
  name: "ColourSelector",
  components: {ColoursButtonRow},
})
export default class ColourSelector extends Vue {

  get coloursList(): ColourEntry[] {
    return this.$store.getters["lobbyStore/getColoursList"];
  }

}
</script>

<style scoped>
#colourOutermost {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#colourOutermost h2 {
  font-size: 19px;
  font-weight: bold;
  margin-bottom: 10px;
}

#coloursContainer {
  padding-left: 40px;
  padding-right: 10px;
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  
}
</style>
