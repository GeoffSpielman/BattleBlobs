<template>
  <div id="nameOutermost">
    <div class="iconColumn">
      <slot name="iconImage"> </slot>
    </div>
    <div class="textColumn">
      <v-text-field
        v-model="name"
        :rules="nameRules"
        counter="14"
        solo
        class="textField"
        @change="nameTextChanged()"
        :error-messages="nameErrorMessage"
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
        <li>Revealed after the game to determine the 'stealth master'</li>
      </ul>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "NameEntry",
})
export default class NameEntry extends Vue {
  name: string = "";
  nameRules = [
    (v: string) =>
      v.length <= 14 || "Sorry, names are limited to 14 characters max",
  ];
  nameErrorMessage: string = "";

  nameTextChanged() {
    this.$store.dispatch("lobbyStore/allocateName", this.name).then(
      (response) => {
        console.log(response);
        this.nameErrorMessage = "";
      },
      (error) => {
        console.log(error);
        this.nameErrorMessage = "Unfortunately this name is taken. Maybe add your last initial?";
      }
    );
  }
}
</script>

<style scoped>
#nameOutermost {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.iconColumn {
  width: 10vh;
  padding-top: 15px;
}

.textColumn {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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
</style>
