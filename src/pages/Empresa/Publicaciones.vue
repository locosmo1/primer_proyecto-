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
          class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12 q-pa-md text-bold"
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
              size="sm"
            />
          </div>
        </div>

        <div
          class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12 q-pa-md text-bold"
        >
          Premium
        </div>

        <div
          class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12 q-pa-md text-bold"
        >
          Envio gratis
        </div>
        <!-- datos del vendedor -->
        <div
          class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12 q-pa-md text-center"
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
                <q-item
                  @click="IrEditarProducto(index)"
                  clickable
                  v-close-popup
                >
                  Editar
                </q-item>
                <q-item clickable v-close-popup> Eliminar </q-item>
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

import { onAuthStateChanged } from "firebase/auth";

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
    IrEditarProducto(index) {
      this.$router.push({
        path: "EditProduct",
        query: { producto: this.tasks[index] },
      });
    },

    AgregarImagenLista(id) {
      return this.tasks[id].imagen;
    },

    IniciarData() {
      //Necesitamos el id, precio, titulo
      let arreglo = [];

      let url = this.$store.state.urlBackendElegida + "api/Producto";

      axios
        .get(url, {
          responseType: "json",
        })
        .then(function (res) {
          if (res.status == 200) {
            for (let i = 0; i < res.data.length; i++) {
              let producto = {
                idProducto: res.data[i].idProducto,
                titulo: res.data[i].titulo,
                descripcion: res.data[i].descripcion,
                precio: res.data[i].precio,
                cantidad: res.data[i].cantidad,
                imagen: res.data[i].imagen,
                color: res.data[i].color,
                idCategoria: res.data[i].idCategoria,
                idEmpresa: res.data[i].idEmpresa,
              };
              let idCategoria =
                producto.idCategoria === 1
                  ? "Tecnologia"
                  : producto.idCategoria === 2
                  ? "Belleza"
                  : producto.idCategoria === 3
                  ? "Farmacia"
                  : producto.idCategoria === 4
                  ? "Moda"
                  : producto.idCategoria === 5
                  ? "Cocina"
                  : "Deporte";
              producto.idCategoria = idCategoria;
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
    },

    ObtenerCategoria(id) {
      return id === 1
        ? "Tecnologia"
        : id === 2
        ? "Belleza"
        : id === 3
        ? "Farmacia"
        : id === 4
        ? "Moda"
        : id === 5
        ? "Cocina"
        : "Deporte";
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
          //this.ObtenerUsuarioActual();
        } else {
          if (this.$route.path !== "/Login") {
            this.$router.replace("/Login");
          }
        }
      });
    },

    async ObtenerUsuarioActual() {
      let url =
        this.$store.state.urlBackendElegida +
        "api/Usuario/ObtenerUsuarioActual";

      let usuarioActual = await this.EnviarPeticionRespuesta(url, "GET");
      if (usuarioActual.idRol !== 2) {
        if (this.$route.path !== "/") {
          this.$router.replace("/");
        }
      }
    },

    async EnviarPeticionRespuesta(url, method, body) {
      let opcion = body === "" ? false : true;
      let informacion;
      if (opcion) {
        informacion = await fetch(url, {
          method: method,
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        informacion = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      const data = await informacion.json();
      return data;
    },
  },
};
</script>

<style scoped></style>
