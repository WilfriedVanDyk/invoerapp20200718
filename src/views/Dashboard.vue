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
            label="geef een zoekterm in"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="evenementen"
          :items-per-page="5"
          :search="search"
          item-key="evenement"
          sort-by="datum"
          group-by="organisator"
          class="elevation-1"
          show-group-by
          :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus'
      }"
          show-expand
        >
          <!-- <template v-slot:header.name="{ header }">{{ header.text.toUpperCase() }}</template> -->
          <template v-slot:expanded-item="{item }">
            <td>{{ item.beschrijving }}</td>
          </template>
          <template v-slot:item.status="{ item }">
            <!-- <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip> -->
            <v-chip small :class="`${item.status} white--text caption`">{{item.status}}</v-chip>
          </template>
          <template v-slot:item.evenement="{ item }">
            <h3 class="text--ligthen-1 grey--text">{{item.evenement}}</h3>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
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
          groupable: false
        },
        { text: "Organisator", value: "organisator" },
        { text: "Datum", value: "datum", align: "right" },
        {
          text: "Start uur",
          value: "startUur",
          groupable: false,
          sortable: false,
          filterable: false,
          align: "right"
        },
        {
          text: "Eind uur",
          value: "eindUur",
          groupable: false,
          sortable: false,
          filterable: false,
          align: "left"
          // width: "100px"
        },
        { text: "Locatie", value: "locatie", align: "center" },
        { text: "Status", value: "status" },
        { text: "beschrijving", value: "data-table-expand", groupable: false }
      ],
      evenementen: []
    };
  },
  methods: {
    sort(prop) {
      this.evenementen.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
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
  },
  getColor() {}
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
