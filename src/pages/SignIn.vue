<template>
  <div id="signInOutermost">
    <h1 class="pageHeader">Sign In</h1>
    <div id="buttonArea">
    <v-btn color="red" class="signInButton" @click="emailSignIn">
      <img class="signInIcon" src="@/assets/login/email.svg" />
      <p class="butonText whiteText">Sign in with Email</p>
    </v-btn>
    <v-btn color="white" class="signInButton" @click="googleSignIn">
      <img class="signInIcon" src="@/assets/login/google.svg" />
      <p class="butonText greyText">Sign in with Google</p>
    </v-btn>
     <v-btn color="#3b5998" class="signInButton" @click="facebookSignIn">
      <img class="signInIcon" src="@/assets/login/facebook.svg" />
      <p class="butonText whiteText">Sign in with Facebook</p>
    </v-btn>
  </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword} from "firebase/auth";

@Component({
  name: "SignIn",
  components: {},
})
export default class SignIn extends Vue {

  emailSignIn(){
    this.$router.push('/emailSignIn');
   

  }
  googleSignIn() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        this.$router.push({name: this.$store.getters["clientSpecificStore/getSignedInDestination"]});
      })
      .catch((error) => {
        if (error.message !== "Firebase: Error (auth/popup-closed-by-user)."){
          console.log("Error with Google sign in.");
          console.log(error.message);
        }
        
      });
  }

  facebookSignIn(){
    console.log("Sign in with facebook");
  }
}
</script>

<style scoped>
#signInOutermost {
  width: 100%;
  height: 100%;
}
#buttonArea{
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
}
.signInButton {
  width: 250px;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: flex-start;
  height: 40px !important;
}
.butonText {
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  margin: 0px;
}

.whiteText {
  color: white;
}

.greyText {
  color: #757575;
}

.signInIcon {
  border: none;
  height: 18px;
  width: 18px;
  margin-right: 10px;
}
</style>