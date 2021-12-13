<template>
  <div class="outermostDiv">
    <h1 class="pageHeader">Host:</h1>
    <div id="hostContentDiv">
      <div id="statusColumnContainer">
        <status-column></status-column>
      </div>
      <div id="clientsTableContainer">
        <clients-table></clients-table>
      </div>
      <div id="controlButtonsContainer">
        <control-buttons></control-buttons>
      </div>
      <div id="configColumnContainer">
        <config-column></config-column>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import StatusColumn from "@/components/host/StatusColumn.vue";
import ClientsTable from "@/components/host/ClientsTable.vue";
import ControlButtons from "@/components/host/ControlButtons.vue";
import ConfigColumn from "@/components/host/ConfigColumn.vue";
import { PlayerStatus } from "@/models/enums";

@Component({
  name: "Host",
  components: {
    StatusColumn,
    ClientsTable,
    ControlButtons,
    ConfigColumn,
  },
})
export default class Host extends Vue {
  mounted() {
    this.$store.dispatch("playerStore/setMyStatus", PlayerStatus.Hosting);
    this.$store.dispatch("playerStore/setMyName", "== HOST ==");
  }
}
</script>

<style scoped>
#hostContentDiv {
  display: grid;
  grid-template-rows: 1fr min-content;
  grid-template-columns: minmax(190px, 1fr) 3fr minmax(170px, 1fr);
  flex-grow: 1;
  height:100px;
}
#statusColumnContainer {
  grid-column: 1/2;
  grid-row: 1/3;
}

#clientsTableContainer {
  grid-column: 2/3;
  grid-row: 1/2;
  overflow-y: auto;
}

#controlButtonsContainer {
  grid-column: 2/3;
  grid-row: 2/3;
}

#configColumnContainer {
  grid-column: 3/4;
  grid-row: 1/3;
}
</style>
