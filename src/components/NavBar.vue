<template>
  <div>
    <nav>
      <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
        Evenement is toegevoegd!
        <v-btn text color="white" @click="snackbar=false" class="ml-15">close</v-btn>
      </v-snackbar>

      <!-- <v-toolbar> -->
      <v-app-bar text app>
        <v-app-bar-nav-icon class="grey--text" @click="drawer=!drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="text-uppercase grey--text">
          <span class="font-weight-light">InvoerApp</span>
          <span>Evenementen</span>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" text color="grey" class="mx-10">
              <v-icon left>expand_more</v-icon>
              <span>Menu</span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(link,i) in links" :key="i" router :to="link.route">
              <v-list-item-title>{{link.text}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn text color="grey" small>
          <span>Sign Out</span>
          <v-icon right>exit_to_app</v-icon>
        </v-btn>
        <!-- </v-toolbar> -->
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" app class="info">
        <v-row justify="center">
          <v-col cols="6">
            <v-avatar size="100">
              <img :src="imageWilfried" />
            </v-avatar>
            <p class="white--text subtitle-1 mt-5 text-center">Wilfried</p>
          </v-col>
          <v-col col="6" class="my-4">
            <PopUp @eventAdded="snackbar=true" />
          </v-col>
        </v-row>

        <v-list>
          <v-list-item v-for="(link, i) in links" :key="i" router :to="link.route">
            <v-list-item-action>
              <!-- <v-btn icon> -->
              <v-icon class="white--text">{{link.icon}}</v-icon>
              <!-- </v-btn>   -->
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </nav>
  </div>
</template>


<script>
//import
import PopUp from "@/components/PopUp.vue";
import imageWilfried from "@/assets/pictures/VanDykWilfried.jpg";
export default {
  name: "NavBar",
  components: { PopUp },
  data: () => ({
    imageWilfried: imageWilfried,
    snackbar: false,
    //link: "",
    drawer: false,
    links: [
      { icon: "dashboard", text: "Dashboard", route: "/" },
      { icon: "folder", text: "Mijn evenementen", route: "/projects" },
      { icon: "person", text: "Team", route: "/team" }
    ]
  })
};
</script>

<style lang="scss" scoped>
</style>