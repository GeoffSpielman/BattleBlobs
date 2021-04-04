<template>
  <div id="aliasOutermost">
    <div id="textFieldDiv">
      <v-text-field
        v-model="alias"
        :rules="aliasRules"
        counter="14"
        solo
        class="textField"
        @change="aliasEntryChanged()"
        :error-messages="aliasErrorMessage"
      >
        <template v-slot:prepend>
          <h3 class="textfieldPrompt">Alias:</h3>
        </template>
      </v-text-field>
    </div>
    <div id="aliasListDiv">
      <ul class="bulletList">
        <li>Create your own or choose from the bank below:</li>
      </ul>
      <div id="aliasListContainer">
        <v-list dense height="100%" max-height="100%">
          <v-list-item-group color="primary">
            <v-list-item
              v-for="alias in availableAliasesList"
              :key="alias"
              @click="listItemClicked(alias)"
            >
              <v-list-item-content>
                <v-list-item-title v-text="alias"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "AliasEntry",
})
export default class AliasEntry extends Vue {
  alias: string = "";
  usingBankAlias: boolean = false;
  bankAliasClicked: string = "";
  aliasErrorMessage: string = "";

  aliasRules = [
    (v: string) =>
      v.length <= 14 || "Sorry, aliases are limited to 14 characters max",
  ];

  get availableAliasesList() {
    return this.$store.getters["lobbyStore/getAvailableAliases"];
  }

  aliasEntryChanged() {
    this.$store.dispatch("lobbyStore/allocateAlias", this.alias).then(
      (response) => {
        //console.log(response);
        this.aliasErrorMessage = "";
      },
      (error) => {
        //console.log(error);
        this.aliasErrorMessage = "Unfortunately this alias is already taken";
      }
    );
  }

  listItemClicked(aliasClicked: string) {
    this.alias = aliasClicked;
    this.aliasEntryChanged();
  }
}
</script>

<style scoped>
#aliasOutermost {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.textfieldPrompt {
  margin-top: 4px;
}

.textField {
  width: 100%;
}

#aliasListDiv{
  flex-grow: 1;
  display: flex;
  flex-direction: column;
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