<template>
  <div id="titleOuterDiv">
    <transition name="welcomeFade" appear :duration="2200"> 
    <h2 id="welcomeDiv">Welcome to</h2>
    </transition>
    <transition name="titleFade" appear>
      <h1 id="titleDiv">CLUSTERFUCK</h1>
    </transition>
  </div>
</template>

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
  font-size: 65pt;
  width: 750px;
  text-align: center;
  overflow: hidden;
  font-family: Copperplate Gothic, Tahoma, sans-serif;
  margin-top: -12px;
}

.welcomeFade.enter{
  opacity: 0;
}
.welcomeFade-enter-active{
  animation: fade-in-welcome 2s linear forwards;
  animation-delay: 0.2s;
  animation-fill-mode: backwards;
}

#titleDiv.titleFade-enter-active {
  animation: fade-in-title 2.5s ease-out;
  animation-delay: 1.2s;
  animation-fill-mode: backwards;
}

@keyframes fade-in-welcome{
  from {
    opacity: 0;
  }
  to {
    opacity: 100%;
  }
}

@keyframes fade-in-title {
  from {
    width: 0px;
  }
  to {
    width: 750px;
  }
}
</style>