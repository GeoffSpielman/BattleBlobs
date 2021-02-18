<template>
  <div class="outermostDiv">
    <home-title></home-title>
    <div id="buttonsRow">
      <v-btn x-large color="primary" class="mx-5 px-5"><v-icon class="px-2"> mdi-information-outline</v-icon>Learn How To Play</v-btn>
      <v-btn x-large color="primary" class="mx-5 px-5"><v-icon class="px-2" > mdi-fast-forward</v-icon>Skip To Lobby</v-btn>
    </div>
    <home-footer></home-footer>
  </div>
</template>



<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HomeTitle from "@/components/HomeTitle.vue"
import HomeFooter from "@/components/HomeFooter.vue";

@Component({
  components: {
    HomeFooter,
    HomeTitle
  },
})
export default class Home extends Vue {}
</script>

<style scoped>

#buttonsRow{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  background-image: url("../assets/Home/homepage.jpg");
  background-repeat: no-repeat;
  background-size: contain;
}
  
</style>