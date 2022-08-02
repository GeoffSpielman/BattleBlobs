<template>
  <div class="outermostDiv">
    <h1 class="pageHeader">Host:</h1>
    <div id="hostContentDiv">
      <div id="statusColumnContainer">
        <status-column></status-column>
      </div>
      <div id="tablesColumnContainer">
        <tables-column></tables-column>
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
import TablesColumn from "@/components/host/TablesColumn.vue";
import ControlButtons from "@/components/host/ControlButtons.vue";
import ConfigColumn from "@/components/host/ConfigColumn.vue";
import { PlayerStatus } from "@/models/enums";

@Component({
  name: "Host",
  components: {
    StatusColumn,
    TablesColumn,
    ControlButtons,
    ConfigColumn,
  },
})
export default class Host extends Vue {

  mounted() {
    this.$store.dispatch(
      "playerStore/setMyStatus",
      PlayerStatus.Hosting
    );
  }
}
</script>

<style scoped>
#hostContentDiv {
  display: grid;
  height: 100%;
  grid-template-rows: 1fr 55px;
  grid-template-columns: minmax(210px, 1fr) 2.5fr minmax(170px, 1fr);
 
}
#statusColumnContainer {
  grid-column: 1/2;
  grid-row: 1/3;
}

#tablesColumnContainer {
  grid-column: 2/3;
  grid-row: 1/2;
  
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
