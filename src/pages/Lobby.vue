<template>
  <div class="outermostDiv">
    <h1 id="lobbyHeader">Lobby:</h1>
    <div id="centralColumnOuter">
      <div id="topRow">
        <div id="textFieldsOuterColumn">
          <div class="compRow">
            <div class="iconColumn">
               <img class="iconImg" :src="nameIconPath">
            </div>
            <name-entry>
            </name-entry>
          </div>
          <div class="compRow bottomCompRow">
             <div class="iconColumn">
               <img class="iconImg" :src="aliasIconPath">
            </div>
            <alias-entry>
            </alias-entry>
          </div>
        </div>
        <div id="colourAndShipsColumn">
          <div class="compRow">
            <div class="iconColumn">
               <img class="iconImg" :src="colourIconPath">
            </div>
            <colour-selector>
            </colour-selector>
          </div>
          <div class="compRow bottomCompRow">
            <div class="iconColumn">
               <img class="iconImg" :src="shipIconPath">
            </div>
            <ship-entry>
            </ship-entry>
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
import ShipEntry from "@/components/lobby/ShipEntry.vue";

@Component({
  name: "Lobby",
  components: {
    NameEntry,
    AliasEntry,
    ColourSelector,
    ShipEntry,
  },
})
export default class Lobby extends Vue {
  nameIconPath: string = require("@/assets/lobby/person_icon.png");
  aliasIconPath: string = require("@/assets/lobby/alias_icon.png");
  shipIconPath: string = require("@/assets/lobby/ship_icon.png");

  get colourIconPath(): string{
    return this.$store.getters['clientSpecificStore/getColourIconPath'];
  }

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
  width: 70%;
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
  padding-left: 65px;
}

.compRow {
  display: flex;
}

.bottomCompRow {
  margin-top: 50px;
  display: flex;
  flex-grow: 1;
}

.iconColumn {
  width: 8vw;
  max-width: 80px;
  padding-right: 8px;
}

.iconImg {
  width: 100%;
}
</style>
