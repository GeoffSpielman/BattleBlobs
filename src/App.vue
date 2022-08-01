<template>
  <v-app>
    <v-main class="outermostDiv">
      <the-header></the-header>
      <div id="pageContainingDiv">
        <transition name="fadePages" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
      <the-footer></the-footer>
    </v-main>

    <v-dialog v-model="showDisconnectedDialog" persistent width="600">
      <disconnected-card></disconnected-card>
    </v-dialog>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import TheHeader from "@/components/start/TheHeader.vue";
import TheFooter from "@/components/start/TheFooter.vue";
import DisconnectedCard from "@/components/start/DisconnectedCard.vue";
import database from "@/store/firebase";
import {ref, onValue, onDisconnect} from "firebase/database";
import { PlayerStatus } from "@/models/enums";
import { GameStatus } from "@/models/enums";

@Component({
  name: "App",
  components: {
    TheHeader,
    TheFooter,
    DisconnectedCard,
  },
})
export default class App extends Vue {

  showDisconnectedDialog: boolean = false;

  get gameStatus(): GameStatus {
    return this.$store.getters["gameDataStore/getGameStatus"];
  }

  @Watch("gameStatus")
  gameStatusChanged(newVal: GameStatus) {
    //Todo - change this so that only 'locked in' players are moved to the game screen, trigger this from the 'locked in players' area of the 'players' store
    if (newVal === GameStatus.GameInProgress && this.$route.name !== "Host") {
      //this.$router.push("/play");
    }
  }

  created() {


    


    /*
    //put the user back on the home page if they clicked 'refresh'
    if (this.$route.name !== "Start" && this.$route.name !== "Host") {
      this.$router.push("/");
    }
    */



    //react to disconnection/reconnection
    onValue(ref(database, ".info/connected"), (snapshot) => {
      //reconnect
      if (snapshot.val() === true) {
        this.showDisconnectedDialog = false;

        switch (this.$route.name) {
          case "Start": {
            this.$store.dispatch(
              "playerStore/setMyStatus",
              PlayerStatus.StartScreen
            );
            break;
          }
          case "Instructions": {
            this.$store.dispatch(
              "playerStore/setMyStatus",
              PlayerStatus.ReadingInstructions
            );
            break;
          }
          case "Lobby": {
            //TODO: what if they already were 'locked in' and ready to play?
            this.$store.dispatch(
              "playerStore/setMyStatus",
              PlayerStatus.CreatingProfile
            );
            break;
          }
          case "Game": {
            //TODO: how to rejoin the current game, what if the game ended while you were disconnected etc.
            this.$store.dispatch(
              "playerStore/setMyStatus",
              PlayerStatus.InGame
            );
            break;
          }
          case "Credits": {
            this.$store.dispatch(
              "playerStore/setMyStatus",
              PlayerStatus.ReadingCredits
            );
            break;
          }
          case "Host": {
            this.$store.dispatch(
              "playerStore/setMyStatus",
              PlayerStatus.Hosting
            );
            break;
          }
          default: {
            this.$store.dispatch(
              "playerStore/setMyStatus",
              PlayerStatus.ErrorUnknown
            );
            break;
          }
        }
      }
      //disconnected
      else if (this.$store.getters["playerStore/getMyKey"] !== "") {
        this.showDisconnectedDialog = true;
      }
    });

    //initialize stores
    this.$store.dispatch("playerStore/initializeDatabaseListeners");
    this.$store.dispatch("lobbyStore/initializeDatabaseListeners");
    this.$store.dispatch("shipsStore/initializeDatabaseListeners");
    
    this.$store.dispatch("chatStore/initializeDatabaseListeners");
    this.$store.dispatch("powerupStore/initializeDatabaseListeners");
    this.$store.dispatch("mapStore/initializeDatabaseListeners");

    this.$store.dispatch("authDataStore/initializeDatabaseListeners");
    this.$store.dispatch("gameDataStore/initializeDatabaseListeners");
    this.$store.dispatch("configDataStore/initializeDatabaseListeners");

    //initialize client instance (player object) in database
    this.$store.dispatch("playerStore/intializeClient").then(() => {
      //if the user gets disconnected, the database needs to be aware to inform the host and other players
     onDisconnect(ref(database, "players/" + this.$store.getters["playerStore/getMyKey"] + "/status")).set(PlayerStatus.Disconnected);
     onDisconnect(ref(database, "players/" + this.$store.getters["playerStore/getMyKey"] + "/key")).set(this.$store.getters["playerStore/getMyKey"]);
    });
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

.v-main__wrap {
  display: flex;
  flex-direction: column;
}
.outermostDiv {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.pageHeader {
  font-size: 26pt;
  font-family: Tahoma, sans-serif;
  margin-left: 18px;
  text-align: left;
}

#pageContainingDiv {
  flex-grow: 1;
}

/*transitions */
.fadePages-enter-active,
.fadePages-leave-active {
  transition-duration: 0.5s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fadePages-enter,
.fadePages-leave-active {
  opacity: 0;
}
</style>
