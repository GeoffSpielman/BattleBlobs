<template>
  <div id="clientsTableOutermostDiv">
    <v-simple-table class="mt-1 mx-2" id="playersTable">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-center">Status</th>
          <th class="text-center">Captain Num</th>
          <th class="text-center">Key</th>
          <th class="text-center">Override</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="player in playersList"
          :key="player.key"
          :style="{
            color:
              player.status === PlayerStatus.Disconnected ? 'red' : 'black',
          }"
        >
          <td>{{ player.name }}</td>
          <td class="text-center">{{ player.status }}</td>
          <td class="text-center">{{ player.captainNum }}</td>
          <td class="text-center">{{ player.key }}</td>
          <td class="text-center">
            <v-btn
              v-if="player.key !== myKey"
              :key="player.key + 'removeBtn'"
              @click="removeBtnClicked(player.key)"
              small
              color="error lighten-1"
              class="py-1 text-none"
              style="color: black"
              ><v-icon dense class="pr-2"> mdi-delete-forever</v-icon>Remove
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { PlayerEntry } from "@/models/interfaces";
import { PlayerStatus } from "@/models/enums";

@Component({
  name: "ClientsTable",
  components: {
    
  },
})
export default class ClientsTable extends Vue {
  PlayerStatus = PlayerStatus;

  get playersList(): PlayerEntry[] {
    return this.$store.getters["playerStore/getPlayersList"];
  }

  get myKey(): string {
    return this.$store.getters["playerStore/getMyKey"];
  }
}
</script>

<style scoped>



#clientsTableOutermostDiv {
  display: flex;
  flex-direction: column;
  width: 100%;
}

#playersTable th {
  font-size: 12pt;
}

#playersTable td {
  height: 36px;
}
</style>
