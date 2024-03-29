<template>
  <div id="individualChatPaneOutermost">
    <h5
      id="chatHeader"
      :style="{ backgroundColor: isPublic ? '#2b436b' : '#bbdefb', color: isPublic? '#ffffff': '#000000', letterSpacing: isPublic? '2px': 'normal' }"
    >
      {{ ChatTitle }}
    </h5>
    <div id="convoAreaOuter">
      <div id="convoAreaInner">
        <message-balloon
          v-for="(message, i) in messageList"
          :key="i"
          :isPublic="isPublic"
          :senderAlias="message.senderAlias"
          :content="message.content"
          :repeatSender="message.repeatSender"
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
import database from "@/store/firebase";
import {ref, set, push, onChildAdded, onChildChanged, onChildRemoved} from "firebase/database";

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
    if (this.isPublic) {
      return "PUBLIC CHAT";
    } else {
      return "PRIVATE CHAT WITH " + this.otherPlayerAlias.toUpperCase();
    }
  }

  sendMessage(recMessage: string) {
    set(push(ref(database, ("chat/convos/" + this.chatKey))), {
        senderAlias: this.$store.getters["playerStore/getMyAlias"],
        content: recMessage,
      });
  }

  mounted() {
    onChildAdded(ref(database, "chat/convos/" + this.chatKey), (data) => {
        this.messageList.push({
          senderAlias: data.val().senderAlias,
          content: data.val().content,
          repeatSender: this.messageList[this.messageList.length - 1]?.senderAlias === data.val().senderAlias,
        });
    });
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

#convoAreaOuter {
  flex-grow: 1;
  display: flex;
  width: 100%;
  height: 50px;
  flex-direction: column-reverse;
  overflow-y: auto;
  margin-top: 3px;
}

#convoAreaInner {
  width: 100%;
  margin-bottom: auto;
}
</style>
