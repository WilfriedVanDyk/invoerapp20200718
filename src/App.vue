<template >
  <v-app>
    <!-- <v-navigation-drawer app>
      
    </v-navigation-drawer>-->

    <!-- <v-app-bar app> -->

    <!-- </v-app-bar> -->
    <NavBar />

    <!-- Sizes your content based upon application components -->
    <v-main class="mx-4 mb-4">
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import NavBar from "@/components/NavBar.vue";

export default Vue.extend({
  name: "App",

  components: {
    NavBar
  },

  data: () => ({
    //
  })
});
</script>
