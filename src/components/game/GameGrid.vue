<template>
  <div id="gameGridOutermost">
      <div id="gameGridInner">
      <!--
        <v-responsive :aspect-ratio="1" id="gridOuterSquare">
          This card will always be 16:9 (unless you put more stuff in it)
        </v-responsive>
        -->

        <div id="gridOuterSquare">
            <div id="gridOuterSquareContent">
                Absolutely-positioned content isn't counted in the parent's height!
                <br>
                lots
                <br>
                of
            </div>
        </div>
      </div>

    </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "GameGrid",
  components: {},
})
export default class GameGrid extends Vue {}
</script>

<style scoped>
#gameGridOutermost {
  height: 100%;
  max-height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
}

#gameGridInner{ 
    display: block;
    width: 100%;
}

#gridOuterSquare {
  background-color: red;
  width: 85%;
  padding-bottom: 85%;
  position: relative;
  margin: auto;
}

#gridOuterSquareContent {
  position: absolute;
  left: 10px;
  right: 10px;
  top: 10px;
  bottom: 10px;
}
</style>
