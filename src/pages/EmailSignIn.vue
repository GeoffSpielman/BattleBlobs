<template>
  <div id="emailSignInOutermost">
    <h1 class="pageHeader">Sign In via Email</h1>
    <div id="cardContainer">
      <v-card id="emailSignInCard">
        <v-tabs v-model="tab" active-class="activeTab" grow icons-and-text @change="tabChanged">
          <v-tab>
            <div class="tabInnerContainer">
              <h2 class="tabTitle">Create Account</h2>
              <p class="tabExplanation">This is your first time playing</p>
            </div>
          </v-tab>
          <v-tab>
            <div class="tabInnerContainer">
              <h2 class="tabTitle">Sign In</h2>
              <p class="tabExplanation">You've played before</p>
            </div>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <div class="tabContentContainer">
              <p class="fieldLabel">Email</p>
              <v-text-field
                outlined
                dense
                v-model="email"
                :error-messages="emailErrorMessage"
                @change="emailModified"
              ></v-text-field>
              <p class="fieldLabel">Password</p>
              <v-text-field
                outlined
                dense
                v-model="passwordCreate"
                :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword1 ? 'text' : 'password'"
                @click:append="showPassword1 = !showPassword1"
                @change="passwordModified"
                :rules="passwordRules"
              ></v-text-field>
              <p class="fieldLabel">Confirm Password</p>
              <v-text-field
                outlined
                dense
                v-model="confirmPassword"
                :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword2 ? 'text' : 'password'"
                @click:append="showPassword2 = !showPassword2"
                :error-messages="confirmPasswordErrorMessage"
                @change="passwordModified"
              ></v-text-field>
              <div class="bottomRowButtonContainer">
                <v-btn @click="createAccountClicked"> Create Account </v-btn>
              </div>
              <div class="accountErrorMessageArea">
                  {{accountErrorMessage}}
              </div>
            </div></v-tab-item
          >
          <v-tab-item>
            <div class="tabContentContainer">
              <p class="fieldLabel">Email</p>
              <v-text-field outlined dense v-model="email"></v-text-field>
              <p class="fieldLabel">Password</p>
              <v-text-field
                outlined
                dense
                v-model="passwordSignIn"
                :append-icon="showPassword3 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword3 ? 'text' : 'password'"
                @click:append="showPassword3 = !showPassword3"
              ></v-text-field>
              <div class="bottomRowButtonContainer">
                <v-btn @click="signInClicked"> Sign In </v-btn>
              </div>
               <div class="accountErrorMessageArea">
                 {{accountErrorMessage}}
                 <div v-if="showForgotPasswordLink">
                 Incorrect password entered. If you forgot your password, click <a href="EmailSignIn" @click.prevent ="sendPasswordResetEmail">here</a> and a reset link will be emailed to you.
                 </div>
              </div>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Mixins} from "vue-property-decorator";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { EmailAddressFunctionsMixin } from "@/mixins/EmailAddressFunctionsMixin";

@Component({
  name: "EmailSignIn",
  components: {},
})
export default class EmailSignIn extends Mixins(EmailAddressFunctionsMixin) {
  tab: number = 0;
  email: string = "";
  emailErrorMessage: string = "";

  passwordCreate: string = "";
  confirmPassword: string = "";
  confirmPasswordErrorMessage: string = "";

  passwordSignIn: string = "";
  showPassword1: boolean = false;
  showPassword2: boolean = false;
  showPassword3: boolean = false;

  passwordRules = [
    (v: string) => v.length >= 6 || "Passwords must be at least 6 characters",
  ];

  accountErrorMessage: string = "";
  showForgotPasswordLink: boolean = false;

