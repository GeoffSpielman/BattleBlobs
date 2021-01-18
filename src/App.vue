<template>
  <main>
    <router-view> </router-view>
  </main>
</template>

<script>

export default {
  name: "App",
  data(){
  }
};
</script>


<style>
* {
  box-sizing: border-box;
  margin: 0px;
}

main{
  height: 100%;
  width: 100%;
}
.container{
  display: flex;
  height: 100%;
  width: 100%;
}
</style>
