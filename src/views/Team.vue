<template>
  <div class="team">
    <h1 class="subtitle-1 grey--text">Team</h1>
    <v-container class="my-5">
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="member in team" :key="member.name">
          <v-card class="text-center ma-3">
            <!-- <v-img
              :key="member.name"
              :src="member.picture"
              :alt="member.name"
              height="200"
              width="200"
              class="pt-4"
            />-->
            <!-- <v-responsive class="pt-4">{{member.picture}}</v-responsive> -->
            <v-avatar size="100" class="grey lighten-1">
              <img :src="member.picture" :alt="member.name" />
            </v-avatar>
            <v-card-text>
              <div class="subtitle-1">{{member.name}}</div>
              <div class="grey--text">{{member.role}}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="grey">
                <v-icon small left>message</v-icon>
                <span>message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import image1 from "../assets/pictures/VanDykWilfried.jpg";
import image2 from "../assets/pictures/Corneel.jpg";
import image3 from "../assets/pictures/Bram.jpg";
import image4 from "../assets/pictures/Jelke.jpg";

export default {
  name: "team",
  components: {},
  data() {
    return {
      team: [
        {
          name: "Wilfried",
          role: "Web developer",
          //picture: "@/assets/pictures/VanDykWilfried.jpg",
          picture: image1,
        },

        {
          name: "Corneel",
          role: "project leader",
          //picture: "@/assets/pictures/Corneel.jpg",
          picture: image2,
        },

        {
          name: "Bram",
          role: "Web zen master",
          //picture: "@/assets/pictures/Bram.jpg"
          picture: image3,
        },

        {
          name: "Jelke",
          role: "Sales guru",
          //picture: "@/assets/pictures/Jelke.jpg"
          picture: image4,
        },
      ],
    };
  },
  methods: {
    getImgUrl(picture) {
      return require(picture);
    },
  },
};
</script>