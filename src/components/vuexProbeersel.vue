<template>
  <div>
    <h1>count array</h1>
    <p>{{count}}</p>
    <h1>count array plus 1 GET</h1>
    <p>{{countPlusOne}}</p>
    <v-btn @click="halveren(delenDoor)">halveren CountArray met method</v-btn>
    <h1>evenementen</h1>
    <p>{{evenementen}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      delenDoor: 2,
      evenementenTabel: [],
    };
  },
  computed: {
    count() {
      return this.$store.state.count;
    },
    countPlusOne() {
      return this.$store.getters.countPlusOne;
    },
    evenementen() {
      return this.$store.state.evenementen;
    },
  },
  methods: {
    halveren(delenDoor) {
      //commit is a mutation
      //this.$store.commit("countHalveren");
      //dispatch is an action
      this.$store.dispatch("countHalveren", delenDoor);
    },
  },
  created() {
    this.$store.dispatch("bindEvenementen");
    //als ik wil werken met parameters:  this.$store.dispatch('evenementen', { id: this.$route.params.assetId });
  },
};
</script>

<style>
</style>