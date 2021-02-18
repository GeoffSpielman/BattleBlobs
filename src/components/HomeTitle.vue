<template>
  <div id="titleOuterDiv">
    <h2>Welcome to</h2>
      <transition name="titleFade" appear>
        <h1 id="titleDiv"> CLUSTERFUCK </h1>
      </transition>
  </div>
</template>

<style scoped>

#titleOuterDiv{
  display: flex;
  align-items: center;
  flex-direction: column;

  height: 180px;
  background-color: #0D47A1;
  color: white;
}

#titleDiv{
  width: 220px;
  overflow:hidden;
}


.titleFade-enter-active{
  animation: fade-in 3s ease-out forwards;
}


@keyframes fade-in {
  from {
    width: 0px
  }
  to {
    width: 220px
  }
  
}
</style>