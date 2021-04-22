<template>
  <div id="individualChatPaneOutermost">
    <h5 id="chatHeader" :style="{backgroundColor: isPublic ? '#FF8F00' : '#bbdefb'}">{{ChatTitle}}</h5>
    <div id="convoAreaOuter">
    <div id="convoAreaInner">
      <message-balloon
        v-for="(message, i) in messageList"
        :key="i"
        :isPublic="isPublic"
        :senderAlias="message.senderAlias !== 'MyAlias'? message.senderAlias : null"
        :content="message.content"
        @sendMessage="sendMessage"
      ></message-balloon>
    </div>
    </div>
    <message-input @sendMessage="sendMessage"></message-input>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import MessageInput from "@/components/game/chat/MessageInput.vue";
import MessageBalloon from "@/components/game/chat/MessageBalloon.vue";
import { MessageEntry } from "@/models/interfaces";
import firebase from '@/store/firebase'


@Component({
  name: "IndividualChatPane",
  components: {
    MessageInput,
    MessageBalloon,
  },
})

export default class IndividualChatPane extends Vue {

  @Prop({ required: true }) readonly isPublic!: boolean;
  @Prop({ required: true }) readonly chatKey!: string;
  @Prop({ required: true }) readonly otherPlayerAlias!: string;

  messageList: MessageEntry[] = [];

  get ChatTitle() {
    if(this.isPublic){
      return "PUBLIC CHAT";
    }
    else{
      return "PRIVATE CHAT WITH " + this.otherPlayerAlias.toUpperCase();
    }
  }

  sendMessage(recMessage: string){
    console.log("sending message: " + recMessage)
    firebase.database.ref('chat/convos/' + this.chatKey).push({'senderAlias': this.$store.getters['playerStore/getMyAlias'], 'content': recMessage})
  }

  mounted(){
    
    firebase.database.ref('chat/convos/' + this.chatKey).on('child_added', (data) => {
        this.messageList.push({'senderAlias': data.val().senderAlias, 'content': data.val().content});
        //(this.$refs["convoList"] as Element).scrollTop = (this.$refs["convoList"] as Element).scrollHeight;
    })
  }

}
</script>

<style scoped>
#individualChatPaneOutermost {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #f5f8fa;
}

#chatHeader {
  width: 100%;
  text-align: center;
  font-size: 14px;
  padding-top: 2px;
}

#convoAreaOuter{
  flex-grow: 1;
  display: flex;
  width: 100%;
  height: 50px;
  flex-direction: column-reverse;
  overflow-y: auto;
}

#convoAreaInner {
  width: 100%;
  margin-bottom: auto;
}
</style>
