<template>
  <div class="outermostDiv">
    <h1 id="lobbyHeader">Lobby:</h1>
    <div id="centralColumnOuter">
      <div id="topRow">
        <div id="textFieldsOuterColumn">
          <div id="nameRow">
            <name-entry>
              <template v-slot:iconImage>
                <v-img :src="nameIconPath" max-height= "90px" contain></v-img>
              </template>
            </name-entry>
          </div>
          <div id="aliasRow">
            <alias-entry>
              <template v-slot:iconImage>
                <v-img :src="aliasIconPath" max-height="90px" contain></v-img>
              </template>
            </alias-entry>
          </div>
        </div>
        <div id="colourAndShipsColumn">
          <div id="colourRow">
            <colour-selector>
              <template v-slot:iconImage>
                <v-img :src="colourIconPath" max-height="90px" contain></v-img>
              </template>
            </colour-selector>
          </div>
          <div id="shipsRow">
            <ship-builder>
              <template v-slot:iconImage>
                <v-img :src="shipIconPath" max-height="90px" contain></v-img>
              </template>
            </ship-builder>
          </div>
        </div>
      </div>
      <div id="bottomRow">I am the bottom row</div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { PlayerStatus } from "@/models/enums";
import NameEntry from "@/components/lobby/NameEntry.vue";
import AliasEntry from "@/components/lobby/AliasEntry.vue";
import ColourSelector from "@/components/lobby/ColourSelector.vue";
import ShipBuilder from "@/components/lobby/ShipBuilder.vue";

@Component({
  name: "Lobby",
  components: {
    NameEntry,
    AliasEntry,
    ColourSelector,
    ShipBuilder,
  },
})
export default class Lobby extends Vue {
  nameIconPath: string = require("@/assets/lobby/person_icon_black.png");
  aliasIconPath: string = require("@/assets/lobby/alias_icon_black.png");
  colourIconPath: string = require("@/assets/lobby/colour_icon_black.png");
  shipIconPath: string = require("@/assets/lobby/ship_icon_black.png");

  name: string = "";
  nameRules = [
    (v: string) =>
      v.length <= 14 || "Sorry, names are limited to 14 characters max",
  ];

  mounted() {
    this.$store.dispatch(
      "playerStore/setMyStatus",
      PlayerStatus.CreatingProfile
    );
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
  flex-direction: column;
  padding-left: 55px;
}

#nameRow {
  display: flex;
}
#aliasRow {
  margin-top: 50px;
  display: flex;
  flex-grow: 1;
}

#colourRow {
  display: flex;
  height: 200px;
}

#shipsRow {
  display: flex;
  flex-grow: 1;
  margin-top: 50px;
}
</style>
