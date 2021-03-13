<template>
  <div id="headerOuterDiv" :class="{largeHeader: largeHeader, smallHeader: smallHeader}">
    <transition name="welcomeFade" appear> 
    <h2 id="welcomeDiv" :class="{largeWelcome: largeHeader, smallWelcome: smallHeader}">Welcome to</h2>
    </transition>
    <transition name="titleGrow" appear>
      <h1 id="titleDiv" :class="{largeTitle: largeHeader, smallTitle: smallHeader}">CLUSTERFUCK</h1>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "HomeTitle",
})
export default class HomeTitle extends Vue {
  @Prop({required: true, type: Boolean}) readonly startPageDisplay: boolean = true;

  get largeHeader(): boolean {
    return this.startPageDisplay;
  }

  get smallHeader(): boolean {
    return !this.startPageDisplay;
  }

}
</script>

<style scoped>
#headerOuterDiv {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #0d47a1;
  color: white;
  transition: all 0.75s ease-out;
}
.largeHeader {
  height: 187px;
  
}
.smallHeader{
  height: 40px;
}

#welcomeDiv {
  font-size: 26pt;
  font-family: Georgia, Helvetica, Tahoma, Geneva, sans-serif;
  transition: height 0.75s ease-out;
  /*.
  transition: height 0.75s ease-out;
  transition: margin-top 0.75s ease-out;
  transition: transform 0.75s ease-out;
  */
}
.largeWelcome {
  /*
  transform: translateY(0px);
  margin-top: 15px;
  */
  height: 52px;
}
.smallWelcome{
  /*
  transform: translateY(-50px);
  margin-top: 0px;
  */
  height: 0px;
}

#titleDiv {
  text-align: center;
  overflow: hidden;
  font-family: Copperplate Gothic, Tahoma, sans-serif;  
  transition: all 0.75s ease-out;
}
.largeTitle{
  font-size: 100px;
  margin-top: -20px;
  letter-spacing: normal;
}
.smallTitle{
  font-size: 22pt;
}

/* tranisitons */

.welcomeFade-enter{
  opacity: 0;
}

.welcomeFade-enter-active{
  transition: opacity 2.5s;
  transition-delay: 0.1s;
}

.welcomeFade-leave-active{
  transition: transform 2s;
  transform: translateY(50px) !important;
}

.welcomeFade-leave-to{
  transform: translateY(50px) !important;
}


.titleGrow-enter{
  width: 0px !important;
}

.titleGrow-enter-active {
  transition-delay: 1s !important;
  transition: width 2.5s ease-out;
  width: 855px;
}



.headerTrans-enter{
  height: 40px !important;
}

.headerTrans-enter-active{
  height: 187px !important;
  transition: height 0.75s !important;
}

.headerTrans-leave-active{
  transition: height 0.5s ease-in;
  height: 0px !important;
}

.headerTrans-leave-to{
  height: 0px !important;
}

</style>