<template>
  <div v-if="evenementToUpdate">
    <v-card>
      <v-card-title>
        <span class="headline">Wijzig evenement: {{evenementToUpdate.evenement}}</span>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field
            label="Naam Evenement"
            prepend-icon="title"
            v-model="evenementToUpdate.evenement"
            required
            :rules="inputValidation"
          ></v-text-field>
          <v-text-field
            label="Type Evenement"
            prepend-icon="event"
            v-model="evenementToUpdate.type"
            required
            :rules="inputValidation"
          ></v-text-field>
          <v-text-field
            label="Organisator"
            prepend-icon="people_alt"
            v-model="evenementToUpdate.organisator"
            required
            :rules="inputValidation"
          ></v-text-field>
          <v-text-field
            label="Locatie"
            prepend-icon="house"
            v-model="evenementToUpdate.locatie"
            required
            :rules="inputValidation"
          ></v-text-field>

          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="formattedDate"
                prepend-icon="date_range"
                label="Datum evenement"
                v-bind="attrs"
                v-on="on"
                :rules="inputValidation"
              ></v-text-field>
            </template>
            <v-date-picker v-model="evenementToUpdate.datum" locale="nl"></v-date-picker>
          </v-menu>
          <!-- voeg het begin uur en eind uur toe met time picker -->
          <!-- voeg het begin uur toe met time picker -->
          <v-row>
            <v-col cols="11" sm="5">
              <v-menu
                ref="menu1"
                v-model="timePicker1"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="evenementToUpdate.startUur"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="evenementToUpdate.startUur"
                    label="start uur"
                    prepend-icon="access_time"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="timePicker1"
                  v-model="evenementToUpdate.startUur"
                  full-width
                  @click:minute="$refs.menu1.save(evenementToUpdate.startUur)"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-spacer></v-spacer>

            <!-- voeg het eind uur toe met time picker -->
            <v-col cols="11" sm="5">
              <v-menu
                ref="menu2"
                v-model="timePicker2"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="evenementToUpdate.eindUur"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="evenementToUpdate.eindUur"
                    label="eind uur"
                    prepend-icon="access_time"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="timePicker2"
                  v-model="evenementToUpdate.eindUur"
                  full-width
                  @click:minute="$refs.menu2.save(evenementToUpdate.eindUur)"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>
          <!-- einde begin uur en eind uur toevoegen met time picker -->

          <v-overflow-btn
            class="my-2 mx-2"
            prepend-icon="help"
            :items="statusArray"
            label="status ?"
            v-model="evenementToUpdate.status"
          ></v-overflow-btn>

          <v-textarea
            label="Beschrijving evenement"
            prepend-icon="edit"
            v-model="evenementToUpdate.beschrijving"
            :rules="inputValidation"
          ></v-textarea>
          <v-row justify="end">
            <v-btn @click="cancel" class="primary mx-2 mt-3">cancel</v-btn>
            <v-btn
              @click="editEvenement"
              :loading="loading"
              class="primary mx-2 mt-3"
            >Wijzig evenement</v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import db from "@/fb";
import router from "@/router/index";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { nl } from "date-fns/locale";
export default {
  name: "EditEvenement",
  data() {
    return {
      evenementToUpdate: null,
      loading: false,
      timePicker1: false,
      timePicker2: false,
      statusArray: ["in voorbereiding", "afgewerkt", "gepasseerd"],
      inputValidation: [
        (v) => (v && v.length >= 3) || " de minimum lengte is 3 karakters",
        (v) => (v && v.length <= 300) || " de maximum lengte is 300 karakters",
      ],
    };
  },
  methods: {
    editEvenement() {
      console.log(
        "het gewijzigd evenement is: ",
        this.evenementToUpdate.evenement,
        this.evenementToUpdate
      );

      if (this.$refs.form.validate()) {
        this.loading = true;
        const evenement = {
          evenement: this.evenementToUpdate.evenement,
          type: this.evenementToUpdate.type,
          organisator: this.evenementToUpdate.organisator,
          locatie: this.evenementToUpdate.locatie,
          datum: this.evenementToUpdate.datum, //format(parseISO(this.datum), "do MMMM yyyy", { locale: nl }),
          startUur: this.evenementToUpdate.startUur,
          eindUur: this.evenementToUpdate.eindUur,
          status: this.evenementToUpdate.status,
          beschrijving: this.evenementToUpdate.beschrijving,
        };
        db.collection("evenementen")
          .doc(this.evenementToUpdate.id)
          .update(evenement)
          .then(() => {
            this.loading = false;
            //this.$refs.form.reset();
            router.push({ name: "dashboard" });
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      }

      //this.loading = false;
    },
    cancel() {
      router.push({ name: "dashboard" });
    },
  },
  created() {
    let docRef = db.collection("evenementen").doc(this.$route.params.id);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          this.evenementToUpdate = doc.data();
          this.evenementToUpdate.id = doc.id;
          console.log("evenementToUpdate:", this.evenementToUpdate);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  },
  computed: {
    formattedDate() {
      return this.evenementToUpdate.datum
        ? format(parseISO(this.evenementToUpdate.datum), "do MMMM yyyy", {
            locale: nl,
          })
        : "";
    },
  },
};
</script>

<style>
</style>