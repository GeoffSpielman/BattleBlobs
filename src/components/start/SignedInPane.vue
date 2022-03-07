<template>
  <div id="signedInPaneOutermostDiv">
   <div id="headerRow">
      <h2>Signed In</h2>
    </div>
    <div id="userInfoRow">
        <div id="iconColumn">
            <img :src="avatarSrc" id="userImage">
        </div>
        <div v-if="!emailOnly" class="detailsColumn">
            <p id="nameP">
                {{displayName}}
            </p>
           <p id="emailP">
               {{email}}
           </p>
        </div>
        <div v-if="emailOnly" class="detailsColumn">
            <p id="justEmail">
               {{email}}
           </p>
        </div>
    </div>
    <div id="signOutRow">
        <v-btn @click="signOutClicked">Sign Out</v-btn>
    </div>
    <div id="explanation">
        Signing out will exit the game and return you to the home page.
    </div>
      
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {getAuth, signOut} from "firebase/auth"

@Component({
  name: "SignedInPane",
  components: {},
})
export default class SignedInPane extends Vue {
  
  get avatarSrc(): string {
      if (this.$store.getters['clientSpecificStore/getAuthImageURL'] !== null){
        return this.$store.getters['clientSpecificStore/getAuthImageURL']
      }
      else{
        return require("@/assets/misc/generic_person.png");
      }
  }

  get emailOnly(): boolean{
    return this.$store.getters['clientSpecificStore/getAuthDisplayName'] === null;
  }

  get displayName(): string {
      return this.$store.getters['clientSpecificStore/getAuthDisplayName'];
  }

  get email(): string{
      return this.$store.getters['clientSpecificStore/getAuthEmail'];
  }

  signOutClicked(){
    const auth = getAuth();
    signOut(auth).then(() => {
        this.$router.push("/");
    }).catch((error) => {
        console.log("Error: could not sign out");
    });
  }
  
}
</script>

<style scoped>
#signedInPaneOutermostDiv {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: black;
}

#headerRow {
  background-color: #0d47a1;
  color: white;
  height: 40px;
}

h2 {
  text-align: center;
  margin-top: 2px;
}

#userInfoRow{
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 10px;
}

#signOutRow{
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

#iconColumn{
    width: 70px;
    height: 70px;
    padding: 5px;
}

.detailsColumn{
    flex-grow: 1;
    padding-left: 10px;
}

#userImage{
    border-radius: 50%;
    width: 100%;
}

#nameP{
    margin: 2px 0px 0px 0px;
    font-size: 16pt;
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
}

#emailP{
    margin: 0px;
    font-size: 12pt;
    font-family: 'Roboto', sans-serif;
}

#justEmail{
    font-size: 13pt;
    margin-top: 18px;
}

#explanation{
    margin: 20px 15px 0px 15px;
    font-size: 11pt;
    font-family: 'Roboto', sans-serif;
}
</style>
