<template>
  <q-card bordered class="row">
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="row">
        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
          <div class="row">
            <div
              class="col-xl-3 col-lg-3 col-md-3 col-sm-0 col-xs-0 q-pa-md justify-center items-center content-center"
              v-if="this.$q.screen.width >= 1027"
            >
              <!-- v-if="this.$q.screen.width>=1027" -->
              <q-card
                bordered
                class="column"
                v-for="index in tamano"
                :key="index"
              >
                <div width="100px" height="100px">
                  <div>
                    <q-img
                      width="100%"
                      height="200px"
                      @click="AgregarImagenEditar(index - 1)"
                      :src="RetornarImagen(index - 1)"
                    />
                  </div>
                  <q-separator />
                </div>
              </q-card>
            </div>
            <q-card
              bordered
              class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12 q-pa-md justify-center items-center content-center"
            >
              <!-- <q-card-section v-if="this.$q.screen.width <= 1027">
                <q-btn
                  fab
                  color="blue-5"
                  icon="place"
                  class="absolute"
                  style="top: 0; right: +96%; transform: translateX(0%);
                  transform: translateY(+780%);"
                />
              </q-card-section> -->

              <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-img height="800px" width="100%" :src="url_image"> </q-img>

                  <q-card-section v-if="this.$q.screen.width <= 1027">
                    <q-btn
                      fab
                      color="blue-5"
                      icon="chevron_left"
                      class="absolute"
                      style="
                        top: 0;
                        right: +94%;
                        transform: translateX(0%);
                        transform: translateY(-700%);
                      "
                      @click="ImagenAnterior()"
                    />
                    <q-btn
                      fab
                      color="blue-7"
                      icon="chevron_right"
                      class="absolute"
                      style="top: 0pt; right: 0px; transform: translateY(-700%)"
                      @click="ImagenSiguiente()"
                    />
                  </q-card-section>
                </div>
              </div>
            </q-card>
          </div>
        </div>

        <q-card
          bordered
          class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 q-pa-md"
        >
          <h5>
            {{ producto_recibido.titulo }} <br />
            {{ RetornarPrecioFormateado(producto_recibido.precio) }}
          </h5>
          <div>
            <p>Hasta 36 cuotas</p>
          </div>
          <div>
            <p>Con tu VISA terminada en 8682</p>
          </div>
          <div class="InfoTargeta text-subtitle1">
            Llega gratis entre el martes y el viernes 17 de diciembre
          </div>
          <div class="">Beneficio de mercado puntos</div>
          <br />
          <div>
            <q-btn-dropdown no-caps color="info" label="Escoja el color">
              <q-list>
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-item-label>Blanco</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-item-label>Negro</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-item-label>Azul</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
          <br />
          <div class="row">
            <div class="col-6">
              <q-field rounded color="info" filled hint="" :dense="dense">
                <template class="bg-blue-2" v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    Digite la cantidad <br />
                    {{ producto_recibido.cantidad }} unidades disponibles
                  </div>
                </template>
              </q-field>
            </div>

            <div class="col-6">
              <q-input
                color="info"
                v-model="cantidad"
                filled
                rounded
                style="max-width: 200px"
              />
              <div class="row">
                <div
                  class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 self-center justify-center items-center content-center text-center"
                >
                  <q-btn
                    @click="CantidadDecrease()"
                    class="glossy"
                    color="info"
                    rounded
                    label="-"
                    :size="'sm'"
                  />
                </div>
                <div
                  class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 self-center justify-center items-center content-center text-center"
                >
                  <q-btn
                    @click="CantidadPlus()"
                    class="glossy"
                    rounded
                    color="info"
                    label="+"
                    :size="'sm'"
                  />
                </div>
              </div>
            </div>
          </div>

          <br />

          <div class="text-center">
            <q-btn
              class="glossy"
              dark
              rounded
              icon="shopping_cart"
              @click="Comprar()"
              color="blue-7"
              label="Comprar ahora"
            />
            <q-btn
              class="glossy"
              dark
              rounded
              icon="shopping_cart"
              @click="AgregarCarrito()"
              color="blue-7"
              label="Agregar al carrito"
            />
          </div>
        </q-card>
      </div>

      <q-card class="row q-pa-md">
        <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-xs-12">
          <div class="q-pa-lg text-subtitle1">
            <div class="text-h5">Caracteristicas</div>
            <br />{{ producto_recibido.descripcion }}
          </div>
        </div>
      </q-card>

      <q-card class="row q-pa-md">
        <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-xs-12">
          <div class="q-pa-lg text-subtitle1">
            <div class="text-h5">Descripcion</div>
            <br />{{ producto_recibido.descripcion }}
          </div>
        </div>
      </q-card>
    </div>
  </q-card>
</template>

<script>
const axios = require("axios");

