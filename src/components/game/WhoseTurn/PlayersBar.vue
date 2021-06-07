<template>
  <div id="playersBarOutermost">
    <individual-player-display v-for="playerKey in currentPlayers" :key=playerKey :playerKey=playerKey></individual-player-display>
  </div>
</template>


<script lang="ts">
import { Component, Vue} from "vue-property-decorator";
import IndividualPlayerDisplay from "@/components/game/WhoseTurn/IndividualPlayerDisplay.vue";

@Component({
  name: "PlayersBar",
  components: {
    IndividualPlayerDisplay,
  },
})
export default class PlayersBar extends Vue {
  get currentPlayers(): string[]{
    return this.$store.getters["gameStore/getcurrentPlayersList"];
  }


}
</script>

<style scoped>
#playersBarOutermost {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

</style>
