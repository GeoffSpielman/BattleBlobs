<template>
  <div id="titleOuterDiv">
    <transition name="welcomeFade" appear> 
    <h2 id="welcomeDiv">Welcome to</h2>
    </transition>
    <transition name="titleGrow" appear>
      <h1 id="titleDiv">CLUSTERFUCK</h1>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "HomeTitle",
})
export default class HomeTitle extends Vue {

}
</script>

<style scoped>
#titleOuterDiv {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 180px;
  background-color: #0d47a1;
  color: white;
}

#welcomeDiv {
  margin-top: 15px;
  font-size: 26pt;
  font-family: Georgia, Helvetica, Tahoma, Geneva, sans-serif;
}

#titleDiv {
  font-size: 87px;
  text-align: center;
  overflow: hidden;
  font-family: Copperplate Gothic, Tahoma, sans-serif;
  margin-top: -12px;
  letter-spacing: normal;
}

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
    width: 750px;
  }
}

</style>