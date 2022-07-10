<template>
  <!-- class="full-width column wrap justify-end items-start content-start" -->
  <!-- class="q-pa-md q-gutter-sm" -->
  <div>
    <!-- fit column inline -->
    <!-- fontawesomeicons pack de iconos -->
    <link
      rel="stylesheet"
      href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
      integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
      crossorigin="anonymous"
    />
    <div>
      <div class="row bg-warning">
        <div class="col-xl-12 col-lg-10 col-md-10 col-sm-10 col-xs-7">
          <q-tabs v-model="tab" align="left" narrow-indicator class="q-pa-md">
            <q-tab class="text-black" name="consultar" label="CATEGORIAS" />
            <q-tab
              @click="Ofertas()"
              class="text-black"
              name="detalles"
              label="OFERTAS"
            />
            <q-tab class="text-black" name="new" label="HISTORIAL" />
            <q-tab
              @click="Supermercado()"
              class="text-black"
              name="edit"
              label="SUPERMERCADO"
            />
            <q-tab
              @click="Moda()"
              class="text-black"
              name="cart"
              label="MODA"
            />
            <q-tab class="text-black" name="end_buy" label="AYUDA / PQR" />
          </q-tabs>
        </div>

        <q-space></q-space>
      </div>

      <q-card bordered>
        <q-card-section>
          <div class="row items-start q-pa-md">
            <!-- my-content -->
            <q-card
              bordered
              v-for="(task, index) in tasks"
              :key="index"
              class="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-xs-12 grid-item1 q-pa-md"
              ><!-- grid-item1 -->
              <div>
                <!-- class="my-content" -->
                <div @click="VerDetalles(index)">
                  <!-- class="pointerproduct" -->
                  <!-- @click="VerDetalles(index)" -->

                  <div width="100px" height="100px">
                    <div>
                      <q-img
                        width="100%"
                        height="250px"
                        :src="AgregarImagenLista(index)"
                      />
                    </div>
                    <q-separator />
                  </div>

                  <q-card-section>
                    <div class="justify-around">
                      <div class="text-h6">
                        {{ RetornarPrecioFormateado(task.precio) }}
                      </div>
                      <div class="text-h6">{{ task.titulo }}</div>
                    </div>
                  </q-card-section>
                </div>

                <q-separator />

                <q-card-actions>
                  <div class="row">
                    <div class="col-auto">
                      <q-btn
                        @click="AgregarCarrito(index)"
                        class="glossy"
                        dark
                        rounded
                        color="blue-7"
                        label="Agregar al carrito"
                      />
                    </div>
                  </div>
                </q-card-actions>
              </div>
            </q-card>
          </div>
        </q-card-section>
      </q-card>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import { matMenu } from "@quasar/extras/material-icons";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { initializeApp } from "firebase/app";

