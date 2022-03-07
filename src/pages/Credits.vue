<template>
  <div id="imageCreditsOutermost">
    <div id="scrollingContent">

      <h1 class="pageHeader">People:</h1>
      
      <v-container class="centerColumn">
        <div class="personCreditRow" v-for="person in people" :key="person.name">
        <h4 class="personName">{{person.name}}: </h4>
        <p> {{person.credit}} </p>
      </div>
      </v-container>

      <h1 class="pageHeader">Images:</h1>

      <v-container class="centerColumn">
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
import { PlayerStatus } from "@/models/enums"

@Component({
  name: "ImageCredits",
})
export default class ImageCredits extends Vue {

  mounted() {
    this.$store.dispatch(
      "playerStore/setMyStatus",
      PlayerStatus.ReadingCredits
    );
  }

  people: {'name': string; 'credit': string}[] = [
    {'name': 'Chris Matthews', 'credit': "initial game design brainstorming"},
    {'name': 'Krista Lawson', 'credit': "24/7 proffesional grade tech support - when I need to call in 'the big guns'"},
    {'name': 'Ryan Lawson', 'credit': "an endless wealth of Vue and Vuetify knowledge"},
    {'name': 'Elsie Clark', 'credit': "for getting me started with web development in the early days"},
    ];

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
      path: require("@/assets/imageCredits/sea_backdrop.gif"),
      caption: "Azure Sea by Geya Shvecova from We Heart It",
      link: "https://weheartit.com/entry/305625382",
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
      caption: "Missile by Vectorstall from The Noun Project",
      link: "https://thenounproject.com/search/?q=missile&i=3679591",
    },

    {
      path: require("@/assets/imageCredits/move_it_minor.png"),
      caption: "Move by Shashank Singh from The Noun Project",
      link: "https://thenounproject.com/term/move/1663257/",
    },

    {
      path: require("@/assets/imageCredits/move_it_major.png"),
      caption: "Redo by Designify.me from The Noun Project",
      link: "https://thenounproject.com/search/?q=redo&i=149818",
    },

    {
      path: require("@/assets/imageCredits/uh_oh.png"),
      caption: "Spiral by Alexander Skowalsky from The Noun Project",
      link: "https://thenounproject.com/search/?q=spiral&i=253084",
    },

    {
      path: require("@/assets/imageCredits/fog.png"),
      caption: "White Fog Isolated On Dark Transparent Background from Clip Art Max",
      link: "https://www.clipartmax.com/download/m2i8H7b1d3b1b1b1_white-fog-isolated-on-dark-transparent-background-portable-network-graphics/",
    },

    {
      path: require("@/assets/imageCredits/generic_person.png"),
      caption: "Dancer by Tippawan Sookruay from The Noun Project",
      link: "https://thenounproject.com/icon/dancer-3925487/",
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

.centerColumn{
  width: 75%;
}

.personCreditRow{
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
}

.personName{
  margin-right: 5px;
}

.picCaption {
  text-align: center;
  font-size: 12pt;
  margin-top: 7px;
}
</style>
