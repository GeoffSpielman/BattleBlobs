<template>
  <div id="powerupsOutermost">
    <h4 id="powerupsRemainingTitle"> Remaining </h4>
    <individual-powerup v-for="(powerup, i) in powerupsList" :key=i :powerupDetails="powerup"></individual-powerup>
  </div>
</template>


<script lang="ts">
import { Component, Vue} from "vue-property-decorator";
import IndividualPowerup from "@/components/game/powerups/IndividualPowerup.vue";
import {PowerupEntry} from "@/models/interfaces";

@Component({
  name: "PowerupsDisplay",
  components: {
    IndividualPowerup,
  },
})
export default class PowerupsDisplay extends Vue {
  powerupsList: PowerupEntry[] = this.$store.getters['powerupStore/getPowerupsList'];
}
</script>

<style scoped>
#powerupsOutermost {
  height: 100%;
  width: 100%;
  text-align: center;
}

#powerupsRemainingTitle{
  text-decoration: underline;
  font-size: 13pt;
  margin-top: 3px;
}

</style>
