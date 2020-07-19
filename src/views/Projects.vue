<template>
  <div class="projects">
    <h1 class="subtitle-1 grey--text">Mijn evenementen</h1>
    <v-container class="my-5">
      <v-expansion-panels popout multiple>
        <v-expansion-panel v-for="item in MijnEvenementen" :key="item.evenement">
          <v-expansion-panel-header>{{item.evenement}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card flat>
              <v-card-text class="px-4 py-1 grey--text">
                <div class="font-weight-bold">datum: {{ item.datum }}</div>

                <div>{{ item.beschrijving }}</div>
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
      evenementen: [
        // {
        //   evenement: "NBA-final",
        //   type: "sport",
        //   organisator: "Wilfried",
        //   locatie: "sportzaal aalter",
        //   datum: "1/12/2020 21u",
        //   status: "in voorbereiding",
        //   beschrijving:
        //     "1Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, perferendis deleniti? Doloribus quibusdam magnam quae commodi pariatur id accusantium excepturi delectus molestiae fugit ducimus, voluptate blanditiis voluptatem repudiandae repellat molestias."
        // },
        // {
        //   evenement: "live action video performance",
        //   type: "cultuur",
        //   organisator: "Corneel",
        //   locatie: "sint pieters abdij",
        //   datum: "1/11/2020 19u",
        //   status: "afgewerkt",
        //   beschrijving:
        //     "2Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, perferendis deleniti? Doloribus quibusdam magnam quae commodi pariatur id accusantium excepturi delectus molestiae fugit ducimus, voluptate blanditiis voluptatem repudiandae repellat molestias."
        // },
        // {
        //   evenement: "boring stuff to develop website",
        //   type: "vergadering",
        //   organisator: "Wilfried",
        //   locatie: "ten dries",
        //   datum: "1/10/2020 20u",
        //   status: "afgewerkt",
        //   beschrijving:
        //     "3Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, perferendis deleniti? Doloribus quibusdam magnam quae commodi pariatur id accusantium excepturi delectus molestiae fugit ducimus, voluptate blanditiis voluptatem repudiandae repellat molestias."
        // },
        // {
        //   evenement: "promo activiteit voor lancering website",
        //   type: "film",
        //   organisator: "Corneel",
        //   locatie: "studio skoop",
        //   datum: "1/9/2020 14u",
        //   status: "gepasseerd",
        //   beschrijving:
        //     "4Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, perferendis deleniti? Doloribus quibusdam magnam quae commodi pariatur id accusantium excepturi delectus molestiae fugit ducimus, voluptate blanditiis voluptatem repudiandae repellat molestias."
        // }
      ]
    };
  },
  computed: {
    MijnEvenementen() {
      return this.evenementen.filter(item => {
        return item.organisator === "Wilfried";
      });
    }
  },
  created() {
    db.collection("evenementen").onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        if (change.type === "added") {
          this.evenementen.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        }
      });
    });
  }
};
</script>