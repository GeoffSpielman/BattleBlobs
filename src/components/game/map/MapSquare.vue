<template>
  <button
    class="squareBtn"
    @click="squareClicked()"
    @mouseover="squareHovered()"
    :style="{ backgroundColor: squareBackgroundColor, opacity: buttonOpacity, cursor: itsMyTurn? 'pointer': 'not-allowed'}"
    :class="{hoverableClass: itsMyTurn && squareData.revealed === false, blackBorder: squareBlackBorder}"
  >
    <img class="squareImage" src="@/assets/game/fog.png" :style="{opacity: imageOpacity}" />
  </button>
</template>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { GridSquare } from "@/models/interfaces";
import { MapType } from "@/models/enums";

@Component({
  name: "MapSquare",
  components: {},
})
export default class MapSquare extends Vue {

  testModeShowAll = false;

  @Prop({ required: true }) readonly squareData!: GridSquare;

  squareClicked() {
    if (this.itsMyTurn){
      this.$store.dispatch("mapStore/revealSquare", [this.squareData.row, this.squareData.col].join(","));
      this.$store.dispatch("gameStore/incrementWhoseTurn");
    }
    

  }

  squareHovered() {
    this.$emit("squareHovered", this.squareData.row, this.squareData.col);
  }

  get itsMyTurn(): boolean {
    return this.$store.getters["playerStore/getMyKey"] === this.$store.getters["gameStore/getWhoseTurn"];
  }

  get squareBackgroundColor(): string{

    //TEST MODE - SHOW ALL SHIPS
    if (this.squareData.mapType === MapType.Ship && this.testModeShowAll){
      return "#" + this.$store.getters["playerStore/getColourUsingKey"](this.squareData.captains[0])
    }


    //hidden and your own ship - show it only to you
    if (
      this.squareData.revealed === false &&
      this.squareData.mapType === MapType.Ship &&
      this.squareData.captains.includes(this.$store.getters["playerStore/getMyKey"])
    ) {
      return "#" + this.$store.getters["playerStore/getMyColour"];
    }

    //revealed and only one ship on the square - show the ship colour
    else if (
      this.squareData.revealed === true &&
      this.squareData.mapType === MapType.Ship && 
      this.squareData.captains.length === 1
    ) {
        return "#" + this.$store.getters["playerStore/getColourUsingKey"](this.squareData.captains[0])
      }

    //otherwise the square is plain fog or transparent so it doesn't matter
    return "#CCCCCC";
  }

  get buttonOpacity(): number {

    //TEST MODE - SHOW ALL SHIPS
    if (this.squareData.mapType === MapType.Ship && this.testModeShowAll){
      return 1.0;
    }

    //hidden and your own ship - completely opaque
    if (
      this.squareData.revealed === false &&
      this.squareData.mapType === MapType.Ship &&
      this.squareData.captains.includes(this.$store.getters["playerStore/getMyKey"])
    ){
      return 1.0;
    }

    //revealed and a ship - completely opaque
    else if (
      this.squareData.revealed === true && 
      this.squareData.mapType === MapType.Ship
    ){
      return 1.0;
    }
    
    //revealed and water or a powerup buoy - transparent
    else if (
      this.squareData.revealed === true &&
      (this.squareData.mapType === MapType.Water || this.squareData.mapType === MapType.PowerUp)
    ){
      return 0;
    }
    //otherwise fog
    return 0.85;
  }

  get imageOpacity(): number {
    
    //TEST MODE - SHOW ALL SHIPS
    if (this.squareData.mapType === MapType.Ship && this.testModeShowAll){
      return 0;
    }
    
    //hidden and your own shape - somewhat transparent based on the colour
    if (
      this.squareData.revealed === false &&
      this.squareData.mapType === MapType.Ship &&
      this.squareData.captains.includes(this.$store.getters["playerStore/getMyKey"])
    ){

      switch (this.$store.getters["playerStore/getMyColour"]){
        
        case "e6194b": //red
        case "ffe119": //yellow
        case "f032e6": //magenta
          return 0.75;
        
        case "fffac8": //faint yellow
        case "808000": //olive
        case "ffd8b1": //peach
        case "911eb4": //purple
          return 0.7;

        case "f58231": //orange
        case "bfef45": //lime green
        case "aaffc3": //mint green
          return 0.65;

        case "fabed4": //pink
          return 0.6;

        case "3cb44b": //dark green (pine)
        case "dcbeff": //lilac
        case "42d4f4": //sky blue
          return 0.55;

        case "4363d8": //deep blue
          return 0.5;
        
      }
      return 0.1;
    }

    //revelaed ship(s) - transparent
    else if (this.squareData.revealed === true && this.squareData.mapType === MapType.Ship){
      return 0;
    }
    //revealed powerup buoy - opaque to show image
    else if (this.squareData.revealed === true && this.squareData.mapType === MapType.PowerUp){
      return 1.0;
    }

    //otherwise fog - let the button manage the transparency
    return 1.0;
  }

  get imagePath(): string{
    //ToDo - overlapping ships, powerup buoys
    return  "@/assets/game/fog.png";
  }

  get squareBlackBorder(): boolean{
    return this.squareData.revealed && this.squareData.mapType === MapType.Ship;
  }

  
}
</script>

<style scoped>
.squareBtn {
  flex-grow: 1;
  flex-basis: 10px;
  display: flex;
}

.squareImage {
  height: 100%;
  width: 10px;
  flex-grow: 1;
}

.hoverableClass:hover{
  border-width: 3px;
  border-style: solid;
  border-color: red;
}

.blackBorder{
  border-width: 1px;
  border-style: solid;
  border-color: black;
}
</style>
