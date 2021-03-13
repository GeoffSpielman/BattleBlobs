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
  font-family: Georgia, Helvetica, Tahoma, Geneva, sans-serif;
  transition: all 0.75s ease-out;
}
.largeWelcome {
  font-size: 26pt;
  transform: translateY(0px);
  margin-top: 15px;
  height: 52px;
}
.smallWelcome{
  font-size: 15pt;
  transform: translateY(-20px);
  margin-top: -2px;
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
  letter-spacing: 2px;
}

/* animations (on intial load) */
.welcomeFade-enter-active{
  animation: fade-in-welcome 2.5s;
  animation-delay: 0.1s;
  animation-fill-mode: backwards;
}
@keyframes fade-in-welcome {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.titleGrow-enter-active {
  animation: grow-in-title 2.5s ease-out;
  animation-delay: 1s;
  animation-fill-mode: backwards;
}
@keyframes grow-in-title {
  from {
    width: 0px;
  }
  to {
    width: 855px;
  }
}

</style>