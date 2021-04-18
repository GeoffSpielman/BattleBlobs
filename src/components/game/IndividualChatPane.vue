<template>
  <div id="individualChatPaneOutermost">
    <h5 id="chatHeader">PRIVATE CHAT WITH {{ otherPlayer }}</h5>
    <div id="convoArea">
      <message-balloon
        v-for="(message, i) in messageList"
        :key="i"
        :senderAlias="message.senderAlias !== 'MyAlias'? message.senderAlias : null"
        :content="message.content"
      ></message-balloon>
    </div>
    <message-input></message-input>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MessageInput from "@/components/game/MessageInput.vue";
import MessageBalloon from "@/components/game/MessageBalloon.vue";
import { MessageEntry } from "@/models/interfaces";

@Component({
  name: "IndividualChatPane",
  components: {
    MessageInput,
    MessageBalloon,
  },
})
export default class IndividualChatPane extends Vue {
  otherPlayer: string = "Bob".toUpperCase();
  messageList: MessageEntry[] = [
    { senderAlias: "MyAlias", content: "helooo" },
    { senderAlias: "Very lgonjqg alias whpfyros sends short message", content: "Hey I got longer" },
    { senderAlias: "Tombo", content: "Yeah okay  aerg rgae rae pgog apregj gripjg agijr g[apoigjreg[jrpgjarprejgaprgj  arejg erag grai[jagre ia[erjg gre gerajgra gpal" },
    { senderAlias: "MyAlias", content: "Righteo chaps er ewga r eraoigeraoig earogij aeroigj aeroighjaerohigrogjhaoie rggragpoh ergroephg " },
    { senderAlias: "MyAlias", content: "helooo" },
  ];
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
  background-color: #bbdefb;
  font-size: 14px;
}

#convoArea {
  flex-grow: 1;
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 50px;
  overflow-y: auto;
}
</style>
