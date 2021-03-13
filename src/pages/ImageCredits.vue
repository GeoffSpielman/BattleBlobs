<template>
  <div class="outermostDiv">
    <v-container style="width: 75%" class="mt-6">
      <v-row>
        <v-col v-for="image in images" :key="image.path" cols="4">
          <v-img :src="image.path" height="250px" contain></v-img>
          <p class="picCaption">
          {{ image.caption }}
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TheHeader from "@/components/tempHeader.vue";

@Component({
  components: { TheHeader },
  name: "ImageCredits",
})
export default class ImageCredits extends Vue {
  images: Array<object> = [
    {
      path: require("@/assets/imageCredits/homepage.jpg"),
      caption: "The Battle of Texel by Willem van de Velde",
    },
    {
      path: require("@/assets/imageCredits/person_icon.png"),
      caption: "person by mim studio from the Noun Project",
    },

    {
      path: require("@/assets/imageCredits/alias_icon.png"),
      caption: "Anonymous by Iconographer from the Noun Project",
    },
  ];
}
</script>

<style scoped>
.picCaption{
    text-align: center;
    font-size: 12pt;
    margin-top: 7px;
}

</style>
