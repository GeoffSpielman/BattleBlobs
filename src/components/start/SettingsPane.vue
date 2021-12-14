<template>
  <div id="SettingsPaneOutermostDiv">
      <h1> Settings</h1>
</div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";


@Component({
  name: "SettingsPane",
  components: {
  },
})
export default class SettingsPane extends Vue {
  
}
</script>

<style scoped>

#SettingsPaneOutermostDiv {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  z-index: -1;
}

h1{
    color: black;
    text-align: center;
    margin-top: 5px;
}
</style>
