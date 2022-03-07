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
              <th class="text-left">Name</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="player in playersList" :key="player.key">
              <td>{{ player.name }}</td>
              <td class="text-center">Reset Password --- Delete</td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
    </div>
    <div id="rightSide">
      <p>Email address of new player:</p>
      <v-text-field
        outlined
        dense
        v-model="email"
        :error-messages="emailErrorMessage"
        @change="emailModified"
      ></v-text-field>
      <v-btn>
          Authorize
      </v-btn>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "AuthorizedPlayersTable",
  components: {},
})
export default class AuthorizedPlayersTable extends Vue {
  email: string = "";
  emailErrorMessage: string = "";

  validEmailEnterered(): boolean {
    let emailTestRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return emailTestRegex.test(this.email);
  }

  emailModified() {
    if (this.emailErrorMessage !== "" && this.validEmailEnterered()) {
      this.emailErrorMessage = "";
    }
  }
}
</script>

<style scoped>
#authorizedPlayersTableOutermostDiv {
  display: flex;
  flex-direction: row;
  width: 100%;
}

#leftSide {
  width: 70%;
}
#rightSide {
  width: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
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
</style>
