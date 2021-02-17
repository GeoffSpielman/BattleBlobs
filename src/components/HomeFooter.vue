<template>
  <v-footer color="primary lighten-1" padless>
    <v-row justify="center" no-gutters>

      <v-col class="outerCol pl-2" cols="2"> 
        Copyright <v-icon dense color="white" class="px-1"> mdi-copyright</v-icon>  Geoff Spielman
      </v-col>

      <v-col id="middleCol" cols="8">
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          text
          rounded
          class="my-2"
        >
          {{ link }}
        </v-btn>
      </v-col>
      <v-col class="outerCol pr-2" id="lastCol" cols="2"> 
        Source code:   
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class HomeFooter extends Vue {
  private links: Array<string> = ["Vue.js", "Firebase", "Veutify"];
}
</script>

<style scoped>
.outerCol {
  color: white;
  display: flex;
  align-items: center;
}

#middleCol{
  display: flex;
  justify-content: center;
  align-items: center;
}

#lastCol{
  justify-content: flex-end;
}


</style>