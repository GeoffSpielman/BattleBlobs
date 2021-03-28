<template>
      <v-card
      loading        
      >
      <div id="CardOuter">
        <div id="leftCol">
          <img id="internetImg" src="@/assets/misc/disconnected.gif">
        </div>
        <div id="rightCol">
           <h2> Connection Lost </h2>
           Uh oh! You have been disconnected from the game. Don't worry, I've deployed my fleet of nano robots to reconnect you as quickly as possible. 
           <br><br>
           Please don't close this tab or refresh the page.
        </div>
      </div>
      </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "DisconnectedCard",
})
export default class DisconnectedCard extends Vue {
}
</script>

<style>

#CardOuter{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
}

#leftCol{
    display: flex;
    align-items: center;
}

#internetImg{
    width: 155px;
    margin: 35px 15px;
}

#rightCol{
    padding-top: 28px;
}

#rightCol h2 {
    margin: 0px 0px 3px 10px;
}
</style>
