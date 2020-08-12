import Vue from 'vue'
import Vuex from 'vuex'
import db from "@/fb.js"
import { vuexfireMutations, firestoreAction } from 'vuexfire'



Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    state: {
        evenementen: [],
        // count: [{ naam: "eerste getal", getal: 5 }, { naam: "tweede getal", getal: 6 }, { naam: "derde getal", getal: 8 }]

    },
    actions: {
        bindEvenementen: firestoreAction(({ bindFirestoreRef }) => {
            // return the promise returned by `bindFirestoreRef`
            return bindFirestoreRef('evenementen', db.collection('evenementen'));

        }),
        // countHalveren: (context, delenDoor) => {
        //     //here is where you perform the asynchronius task: reaching for the server
        //     setTimeout(() => {
        //         context.commit('countHalveren', delenDoor);
        //     }, 3000);
        // },
    },
    mutations: {
        //no asynchronius task  !!!!
        // countHalveren: (state, delenDoor) => {
        //     state.count.forEach((getal) => {
        //         getal.getal = getal.getal / delenDoor;
        //     });
        // },
        ...vuexfireMutations,
    },
    getters: {
        // countPlusOne: state => {
        //     var countPlusOne = state.count.map(element => {
        //         return {
        //             naam: '**' + element.naam + '**',
        //             getal: element.getal + 1
        //         }
        //     });
        //     return countPlusOne;
        // }
    },
});
