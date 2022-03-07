<template>
  <div id="SettingsPaneOutermostDiv">
    <div id="SettingsHeaderRow">
      <h2>Settings</h2>
    </div>
    <div class="SettingsRow">
      <h3>Music</h3>
      <div class="sliderContainter">
        <v-slider v-model="musicVolume" dense prepend-icon="mdi-music"></v-slider>
      </div>
    </div>
    <div class="SettingsRow">
      <h3>Effects</h3>
      <div class="sliderContainter">
        <v-slider
          v-model="soundsVolume"
          dense
          prepend-icon="mdi-volume-high"
        ></v-slider>
      </div>
    </div>
    <div id="ColourAssiatanceRow" class="SettingsRow">
      <h3>Colour Assistance Mode</h3>
      <div id="switchContainter">
        <v-switch v-model="colourAssistanceMode" inset></v-switch>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "SettingsPane",
  components: {},
})
export default class SettingsPane extends Vue {
  
  musicVolume: number = 50;
  soundsVolume: number = 50;
  
  get colourAssistanceMode(): boolean {
    return this.$store.getters["clientSpecificStore.getColourAssistanceMode"];
  }
  set colourAssistanceMode(value: boolean) {
    this.$store.dispatch("clientSpecificStore/setColourAssistanceMode", value);
  }
}
</script>

<style scoped>
#SettingsPaneOutermostDiv {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

#SettingsHeaderRow {
  background-color: #0d47a1;
  color: white;
  height: 40px;
}

h2 {
  text-align: center;
  margin-top: 2px;
}

.SettingsRow {
  color: black;
  height: 35px;
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.sliderContainter {
  display: flex;
  width: 200px;
  align-items: center;
  justify-content: center;
  padding-top: 12px;
}

.SettingsRow h3 {
  flex-grow: 1;
  padding-left: 14px;
  font-size: 13.5pt;
}

#switchContainter {
  width: 65px;
  display: flex;
  justify-content: center;
}
</style>
