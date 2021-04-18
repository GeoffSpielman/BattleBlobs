<template>
  <div id="messageBalloonOutermost" :class="{'rightAlign': senderAlias === null}">
    <h6 id="senderAliasH"> {{senderAlias}} </h6>
    <p id="messageContentP" :class="{'pLeft': senderAlias !== null, 'pRight': senderAlias === null}">
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
    @Prop({ required: true }) readonly senderAlias!: string|null;
    @Prop({ required: true }) readonly content!: string;
 }
</script>

<style scoped>
#messageBalloonOutermost {
 display:flex;
 flex-direction: column;
 width: 100%;
 margin: 6px 0px 6px 0px;
}
#senderAliasH{
  padding-left: 15px;
  line-height: 1.5;
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
  margin-top: 3px;
  background-color: #1976D2;
  color: white;
}

.rightAlign{
  align-items: flex-end;
}


</style>
