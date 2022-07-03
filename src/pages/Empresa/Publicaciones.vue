<template>
  <div class="row">
    <div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>
    <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10">
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
      <div class="row">&nbsp;&nbsp;&nbsp;</div>

      <!-- imagen del producto
        titulo y unidades del producto
      precio
      envio gratis o a cargo del vendedor
      tipo de calidad basica o profesional -->
      <q-btn
        to="/NewProduct"
        dark
        rounded
        class="glossy"
        color="blue-8"
        icon="add"
        size="md"
      />
      <div class="row"></div>
      <q-card
        v-for="(task, index) in tasks"
        :key="index"
        bordered
        class="row q-pa-md"
      >
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-pa-md">
          <!-- imagen y datos del producto -->
          <div class="row"> 
            <div
              class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12 q-pa-md"
            >
              <!-- imagen del producto -->
              <q-img :src="AgregarImagenLista(index)" />
            </div>
            <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12 q-pa-md">
              <!-- datos del producto -->
              <div class="text-capitalize text-bold text-black">
                {{ task.titulo }}
                <br />
                {{ task.cantidad }} unidades
              </div>
            </div>
          </div>
        </div>

        <div
          class="
            col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12
            q-pa-md
            text-bold
          "
        >
          &nbsp;&nbsp;Precio
          {{ RetornarPrecioFormateado(task.precio) }}
          <div class="column">
            <q-btn
              class="glossy"
              dark
              rounded
              color="blue-5"
              label="Modificar precio"
            />
          </div>
        </div>

        <div
          class="
            col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12
            q-pa-md
            text-bold
          "
        >
          Premium
        </div>

        <div
          class="
            col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12
            q-pa-md
            text-bold
          "
        >
          Envio gratis
        </div>
        <!-- datos del vendedor -->
        <div
          class="
            col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12
            q-pa-md
            text-center
          "
        >
          <q-circular-progress
            show-value
            font-size="12px"
            :value="value"
            size="50px"
            :thickness="0.22"
            color="blue-5"
            track-color="grey-3"
            class="q-ma-md"
          >
            {{ value }}%
          </q-circular-progress>
          <br />Calidad Profesional<br />

          <q-btn dark rounded color="blue-5" icon="edit" size="xs">
            <q-menu>
              <q-list dense style="min-width: 100px">
                <q-item to="/EditProduct" clickable v-close-popup>
                  Editar
                </q-item>
                <q-item clickable v-close-popup>
                  Eliminar
                </q-item>
                <q-separator />
                <q-separator />
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-card>
    </div>
    <div class="col-xl-1 col-lg-1 col-md-1 col-sm-0 col-xs-0"></div>
  </div>
</template>

<script>
const axios = require("axios");

import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "Publicaciones",

  created() {
    this.UsuarioAccedioCorrectamente();
    this.IniciarData();
  },

  data() {
    return {
      name: "Publicaciones",
      tasks: [],
      value: 100,
    };
  },

  methods: {
    AgregarImagenLista(id) {
      return this.tasks[id].imagen;
    },

    IniciarData() {
      //Necesitamos el id, precio, titulo
      let arreglo = [];
      axios
        .get("https://localhost:44370/api/Producto", {
          responseType: "json",
        })
        .then(function (res) {
          if (res.status == 200) {
            for (let i = 0; i < res.data.length; i++) {
              let producto = {
                id: res.data[i].id_Producto,
                imagen: res.data[i].imagen,
                precio: res.data[i].precio,
                titulo: res.data[i].titulo,
                descripcion: res.data[i].descripcion,
                cantidad: res.data[i].cantidad,
              };
              arreglo.push(producto);
            }
          } else {
            console.log("Algo ah fallado");
          }
        })
        .catch(function (err) {
          console.log("Error en axios: " + err);
        });
      this.tasks = arreglo;
      console.log(this.tasks);
    },

    RetornarPrecioFormateado(precio) {
      //convertir el entero a string

      const formatterPeso = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      });
      return formatterPeso.format(precio);
    },


    UsuarioAccedioCorrectamente() {
      //const auth = getAuth();

      onAuthStateChanged(this.$store.state.auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log("usuario autenticado uid: ", uid);
          /* const user2 = auth.currentUser; */
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          
        } else {
          if (this.$route.path !== "/") {
            this.$router.replace("/");
          }
        }
      });
    },
  },
};
</script>

<style scoped>
</style>