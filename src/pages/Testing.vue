<template>
  <div class="outermostDiv">
    <p class="leftLabel">Server state:</p>
    <p style="width: 300px;"><strong>Game Status:</strong> {{ this.$store.state.testVal}}</p>
    <br />
    <v-card class="mx-auto" width="300">
      <v-list disabled>
        <v-subheader>Testing List</v-subheader>
        <v-list-item-group v-model="selectedItem">
          <v-list-item v-for="item in testList" :key="item">
            <v-list-item-content>
              <v-list-item-title v-text="item"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <br />
    <hr style="width: 80%" />
    <p class="leftLabel">Client Inputs:</p>

    <v-container fluid>
      <v-row justify="center">
        <v-col cols="4">
          <v-select
            :items="statusOptions"
            label="Game Status"
            outlined
            dense
            v-model="gameStatus"
          ></v-select>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="2" align-self="center" style="text-align: right">
          Add to list:
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="itemEntry"
            :rules="rulesForTestList"
            counter="25"
            hint="It's time to get funky!"
          ></v-text-field>
        </v-col>
        <v-col cols="2" align-self="center"> <v-btn @click="submitClicked" elevation="2" text>Submit</v-btn> </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="2" align-self="center">
          <v-btn @click="doStuffClicked" elevation="2" text>Do Stuff</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";


@Component({
  name: "Testing",
})
export default class Testing extends Vue {
  gameStatus: string = "Loading...";
  testList: string[] = ["one", "two", "three"];
  statusOptions: string[] = ["Loading...", "Ready to Start", "Game has Begun"];
  itemEntry: string = "Tomato";
  rulesForTestList = [(val: string) => val.length <= 25 || "Max 25 characters"];

  get testVal(): string{
    return this.$store.getters.getTestVal;
  }

  submitClicked(){
      this.testList.push(this.itemEntry);
      this.itemEntry = "";
  }

  doStuffClicked(){
    this.$store.dispatch("setTestVal", "turkey")
  }
}
</script>

<style scoped>
.outermostDiv {
  align-items: center;
}

#pageTitle {
  text-align: center;
  margin-top: 10px;
}

.leftLabel {
  width: 70%;
  margin-top: 10px;
}

</style>
