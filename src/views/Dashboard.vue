<template>
  <div class="dashboard">
    <h1 class="subtitle-1 grey--text">Dashboard</h1>
    <!-- de tabel start hier-->
    <v-container fluid class="my-5 grey lighten-4">
      <v-card>
        <v-card-title>
          Evenementen
          <v-spacer></v-spacer>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="zoeken..."
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </v-card-title>
        <br />
        <v-data-table
          :headers="headers"
          :items="evenementen"
          :items-per-page="10"
          :search="search"
          :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus'
      }"
          item-key="id"
          group-by="organisator"
          class="elevation-1"
          show-group-by
          show-expand
        >
          <!-- <template v-slot:header.name="{ header }">{{ header.text.toUpperCase() }}</template> -->
          <template v-slot:expanded-item="{item }">
            <td :colspan="headers.length">{{ item.beschrijving }}</td>
          </template>
          <template v-slot:item.status="{ item }">
            <v-chip small :class="`${item.status} white--text caption`">{{item.status}}</v-chip>
          </template>
          <template v-slot:item.evenement="{ item }">
            <h3 :class="`${item.status} text--ligthen-1 grey--text`">{{item.evenement}}</h3>
          </template>
          <!-- item delete of update -->
          <template v-slot:item.actions="{ item }">
            <!-- <routerlink :to="{name:'EditEvenement', params:{id:item.id}}"></router-link> -->
            <v-chip
              text
              color="grey lighten-3"
              class="my-1"
              small
              router
              :to="{name:'EditEvenement', params:{id:item.id}}"
            >
              <span>wijzigen</span>
              <v-icon right>mdi-pencil</v-icon>
            </v-chip>
            <v-chip text color="grey lighten-3" class="ma-1" small @click="deleteItem(item.id)">
              <span>verwijderen</span>
              <v-icon right>mdi-delete</v-icon>
            </v-chip>
            <!-- <v-icon small class="mr-2" router :to="{name:'EditEvenement', params:{id:item.id}}">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item.id)">mdi-delete</v-icon>-->
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <!-- adding components!! -->
  </div>
</template>

<script>
import db from "@/fb.js";
// router from "@/router/index";

export default {
  name: "dashboard",
  components: {},
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Evenement",
          align: "start",
          value: "evenement",
          groupable: false,
        },
        { text: "Organisator", value: "organisator" },
        { text: "Datum", value: "datum", align: "right" },
        {
          text: "Start uur",
          value: "startUur",
          groupable: false,
          sortable: false,
          filterable: false,
          align: "right",
        },
        {
          text: "Eind uur",
          value: "eindUur",
          groupable: false,
          sortable: false,
          filterable: false,
          align: "left",
          // width: "100px"
        },
        { text: "Locatie", value: "locatie", align: "center" },
        { text: "Status", value: "status" },
        { text: "beschrijving", value: "data-table-expand", groupable: false },
        { text: "Acties", value: "actions", sortable: false, groupable: false },
      ],
      evenementen: [],
    };
  },
  methods: {
    // sort(prop) {
    //   this.evenementen.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    // },
    editItem(id) {
      console.log(id); //@click="editItem(item.id)"
      //hier moet een form getoond worden met alle gegevens van dit document,
      // waar je in kan werken , en terug opslaan via de update firestore method
    },
    deleteItem(id) {
      // console.log("het deleted item id is:  " + id);

      db.collection("evenementen")
        .doc(id)
        .delete()
        .then(() => {
          this.evenementen = this.evenementen.filter((evenement) => {
            return evenement.id != id;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    db.collection("evenementen")
      .orderBy("evenement")
      .onSnapshot((snapShot) => {
        let changes = snapShot.docChanges();
        changes.forEach((change) => {
          //console.log(change.doc.data());
          if (change.type === "added") {
            this.evenementen.push({
              ...change.doc.data(),
              id: change.doc.id,
            });
            // console.log(
            //   `de toegevoegde id is: ${change.doc.id} de naam is ${
            //     change.doc.data().evenement
            //   }  en de lengte vd tabel is ${this.evenementen.length} id van ${
            //     this.evenementen[this.evenementen.length - 1].evenement
            //   } is ${this.evenementen.length - 1}`
            // );
            // } else if (change.type === "removed") {
            //   let Id = change.doc.id;
            //   this.evenementen = this.evenementen.filter((evenement) => {
            //     return evenement.id != Id;
            //   });
          }
        });
      });
  },
  // updated: function () {
  //   this.$nextTick(function () {});
  // },

  //GETTING DATA
  // db.collection('evenementen').get().then((snapshot) =>
  // {
  //   snapshot.forEach(doc =>{
  //hierin een functie die de data aan een array of zo toevoegd vb:
  // this.evenementen.push({...doc.data(), doc.id});
  //   });
  // }
  // );
  //
  //SAVING DATA
  // db.collection('evenementen').add(
  //{ object with properties hierin}
  //);

  //querying data
  // db.collection('evenementen').where('organisator', '==', 'this.ingelogdeGebruiker').get().then((snapshot) =>
  // {
  //   snapshot.docs.forEach(doc =>{
  //hierin een functie die de data aan een array of zo toevoegd vb:
  // this.evenementen.push(doc.data);
  //   });
  // }
  // );

  // ordering data
  // // db.collection('evenementen').orderBy('organisator').get().then((snapshot) =>
  // {
  //   snapshot.docs.forEach(doc =>{
  //hierin een functie die de data aan een array of zo toevoegd vb:
  // this.evenementen.push(doc.data);
  //   });
  // }
  // );

  //updating
  // db.collection("evenementen").doc(index).update({
  //       evenement: this.evenement,
  //       //....
  //     });
  //setting: is volledig overschrijven van het object
  //gewoon set gebruiken ipv update
};
</script>

<style scoped>
.voorbereiding {
  border-right: 4px solid orange;
}

.afgewerkt {
  border-right: 4px solid lightgreen;
}
.gepasseerd {
  border-right: 4px solid red;
}

.v-chip.voorbereiding {
  background: orange !important;
}

.v-chip.afgewerkt {
  background: lightgreen !important;
}
.v-chip.gepasseerd {
  background: red !important;
}
</style>
