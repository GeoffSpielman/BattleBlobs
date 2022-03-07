<template>
    <div id="TableColumnOutermostDiv">
        <v-card
          class="tableCard"
          outlined
          elevation="2"
          id="activePlayersCard"
        >
          <current-players-table></current-players-table>
        </v-card>

        <v-card
          class="tableCard"
          outlined
          elevation="2"
          id="authorizedPlayersCard"
        >
         <authorized-players-table></authorized-players-table>
        </v-card>
    </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CurrentPlayersTable from "@/components/host/CurrentPlayersTable.vue";
import AuthorizedPlayersTable from "@/components/host/AuthorizedPlayersTable.vue"



@Component({
  name: "TablesColumn",
  components: {
    CurrentPlayersTable,
    AuthorizedPlayersTable,    
  },
})
export default class TablesColumn extends Vue {
  

}
</script>

<style scoped>

#TableColumnOutermostDiv {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.tableCard {
  margin: 5px;
  border-radius: 10px;
  display: flex;
}


#activePlayersCard{
    height: 10px;
    flex-grow: 1;
}

#authorizedPlayersCard{
    height: 230px;
}

</style>
