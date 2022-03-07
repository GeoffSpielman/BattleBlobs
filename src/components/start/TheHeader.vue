<template>
  <div
    id="headerOuterDiv"
    :class="showLargeHeader ? 'largeHeader' : 'smallHeader'"
  >
    <transition name="welcomeFade" appear>
      <h2
        id="welcomeDiv"
        :class="showLargeHeader ? 'largeWelcome' : 'smallWelcome'"
      >
        Welcome to
      </h2>
    </transition>
    <div id="mainTitleRow">
       <div
        class="headerIconContainer"
        :style="{ opacity: showSignedIn ? '1' : '0' }"
      >
        <v-btn icon color="white" @click="showSignedInDrawer = !showSignedInDrawer" :disabled="!showSignedIn">
          <v-icon> mdi-account-circle</v-icon>
        </v-btn>
      </div>
      <transition name="titleGrow" appear>
        <h1
          id="titleDiv"
          :class="showLargeHeader ? 'largeTitle' : 'smallTitle'"
        >
          {{gameName}}
        </h1>
      </transition>
      <div
        class="headerIconContainer"
        :style="{ opacity: showSettingsCog ? '1' : '0' }"
      >
        <v-btn icon color="white" @click="showSettingsDrawer = !showSettingsDrawer">
          <v-icon> mdi-cog</v-icon>
        </v-btn>
      </div>
    </div>

    <v-navigation-drawer v-model="showSettingsDrawer" absolute temporary right width="300px">
      <settings-pane></settings-pane>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="showSignedInDrawer" absolute temporary left width="370px">
      <signed-in-pane></signed-in-pane>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import SettingsPane from "@/components/start/SettingsPane.vue";
import SignedInPane from "@/components/start/SignedInPane.vue";


@Component({
  name: "TheHeader",
  components:{
    SettingsPane,
    SignedInPane,
  }
})
export default class TheHeader extends Vue {
  showLargeHeader: boolean = true;
  showSettingsCog: boolean = false;
  showSettingsDrawer: boolean = false;
  showSignedInDrawer: boolean = false;

  get gameName(): string{
    return this.$store.getters["gameStore/getGameName"]
  }

  get showSignedIn(): boolean{
    return this.$store.getters['clientSpecificStore/getSignedIn'] && this.showSettingsCog;
  }

  @Watch("$route", { immediate: true })
  onRouteChange(newRoute: Route) {
    if (newRoute.name === "Start") {
      this.showLargeHeader = true;
      this.showSettingsCog = false;
    } else {
      this.showLargeHeader = false;
      this.showSettingsCog = true;
    }
  }
}
</script>

<style scoped>
#headerOuterDiv {
  z-index: 2;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #0d47a1;
  color: white;
  transition: all 0.5s ease;
}
.largeHeader {
  height: 187px;
}
.smallHeader {
  height: 40px;
}

#welcomeDiv {
  font-family: Georgia, Helvetica, Tahoma, Geneva, sans-serif;
  transition: all 0.5s ease;
}
.largeWelcome {
  font-size: 26pt;
  transform: translateY(0px);
  margin-top: 15px;
  height: 52px;
}
.smallWelcome {
  font-size: 15pt;
  transform: translateY(-20px);
  margin-top: -2px;
  height: 0px;
}

#mainTitleRow {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}
.headerIconContainer {
  width: 36px;
  height: 100%;
  display: flex;
  align-items: center;
  transition: all 0.35s ease;
  transition-delay: 0.15s;
}


#titleDiv {
  text-align: center;
  overflow: hidden;
  font-family: Copperplate Gothic, Tahoma, sans-serif;
  transition: all 0.5s ease;
}
.largeTitle {
  font-size: 100px;
  margin-top: -20px;
  letter-spacing: normal;
}
.smallTitle {
  font-size: 22pt;
  letter-spacing: 2px;
}

/* animations (on intial load) */
.welcomeFade-enter-active {
  animation: fade-in-welcome 2.5s;
  animation-delay: 0.1s;
  animation-fill-mode: backwards;
}
@keyframes fade-in-welcome {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.titleGrow-enter-active {
  animation: grow-in-title 2.5s ease-out;
  animation-delay: 1s;
  animation-fill-mode: backwards;
}
@keyframes grow-in-title {
  from {
    width: 0px;
  }
  to {
    width: 855px;
  }
}
</style>