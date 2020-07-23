<template>
  <div class="dashboard">
    <h1 class="subtitle-1 grey--text">Dashboard</h1>
    <!-- <v-container fluid class="my-5 grey lighten-4">
      <v-row class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" class="mx-2" @click="sort('evenement')" v-on="on">
              <v-icon left small>folder</v-icon>
              <span caption text-lowercase>Evenementen sorteren</span>
            </v-btn>
          </template>
          <span>alfabetisch evenementen sorteren</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" class="mx-2" @click="sort('organisator')" v-on="on">
              <v-icon left small>person</v-icon>
              <span caption text-lowercase>Organisatoren sorteren</span>
            </v-btn>
          </template>
          <span>alfabetisch organisatoren sorteren</span>
        </v-tooltip>
      </v-row>

      <v-card flat v-for="evenementItem in evenementen" :key="evenementItem.evenement">
        <v-row
          align="top"
          justify="space-around"
          style="min-height: 100px"
          :class="`pl-3 evenement ${evenementItem.status}`"
        >
          <v-col cols="12" md="2">
            <div class="caption grey--text">Evenement Naam</div>
            <div>{{evenementItem.evenement}}</div>
          </v-col>
          <v-col cols="6" sm="6" md="2">
            <div class="caption grey--text">Organisator</div>
            <div>{{evenementItem.organisator}}</div>
          </v-col>

          <v-col cols="6" sm="6" md="2">
            <div class="caption grey--text">Datum</div>
            <div>{{evenementItem.datum}}</div>
            <v-row>
              <v-col>
                <div class="caption grey--text">
                  start uur:
                  <span class="black--text">{{evenementItem.startUur}}</span>
                </div>
              </v-col>

              <v-col>
                <div class="caption grey--text">
                  eind uur:
                  <span class="black--text">{{evenementItem.eindUur}}</span>
                </div>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="6" sm="6" md="2">
            <div class="caption grey--text">Locatie</div>
            <div>{{evenementItem.locatie}}</div>
          </v-col>
          <v-col cols="6" sm="6" md="1">
            <div>
              <v-chip
                small
                :class="`${evenementItem.status} white--text caption`"
              >{{evenementItem.status}}</v-chip>
            </div>
          </v-col>
        </v-row>
        <v-divider />
      </v-card>
    </v-container>-->

    <!-- de tabel start hier-->
    <v-container fluid class="my-5 grey lighten-4">
      <v-card>
        <v-card-title>
          Evenementen
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="zoeken..."
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <br />
        <v-data-table
          :headers="headers"
          :items="evenementen"
          :items-per-page="5"
          :search="search"
          :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus'
      }"
          item-key="evenement"
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
            <h3 class="text--ligthen-1 grey--text">{{item.evenement}}</h3>
          </template>
          <!-- item delete of update -->
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import db from "@/fb.js";

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
    editItem(item) {
      const index = item.id;

      return console.log(index);
    },
    deleteItem(item) {
      const index = item.id;
      console.log("het deleted item id is:  " + index);
      db.collection("evenementen").doc(index).delete();
    },
  },
  created() {
    db.collection("evenementen")
      .orderBy("evenement")
      .onSnapshot((snapShot) => {
        let changes = snapShot.docChanges();
        changes.forEach((change) => {
          console.log(change.doc.data());
          if (change.type === "added") {
            this.evenementen.push({
              ...change.doc.data(),
              id: change.doc.id,
            });
            console.log(
              `de teogevoegde id is: ${change.doc.id} de naam is ${
                change.doc.data().evenement
              }  en de lengte vd tabel is ${this.evenementen.length} id van ${
                this.evenementen[this.evenementen.length - 1].evenement
              } is ${this.evenementen.length - 1}`
            );
          } else if (change.type === "removed") {
            let Id = change.doc.id;
            console.log(Id);
            //hier zit het probleem: het retourneert altijd -1 !!!! als gevonden index, dus hij vind geen gelijkende velden...
            let gevondenIndex = this.evenementen.findIndex(
              (item) => item.id == Id
            );
            console.log(gevondenIndex);
            if (gevondenIndex >= 0) {
              this.evenementen.splice(gevondenIndex, 1);
            }
          } else if (change.type === "modified") {
            //
          }
        });
      });
  },
  updated: function () {
    this.$nextTick(function () {});
  },

  //GETTING DATA
  // db.collection('evenementen').get().then((snapshot) =>
  // {
  //   snapshot.docs.forEach(doc =>{
  //hierin een functie die de data aan een array of zo toevoegd vb:
  // this.evenementen.push(doc.data);
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
  // // db.collection('evenementen').orderBy('organisator', '==', 'this.ingelogdeGebruiker').get().then((snapshot) =>
  // {
  //   snapshot.docs.forEach(doc =>{
  //hierin een functie die de data aan een array of zo toevoegd vb:
  // this.evenementen.push(doc.data);
  //   });
  // }
  // );
};
</script>

<style scoped>
.evenement.voorbereiding {
  border-left: 4px solid orange;
}

.evenement.afgewerkt {
  border-left: 4px solid lightgreen;
}
.evenement.gepasseerd {
  border-left: 4px solid red;
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
