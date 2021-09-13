<template>
  <div id="nameOutermost">
    <v-text-field
      v-model="name"
      :rules="nameRules"
      counter="18"
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
      v.length <= 18 || "Sorry, names are limited to 18 characters max",
  ];
  nameErrorMessage: string = "";

  nameTextChanged() {
    if (this.name === "") {
      this.nameErrorMessage = "Please enter your name";
      this.$emit("namevalidupdate", false);
    } else if (!this.name.replace(/\s/g, "").length) {
      this.nameErrorMessage = "Names cannot be blank spaces. Nice try ;)";
      this.$emit("namevalidupdate", false);
    }
    else if (this.name.length > 18){
      this.$emit("namevalidupdate", false);
    }
    else {
      this.$store.dispatch("lobbyStore/allocateName", this.name).then(
        (response) => {
          //console.log(response);
          this.nameErrorMessage = "";
          this.$emit("namevalidupdate", true);
        },
        (error) => {
          //console.log(error);
          this.nameErrorMessage =
            "Unfortunately this name is taken";
            this.$emit("namevalidupdate", false);
        }
      );
    }
  }
}
</script>

<style scoped>
#nameOutermost {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.textfieldPrompt {
  margin-top: 4px;
  width: 55px;
  text-align: right;
}

.textField {
  width: 100%;
  flex-grow: 0;
}

.bulletList {
  margin-left: 25px;
  margin-top: -6px;
  margin-bottom: 10px;
}
</style>