  createAccountClicked() {
    if (!this.validEmailAddress(this.email)) {
      this.emailErrorMessage = "Please enter a valid email address";
      return;
    }
    if (this.passwordCreate !== this.confirmPassword) {
      this.confirmPasswordErrorMessage = "Passwords do not match";
      return;
    }
    //Create an account for the user
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.email, this.passwordCreate)
      .then((userCredential) => {
      // created account succesfully
      const user = userCredential.user;
      this.$router.push("/lobby");
      })
      //Error creating account
      .catch((error) => {     
        switch(error.code){
          case "auth/email-already-in-use":
            this.accountErrorMessage = "A " + this.$store.getters["gameDataStore/getGameName"] + " account already exists for this email address. Please use the 'Sign In' tab."
            break;
        
          default:
            this.accountErrorMessage = "A firebase authentication error occured when trying to sign in (" + error.code + "). Please let Geoff know."

          //Errors list: https://firebase.google.com/docs/auth/admin/errors
      }
  });
  }

  passwordModified() {
    if (
      this.confirmPasswordErrorMessage !== "" &&
      this.passwordCreate === this.confirmPassword
    ) {
      this.confirmPasswordErrorMessage = "";
    }
  }

  emailModified() {
    if (this.emailErrorMessage !== "" && this.validEmailAddress(this.email)) {
      this.emailErrorMessage = "";
    }
  }

  signInClicked(){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.email, this.passwordSignIn)
    .then((userCredential) => {
      // Successfully signed in
      const user = userCredential.user;
      console.log("successfully signed in!")
      console.log("display name: " + user.displayName);
      console.log("email: " + user.email);
      this.$router.push("/lobby");
      // ...
    })
    .catch((error) => {
      //Error signing in
      switch(error.code){
        case "auth/wrong-password":
          this.accountErrorMessage = "";
          this.showForgotPasswordLink = true;
          break;

        case "auth/user-not-found":
          this.accountErrorMessage = "There is no " + this.$store.getters["gameDataStore/getGameName"] + " account associated with this email address. Please use the 'Create Account' tab to make one."
          this.showForgotPasswordLink = false;
          break;
        
        default:
          this.accountErrorMessage = "A firebase authentication error occured when trying to sign in (" + error.code + "). Please let Geoff know."
          this.showForgotPasswordLink = false;

          //Errors list: https://firebase.google.com/docs/auth/admin/errors
      }
  });

  }
  
  tabChanged(newTabNumber: number){

    //reset error message and passwords when changing tabs
    
    this.accountErrorMessage = "";
    this.showForgotPasswordLink = false;
    if (newTabNumber === 0){
      this.passwordCreate = "";
      this.confirmPassword = "";
      this.showPassword1 = false;
      this.showPassword2 = false;
    }
    else if (newTabNumber === 1){
      this.passwordSignIn = "";
      this.showPassword3 = false;
    }
  }

  sendPasswordResetEmail(){
    const auth = getAuth();
    this.showForgotPasswordLink = false;
    sendPasswordResetEmail(auth, this.email)
      .then(() => {
        // Password reset email sent
        this.accountErrorMessage = "A password reset email was sent to " + this.email;
    })
    .catch((error) => {
      this.accountErrorMessage = "A password reset email could not be sent to " + this.email + " due to " + error.errorCode + ".  Please let Geoff know."
  });
  }
}
</script>

<style scoped>
#emailSignInOutermost {
  display: block;
  width: 100%;
  height: 100%;
}

#cardContainer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

#emailSignInCard {
  width: 650px;
  height: 550px;
  margin-top: 100px;
}

.tabInnerContainer {
  height: 100%;
  width: 100%;
  padding-top: 12px;
  margin: 0px !important;
}

.tabTitle {
  font-size: 14pt;
}

.tabExplanation {
  font-size: 10pt;
  margin: 8px 0px 0px 0px !important;
}

.tabContentContainer {
  margin: 30px 30px 0px 30px;
  display: block;
}

.fieldLabel {
  margin: 5px 0px 4px 3px;
}

.bottomRowButtonContainer {
  width: 100%;
  height: 40px;
  margin-top: 15px;
  display: flex;
  justify-content: center;
}

.activeTab {
  background-color: #e7f4fd;
  color: #0d47a1;
}

.accountErrorMessageArea{
  height: 100%;
  width: 100%;
  color: red;
  margin-top: 24px;
  font-family: 'Roboto', sans-serif;
}
</style>
