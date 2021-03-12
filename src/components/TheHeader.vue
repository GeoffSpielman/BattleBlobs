<template>
  <transition name="headerShrink" appear>
    <v-container id="headerDiv"> CLUSTERFUCK </v-container>
  </transition>
</template>

<style scoped>
#headerDiv {
  text-align: center;
  font-size: 22pt;
  font-family: Copperplate Gothic, Tahoma, sans-serif;
  font-weight: bold;
  letter-spacing: 2px;

  background-color: #0d47a1;
  color: white;

  margin: -2px 0px 0px 0px;
  padding: 0px;
  max-width: 100%;
  width: 100%;  
  height: 40px;
  
  
  
  
 
}

.headerShrink-enter{
  height: 180px !important;
  font-size: 87px !important;
  padding: 55px 0px 0px 0px !important;
  letter-spacing: normal !important;
  margin-top: 0px !important;
}

.headerShrink-enter-active{
  transition: all 1s;
}

</style>