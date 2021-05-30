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
import configuredDatabase from "@/store/firebase";
import firebase from "firebase/app";
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
  myPlayerStatusRef: firebase.database.Reference | null = null;
  myPlayerKeyRef: firebase.database.Reference | null = null;
  connectedRef: firebase.database.Reference = configuredDatabase.database.ref(
    ".info/connected"
  );

  showDisconnectedDialog: boolean = false;

  get gameStatus(): GameStatus {
    return this.$store.getters["gameStore/getGameStatus"];
  }

  @Watch("gameStatus")
  gameStatusChanged(newVal: GameStatus) {
    if (newVal === GameStatus.GameInProgress && this.$route.name !== "Host") {
      this.$router.push("/play");
    }
  }

  created() {


    



    //put the user back on the home page if they clicked 'refresh'
    if (this.$route.name !== "Start" && this.$route.name !== "Host") {
      this.$router.push("/");
    }

    //react to disconnection/reconnection
    this.connectedRef.on("value", (snapshot) => {
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
          case "Image Credits": {
            this.$store.dispatch(
              "playerStore/setMyStatus",
              PlayerStatus.ReadingImageCredits
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
      //disconnect
      else if (this.$store.getters["playerStore/getMyKey"] !== "") {
        this.showDisconnectedDialog = true;
      }
    });

    //initialize stores
    this.$store.dispatch("playerStore/getFirebaseDatabase");
    this.$store.dispatch("lobbyStore/getFirebaseDatabase");
    this.$store.dispatch("shipsStore/getFirebaseDatabase");
    this.$store.dispatch("gameStore/getFirebaseDatabase");
    this.$store.dispatch("chatStore/getFirebaseDatabase");
    this.$store.dispatch("powerupStore/getFirebaseDatabase");

    //initilize client instance (player object) in database
    this.$store.dispatch("playerStore/intializeClient").then(() => {
      this.myPlayerStatusRef = configuredDatabase.database.ref(
        "players/" + this.$store.getters["playerStore/getMyKey"] + "/status"
      );
      this.myPlayerKeyRef = configuredDatabase.database.ref(
        "players/" + this.$store.getters["playerStore/getMyKey"] + "/key"
      );
      this.myPlayerStatusRef.onDisconnect().set(PlayerStatus.Disconnected);
      this.myPlayerKeyRef
        .onDisconnect()
        .set(this.$store.getters["playerStore/getMyKey"]);
    });

/*
*/


    
    


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
