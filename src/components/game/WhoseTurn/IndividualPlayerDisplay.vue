<template>
  <div id="individualPlayerDisplayOutermost">
    <div id="topRow">
      <h4 v-if="colourAssitanceModeOn" id="captainNum">{{ playerCaptainNum }}</h4>
      <v-icon v-if="itsMyTurn" large>mdi-arrow-down-bold</v-icon>
    </div>
    <v-card
      elevation="3"
      id="cardOutermost"
      :style="{ backgroundColor: '#' + playerColour }"
    >
      <div id="aliasRow">
        <h3
          id="alias"
          :class="{
            whitestAliasBackdrop: aliasBackdropTone === 'whitest',
            mediumAliasBackdrop: aliasBackdropTone === 'medium',
            faintAliasBackdrop: aliasBackdropTone === 'faint',
          }"
        >
          {{ playerAlias }}
        </h3>
      </div>
      <div id="powerupsArea">
        <img
          class="iconImg"
          v-for="(powerupIcon, i) in playerPowerups"
          :key="i"
          :src="iconPath(powerupIcon)"
        />
      </div>
    </v-card>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop, Mixins } from "vue-property-decorator";
import { PowerupIconPathMixin } from "@/mixins/PowerupIconPathMixin";
import { TextBackgroundColourMixin } from "@/mixins/TextBackgroundColourMixin"
import { PowerupName } from "@/models/enums";

@Component({
  name: "IndividualPlayerDisplay",
})
export default class IndividualPlayerDisplay extends Mixins(
  PowerupIconPathMixin,
  TextBackgroundColourMixin
) {
  @Prop({ required: true }) readonly playerKey!: string;

  get playerAlias(): string {
    if (
      this.$store.getters["playerStore/getPlayerKeyInDatabase"](this.playerKey)
    ) {
      return this.$store.getters["playerStore/getAliasUsingKey"](
        this.playerKey
      );
    } else {
      return "Removed :(";
    }
  }

  get playerColour(): string {
    if (
      this.$store.getters["playerStore/getPlayerKeyInDatabase"](this.playerKey)
    ) {
      // does not include # before the hex code
      return this.$store.getters["playerStore/getColourUsingKey"](
        this.playerKey
      );
    } else {
      return "FFFFFF";
    }
  }

  get aliasBackdropTone(): string {
    return this.textBackgroundClass(this.playerColour)
  }

  get playerCaptainNum(): number {
    if (
      this.$store.getters["playerStore/getPlayerKeyInDatabase"](this.playerKey)
    ) {
      return this.$store.getters["playerStore/getCaptainNumUsingKey"](
        this.playerKey
      );
    } else {
      return -1;
    }
  }

  get playerPowerups(): string[] {
    if (
      this.$store.getters["playerStore/getPlayerKeyInDatabase"](this.playerKey)
    ) {
      let powerupsList: string[] = [];
      let entirePowerupsObject = this.$store.getters[
        "playerStore/getPowerupsUsingKey"
      ](this.playerKey);
      Object.keys(entirePowerupsObject).forEach((powerup: string) => {
        if (powerup !== PowerupName.None) {
          for (let i = 0; i < entirePowerupsObject[powerup]; i++) {
            powerupsList.push(powerup);
          }
        }
      });
      return powerupsList;
    } else {
      return [];
    }
  }

  get itsMyTurn(): boolean {
    return (
      this.playerKey ===
      this.$store.getters["gameStore/getWhoseTurn"]
    );
  }

  get colourAssitanceModeOn(): boolean {
    return this.$store.getters["clientSpecificStore/getColourAssistanceMode"];
  }
}
</script>

<style lang="scss" scoped>
#individualPlayerDisplayOutermost {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 220px;
}

#topRow {
  height: 38px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
}

#captainNum {
  margin: 0px;
}

#cardOutermost {
  flex-grow: 1;
  flex-basis: 10px;
  width: 100%;
  border: 1px solid rgba(100, 100, 100, 0.05);
  display: flex;
  flex-direction: column;
  border-radius: 10px;
}

#aliasRow {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  padding-top: 2px;
}

#alias {
  padding: 0px 4px 4px 4px;
  border-radius: 5px;
}

.whitestAliasBackdrop {
  background-color: $text-background-whitest
}

.mediumAliasBackdrop {
  background-color: $text-background-medium
}

.faintAliasBackdrop {
  background-color: $text-background-faint
}

#powerupsArea {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.iconImg {
  width: 38px;
  height: 38px;
  margin: 0px 8px 0px 8px;
}
</style>