import { onAuthStateChanged } from "firebase/auth";
export default {
  /* props: {
    idProductoRecibido: Number,
  }, */
  data() {
    return {
      producto: {},
      res: {},
      producto_recibido: {},
      idProductoRecibido: 0,
      direcciones: [],
      url_image: "",
      tamano: 0,
      editedItem: {},
      slide: 1,
      indiceImagenActualProducto: 1,

      color: "",
      cantidad: 1,
      options: ["Amarillo", "Azul", "Verde", "Rojo"],
      opciones: ["1", "2", "3", "4"],
      dense: false,
      denseOpts: false,
      tamanoImagenPrincipal: 1000,
    };
  },
  created() {
    //this.UsuarioAccedioCorrectamente();
    this.producto_recibido = this.$route.query.producto;
    this.url_image = this.producto_recibido.imagen;
    this.idProductoRecibido = this.producto_recibido.id;
  },

  mounted() {
    this.ObtenerImagenes();
  },

  methods: {
    async ImagenAnterior() {
      /* Si las imagenes ya han sido cargadas en el lado del cliente */
      if (this.url_image == this.direcciones[0]) {
        this.indiceImagenActualProducto = this.direcciones.length - 1;
        this.url_image = this.direcciones[this.indiceImagenActualProducto];
      } else if (this.indiceImagenActualProducto > 0) {
        this.indiceImagenActualProducto--;
        this.url_image = this.direcciones[this.indiceImagenActualProducto];
      }
    },

    async ImagenSiguiente() {
      if (this.indiceImagenActualProducto < this.direcciones.length) {
        this.url_image = this.direcciones[this.indiceImagenActualProducto];
        this.indiceImagenActualProducto++;
      } else {
        this.url_image = this.direcciones[0];
        this.indiceImagenActualProducto = 1;
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

      onAuthStateChanged(this.$store.state.auth, (user) => {
        if (user) {
          const uid = user.uid;
        } else {
          if (this.$route.path !== "/Login") {
            this.$router.replace("/Login");
          }
        }
      });
    },

    async AgregarCarrito() {
      //Crear un arreglo para recibir los datos del producto
      //para llenar el carrito necesitamos el
      //id del producto,
      //el id del cliente,
      //cantidad de productos que vamos a llevar
      if (this.UsuarioAccedioCorrectamente()) {
        try {
          let data;
          let carrito = {
            cantidad: this.cantidad,
            idProducto: this.producto_recibido.id,
          };
          let url =
            this.$store.state.urlBackendElegida + "api/Carrito/AgregarCarrito";

          this.EnviarPeticion(url, "POST", carrito);
        } catch (error) {
          console.error("Error: " + error);
        }
      }
    },

    async EnviarPeticion(url, method, body) {
      let opcion = body === "" ? false : true;
      if (opcion) {
        fetch(url, {
          method: method,
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
        });
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

    async IniciarData() {
      //Iniciar los datos con la informacion del producto y de sus respectivas imagenes
      //Necesito el id del producto

      try {
        let data;
        let url =
          this.$store.state.urlBackendElegida + "api/producto/ObtenerProducto";

        this.res = await fetch(url, {
          method: "POST",
          body: JSON.stringify(this.id),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => (data = res))
          .catch((error) => console.error("Error en la matriz:", error))
          .then(function (response) {
            //console.log(response);
            //Object.assign(this.producto, response);
          });

        Object.assign(this.producto, await data.json());
      } catch (error) {
        console.error("Error: " + error);
      }
    },

    AgregarImagenEditar(id) {
      this.url_image = this.direcciones[id];
    },

    RetornarImagen(index) {
      return this.direcciones[index];
    },

    async ObtenerImagenes() {
      try {
        var data;
        let url =
          this.$store.state.urlBackendElegida + "api/Imagenes/ObtenerImagenes";

        this.res = await fetch(url, {
          method: "POST",
          body: JSON.stringify(this.idProductoRecibido),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => (data = res))
          .catch((error) => console.error("Error en fetch:", error))
          .then(function (response) {
            //console.log(response);
          });
      } catch (error) {
        console.error("Error general: " + error);
      }
      Object.assign(this.direcciones, await data.json());
      this.direcciones.unshift(this.producto_recibido.imagen);
      this.tamano = this.direcciones.length;
      //this.members[newMember.name] = newMember;
      //this.$set(this.direcciones, await data.json());
    },

    Comprar(id) {
      //Cuando damos clic en comprar añadir a la lista de productos del carrito el dueño es el cliente que ah iniciado sesion
      //imagen, titulo, precio, color, cantidad, descripcion
      /* let indice = undefined;
      let unidades = 1;
      let i = 0;
      let iguales = false;
      let salir = false;
      let producto;
      if (this.id_producto === -1) {
        producto = {
          titulo: this.tasks[id].titulo,
          precio: this.tasks[id].precio,
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
      } */
    },

    CantidadDecrease() {
      if (this.cantidad > 1) {
        Object.assign(this.cantidad, this.cantidad--);
      }
    },

    CantidadPlus() {
      if (this.cantidad < this.producto_recibido.cantidad) {
        Object.assign(this.cantidad, this.cantidad++);
      }
    },
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

.pointerproduct {
  cursor: pointer;
}

.InfoTargeta {
  color: rgb(20, 170, 28);
}

.full {
  width: 100%;
  height: 100%;
}

.contenedor {
  height: 50%;
}
</style>
