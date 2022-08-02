<template>
  <div id="chatWindowOutermost">
    <v-tabs vertical v-model="currentTab" id="tabsOutermostDOM" @change="activeChatChanged">
      <v-tab class="tabOuter" style="maxHeight: 80px !important"> <div class="tabInner">Public <v-icon  v-if="publicShowNotification">mdi-message-alert</v-icon></div></v-tab>
      <v-tab
        class="tabOuter"
        v-for="chat in chatsToShow"
        :key="chat.pairingKey + 'tab'"
        :style="{ backgroundColor: '#' + chat.otherPlayerColour }"
      >
        <div class="tabInner">
          {{ chat.otherPlayerAlias }} <v-icon v-if="chat.showNotification">mdi-message-alert</v-icon>
        </div>
      </v-tab>

      <v-tab-item :transition="chatTransition" class="chatItem">
        <individual-chat-pane
          :isPublic="true"
          :chatKey="'public'"
          :otherPlayerAlias="null"
        ></individual-chat-pane>
      </v-tab-item>
      <v-tab-item
        :transition="chatTransition"
        class="chatItem"
        v-for="chat in chatsToShow"
        :key="chat.pairingKey + 'convo'"
      >
        <individual-chat-pane
          :isPublic="false"
          :chatKey="chat.pairingKey"
          :otherPlayerAlias="chat.otherPlayerAlias"
        ></individual-chat-pane>
      </v-tab-item>
    </v-tabs>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Watch} from "vue-property-decorator";
import IndividualChatPane from "@/components/game/chat/IndividualChatPane.vue";
import {ChatEntry} from "@/models/interfaces"
import database from "@/store/firebase";
import {ref, onChildAdded} from "firebase/database";

@Component({
  name: "ChatWindow",
  components: {
    IndividualChatPane,
  },
})
export default class ChatWindow extends Vue {
  chatTransition: string = "fade-transition";
  headerText: string = "Public Chat";
  currentTab: number = 0;
  chatsToShow: ChatEntry[] = [];
  publicShowNotification: boolean = false;


  mounted(){
    this.chatsToShow = this.$store.getters["chatStore/getMyPairings"](this.$store.getters["playerStore/getMyUID"]);

    // listen to private chats
    this.chatsToShow.forEach(chat => {
      onChildAdded(ref(database, "chat/convos/" + chat.pairingKey), (data) => {
        if (data.val().senderAlias === chat.otherPlayerAlias){
          this.newMessageInChat(chat.pairingKey, chat.otherPlayerAlias)
        }     
      });
    });

    //listen to the public chat
    onChildAdded(ref(database, "chat/convos/public"), (data) => {
        if (data.val().senderAlias !== this.$store.getters["playerStore/getMyAlias"]){
          this.newMessageInChat("public", data.val().senderAlias);
        }     
    });
  }

  newMessageInChat(convoKey: string, senderAlias: string){    
    if (convoKey === "public" && this.currentTab !== 0){
      this.publicShowNotification = true;
      console.log("new message in public that you have not seen")
    }
    else if (this.currentTab !== this.chatsToShow.findIndex((chat) => chat.pairingKey === convoKey)  + 1){
      console.log("new message received from " + senderAlias + " in chat " + convoKey + " that you have not seen");  
      let updatedChatEntry = this.chatsToShow.find((chat) => chat.pairingKey === convoKey);
      if (updatedChatEntry !== undefined){
        updatedChatEntry.showNotification = true;
        this.chatsToShow.splice(this.chatsToShow.findIndex((chat) => chat.pairingKey === convoKey), 1, updatedChatEntry);
      }
      else{
        console.log("Error: couldn't find chat entry that needs to be updated")
      }
      
    }
  }

  activeChatChanged(){
    if (this.currentTab === 0 && this.publicShowNotification){
      this.publicShowNotification = false;
          console.log("clearing notification for tab index " + this.currentTab);
    }
    else if (this.currentTab > 0 && this.chatsToShow[this.currentTab - 1].showNotification){
      let updatedChatEntry: ChatEntry = this.chatsToShow[this.currentTab - 1];
      updatedChatEntry.showNotification = false;
      this.chatsToShow.splice(this.currentTab - 1, 1, updatedChatEntry);
          console.log("clearing notification for tab index " + this.currentTab);
    }



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

#chatWindowOutermost >>> .v-tabs-slider {
  max-height: 140px;
}

#chatWindowOutermost >>> .v-tabs-bar__content {
  padding-top: 23px;
  padding-bottom: 2px;
}

.tabOuter {
  flex-grow: 1;
  max-height: 140px !important;
  min-width: 30px !important;
  width: 30px !important;
  padding: 0px 2px 0px 1px;
  overflow: hidden;
  font-size: 10pt;
}

.tabInner {
  transform: rotate(-90deg);
  padding: 2px 6px 2px 6px;
  background-color: rgba(255, 255, 255, 0.65);
  border-radius: 5px;
  color: rgba(0, 0, 0, 0.8);
}

#tabsOutermostDOM >>> .v-window__container {
  height: 100%;
}

.chatItem {
  height: 100%;
}
</style>
