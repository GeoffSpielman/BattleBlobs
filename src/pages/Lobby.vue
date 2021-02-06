<template>
  <h1> I am the lobby </h1>
  <ship-builder> </ship-builder>
</template>

<script>
import shipBuilder from "../components/shipBuilder.vue";

export default {
  components: {
    "ship-builder": shipBuilder,
  },
}
</script>

<style>

</style>