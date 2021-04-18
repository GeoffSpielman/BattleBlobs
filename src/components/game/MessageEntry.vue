<template>
  <div id="messageEntryOutermost">
    <v-textarea
      v-model="messageText"
      outlined
      auto-grow
      :hide-details="true"
      no-resize
      rows="1"
      id="messageTextArea"
      @keypress.enter="enterKeyPressed($event)"
      @keydown.enter.stop
      @keyup.enter.stop
    ></v-textarea>

    <v-btn id="sendButton" color="primary" @click="sendMessage"> Send </v-btn>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "MessageEntry",
})
export default class MessageEntry extends Vue {
  messageText: string = "";

  enterKeyPressed(event: KeyboardEvent) {
    if (!event.shiftKey) {
      this.sendMessage();
      event.stopPropagation();
    }
  }

  sendMessage() {
    console.log("sending message: " + this.messageText);
    this.messageText = "clear"
  }
}
</script>

<style scoped>
#messageEntryOutermost {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0px 5px 5px 5px;
}

#messageEntryOutermost >>> #messageTextArea {
  max-height: 58px;
  margin: 4px 0px 4px 0px;
  padding-top: 2px;
  overflow-y: auto;
  color: rgba(0, 0, 0, 0.87);
}

#messageEntryOutermost >>> .v-input__slot {
  min-height: 32px;
}

#messageEntryOutermost >>> .v-input__control {
  border-radius: 10px 3px 3px 10px;
  background-color: white;
}

#sendButton {
  height: 39px;
  border-radius: 3px 10px 10px 3px;
  margin-left: 2px;
}
</style>
