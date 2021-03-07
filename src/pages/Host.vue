<template>
  <div class="outermostDiv">
    <the-header></the-header>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-center">Status</th>
            <th class="text-center">Key</th>
            <th class="text-center">Overrides</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in playersList" :key="player.key">
            <td>{{ player.name }}</td>
            <td class="text-center">{{ player.status }}</td>
            <td class="text-center">{{ player.key }}</td>
            <td class="text-center">
              <v-btn
                key="player.key + skipBtn"
                @click="skipBtnClicked(player.name)"
                color="primary lighten-4"
                class="pr-3 pl-2 py-1 mr-2 text-none"
                style="color: black"
                ><v-icon dense class="pr-2"> mdi-debug-step-over</v-icon>Skip
              </v-btn>
              <v-btn
                key="player.key + removeBtn"
                @click="removeBtnClicked(player.name)"
                color="error"
                class="pr-3 pl-2 py-1 text-none"
                style="color: black"
                ><v-icon dense class="pr-2"> mdi-delete-forever</v-icon>Remove
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TheHeader from "@/components/TheHeader.vue";

import { PlayerEntry } from "@/models/interfaces";

@Component({
  components: { TheHeader },
  name: "Host",
})
export default class Host extends Vue {
  get playersList(): PlayerEntry[] {
    return this.$store.getters["playerStore/getPlayersList"];
  }

  skipBtnClicked(playerName: string) {
    console.log("skipped " + playerName);
  }

  removeBtnClicked(playerName: string) {
    console.log("removed " + playerName);
  }
}
</script>

<style scoped>
.outermostDiv {
  align-items: center;
}

#pageTitle {
  text-align: center;
  margin-top: 10px;
}

.leftLabel {
  width: 70%;
  margin-top: 10px;
}
</style>
