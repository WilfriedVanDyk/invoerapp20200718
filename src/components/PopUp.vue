<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="grey lighten-1" dark v-bind="attrs" v-on="on">Voeg evenement toe</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Voeg een evenement toe</span>
          </v-card-title>
          <v-card-text>
            <v-form class="px-3" ref="form">
              <v-text-field
                label="Naam Evenement"
                prepend-icon="title"
                v-model="evenement"
                required
                :rules="inputValidation"
              ></v-text-field>
              <v-text-field
                label="Type Evenement"
                prepend-icon="event"
                v-model="type"
                required
                :rules="inputValidation"
              ></v-text-field>
              <v-text-field
                label="Organisator"
                prepend-icon="people_alt"
                v-model="organisator"
                required
                :rules="inputValidation"
              ></v-text-field>
              <v-text-field
                label="Locatie"
                prepend-icon="house"
                v-model="locatie"
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
                <v-date-picker v-model="datum" locale="nl"></v-date-picker>
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
                    :return-value.sync="startUur"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="startUur"
                        label="start uur"
                        prepend-icon="access_time"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="timePicker1"
                      v-model="startUur"
                      full-width
                      @click:minute="$refs.menu1.save(startUur)"
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
                    :return-value.sync="eindUur"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="eindUur"
                        label="eind uur"
                        prepend-icon="access_time"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="timePicker2"
                      v-model="eindUur"
                      full-width
                      @click:minute="$refs.menu2.save(eindUur)"
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
                v-model="status"
              ></v-overflow-btn>

              <v-textarea
                label="Beschrijving evenement"
                prepend-icon="edit"
                v-model="beschrijving"
                :rules="inputValidation"
              ></v-textarea>
              <v-btn @click="submit" :loading="loading" class="primary mx-2 mt-3">Voeg evenement toe</v-btn>
              <v-btn @click="cancel" class="primary mx-2 mt-3">cancel</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { nl } from "date-fns/locale";
import db from "@/fb";
export default {
  data() {
    return {
      timePicker1: false,
      timePicker2: false,
      dialog: false,
      evenement: "",
      type: "",
      organisator: "",
      locatie: "",
      datum: null,
      startUur: null,
      eindUur: null,
      status: "",
      beschrijving: "",
      inputValidation: [
        v => (v && v.length >= 3) || " de minimum lengte is 3 karakters",
        v => (v && v.length <= 300) || " de maximum lengte is 300 karakters"
      ],
      loading: false,
      statusArray: ["in voorbereiding", "afgewerkt", "gepasseerd"]
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const evenement = {
          evenement: this.evenement,
          type: this.type,
          organisator: this.organisator,
          locatie: this.locatie,
          datum: format(parseISO(this.datum), "do MMMM yyyy", { locale: nl }),
          startUur: this.startUur,
          eindUur: this.eindUur,
          status: this.status,
          beschrijving: this.beschrijving
        };
        db.collection("evenementen")
          .add(evenement)
          .then(() => {
            this.loading = false;
            this.dialog = false;
            this.$emit("eventAdded");
            console.log("added to db: " + evenement.datum);
            this.$refs.form.reset();
          });
      }
    },
    cancel() {
      this.dialog = false;
      this.$refs.form.reset();
    }
  },
  computed: {
    formattedDate() {
      return this.datum
        ? format(parseISO(this.datum), "do MMMM yyyy", { locale: nl })
        : "";
    }
  }
};
</script>

<style scoped>
</style>
