<template>
  <v-footer color="primary lighten-1" padless>
    <v-row justify="center" no-gutters>

      <v-col class="outerCol pl-2" cols="3"> 
        Copyright <v-icon dense color="white" class="px-1"> mdi-copyright</v-icon> 2021 Geoff Spielman
      </v-col>

      <v-col id="middleCol" cols="6">
        Powered by: 
        <a class="linkTag" href="https://vuejs.org/"> 
          <img class="linkImage" src="@/assets/Home/vue_js_logo.png"><img>
        </a>
        <a class="linkTag" href="https://firebase.google.com/"> 
          <img class="linkImage" src="@/assets/Home/firebase_logo.png"><img>
        </a>
        <a class="linkTag" href="https://vuetifyjs.com/en/"> 
          <img class="linkImage" src="@/assets/Home/vuetify_logo.png"><img>
        </a>
      </v-col>
      <v-col class="outerCol" id="lastCol" cols="3"> 
        Source code:
        <a class="linkTag" href="https://github.com/GeoffSpielman/BattleBlobs"> 
          <img id="githubImage" src="@/assets/Home/github_logo.png"><img>
        </a>   
      </v-col>
    </v-row>
  </v-footer>
</template>

<style scoped>
.outerCol {
  color: white;
  display: flex;
  align-items: center;
}

#middleCol{
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

#lastCol{
  justify-content: flex-end;
}

.linkTag{
  display: flex;
  align-items: center;
  justify-content: center;
}
.linkImage{
  height: 31px;
  border-radius: 15px;
  background-color: #E3F2FD;
  padding: 2px 8px;
  margin: 3px 0px 3px 10px;
}

.linkImage:hover{
  background-color: white;
}

#githubImage{
  height: 31px;
  margin: 3px 10px;
}

#githubImage:hover{
  background-color: #64B5F6;
}

</style>