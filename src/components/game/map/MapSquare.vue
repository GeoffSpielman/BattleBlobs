<template>
  <button
    class="squareBtn"
    @click="squareClicked()"
    @mouseover="suqareHovered()"
    :style="{ backgroundColor: squareBackgroundColor, opacity: buttonOpacity }"
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

  testModeShowAll = true;

  @Prop({ required: true }) readonly squareData!: GridSquare;

  squareClicked() {
    console.log("I was clicked");

  }

  suqareHovered() {
    this.$emit("squareHovered", this.squareData.row, this.squareData.col);
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
      
      //darkest colours
      if (["e6194b", "f58231", "808000", "3cb44b", "4363d8", "911eb4"].includes(this.$store.getters["playerStore/getMyColour"])){
       return 0.5; 
      }
      //medium colours
      else if (["aaffc3", "42d4f4", "f032e6", "ffd8b1"].includes(this.$store.getters["playerStore/getMyColour"])){
        return 0.3;
      }
      //lightest 
      else{
        return 0.2;
      }
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

button:hover{
  border-width: 2px;
  border-style: solid;
  border-color: red;
}
</style>
