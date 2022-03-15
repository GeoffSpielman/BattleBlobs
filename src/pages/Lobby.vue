<template>  
  <div id="lobbyOutermost">
    <v-overlay id="disableOverlay" :value="lockedIn" opacity="0.2">
    </v-overlay>

    <h1 id="lobbyHeader" class="pageHeader">
      Lobby:
    </h1>

    <div id="nameIconContainer">
       <img class="iconImg" :src="nameIconPath" />
    </div>
    <section id="nameEntryContainer">
      <name-entry @namevalidupdate="nameValidUpdate"> </name-entry>
    </section>

    <div id="aliasIconContainer">
      <img class="iconImg" :src="aliasIconPath" />
    </div>
    <section id="aliasEntryContainer">
      <alias-entry @aliasvalidupdate="aliasValidUpdate"> </alias-entry>
    </section>

    <div id="colorIconContainer">
      <img class="iconImg" :src="colourIconPath" />
    </div>
    <section id="colourEntryContainer">
      <colour-selector> </colour-selector>
    </section>

    <div id="shipIconContainer">
      <img class="iconImg" :src="shipIconPath" />
    </div>
    <section id="shipEntryContainer">
      <ship-entry @shipsvalidupdate="shipsValidUpdate"> </ship-entry>
    </section>

    <section id="readyButtonsContainer">
      <div id="readyButtonsTop">
      <v-btn
        x-large
        elevation="2"
        color="success"
        class="mt-10"
        @click="startBtnClicked"
        :disabled="lockedIn"
        >
        {{
          lockedIn
            ? "Locked In - Waiting for Other Players..."
            : "Ready to Start"
        }}
      </v-btn>
      <v-btn @click='getIntoTroubleClicked'>Get into Trouble</v-btn>

      <p id="errorMessage">{{ errorMessage }}</p>
      <v-btn
            class="mt-2"
            small
            :style="{
              display: lockedIn ? 'inline' : 'none',
            }"
            @click="changedMindBtnClicked"
          >
            I changed my mind
      </v-btn>
      </div>

      <div id="playersReadyDiv">
        <h3 class="mb-1">{{numPlayersReadyToStart}} {{numPlayersReadyToStart > 1 ? 'Players': 'Player'}} Ready to Start</h3>
      </div>

    </section>


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


  getIntoTroubleClicked(){
    console.log("attempting to set map size to 12")
    this.$store.dispatch("configDataStore/setMapSize", 12);
  }



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

  get numPlayersReadyToStart() {
    return this.$store.getters["playerStore/getPlayersReadyCount"];
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

      this.$store.dispatch(
        "playerStore/setMyStatus",
        PlayerStatus.ReadyToStart
      );
      this.$store.dispatch("playerStore/lockedInUploadData");
    }
  }

  changedMindBtnClicked() {
    this.lockedIn = false;
    this.$store.dispatch(
      "playerStore/setMyStatus",
      PlayerStatus.CreatingProfile
    );
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

#lobbyOutermost {
  display: grid;
  grid-template-columns: [leftmost] 12vw [leftIconsStart] 80px [leftIconsEnd] 0.45fr [spacerStart] 70px [rightIconsStart] 80px [rightIconsEnd] 0.55fr [horizontalContentEnd] 12vw [rightmost];
  grid-template-rows: [topmost] 55px [headerEnd] 0.45fr [midLine] 0.55fr [readyButtonsStart] 190px [bottommost];
  height: 100%;
  width: 100%;
}

#lobbyHeader {
  grid-column: leftmost/rightmost;
  grid-row: topmost/headerEnd;
}

#nameIconContainer {
  grid-column: leftIconsStart/leftIconsEnd;
  grid-row: headerEnd/midLine;
}

#nameEntryContainer {
  grid-column: leftIconsEnd/spacerStart;
  grid-row: headerEnd/midLine;
}

#aliasIconContainer {
  grid-column: leftIconsStart/leftIconsEnd;
  grid-row: midLine/readyButtonsStart;
}

#aliasEntryContainer {
  grid-column: leftIconsEnd/spacerStart;
  grid-row: midLine/readyButtonsStart;
}

#colorIconContainer {
  grid-column: rightIconsStart/rightIconsEnd;
  grid-row: headerEnd/midLine;
}

#colourEntryContainer {
  grid-column: rightIconsEnd/horizontalContentEnd;
  grid-row: headerEnd/midLine;
}

#shipIconContainer {
  grid-column: rightIconsStart/rightIconsEnd;
  grid-row: midLine/readyButtonsStart;
}

#shipEntryContainer {
  grid-column: rightIconsEnd/horizontalContentEnd;
  grid-row: midLine/readyButtonsStart;
}

#readyButtonsContainer {
  grid-column: leftmost/rightmost;
  grid-row: readyButtonsStart/bottommost;

  display: flex;
  flex-direction: column;
}

#errorMessage {
  margin: 8px 0px 0px 0px;
  color: red;
  font-weight: bold;
}

#readyButtonsTop{
  display: block;
  text-align: center;
  flex-grow: 1;
}

#playersReadyDiv {
  display: flex;
  justify-content: center;
}

.iconImg {
  width: 100%;
}

#disableOverlay {
  top: 40px;
  bottom: 170px;
}

</style>
