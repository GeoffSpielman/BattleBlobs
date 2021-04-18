<template>
  <div id="individualChatPaneOutermost">
    <h5 id="chatHeader">PRIVATE CHAT WITH {{ otherPlayer }}</h5>
    <div id="convoArea">Messages go here</div>
    <message-entry></message-entry>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MessageEntry from "@/components/game/MessageEntry.vue";

@Component({
  name: "IndividualChatPane",
  components: {
    MessageEntry,
  },
})
export default class IndividualChatPane extends Vue {
  otherPlayer: string = "Bob".toUpperCase();
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
}

#convoArea {
  flex-grow: 1;
  display: flex;
  width: 100%;
}

</style>
