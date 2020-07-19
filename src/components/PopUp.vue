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
              <v-spacer></v-spacer>

              <v-text-field
                label="Status"
                prepend-icon="help"
                v-model="status"
                :rules="inputValidation"
              ></v-text-field>
              <v-textarea
                label="Beschrijving evenement"
                prepend-icon="edit"
                v-model="beschrijving"
                :rules="inputValidation"
              ></v-textarea>
              <v-btn @click="submit" :loading="loading" class="success mx-2 mt-3">Voeg evenement toe</v-btn>
              <v-btn @click="dialog=false" class="success mx-2 mt-3">cancel</v-btn>
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
      dialog: false,
      evenement: "",
      type: "",
      organisator: "",
      locatie: "",
      datum: null,
      status: "",
      beschrijving: "",
      inputValidation: [
        v => (v && v.length >= 3) || " de minimum lengte is 3 karakters",
        v => (v && v.length <= 300) || " de maximum lengte is 300 karakters"
      ],
      loading: false
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
          status: this.status,
          beschrijving: this.beschrijving
        };
        db.collection("evenementen")
          .add(evenement)
          .then(() => {
            this.loading = false;
            this.dialog = false;
            this.$emit("eventAdded");
            //console.log("added to db: " + evenement.evenement);
          });
      }
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
