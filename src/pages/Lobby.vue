<template>
  <div class="outermostDiv">
    <h1 id="lobbyHeader">Lobby:</h1>
    <div id="centralColumnOuter">
      <div id="topRow">
        <div id="textFieldsOuterColumn">
          <div class="compRow">
            <div class="iconColumn">
              <img class="iconImg" :src="nameIconPath" />
            </div>
            <name-entry @namevalidupdate="nameValidUpdate"> </name-entry>
          </div>
          <div class="compRow bottomCompRow">
            <div class="iconColumn">
              <img class="iconImg" :src="aliasIconPath" />
            </div>
            <alias-entry @aliasvalidupdate="aliasValidUpdate"> </alias-entry>
          </div>
        </div>
        <div id="colourAndShipsColumn">
          <div class="compRow">
            <div class="iconColumn">
              <img class="iconImg" :src="colourIconPath" />
            </div>
            <colour-selector> </colour-selector>
          </div>
          <div class="compRow bottomCompRow">
            <div class="iconColumn">
              <img class="iconImg" :src="shipIconPath" />
            </div>
            <ship-entry @shipsvalidupdate="shipsValidUpdate"> </ship-entry>
          </div>
        </div>
        <v-overlay id="disableOverlay" :value="lockedIn" opacity="0.2">
        </v-overlay>
      </div>
      <div id="bottomRow">
        <div id="readyButtonsDiv">
          <v-btn
            x-large
            elevation="2"
            color="success"
            class="mt-10"
            @click="startBtnClicked"
            :disabled="lockedIn"
            >{{
              lockedIn
                ? "Locked In - Waiting for Other Players..."
                : "Ready to Start"
            }}
          </v-btn>
          <p id="errorMessage">{{ errorMessage }}</p>
          <v-btn
            class="mt-2"
            small
            :style="{
              display: lockedIn ? 'flex' : 'none',
            }"
            @click="changedMindBtnClicked"
          >
            I changed my mind
          </v-btn>
        </div>

        <div id="playersReadyDiv">
          <h3 class="mb-1">0 Players Ready to Start</h3>
        </div>
      </div>
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
  name: string = "";
  nameRules = [
    (v: string) =>
      v.length <= 14 || "Sorry, names are limited to 14 characters max",
  ];

  errorMessage: string = "";
  lockedIn: boolean = false;

  get colourIconPath(): string {
    return this.$store.getters["clientSpecificStore/getColourIconPath"];
  }

  get colourValid() {
    return this.$store.getters["clientSpecificStore/getSelectedColourHex"] ===
      "#252525"
      ? false
      : true;
  }

  nameValid: boolean = false;
  aliasValid: boolean = false;
  shipsValid: boolean = false;

  nameValidUpdate(recVal: boolean) {
    this.nameValid = recVal;
  }
  aliasValidUpdate(recVal: boolean) {
    this.aliasValid = recVal;
  }
  shipsValidUpdate(recVal: boolean) {
    this.shipsValid = recVal;
  }

  startBtnClicked() {
    console.log("name valid: " + this.nameValid);
    console.log("alias valid: " + this.aliasValid);
    console.log("colour valid: " + this.colourValid);
    console.log("ships valid: " + this.shipsValid);

    if (!this.nameValid) {
      this.errorMessage = "Please enter a valid name";
    } else if (!this.aliasValid) {
      this.errorMessage = "Please enter a valid alias";
    } else if (!this.colourValid) {
      this.errorMessage = "Please select a colour";
    } else if (!this.shipsValid) {
      this.errorMessage = "Please build 2 valid ships";
    } else {
      this.errorMessage = "";
      this.lockedIn = true;
      //TODO: set status to 'ready for start'
      //TODO: send all data up to playerStore
    }
  }

  changedMindBtnClicked() {
    this.lockedIn = false;
  }

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

#textFieldsOuterColumn {
  width: 40%;
  display: flex;
  flex-direction: column;
}

#colourAndShipsColumn {
  display: flex;
  flex-grow: 1;
  flex-basis: 0;
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

#bottomRow {
  width: 100%;
  display: flex;
  height: 200px;
  flex-direction: column;
}

#readyButtonsDiv {
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
}

#errorMessage {
  margin: 8px 0px 0px 0px;
  color: red;
  font-weight: bold;
}

#playersReadyDiv {
  display: flex;
  justify-content: center;
}

#disableOverlay {
  top: 40px;
  bottom: 180px;
}
</style>
