<template>
  <div id="individualPlayerDisplayOutermost">
    <div id="topRow">{{ playerCaptainNum }}</div>
    <v-card elevation="3" id="cardOutermost">
      <div id="aliasRow">
        <h3 id="alias">{{ playerAlias }}</h3>
      </div>
      <div id="powerupsArea"> <img class="iconImg" v-for="(powerupIcon, i) in playerPowerups" :key=i :src="iconPath(powerupIcon)"/>
      </div>
    </v-card>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop, Mixins } from "vue-property-decorator";
import { PowerupIconPathMixin } from "@/mixins/PowerupIconPathMixin";
import { PowerupName } from "@/models/enums";

@Component({
  name: "IndividualPlayerDisplay",
})
export default class IndividualPlayerDisplay extends Mixins(
  PowerupIconPathMixin
) {
  @Prop({ required: true }) readonly playerKey!: string;

  get playerAlias(): string {
    return this.$store.getters["playerStore/getAliasUsingKey"](this.playerKey);
  }

  get playerCaptainNum(): number {
    return this.$store.getters["playerStore/getCaptainNumUsingKey"](
      this.playerKey
    );
  }

  get playerPowerups(): string[] {
    console.log(this.iconPath("test"));
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
  }
}
</script>

<style scoped>
#individualPlayerDisplayOutermost {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 220px;
}

#topRow {
  height: 25px;
  text-align: center;
}

#cardOutermost {
  height: 100%;
  width: 100%;
  background-color: lightblue;
  border: 1px solid rgba(100, 100, 100, 0.05);
  display: flex;
  flex-direction: column;
}

#aliasRow {
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: center;
}

#alias {
  background-color: yellow;
}

#powerupsArea {
  flex-grow: 1;
}

.iconImg{
  width: 40px;
}
</style>
