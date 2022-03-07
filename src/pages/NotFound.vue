<template>
  <div class="notFoundOutermost">
    <h1> Requested page not found </h1>
    <p> You tried to navigate to a url that does not exsist. Where are you trying to go? </p>
    To do: list optins here w/ router-link
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
})
export default class NotFound extends Vue {
    
}
</script>

<style scoped>
#notFoundOutermost{
  height: 100%;
  width: 100%;
  display: flex;
}

</style>