<template>
  <div class="outermostDiv">
    <h1 id="lobbyHeader">Lobby:</h1>
    <div id="centralColumnOuter">
      <div id="topRow">
        <div id="textFieldsOuterColumn">
          <div id="nameRow">
              <name-entry>
                <template v-slot:iconImage>
                  <v-img :src="nameIconPath" height="90px" contain></v-img>
                </template>
              </name-entry>
          </div>
          <div id="aliasRow">
              <alias-entry>
                <template v-slot:iconImage>
                  <v-img :src="aliasIconPath" height="90px" contain></v-img>
                </template>
              </alias-entry>
          </div>
        </div>
        <div id="colourAndShipsColumn">I am the left column</div>
      </div>
      <div id="bottomRow">I am the bottom row</div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { playerStatus } from '@/models/enums'
import NameEntry from "@/components/NameEntry.vue";
import AliasEntry from "@/components/AliasEntry.vue";

@Component({
  name: "Lobby",
  components: {
    NameEntry,
    AliasEntry
  }
})
export default class Lobby extends Vue {
  nameIconPath: string = require("@/assets/lobby/person_icon_black.png");
  aliasIconPath: string = require("@/assets/lobby/alias_icon_black.png");

  name: string = "";
  nameRules = [
    (v: string) =>
      v.length <= 14 || "Sorry, names are limited to 14 characters max",
  ];

  mounted(){
    this.$store.dispatch('playerStore/setMyStatus', playerStatus.CreatingProfile)
  }
}
</script>

<style scoped>
.outermostDiv {
  align-items: center;
}

#lobbyHeader {
  font-size: 30pt;
  font-family: Tahoma, sans-serif;
  margin-left: 18px;
  width: 100%;
  text-align: left;
}

#centralColumnOuter {
  width: 75%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
}

#topRow {
  width: 100%;
  display: flex;
  flex-grow: 1;
}
#bottomRow {
  background-color: lightgreen;
  width: 100%;
  display: flex;
  height: 100px;
}

#textFieldsOuterColumn {
  width: 40%;
  display: flex;
  flex-direction: column;
}

#colourAndShipsColumn {
  display: flex;
  flex-grow: 1;
  background-color: lightblue;
}

#nameRow {
  display: flex;
}
#aliasRow {
  margin-top: 50px;
  display: flex;
  flex-grow: 1;
}

.iconColumn {
  width: 20%;
  padding-top: 5px;
}

.textFieldColumn {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.textfieldPrompt {
  margin-top: 4px;
}

.textField {
  flex-grow: 0;
}

.bulletList {
  margin-left: 15px;
  margin-top: -6px;
  margin-bottom: 10px;
}

</style>
