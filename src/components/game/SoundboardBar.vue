<template>
  <div id="soundboardOutermost">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header hide-actions class="pa-1">
          <div id="soundboardText"><h3 class="ml-1">Soundboard</h3><h4 style="margin: auto; color: red;"> 0:23 </h4></div>
          <div id="volumeSlider" v-on:click.stop>
            <v-slider id="test"
              v-model="volume"
              :prepend-icon="volumeIcon"
              dense
              hide-details
            ></v-slider>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "SoundboardBar",
})
export default class SoundboardBar extends Vue {
  volume: number = 70;
  
  get volumeIcon(): string{
    if (this.volume === 0){
      return "mdi-volume-low";
    }
    else if (this.volume > 0 && this.volume < 50){
      return "mdi-volume-medium";
    }
    else{
      return "mdi-volume-high";
    }
  } 
}
</script>

<style scoped>
#soundboardOutermost {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#soundboardText{
  display: flex;
  flex-direction: row;
}

#volumeSlider{
  max-width: 175px;
}

</style>
