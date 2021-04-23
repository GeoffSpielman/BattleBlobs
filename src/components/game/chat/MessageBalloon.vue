<template>
  <div id="messageBalloonOutermost" :class="{'rightAlign': myMessage}">
    <h6 id="senderAliasH" v-if="isPublic && !myMessage && !repeatSender"> {{senderAlias}} </h6>
    <p id="messageContentP" :class="{'pLeft': !myMessage, 'pRight': myMessage}">
    {{content}}
    </p>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "MessageBalloon",
})
export default class MessageBalloon extends Vue {
    @Prop({ required: true }) readonly senderAlias!: string;
    @Prop({ required: true }) readonly content!: string;
    @Prop({ required: true }) readonly isPublic!: boolean;
    @Prop({ required: true }) readonly repeatSender!: boolean;

    get myMessage(): boolean{
      return this.$store.getters['playerStore/getMyAlias'] === this.senderAlias;
    }
 }
</script>

<style scoped>
#messageBalloonOutermost {
 display:flex;
 flex-direction: column;
 width: 100%;
 margin: 0px 0px 4px 0px;
}

#senderAliasH{
  padding-left: 15px;
  line-height: 1.5;
  font-size: 9pt;
  letter-spacing: 0.5px;
  margin-top: 6px;
}

#messageContentP{
  width: fit-content;
  border-radius: 12px;
  padding: 3px 8px 3px 8px;
  margin-bottom: 0px;
  font-size: 11pt;
}
.pLeft{
  margin-right: 50px;
  margin-left: 4px;
  margin-top: 0px;
  background-color: #E4E6EB;
}

.pRight{
  margin-right: 4px;
  margin-left: 50px;
  background-color: #1976D2;
  color: white;
}

.rightAlign{
  align-items: flex-end;
}


</style>
