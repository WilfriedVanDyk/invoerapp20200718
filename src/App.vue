<template >
  <v-app>
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

<script>
import Vue from "vue";
import NavBar from "@/components/NavBar.vue";
//import db from "@/fb.js";

export default Vue.extend({
  name: "App",
  components: {
    NavBar,
  },

  data: () => ({
    //
    evenementen: [],
  }),

  // created() {
  //   db.collection("evenementen")
  //     .orderBy("evenement")
  //     .onSnapshot((snapShot) => {
  //       let changes = snapShot.docChanges();
  //       changes.forEach((change) => {
  //         //console.log(change.doc.data());
  //         if (change.type === "added") {
  //           this.evenementen.push({
  //             ...change.doc.data(),
  //             id: change.doc.id,
  //           });
  //           // console.log(
  //           //   `de toegevoegde id is: ${change.doc.id} de naam is ${
  //           //     change.doc.data().evenement
  //           //   }  en de lengte vd tabel is ${this.evenementen.length} id van ${
  //           //     this.evenementen[this.evenementen.length - 1].evenement
  //           //   } is ${this.evenementen.length - 1}`
  //           // );
  //           // } else if (change.type === "removed") {
  //           //   let Id = change.doc.id;
  //           //   this.evenementen = this.evenementen.filter((evenement) => {
  //           //     return evenement.id != Id;
  //           //   });
  //         }
  //       });
  //     });
  // },
});
</script>
