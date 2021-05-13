<template>
  <div id="gameOutermost">
    <div id="chatContainer"></div>
    <div id="mapContainer">
     <baby-part-controller></baby-part-controller>
    </div>
    <div id="powerupsContainer"></div>
    <div id="playerDisplayContainer"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BabyPartController from "@/pages/BabyPartController.vue"

@Component({
  name: "Instructions",
  components: {
    BabyPartController
  }
})
export default class Instructions extends Vue {

}
</script>

<style scoped>
#gameOutermost {
  display: grid;
  grid-template-columns: 25vw 1fr 150px;
  grid-template-rows: 1fr 120px;
  width: 100%;
  height: 100%;
}

#chatContainer {
  grid-column: 1/2;
  grid-row: 1/2;
  background-color: beige;
}

#powerupsContainer {
  grid-column: 3/4;
  grid-row: 1/2;
  background-color: beige;
}

#playerDisplayContainer {
  grid-column: 1/4;
  grid-row: 2/3;
  background-color: beige;
}


#mapContainer {
  grid-column: 2/3;
  grid-row: 1/2;
}



</style>