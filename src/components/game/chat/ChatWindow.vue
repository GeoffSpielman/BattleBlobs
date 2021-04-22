<template>
  <div id="chatWindowOutermost">
    <v-tabs vertical v-model="tab" id="tabsOutermostDOM">
      <v-tab id="dummyTab">te</v-tab>
      <v-tab class="tabOuter"> <div class="tabInner">Public</div></v-tab>
      <v-tab class="tabOuter" v-for="chat in chatsToShow" :key="chat.pairingKey + 'tab'"> <div class="tabInner">{{chat.otherPlayerAlias}}</div> </v-tab>
      

       <v-tab-item :transition="chatTransition" class="chatItem">
        corresponds to dummy tab - never shown
      </v-tab-item>
      <v-tab-item :transition="chatTransition" class="chatItem">
        <individual-chat-pane :isPublic=true :chatKey="'public'" :otherPlayerAlias="null"></individual-chat-pane>
      </v-tab-item>
      <v-tab-item :transition="chatTransition" class="chatItem" v-for="chat in chatsToShow" :key="chat.pairingKey + 'convo'">
        <individual-chat-pane :isPublic=false :chatKey="chat.pairingKey" :otherPlayerAlias="chat.otherPlayerAlias"></individual-chat-pane>
      </v-tab-item>
    </v-tabs>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IndividualChatPane from "@/components/game/chat/IndividualChatPane.vue";

@Component({
  name: "ChatWindow",
  components: {
    IndividualChatPane,
  },
})
export default class ChatWindow extends Vue {
  chatTransition: string = "fade-transition";
  headerText: string = "Public Chat";
  tab: number = 1;

  get chatsToShow(): {'pairingKey': string; 'otherPlayerAlias': string}[]{
    return this.$store.getters['chatStore/getMyPairings'](this.$store.getters['playerStore/getMyKey']);  
  }

  
    
}
</script>

<style scoped>
#chatWindowOutermost {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 8px;
}

#chatWindowOutermost >>> .v-tabs-items {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 15px;
}

.tabOuter {
  height: 100px !important;
  min-width: 30px !important;
  width: 30px !important;
  padding: 0px;
}

.tabInner {
  transform: rotate(-90deg);
}

#dummyTab {
  width: 30px !important;
  min-width: 30px !important;
  height: 25px !important;
  visibility: hidden;
}

#tabsOutermostDOM >>> .v-window__container{
  height: 100%;
}

.chatItem{
  height: 100%;
}
</style>
