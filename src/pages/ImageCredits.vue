<template>
  <div id="imageCreditsOutermost">
    <div id="scrollingContent">
      <h1 class="pageHeader">Image Credits:</h1>

      <v-container id="centerColumn">
        <v-row>
          <v-col v-for="image in images" :key="image.path" cols="3">
            <a :href="image.link" target="_blank">
              <v-img :src="image.path" height="250px" contain></v-img>
            </a>
            <p class="picCaption">
              {{ image.caption }}
            </p>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "ImageCredits",
})
export default class ImageCredits extends Vue {
  images: Array<object> = [
    {
      path: require("@/assets/home/homepage.jpg"),
      caption: "The Battle of Texel by Willem van de Velde",
      link:
        "https://pixels.com/featured/1-battle-of-texel-willem-van-de-velde.html",
    },
    {
      path: require("@/assets/imageCredits/person_icon.png"),
      caption: "Person by Mim Studio from The Noun Project",
      link:
        "https://thenounproject.com/search/?creator=4954784&q=person&i=2817719",
    },

    {
      path: require("@/assets/imageCredits/alias_icon.png"),
      caption: "Anonymous by Iconographer from The Noun Project",
      link: "https://thenounproject.com/search/?q=anonymous&i=1781608",
    },

    {
      path: require("@/assets/imageCredits/colour_icon.png"),
      caption: "Color by Adrien Coquet from The Noun Project",
      link: "https://thenounproject.com/term/color/2225526/",
    },

    {
      path: require("@/assets/imageCredits/ship_icon.png"),
      caption: "Ship by Kareemovic2000 from The Noun Project",
      link: "https://thenounproject.com/term/ship/1525171/",
    },

    {
      path: require("@/assets/misc/disconnected.gif"),
      caption: "Internet Data Concept by Matthew Butler from Behance",
      link: "https://www.behance.net/gallery/49505405/Internet-Data-Concept",
    },

    {
      path: require("@/assets/imageCredits/sneak_a_peak.png"),
      caption: "Satelite by Arunika from The Noun Project",
      link: "https://thenounproject.com/search/?q=satelite&i=2137227",
    },

    {
      path: require("@/assets/imageCredits/umbrella.png"),
      caption: "Umbrella by Lachlan Heywood from The Noun Project",
      link: "https://thenounproject.com/search/?q=umbrella&i=2212",
    },

    {
      path: require("@/assets/imageCredits/missile.png"),
      caption: "Missile by Vectorstall from the Noun Project",
      link: "https://thenounproject.com/search/?q=missile&i=3679591",
    },
  ];
}
</script>

<style scoped>
#imageCreditsOutermost {
  position: absolute;
  top: 40px;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
}

#scrollingContent {
  flex: 1;
  display: flex;
  overflow-y: auto;
  flex-direction: column;
}

#centerColumn{
  width: 75%;
}

.picCaption {
  text-align: center;
  font-size: 12pt;
  margin-top: 7px;
}
</style>
