<template>
  <div class="outermostDiv">
    <the-header></the-header>
    <h1 id="lobbyHeader"> Lobby: </h1>
    <v-container style="width: 75%">
      <v-row no-gutters>
        <v-col cols="6">
          <v-row> 
            <v-col cols="3">
              <v-img :src="nameIconPath" height="90px" contain></v-img>
            </v-col>
            <v-col cols="9">
          Name: 
          <v-text-field
            v-model="message2"
            solo
          ></v-text-field>  
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6"> I am the top right </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TheHeader from "@/components/TheHeader.vue";

@Component({
  components: { TheHeader },
  name: "Lobby",
})
export default class Lobby extends Vue {
  nameIconPath: string = require("@/assets/lobby/person_icon_black.png")
  aliasIconPath: string = require("@/assets/lobby/alias_icon_black.png")
}
</script>

<style scoped>

#lobbyHeader{
  font-size: 40pt;
  font-family: Tahoma, sans-serif;
  margin-left: 20px;
}
</style>
