<template>
  <div class="outermostDiv">
    <home-title></home-title>
    <div id="buttonsRow">
      <transition-group name="buttonsFade" appear>
        <v-btn key="instructionsBtn" x-large color="primary" class="mx-10 px-5"
          ><v-icon class="pr-3"> mdi-information-outline</v-icon>Learn How To
          Play</v-btn
        >
        <v-btn key="lobbyBtn" x-large color="primary" class="mx-10 px-5"
          ><v-icon class="pr-3"> mdi-fast-forward</v-icon>Skip To Lobby</v-btn
        >
      </transition-group>
    </div>
    <home-footer></home-footer>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HomeTitle from "@/components/HomeTitle.vue";
import HomeFooter from "@/components/HomeFooter.vue";

@Component({
  components: {
    HomeFooter,
    HomeTitle,
  },
})
export default class Home extends Vue {}
</script>

<style scoped>
.outermostDiv {
  background-image: url("../assets/Home/homepage_backdrop.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center bottom;
}

#buttonsRow {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  background-image: url("../assets/Home/homepage.jpg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.buttonsFade-enter{
  opacity: 0;
}

.buttonsFade-enter-active {
  transition: opacity 2s;
  transition-delay: 3.2s;
}

</style>