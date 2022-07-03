<template>
  <q-card bordered class="row">
    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
      <!-- 9 -->

      <div class="row">
        <q-card
          bordered
          class="
            col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12
            q-pa-md
            justify-center
            items-center
            content-center
          "
        >
          <q-img height="600px" width="100%" :src="url_image" />
        </q-card>
      </div>

      <div class="row items-start q-pa-md">
        <!-- my-content (task, index) in tamano-->
        <q-card
          rounded
          v-for="index in tamano"
          :key="index"
          class="
            col-xl-2 col-lg-2 col-md-4 col-sm-6 col-xs-12
            grid-item1
            q-pa-md
          "
        >
          <div width="100px" height="100px">
            <div>
              <q-img
                width="100%"
                height="200px"
                @click="AgregarImagenEditar(index-1)"
                :src="RetornarImagen(index - 1)"
              />
            </div>

            <q-separator />
          </div>
        </q-card>
      </div>
      <q-card class="row">
        <h5>&nbsp;&nbsp;&nbsp;&nbsp;Características</h5>
      </q-card>
      <q-card class="row">
        <div class="col-12">
          <h5>&nbsp;&nbsp;&nbsp;&nbsp; Descripcion</h5>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
            producto_recibido.descripcion
          }}
        </div>
      </q-card>
    </div>

    <q-card
      bordered
      class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 q-pa-md"
    >
      <h5>
        {{ producto_recibido.titulo }} <br />
        $ {{ producto_recibido.precio }}
      </h5>
      <div>
        <p>Hasta 36 cuotas</p>
      </div>
      <div>
        <p>Con tu VISA terminada en 8682</p>
      </div>
      <div class="InfoTargeta">
        Llega gratis entre el martes y el viernes 17 de diciembre
      </div>
      <div class="">Beneficio de mercado puntos</div>
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
      <div class="row">
        <div class="col-6">
          <q-field color="info" filled square hint="" :dense="dense">
            <template v-slot:control>
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
            style="max-width: 200px"
          />
          <div class="row">
            <div
              class="
                col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12
                self-center
                justify-center
                items-center
                content-center
                text-center
              "
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
              class="
                col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12
                self-center
                justify-center
                items-center
                content-center
                text-center
              "
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
  </q-card>
</template>

<script>
const axios = require("axios");

import { getAuth, onAuthStateChanged } from "firebase/auth";
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

      color: "",
      cantidad: 1,
      options: ["Amarillo", "Azul", "Verde", "Rojo"],
      opciones: ["1", "2", "3", "4"],
      dense: false,
      denseOpts: false,
    };
  },
  created() {
    this.UsuarioAccedioCorrectamente();
    this.producto_recibido = this.$route.query.producto;
    console.log("Producto recibido", this.producto_recibido);
    this.url_image = this.producto_recibido.imagen;
    this.idProductoRecibido = this.producto_recibido.id;
  },

  mounted() {
    this.ObtenerImagenes();
  },

  methods: {
    UsuarioAccedioCorrectamente() {
      //const auth = getAuth();

      onAuthStateChanged(this.$store.state.auth, (user) => {
        if (user) {
          const uid = user.uid;
        } else {
          if (this.$route.path !== "/") {
            this.$router.push("/");
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
      if (this.InicioSesion()) {
        try {
          let data;
          let carrito = {
            cantidad: this.cantidad,
            id_Producto: this.producto_recibido,
          };
          let url = "https://localhost:44370/api/Carrito/AgregarCarrito";

          await fetch(url, {
            method: "POST",
            body: JSON.stringify(carrito),
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
        } catch (error) {
          console.error("Error: " + error);
        }
      } else {
        //Entrar a la pagina index
      }
    },

    InicioSesion() {
      return true;
    },

    async IniciarData() {
      //Iniciar los datos con la informacion del producto y de sus respectivas imagenes
      //Necesito el id del producto

      try {
        let data;
        let url = "https://localhost:44370/api/producto/ObtenerProducto";

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
        let url = "https://localhost:44370/api/Imagenes/ObtenerImagenes";

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
      let indice = undefined;
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
      }
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
