<template>
  <div class="projects">
    <h1 class="subtitle-1 grey--text">Mijn evenementen</h1>
    <v-container class="my-5">
      <v-expansion-panels popout multiple>
        <v-expansion-panel v-for="evenementItem in evenementen" :key="evenementItem.evenement">
          <v-expansion-panel-header>{{evenementItem.evenement}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card flat>
              <v-card-text class="px-4 py-1 grey--text">
                <!-- <div class="font-weight-bold">datum: {{ evenementItem.datum }}</div> -->

                <div class="font-weight-bold">Datum: {{evenementItem.datum}}</div>

                <v-row>
                  <v-col cols="12" sm="4" md="2">
                    <div class="caption grey--text">
                      start uur:
                      <span class="black--text">{{evenementItem.startUur}}</span>
                    </div>

                    <div class="caption grey--text">
                      eind uur:
                      <span class="black--text">{{evenementItem.eindUur}}</span>
                    </div>

                    <div>{{evenementItem.status}}</div>
                  </v-col>
                </v-row>

                <v-col cols="12" md="12">{{evenementItem.beschrijving }}</v-col>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import db from "@/fb";

export default {
  name: "projects",
  components: {},
  data() {
    return {
      evenementen: [],
    };
  },
  computed: {
    // MijnEvenementen() {
    //   return this.evenementen.filter((evenementItem) => {
    //     return evenementItem.organisator === "Wilfried";
    //   });
    // },
  },
  created() {
    db.collection("evenementen")
      .orderBy("evenement")
      .where("organisator", "==", "Wilfried") //hier in where clause met ingelogde gebruiker
      .onSnapshot((res) => {
        const changes = res.docChanges();
        changes.forEach((change) => {
          if (change.type === "added") {
            this.evenementen.push({
              ...change.doc.data(),
              id: change.doc.id,
            });
          }
        });
      });
  },
};
</script>