/* import Vue from "vue";
import Vuex from "vuex";
import * as VueGoogleMaps from "vue2-google-maps";

import { createLogger } from "vue-logger-plugin";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCOe6XiKYkPA1q3u4v_SVZy5Pw9yIXOnVQ",
  },
}); */

// import example from './module-example'

//Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

/* export default function ({ ssrContext }) {
  const Store = new Vuex.Store({
    modules: {
      // example
    },
    strict: process.env.DEBUGGING
  })

  return Store
}
 */

/* const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {},
  strict: process.env.DEBUGGING
}); */

import Vue from "vue";
import Vuex from "vuex";

import * as VueGoogleMaps from "vue2-google-maps";

import { getAuth } from "firebase/auth";

import { initializeApp } from "firebase/app";

import {
  setPersistence,
  inMemoryPersistence,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";

import _, { map } from "underscore";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCOe6XiKYkPA1q3u4v_SVZy5Pw9yIXOnVQ",
  },
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //Datos globales
    usuario: {},
    auth: {},
    provider: {},
    app: {},
    conectado: false,
    nombre: "Jhon",
    apellido: "Stiwar",
    amigos: ["ana", "caballo"],
    comprados: [],
    total_compra: 0,
    amigo: null,
    dialog: false,
    dialogProductos: false,
    editar: false,
    indice_editar: undefined,
  },
  mutations: {
    //Se utilizan metodos que son asincronicos NO APIS
    add_amigo(state) {
      state.amigos.push(state.amigo);
    },
    cerrarSesion(state) {
      if (_.isEmpty(state.auth)){
        signOut(state.auth)
        .then(() => {
          //this.Response.Cookies.Delete("session");
          console.log("Sesion cerrada");
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
      }
    },
    iniciarFirebase(state) {
      if (_.isEmpty(state.auth)) {
        const firebaseConfig = {
          apiKey: "AIzaSyCzVaDxudQnk2wzAe4m8pF5BtdgGKVsxso",
          authDomain: "buy-online-7b548.firebaseapp.com",
          projectId: "buy-online-7b548",
          storageBucket: "buy-online-7b548.appspot.com",
          messagingSenderId: "472565836098",
          appId: "1:472565836098:web:b1ef86075a6ded313a80db",
          measurementId: "G-M27HCV275E",
        };
        const app = initializeApp(firebaseConfig);
        state.app = app;
        state.auth = getAuth();
      }
    },
    modificarPersistencia(state) {
      const auth = state.auth;
      setPersistence(auth, inMemoryPersistence)
        .then(() => {
          if (_.isEmpty(state.provider)) {
            state.provider = new GoogleAuthProvider();
            // In memory persistence will be applied to the signed in Google user
            // even though the persistence was set to 'none' and a page redirect
            // occurred.
            signInWithRedirect(auth, state.provider);
          }
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("error: " + error.message);
        });
      console.log("Persistencia modificada");
    },
  },
  actions: {
    //Metodos globales Se utitilizan metodos que son asyncronicos Consulta de APIS
    add_amigo_Action(context) {
      context.commit("add_amigo");
    },
    iniciarFirebaseAction(context) {
      context.commit("iniciarFirebase");
    },
    modificarPersistenciaAction(context) {
      context.commit("modificarPersistencia");
    },
  },
  getters: {
    //Obtener datos globales
    dialogo(state) {
      return state.dialog;
    },
    editar(state) {
      return state.editar;
    },
    nombre(state) {
      return `${state.nombre} ${state.apellido}`;
    },
    comprados(state) {
      return state.comprados;
    },
    conectado(state) {
      return state.conectado;
    },
    usuario(state){
      return state.usuario;
    }
  },
  modules: {
    //Recoleccion de estados, mutaciones, acciones, getters
  },
});
