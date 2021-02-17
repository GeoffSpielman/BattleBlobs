<template>
  <div class="outermostDiv">
    <div id="headerRow">
      <h1>I am the header row</h1>
    </div>
    <div id="buttonsRow">
      <h3> I am the buttons row </h3>
    </div>
    <home-footer></home-footer>
  </div>
</template>



<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HomeFooter from "@/components/HomeFooter.vue";

@Component({
  components: {
    HomeFooter,
  },
})
export default class Home extends Vue {}
</script>

<style scoped>

#headerRow{
  display: flex;
  flex-grow: 1;
}

#buttonsRow{
  display: flex;
  flex-grow: 2;
}


</style>