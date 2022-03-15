<template>
  <div id="mapSizeConfigOutermostDiv">
    <v-card
      class="configColumnCard"
      outlined
      elevation="2"
      :disabled="cardDisabled"
    >
      <v-card-title class="justify-center" id="mapSizeTitle"> Map Size </v-card-title>
      <div id="mapSizeArea">
        <div id="mapSizeOutput">{{ mapSize }} x {{ mapSize }}</div>
        <v-btn fab height=20px width=20px tile elevation=1 id="plusButton" class="mapSizeButton" @click="plusButtonClicked">+</v-btn>
        <v-btn fab height=20px width=20px tile elevation=1 id="minusButton" class="mapSizeButton" @click="minusButtonClicked">-</v-btn>
        <div id="errorMessage">{{errorMessage}}</div>
      </div>
    </v-card>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GameStatus } from "@/models/enums";

@Component({
  name: "MapSizeConfig",
  components: {},
})
export default class MapSizeConfig extends Vue {
  timeoutID: number = -1;

  errorMessage: string = "";

  get mapSize(): number {
    return this.$store.getters["configDataStore/getMapSize"];
  }

  get cardDisabled(): boolean{
    return this.$store.getters["gameDataStore/getGameStatus"] === GameStatus.GameInProgress
  }

  plusButtonClicked(){
    if (this.mapSize < 24 ){
       this.$store.dispatch("configDataStore/setMapSize", this.mapSize + 1);
    }
    else {
      this.errorMessage = "Max size is 24";
      clearTimeout(this.timeoutID);
      this.timeoutID = setTimeout(this.clearErrorMessage, 1700);
    }
  }

  minusButtonClicked(){
    if (this.mapSize > 8){
       this.$store.dispatch("configDataStore/setMapSize", this.mapSize - 1);
    }
    else {
      this.errorMessage = "Min size is 8"
      clearTimeout(this.timeoutID);
      this.timeoutID = setTimeout(this.clearErrorMessage, 1700);
    }
  }

  clearErrorMessage(){
    this.errorMessage = "";
  }

}
</script>

<style scoped>
#ConfigColumnOutermostDiv {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
}

.configColumnCard {
  width: 150px;
  margin: 5px;
  border-radius: 10px;
}


#mapSizeTitle{
  padding: 0px 0px 2px 0px;
}

#mapSizeArea{
  display: grid;
  width: 100%;
  grid-template-columns: 2.4fr 1fr;
  grid-template-rows: 21px 21px 23px;
  
}

#mapSizeOutput{
  grid-column: 1/2;
  grid-row: 1/3;
  justify-self: end;
  align-self: center;
  margin-right: 10px;
  font-size: 15pt;
  font-weight: 450;
}

#plusButton{
  grid-column: 2/3;
  grid-row: 1/2;
  align-self: end;
  margin-bottom: 1px;
}

#minusButton{
  grid-column: 2/3;
  grid-row: 2/3;
  align-self: start;
  margin-top: 1px;
}

.mapSizeButton{
  font-size: 16pt;
}

#errorMessage{
  grid-column:1/3;
  grid-row: 3/4;
  color: red;
  font-size: 10pt;
  justify-self: center;  
}
</style>