export default {
  /*props: {
    fotos: Array,
  },*/
  data() {
    return {
      bluetooth: true,
      mobileData: false,

      color: "",
      cantidad: 1,
      options: ["Amarillo", "Azul", "Verde", "Rojo"],
      opciones: ["1", "2", "3", "4"],
      dense: false,
      denseOpts: false,

      nombre: "stiwar",
      pais: "Colombia",
      departamento: "Caqueta",
      municipio: "Florencia",
      direccion: "Calle 10a",
      telefono: "3508426005",
      tarjeta: "1651610321321",

      matMenu: null,
      id_producto: -1,
      lista: false,
      editar: false,
      titulo: "",
      url_image: "",
      editedItem: {
        id: 0,
        imagen: "",
        precio: 0,
      },
      pagina: 0,
      ultimo: "",
      j: 0,
      tab: "",
      indice_editar: 0,
      tamano: 14,
      buscar: "cats",
      card: false,
      fotos: [],
      comprados: [],
      total_compra: 0,
      tasks: [
        {
          titulo: "Computador portatil",
          subtitulo: "Vendido por: barak team",
          precio: 10,
          imagen: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        },
        {
          titulo: "Plantas",
          subtitulo: "Plantas",
          precio: 2,
          imagen: "https://picsum.photos/500/300?image=18",
        },
        {
          titulo: "Escritorio",
          subtitulo: "Escritorio",
          precio: 4,
          imagen: "https://picsum.photos/500/300?image=20",
        },
      ],
    };
  },
  created() {
    //this.UsuarioAccedioCorrectamente();
    this.IniciarData();
    this.matMenu = matMenu;
  },

  mounted() {},
  methods: {
    Ofertas() {
      this.$router.replace({ path: "Ofertas" });
    },

    Moda() {
      this.$router.replace({ path: "Moda" });
    },

    Supermercado() {
      this.$router.replace({ path: "supermercado" });
    },

    VerDetalles(index) {
      this.id_producto = index;
      this.editedItem.id = index;
      this.editedItem.imagen = this.editedItem.titulo =
        this.tasks[index].titulo;
      this.editedItem.precio = this.tasks[index].precio;
      this.url_image = this.tasks[index].imagen;
      this.buscar = this.tasks[index].titulo;
      //this.$router.replace({ path: "detalles" });
      //Enviar todo el producto en cuestion
      //No sirve  por que al compartir el enlace queda todo en null
      //Se debe cambiar
      this.$router.push({
        path: "detalles1",
        query: { producto: this.tasks[index] },
      });
      /* this.tab = "detalles"; */
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
                id: res.data[i].idProducto,
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
    },

    async AgregarCarrito(index) {
      //Crear un arreglo para recibir los datos del producto
      //para llenar el carrito necesitamos el
      //id del producto,
      //el id del cliente,
      //cantidad de productos que vamos a llevar

      if (this.UsuarioAccedioCorrectamente()) {
        try {
          let data;
          let carrito = {
            cantidad: 1,
            idProducto: this.tasks[index].id,
          };
          let url =
            this.$store.state.urlBackendElegida + "api/Carrito/AgregarCarrito";

          this.EnviarPeticion(url, "POST", carrito);
        } catch (error) {
          console.error("Error: " + error);
        }
      }
    },

    /* AgregarCarrito(id) {
      //Cuando damos clic en comprar añadir a la lista de productos del carrito el dueño es el cliente que ah iniciado sesion
      //imagen, titulo, precio, color, cantidad, descripcion
      let indice = undefined;
      let unidades = 1;
      let i = 0;
      let iguales = false;
      let salir = false;
      let producto;
      if (this.id_producto === -1) {
        producto = {
          imagen: this.tasks[id].imagen,
          titulo: this.tasks[id].titulo,
          precio: this.tasks[id].precio,
          color: this.color,
          cantidad: unidades,
          descripcion: this.descripcion,
          unidades: 1,
        };
      } else {
        producto = {
          titulo: this.tasks[this.id_producto].titulo,
          precio: this.tasks[this.id_producto].precio,
          unidades: 1,
        };
      }

      if (this.comprados.length == 0) {
        this.total_compra = producto.precio;
        this.comprados.push(producto);
      } else {
        do {
          if (i < this.comprados.length) {
            iguales = this.objetos_iguales(producto, this.comprados[i])
              ? true
              : false;
            i++;
            salir = iguales ? true : false;
          } else {
            salir = true;
          }
        } while (!salir);

        if (!iguales) {
          this.comprados.push(producto);
        } else if (iguales) {
          indice = this.encontrar_indice(producto, this.comprados);
          unidades = this.comprados[indice].unidades + 1;
          this.comprados[indice].unidades = unidades;
        }

        let valor2 = parseInt(this.total_compra);
        let valor3 = parseInt(producto.precio);
        this.total_compra = valor2 + valor3;
      }
    }, */

    /* AgregarIndice(id) {
      this.tab = "edit";
      this.indice_editar = id;
      let titulo = this.tasks[this.indice_editar].titulo;

      this.buscar = titulo;
      this.obtenerImagenes();
    }, */

    EncontrarIndice(producto, arreglo) {
      let x, indice;
      for (x = 0; x < arreglo.length; x++) {
        if (arreglo[x].titulo == producto.titulo) {
          indice = x;
        }
      }
      return indice;
    },

    VaciarArreglo(arreglo) {
      for (let i = arreglo.length; i > 0; i--) {
        arreglo.pop();
      }
      return arreglo;
    },

    ObjetosIguales(obj1, obj2) {
      return obj1.titulo === obj2.titulo && obj1.precio === obj2.precio;
    },

    async AgregarImagenEditar(id) {
      this.url_image = this.fotos[id - 1];
    },

    RetornarImagen(n) {
      return this.fotos[n - 1];
    },

    AgregarImagenLista(id) {
      return this.tasks[id].imagen;
    },

    Obtener() {
      if (this.j < 8 && this.card == true) {
        Object.assign(this.j, this.j++);
      }
    },

    /* AnadirEditar() {
      this.card = true;
    }, */

    /* EliminarProducto(id) {
      this.total_compra -=
        this.comprados[id].precio * this.comprados[id].unidades;
      this.comprados.splice(id, 1);
    }, */

    AumentarCantidad(index) {
      let valor = this.comprados[index].unidades + 1;
      let valor2 = parseInt(this.total_compra);
      let valor3 = parseInt(this.comprados[index].precio);
      this.total_compra = valor2 + valor3;
      this.comprados[index].unidades = valor;
    },

    DisminuirCantidad(index) {
      let valor = this.comprados[index].unidades - 1;
      if (valor >= 1) {
        this.total_compra -= this.comprados[index].precio;
        this.comprados[index].unidades = valor;
      }
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
      let accedio = false;
      onAuthStateChanged(this.$store.state.auth, (user) => {
        if (user) {
          /* const user2 = auth.currentUser; */
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          accedio = true;
        } else {
          if (this.$route.path !== "/") {
            this.$router.replace("/");
          }
        }
      });
      return accedio;
    },

    /* AñadirProducto() {
      if (
        this.editedItem.titulo !== "" &&
        this.editedItem.precio != "" &&
        this.url_image != ""
      ) {
        let precio_v = parseInt(this.editedItem.precio);
        const data = {
          Id: this.tasks.length + 1,
          urlImagen: this.url_image,
          nombre: this.editedItem.titulo,
          precio: precio_v,
        };

        fetch("https://localhost:44370/api/prueba", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response)
          .then((data) => {
          })
          .catch((error) => {
            console.error("Error EN FETCH:", error);
          });

        let nueva = {
          titulo: this.editedItem.titulo,
          precio: precio_v,
          imagen: this.url_image,
        };
        this.tasks.push(nueva);
        this.editar = false;
      }
      this.tab = "consultar";
    }, */

    /* EditarProducto() {
      let precio_v;
      let new_item;

      precio_v = parseInt(this.editedItem.precio);
      new_item = {
        titulo: this.editedItem.titulo,
        precio: precio_v,
        imagen: this.url_image,
      };
      Object.assign(this.tasks[this.indice_editar], new_item);
      let indice = this.indice_editar + 1;

      const data = {
        Id: indice,
        urlImagen: this.url_image,
        nombre: this.editedItem.titulo,
        precio: precio_v,
      };
      console.log(data);

      fetch("https://localhost:44370/api/prueba", {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response) //.json()
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error EN FETCH:", error);
        });
      this.tab = "consultar";
    }, */

    /* BorrarProducto(id) {
      let newId = id + 1;

      fetch("https://localhost:44370/api/prueba/" + newId, {
        method: "DELETE",
      })
        .then((data) => data) //.json()
        .then((respuesta) => {
          console.log(respuesta);
        })
        .catch((error) => console.log("Error: " + error));

      this.tasks.splice(id, 1);
    }, */

    /* async ObtenerImagenes() {
      this.tamano = 14;
      this.pagina = 1;
      if (this.ultimo === this.buscar) {
        //this.pagina = this.pagina + 1;
        this.ultimo = this.buscar;
      }
      const Url =
        "https://api.pexels.com/v1/search?query=" +
        this.buscar +
        "&per_page=14&page=" +
        this.pagina;
      const apikey = "563492ad6f917000010000017248196f0f5f40ec82d8a0b3a18955a7";

      const res = await fetch(Url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: apikey,
        },
      });
      const respuesta = await res.json();

      this.fotos = this.vaciar_arreglo(this.fotos);

      respuesta.photos.forEach((element) => {
        this.fotos.push(element.src.landscape);
      });
    }, */

    /* async MasImagenes() {
      console.log("Mas imagenes");
      this.tamano = this.tamano + 14;
      this.pagina = this.pagina + 1;
      const Url =
        "https://api.pexels.com/v1/search?query=" +
        this.buscar +
        "&per_page=14&page=" +
        this.pagina;
      const apikey = "563492ad6f917000010000017248196f0f5f40ec82d8a0b3a18955a7";

      const res = await fetch(Url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: apikey,
        },
      });
      const respuesta = await res.json();

      respuesta.photos.forEach((element) => {
        this.fotos.push(element.src.landscape);
      });
    }, */
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-auto-rows: minmax(80px, auto);
  gap: 20px;
  padding: 20px;
  grid-auto-flow: dense;
}

.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #00b6d6;
  border-radius: 4px;
  transition: transform 0.3s ease-in-out;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

@media (min-width: 600px) {
  .wide {
    grid-column: span 2;
  }
  .tall {
    grid-row: span 2;
  }
}

body {
  /* font-family: sans-serif; */

  font-family: Arial, Helvetica, Sans-serif;
}

.tachar {
  text-decoration: line-through;
}

* {
  color: black;
  box-sizing: border-box;
  margin: 0;
}

.InfoTargeta {
  color: rgb(3, 170, 25);
}

.my-content {
  padding: 10px 15px;
  border: 1px solid rgba(86, 61, 124, 0.2);
}

.grid-item:hover {
  transform: scale(1.25);
}

.grid-item1:hover {
  transform: scale(1.1);
}

.pointerproduct {
  cursor: pointer;
}

.blueBox {
  width: 75%;
}
</style>

<!--  <div class="q-pa-md row items-start q-gutter-md"> -->
<!-- justify-start wrap fit inline -->
<!-- <q-card
              style="width: 450px; max-width: 80vw"
              v-for="j in this.tamano"
              :key="j"
              class="my-card"
            > -->
<!-- <q-card-section>
                <q-img :src="retornar_Imagen(j)" />
              </q-card-section> -->

<!--  <q-card-section> -->
<!-- <div class="row items-stretch content-start q-pa-md">  -->
<!-- fit row inline no-wrap justify-start items-start content-start -->

<!-- <div class="row q-pa-md  items-start q-gutter-md">
              <div class="col-4 q-mb-md">
                <div v-if="j == 2">
                  {{ Object.assign(j, (j += 2)) }}
                </div>

                <div v-if="j == 3">
                  {{ Object.assign(j, (j += 4)) }}
                </div>

                <q-img :src="retornar_Imagen(j)" />
              </div>
              <div class="col-4 q-mb-md">
                <q-img :src="retornar_Imagen(j + 1)" />
              </div>
              <div class="col-4 q-mb-md">
                <q-img :src="retornar_Imagen(j + 2)" />
              </div>
            </div> -->
<!-- </q-card-section> -->

<!-- <q-separator /> -->
<!-- </q-card> -->
<!-- </div> -->
