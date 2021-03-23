<template>
  <div class="outermostDiv">
    <h1 id="lobbyHeader">Lobby:</h1>
    <div id="centralColumnOuter">
      <div id="topRow">
        <div id="textFieldsOuterColumn">
          <div id="nameRow">
            <div class="iconColumn">
              <v-img :src="nameIconPath" height="90px" contain></v-img>
            </div>
            <div class="textFieldColumn">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                counter="14"
                solo
                class="textField"
              >
                <template v-slot:prepend>
                  <h3 class="textfieldPrompt">Name:</h3>
                </template>
              </v-text-field>
              <ul class="bulletList">
                <li>Please use your real first name</li>
                <li>
                  Useful for troubleshooting connection issues
                  <v-icon style="margin-top: -3px" dense
                    >mdi-emoticon-happy-outline</v-icon
                  >
                </li>
                <li>
                  Revealed after the game to determine the 'stealth master'
                </li>
              </ul>
            </div>
          </div>
          <div id="aliasRow">
            <div class="iconColumn">
              <v-img :src="aliasIconPath" height="90px" contain></v-img>
            </div>
            <div class="textFieldColumn">
              <v-text-field
                v-model="alias"
                :rules="aliasRules"
                counter="14"
                solo
                class="textField"
                @change="aliasTextChanged()"
              >
                <template v-slot:prepend>
                  <h3 class="textfieldPrompt">Alias:</h3>
                </template>
              </v-text-field>
              <ul class="bulletList">
                <li>Create your own or choose from the bank below:</li>
              </ul>
              <div id="aliasListContainer">
                
                <v-list dense height="100%" max-height="100%">
                  <v-list-item-group color="primary">
                    <v-list-item v-for="alias in aliasList" :key="alias" @click="listItemClicked(alias)">
                      <v-list-item-content>
                        <v-list-item-title v-text="alias"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              
                
              </div>
            </div>
          </div>
        </div>
        <div id="colourAndShipsColumn">I am the left column</div>
      </div>
      <div id="bottomRow">I am the bottom row</div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Lobby",
})
export default class Lobby extends Vue {
  nameIconPath: string = require("@/assets/lobby/person_icon_black.png");
  aliasIconPath: string = require("@/assets/lobby/alias_icon_black.png");

  name: string = "";
  alias: string = "";
  usingBankAlias: boolean = false;
  bankAliasClicked: string = "";

  nameRules = [
    (v: string) =>
      v.length <= 14 || "Sorry, names are limited to 14 characters max",
  ];
  aliasRules = [
    (v: string) =>
      v.length <= 14 || "Sorry, aliases are limited to 14 characters max",
  ];

  get aliasList() {
    return this.$store.getters["lobbyStore/getAliasesList"];
  }

  aliasTextChanged(){
    if (this.usingBankAlias === true){
      this.usingBankAlias = false;
      this.$store.dispatch('lobbyStore/releaseAlias', this.bankAliasClicked);
    }
    //user typed out an alias that was in the bank
    const aliasIndexInBank = this.aliasList.findIndex((element: string) => element.toLowerCase() === this.alias.toLowerCase());
    if (aliasIndexInBank !== -1){
      this.usingBankAlias = true;
      this.bankAliasClicked = this.aliasList[aliasIndexInBank];
      this.$store.dispatch('lobbyStore/reserveAlias', this.bankAliasClicked);
    }

    //TODO: actually set player's alias
    //playerLobby.setPlayerAlias(myKey, this.alias)


  }

  listItemClicked(aliasClicked: string){
    this.alias = aliasClicked;
    this.usingBankAlias = true;
    this.bankAliasClicked = aliasClicked;
    this.$store.dispatch('lobbyStore/reserveAlias', aliasClicked);
  }
}
</script>

<style scoped>
.outermostDiv {
  align-items: center;
}
#lobbyHeader {
  font-size: 30pt;
  font-family: Tahoma, sans-serif;
  margin-left: 18px;
  width: 100%;
  text-align: left;
}

#centralColumnOuter {
  width: 75%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
}

#topRow {
  width: 100%;
  display: flex;
  flex-grow: 1;
}
#bottomRow {
  background-color: lightgreen;
  width: 100%;
  display: flex;
  height: 100px;
}

#textFieldsOuterColumn {
  width: 40%;
  display: flex;
  flex-direction: column;
}

#colourAndShipsColumn {
  display: flex;
  flex-grow: 1;
  background-color: lightblue;
}

#nameRow {
  display: flex;
}
#aliasRow {
  margin-top: 50px;
  display: flex;
  flex-grow: 1;
}

.iconColumn {
  width: 20%;
  padding-top: 5px;
}

.textFieldColumn {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.fieldOuterBox {
  background-color: orange;
}

.textfieldPrompt {
  margin-top: 4px;
}

.textField {
  flex-grow: 0;
}

.bulletList {
  margin-left: 15px;
  margin-top: -6px;
  margin-bottom: 10px;
}

#aliasListContainer {
  height: 50px;
  flex-grow: 1;
  margin-left: 25px;
}

.v-list {
  overflow-y: auto;
}
</style>
