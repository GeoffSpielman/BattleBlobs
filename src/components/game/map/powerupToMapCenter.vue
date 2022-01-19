<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
  >
    <div v-if="showAnimation" id="outerDiv">
      <p id="iconName">Sneak-A-Peak</p>
      <img id="iconImage" :src="iconPath(powerupIcon)" />
    </div>
  </transition>
</template>


<script lang="ts">
import { Component, Prop, Vue, Mixins } from "vue-property-decorator";
import { SelectedSquareData } from "@/models/interfaces";
import { PowerupIconPathMixin } from "@/mixins/PowerupIconPathMixin";

@Component({
  name: "powerupToMapCenter",
})
export default class PowerupToMapCenter extends Mixins(PowerupIconPathMixin) {
  @Prop({ required: true }) readonly showAnimation!: boolean;
  @Prop({ required: true }) readonly selectedSquareData!: SelectedSquareData;
  @Prop({ required: true }) readonly mapCenterTop!: number;
  @Prop({ required: true }) readonly mapCenterLeft!: number;

  $refs!: {
    outerDivWithText: HTMLFormElement;
  };

  powerupIcon: string = "Sneak-A-Peak";

    //animation is broken into three phases:
    //1 - move from selected square to the center of the map
    //2 - stay in the center of the map for a moment
    //3 - move to below the lucky player's name at the bottom of the screen
    
    
  //constants to drive the animation math
  toCenterDuration: number = 0.8; //[seconds]
  framesPerSecond: number = 60; //60;
  centeredDivWidth: number = 155;
  centeredDivHeight: number = 124;
  ceneteredIconWidth: number = 75;
  centeredImageBottomMargin: number = 8;
  centeredTextBottomMargin: number = 6;
  centeredFontSize: number = 16;
  centeredBorderRadius: number = 15;

  centeredDelayDuration: number = 2; //[seconds]

  //variables
  frameCounter: number = 0;
  initialWidth: number = 0;
  centeredDivTop: number = 0;
  centeredDivLeft: number = 0;

  beforeEnter(el: HTMLFormElement) {
    //put the entire div over the selected square
    el.style.top = this.selectedSquareData.top + "px";
    el.style.left = this.selectedSquareData.left + "px";
    el.style.height = this.selectedSquareData.width + "px";
    el.style.width = this.selectedSquareData.width + "px";
    this.initialWidth = this.selectedSquareData.width;
  }

  enter(el: HTMLFormElement, done: any) {
    console.log("enter!");

    //make the icon the same size as the square
    document.getElementById("iconImage")!.style.width = this.selectedSquareData.width + "px";

    //compute the final resting place of the outer div
    this.centeredDivTop = this.mapCenterTop - this.centeredDivHeight / 2;
    this.centeredDivLeft = this.mapCenterLeft - this.centeredDivWidth / 2;

    this.frameCounter = 1;

    const toCenterTimer = setInterval(() => {
      //end condition
      if (this.frameCounter >= this.framesPerSecond * this.toCenterDuration) {
        clearInterval(toCenterTimer);
        const delayTimer = setInterval(() =>{
            clearInterval(delayTimer);
            done();
        }, this.centeredDelayDuration * 1000 )
      } else {
        this.frameCounter++;
        let proportionOfAnimationComplete: number = (this.frameCounter/this.framesPerSecond)/this.toCenterDuration;

        //outer div
        el.style.left = String(this.selectedSquareData.left + (this.centeredDivLeft - this.selectedSquareData.left) * proportionOfAnimationComplete) + "px";
        el.style.top = String(this.selectedSquareData.top + (this.centeredDivTop - this.selectedSquareData.top) * proportionOfAnimationComplete) + "px";
        el.style.width = String(this.selectedSquareData.width + (this.centeredDivWidth - this.selectedSquareData.width) * proportionOfAnimationComplete) + "px";
        el.style.height = String(this.selectedSquareData.width + (this.centeredDivHeight - this.selectedSquareData.width) * proportionOfAnimationComplete) + "px";
        el.style.borderRadius = String(this.centeredBorderRadius * proportionOfAnimationComplete) + "px";
        

        //image
        document.getElementById("iconImage")!.style.width = String(this.selectedSquareData.width + (this.ceneteredIconWidth - this.selectedSquareData.width) * proportionOfAnimationComplete) + "px";
        document.getElementById("iconImage")!.style.marginBottom = String(this.centeredImageBottomMargin * proportionOfAnimationComplete) + "px";

        //text
        document.getElementById("iconName")!.style.fontSize = String(this.centeredFontSize * proportionOfAnimationComplete) + "pt";
        document.getElementById("iconName")!.style.marginBottom = String(this.centeredTextBottomMargin * proportionOfAnimationComplete) + "px";
      }
    }, Math.round((1 / this.framesPerSecond) * 1000));
  }

  afterEnter() {
    console.log("after enter!");
    this.$emit("animationComplete");
  }
}
</script>

<style scoped>
#outerDiv {
  background-color: white;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}

#iconName{
    font-size: 0pt;
    font-weight: bold;
    font-family: "Roboto", sans-serif;
}
</style>
