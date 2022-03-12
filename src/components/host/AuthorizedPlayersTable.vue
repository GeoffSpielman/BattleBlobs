<template>
  <div id="authorizedPlayersTableOutermostDiv">
    <div id="leftSide">
      <div id="titleRow">
        <h2>Authorized Players</h2>
      </div>
      <div id="tableArea">
        <v-simple-table id="authorizedPlayersTable" fixed-header height="100%">
          <thead>
            <tr>
              <th class="text-left">Email</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="email in authorizedPlayerEmails" :key="email">
              <td>{{ email }}</td>
              <td class="text-center">
                 <v-btn
                  :key="email + 'removeBtn'"
                  @click="removeBtnClicked(email)"
                  small
                  color="error lighten-1"
                  class="py-1 text-none"
                  style="color: black"
                ><v-icon dense class="pr-2"> mdi-delete-forever</v-icon>Revoke
              </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
    </div>
    <div id="rightSide">
      <div id="newPlayerArea">
      <p id="newAuthorizationPrompt">Email address of new player:</p>
      <v-text-field
        outlined
        dense
        v-model="email"
        :error-messages="emailErrorMessage"
        @change="emailModified"
        height="10px"
      ></v-text-field>
      <v-btn @click="authorizeClicked">
          Authorize
      </v-btn>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Mixins} from "vue-property-decorator";
import { EmailAddressFunctionsMixin } from "@/mixins/EmailAddressFunctionsMixin";

@Component({
  name: "AuthorizedPlayersTable",
  components: {},
})
export default class AuthorizedPlayersTable extends Mixins(EmailAddressFunctionsMixin) {
  email: string = "";
  emailErrorMessage: string = "";

  get authorizedPlayerEmails(): string[] {
    return this.$store.getters["authDataStore/getAuthorizedPlayerEmails"];
  }

   emailModified() {
    if (this.emailErrorMessage !== "" && this.validEmailAddress(this.email)) {
      this.emailErrorMessage = "";
    }
  }

  authorizeClicked(){
    if (!this.validEmailAddress(this.email)) {
      this.emailErrorMessage = "Please enter a valid email address";
      return;
    }
    if (this.authorizedPlayerEmails.includes(this.email)){
      this.emailErrorMessage = "Email is already authorized";
      return;
    }
    this.$store.dispatch("authDataStore/addAuthorizedPlayerEmail", this.email);
    this.email = "";
  }

  removeBtnClicked(recEmail: string){
    this.$store.dispatch("authDataStore/removeAuthorizedPlayerEmail", recEmail);
  }

  
}
</script>

<style scoped>
#authorizedPlayersTableOutermostDiv {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

#leftSide {
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
#rightSide {
  width: 10px;
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#titleRow {
  display: flex;
  flex-direction: row;
  height: 30px;
  justify-content: space-between;
}

#titleRow h2 {
  font-size: 20px;
  font-family: "Roboto", sans-serif;
  margin-left: 10px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
  padding-top: 1px;
}

#tableArea {
  display: flex;
  flex-grow: 1;
  flex-basis: 50px;
  overflow-y: auto;
  width: 100%;
}

#authorizedPlayersTable {
  width: 100%;
  margin: 0px 0px 2px 5px;
}

#authorizedPlayersTable th {
  font-size: 11.5pt;
}

#authorizedPlayersTable td {
  height: 36px;
}

#newPlayerArea{
  text-align: center;
}
#newAuthorizationPrompt{
  font-size: 11pt;
  margin-bottom: 5px;
}

</style>
