<template>
  <div id="loginOutermost">
    I am the login screen
    <div id="firebaseui-auth-container">
        
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebase from "@/store/firebase";
import firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";



@Component({
  name: "Login",
  components: {
  }
})
export default class Login extends Vue {
  /*
    mounted(){
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        var uiConfig = {
            signInSuccessUrl: "/play",
            signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID]
        };
        ui.start("#firebaseui-auth-container", uiConfig);
    }
    */
}
</script>

<style scoped>
#loginOutermost {
  width: 100%;
  height: 100%;
}

</style>