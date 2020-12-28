<template>
  <div id="outermost">
    <div id="horizontalMiddle">
      <div class="shipBuilderContainer">
      <ship-builder :numSegsInShip="numSegsInShip"> </ship-builder>
      </div>
      <div class="shipBuilderContainer">
      <ship-builder :numSegsInShip="numSegsInShip"> </ship-builder>
      </div>
    </div>
  </div>
</template>

<script>
import shipBuilder from "./components/shipBuilder.vue";

export default {
  name: "App",
  components: {
    "ship-builder": shipBuilder,
  },
  data(){
    return{
      numSegsInShip: 9,
    }
  }
};
</script>


<style scoped>
* {
  box-sizing: border-box;
  margin: 0px;
}
#outermost {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#horizontalMiddle{
  height: 38%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.shipBuilderContainer{
  width: 25%;
  height: 100%;
   margin: 0px 30px 0px 30px;
}
</style>
