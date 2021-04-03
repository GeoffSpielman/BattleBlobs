<template>
  <div id="headerOuterDiv" :class="showLargeHeader ? 'largeHeader' : 'smallHeader'">
    <transition name="welcomeFade" appear> 
    <h2 id="welcomeDiv" :class="showLargeHeader? 'largeWelcome' : 'smallWelcome'">Welcome to</h2>
    </transition>
    <transition name="titleGrow" appear>
      <h1 id="titleDiv" :class="showLargeHeader? 'largeTitle' : 'smallTitle'">CLUSTERFUCK</h1>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, } from "vue-property-decorator";
import { Route } from "vue-router";

@Component({
  name: "TheHeader",
})
export default class TheHeader extends Vue {

  showLargeHeader: boolean = true;

   @Watch("$route", { immediate: true })
    onRouteChange(newRoute: Route) {
    if (newRoute.name === "Start"){
      this.showLargeHeader = true;
    }
    else{
      this.showLargeHeader = false;
    }
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
  transition: all 0.5s ease;
}
.largeHeader {
  height: 187px;
  
}
.smallHeader{
  height: 40px;
}

#welcomeDiv {
  font-family: Georgia, Helvetica, Tahoma, Geneva, sans-serif;
  transition: all 0.5s ease;
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
  transition: all 0.5s ease;
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