<template>
  <div>
    <!-- Espacio al principio de la pagina -->
    <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        &nbsp;
      </div>
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        &nbsp;
      </div>
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        &nbsp;
      </div>
    </div>
    <!-- Espacio al principio de la pagina -->

    <div class="row">
      <div class="col-xl-1 col-lg-2 col-md-1 col-sm-1 col-xs-0"></div>
      <!-- 2 -->
      <q-card bordered class="col-xl-10 col-lg-8 col-md-10 col-sm-10 col-xs-12"
        ><!-- 8 -->
        <q-tabs v-model="tab" align="left" narrow-indicator class="q-pa-md">
          <q-tab class="text-blue" name="carrito" label="Carrito" />
          <q-tab class="text-blue" name="guardados" label="Guardados" />
        </q-tabs>
        <div v-if="(comprados.length = 0)">Sin productos en el carrito</div>
      </q-card>
      <div class="col-xl-1 col-lg-2 col-md-1 col-sm-1 col-xs-0"></div>
      <!-- 2 -->
    </div>

    <q-tab-panels
      v-model="tab"
      animated
      transition-prev="scale"
      transition-next="scale"
      class="text-black"
    >
      <q-tab-panel v-if="comprados.length > 0" name="carrito">
        <div class="row">
          <div class="col-xl-1 col-lg-2 col-md-1 col-sm-1 col-xs-0"></div>

          <div class="col-xl-10 col-lg-8 col-md-10 col-sm-10 col-xs-12">
            <q-card
              bordered
              class="row items-start justify-center q-pa-md"
              v-for="(task, index) in this.comprados"
              :key="index"
            >
              <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                <q-card bordered>
                  <q-img :src="task.imagen" />
                </q-card>
              </div>

              <div
                class="text-h6 col-xl-7 col-lg-7 col-md-7 col-sm-7 col-xs-7 text-bold"
              >
                &nbsp;&nbsp;&nbsp;&nbsp; {{ task.titulo }}
                <div class="row">
                  <div class="col-10">
                    <q-select
                      class="q-pa-md"
                      rounded
                      outlined
                      v-model="task.color"
                      :options="options"
                      v-if="false"
                      label="Color: "
                      stack-label
                      :dense="dense"
                      :options-dense="denseOpts"
                    />
                  </div>
                  <div class="col-2"></div>
                </div>
              </div>

              <div
                class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2 self-center"
              >
                <div class="row">
                  <div
                    class="col-xl-2 col-lg-2 col-md-1 col-sm-1 col-xs-1"
                  ></div>
                  <div class="col-xl-8 col-lg-8 col-md-10 col-sm-10 col-xs-10">
                    <q-input
                      color="info"
                      outlined
                      :dense="true"
                      :size="'xl'"
                      rounded
                      @blur="CorregirUnidades(index, task.unidades)"
                      v-model="task.unidades"
                    >
                    </q-input>
                    <div class="row">
                      <div
                        class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 self-center justify-center items-center content-center text-center"
                      >
                        <q-btn
                          @click="CantidadDecrease(task)"
                          class="glossy"
                          color="black"
                          rounded
                          label="-"
                          :size="'xs'"
                        />
                      </div>
                      <div
                        class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 self-center justify-center items-center content-center text-center"
                      >
                        <q-btn
                          @click="CantidadPlus(task)"
                          class="glossy"
                          rounded
                          color="black"
                          label="+"
                          :size="'xs'"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div
                        class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center"
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;{{ task.cantidad }} disponibles
                      </div>
                    </div>
                  </div>
                  <div
                    class="col-xl-2 col-lg-2 col-md-1 col-sm-1 col-xs-1"
                  ></div>
                </div>
              </div>

              <div class="col-1 self-center text-h5 text-bold">
                &nbsp;{{
                  ObtenerPrecioFormateado(
                    ObtenerPrecioFinal(task.unidades, task.precio)
                  )
                }}
              </div>
            </q-card>
          </div>

          <div class="col-xl-1 col-lg-2 col-md-1 col-sm-1 col-xs-0"></div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="guardados">
        <div class="row">
          <div class="col-xl-1 col-lg-2 col-md-1 col-sm-1 col-xs-0"></div>

          <div class="col-xl-10 col-lg-8 col-md-10 col-sm-10 col-xs-12">
            <q-card
              bordered
              class="row items-start justify-center q-pa-md"
              v-for="(task, index) in this.comprados"
              :key="index"
            >
              <div class="col-2">
                <q-img :src="task.imagen" />
              </div>

              <div class="col-7">
                &nbsp;&nbsp;&nbsp;&nbsp; {{ task.titulo }}
                <div class="row">
                  <div class="col-10">
                    <q-select
                      class="q-pa-md"
                      filled
                      v-model="task.color"
                      v-if="false"
                      :options="options"
                      label="Color: "
                      stack-label
                      :dense="dense"
                      :options-dense="denseOpts"
                    />
                  </div>
                  <div class="col-2"></div>
                </div>
              </div>

              <div class="col-2 self-center">
                <q-input
                  color="info"
                  v-model.number="cantidad"
                  type="number"
                  filled
                  rounded
                  outlined
                  style="rounded max-width: 200px"
                />
              </div>

              <div class="col-1 self-center text-h5 text-bold">
                &nbsp; {{ ObtenerPrecioFinal(task.unidades, task.precio) }}
              </div>
            </q-card>
          </div>

          <div class="col-xl-1 col-lg-2 col-md-1 col-sm-1 col-xs-0"></div>
        </div>
      </q-tab-panel>
    </q-tab-panels>

    <!-- Espacio Intermedio -->
    <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        &nbsp;
      </div>
    </div>
    <!-- Espacio Intermedio -->

    <!-- Espacio para crear los totales del carrito -->
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
        <q-card bordered class="row">
          <div class="col-4"></div>
          <div class="col-4"></div>
          <q-card bordered class="col-4">
            <div class="text-h6 text-center">
              Costo del envío
              {{ ObtenerPrecioFormateado(ObtenerCostoEnvio()) }}
            </div>
            <div class="text-bold text-h5 text-center text-wrap">
              Total con envío {{ ObtenerPrecioFormateado(ObtenerTotal()) }}
            </div>

            <!-- Espacio Intermedio -->
            <div class="row">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                &nbsp;
              </div>
            </div>
            <!-- Espacio Intermedio -->

            <div class="row text-center">
              <div class="col-12 q-gutter-md text-right">
                <q-btn
                  no-caps
                  label="Continuar compra"
                  class="glossy"
                  dark
                  rounded
                  color="blue-10"
                />
              </div>
            </div>
          </q-card>
        </q-card>
      </div>
      <div class="col-1"></div>
    </div>

    <!-- Espacio Intermedio -->
    <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        &nbsp;
      </div>
    </div>
    <!-- Espacio Intermedio -->

    <div class="row">
      <div class="col-1"></div>
      <div class="col-10">
        <div class="row">
          <div class="col-3 text-h5 text-bold q-pa-md">Productos Similares</div>
          <div class="col-9"></div>
        </div>

        <div class="row items-start q-pa-md">
          <!-- my-content -->
          <q-card
            rounded
            v-for="(task, index) in comprados"
            :key="index"
            class="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-xs-12 grid-item1 q-pa-md"
          >
            <div>
              <div>
                <q-card bordered>
                  <q-img :src="ObtenerImagen(index)" />
                </q-card>

                <q-card-section>
                  <div class="justify-around">
                    <div class="text-h6">
                      {{ ObtenerPrecioFormateado(task.precio) }}
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

        <!-- Espacio al final de la pagina -->
        <div class="row">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            &nbsp;
          </div>
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            &nbsp;
          </div>
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            &nbsp;
          </div>
        </div>
        <!-- Espacio al final de la pagina -->
      </div>
      <div class="col-1"></div>
    </div>
  </div>
</template>

<script>
//Object.assign SE UTILIZA CUANDO SE ASIGNAN VALORES SIMPLES
//this.$set SE UTILIZA CUANDO SE ASIGNAN VALORES COMPLEJOS EN ARREGLOS

import "firebase/compat/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  data() {
    return {
      nombre: "stiwar",
      pais: "Colombia",
      departamento: "Caqueta",
      municipio: "Florencia",
      direccion: "Calle 10a",
      telefono: "3508426005",
      tarjeta: "1651610321321",

      options: [
        "Rojo",
        "Verde",
        "Azul",
        "Amarillo",
        "Negro",
        "Blanco",
        "Morado",
        "Naranja",
        "Magenta",
        "Cian",
      ],
      cantidad: 0,
      dense: false,
      denseOpts: false,
      Cantidades: [{}],
      total: 0,

      comprados: [
        {
          titulo: "Computador portatil",
          descripcion: "Vendido por: barak team",
          color: "azul",
          unidades: 10,
          precio: 10,
          imagen: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        },
        {
          titulo: "Plantas",
          descripcion: "Plantas",
          color: "azul",
          unidades: 10,
          precio: 2,
          imagen: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        },
        {
          titulo: "Escritorio",
          descripcion: "Escritorio",
          color: "azul",
          unidades: 10,
          precio: 4,
          imagen: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
        },
      ],

      /* comprados: [], */
      total_compra: 0,
      lista: false,
      name: "",
      tab: "",
    };
  },
  created() {
    this.UsuarioAccedioCorrectamente();
    this.tab = "carrito";
    this.ObtenerProductos();
  },
  methods: {
    //.cantidad = stock disponible
    //.unidades = unidades que el cliente quiere comprar

    UsuarioAccedioCorrectamente() {
      //const auth = getAuth();

      onAuthStateChanged(this.$store.state.auth, (user) => {
        if (user) {
          this.ObtenerUsuarioActual();
        } else {
          if (this.$route.path !== "/") {
            this.$router.replace("/");
          }
        }
      });
    },

    async ObtenerUsuarioActual() {
      let url =
        this.$store.state.urlBackendElegida +
        "api/Usuario/ObtenerUsuarioActual";
      let usuarioActual = await this.EnviarPeticionRespuesta(url, "GET");
      if (usuarioActual.idRol !== 1) {
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

    ObtenerImagen(index) {
      return this.comprados[index].imagen;
    },

    async ObtenerProductos() {
      //Obtener los productos de la lista de compras de un cliente predeterminado
      try {
        let data;
        let url = this.$store.state.urlBackendElegida + "api/Producto/ObtenerProductos"

        this.res = await fetch(url, {
          method: "POST",
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

        let productos = await data.json();
        this.comprados = this.EliminarRepetidos(productos);
        if (this.comprados.length > 0) {
          this.$set(
            this.comprados,
            this.OrdenarMetodoBorbuja(this.comprados, 1)
          );
        }
      } catch (error) {
        console.error("Error: " + error);
      }

      //Obtener las cantidades de cada uno de los productos del carrito
      try {
        let data;
        let url = this.$store.state.urlBackendElegida + "api/Carrito/ObtenerCarrito"

        this.res = await fetch(url, {
          method: "POST",
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

        let carrito = await data.json();

        if (carrito.length > 0) {
          let relacion = this.UnirArreglo(carrito);

          let arreglo = this.ContarUnidadesArreglo(relacion);

          let cantidades = this.EliminarIdsRepetidos(arreglo);

          /* Object.assign(
          this.Cantidades,
          this.ordenarMetodoBorbuja(cantidades, 2)
        ); */
          this.Cantidades = Object.assign(
            {},
            this.Cantidades,
            this.OrdenarMetodoBorbuja(cantidades, 2)
          );

          for (let index = 0; index < this.comprados.length; index++) {
            //this.comprados[index].unidades = this.Cantidades[index].cantidad;
            this.$set(
              this.comprados[index],
              "unidades",
              this.Cantidades[index].cantidad
            );
          }
        }

        /* console.log(this.comprados);
        console.log(this.Cantidades); */
      } catch (error) {
        console.error("Error: " + error);
      }
    },

    OrdenarMetodoBorbuja(arregloFinal, orden) {
      var length = arregloFinal.length;
      for (var i = 0; i < length; i++) {
        for (var j = 0; j < length - i - 1; j++) {
          if (orden == 1) {
            if (arregloFinal[j].id_Producto > arregloFinal[j + 1].id_Producto) {
              var tmp = arregloFinal[j];
              arregloFinal[j] = arregloFinal[j + 1];
              arregloFinal[j + 1] = tmp;
            }
          } else if (orden == 2) {
            if (arregloFinal[j].id > arregloFinal[j + 1].id) {
              var tmp = arregloFinal[j];
              arregloFinal[j] = arregloFinal[j + 1];
              arregloFinal[j + 1] = tmp;
            }
          }
        }
      }
      return arregloFinal;
    },

    UnirArreglo(carrito) {
      let relacion = [];
      let index = 0;

      do {
        relacion.push({
          cantidad: carrito[index].cantidad,
          id: carrito[index].id_Producto,
        });
        index = index + 1;
      } while (index < carrito.length);
      return relacion;
    },

    ContarUnidadesArreglo(relacion) {
      let index = 0,
        index2 = 0;
      let indexinterno = 0;
      let acumulador = 0;
      let arreglo = [];
      do {
        let id = relacion[index].id;
        for (let index2 = index; index2 < relacion.length; index2++) {
          if (id === relacion[index2].id) {
            acumulador += relacion[index2].cantidad;
          } else {
            index2++;
          }
        }
        arreglo.push({
          cantidad: acumulador,
          id: relacion[index].id,
        });

        acumulador = 0;
        index++;
      } while (index < relacion.length);
      return arreglo;
    },

    //Crear un nuevo arreglo donde no se repita el id
    EliminarIdsRepetidos(arreglo) {
      let arreglo2 = [];
      for (let index = 0; index < arreglo.length; index++) {
        let id = arreglo[index].id;
        let cantidad = arreglo[index].cantidad;
        let repetido = false;
        for (let index2 = 0; index2 < arreglo2.length; index2++) {
          if (id === arreglo2[index2].id) {
            repetido = true;
            break;
          }
        }
        if (!repetido) {
          arreglo2.push({
            cantidad: cantidad,
            id: id,
          });
        }
      }
      return arreglo2;
    },

    //Metodo para eliminar elementos repetidos en un arreglo
    EliminarRepetidos(arreglo) {
      let nuevo = [];
      let contador = 0;
      let contador2 = 0;
      let index = 0;
      try {
        for (index = 0; index < arreglo.length; index++) {
          if (nuevo.length === 0) {
            nuevo.push(arreglo[index]);
          } else {
            //Sino preguntar al nuevo arreglo si ya tiene ese objeto
            do {
              if (!this.objetos_Iguales(nuevo[contador], arreglo[index])) {
                contador2++;
              }
              contador++;
            } while (contador < nuevo.length);
            if (contador2 === nuevo.length) {
              nuevo.push(arreglo[index]);
              contador2 = 0;
            }
          }
        }
      } catch (error) {
        console.error("Error: " + error);
      }
      return nuevo;
    },

    Objetos_Iguales(obj1, obj2) {
      return (
        obj1.titulo === obj2.titulo &&
        obj1.precio === obj2.precio &&
        obj1.descripcion === obj2.descripcion
      );
    },

    CantidadDecrease(task) {
      if (task.unidades > 1) {
        this.$set(
          this.comprados[task.id_Producto - 1],
          "unidades",
          this.comprados[task.id_Producto - 1].unidades - 1
        );
      }
    },

    CantidadPlus(task) {
      if (task.unidades < this.comprados[task.id_Producto - 1].cantidad) {
        this.$set(
          this.comprados[task.id_Producto - 1],
          "unidades",
          this.comprados[task.id_Producto - 1].unidades + 1
        );
      }
    },

    //Corregir para que solo lo haga mientras el numero digitado
    //sea menor al numero disponible de productos
    ObtenerCostoEnvio() {
      //.cantidad = stock disponible
      //.unidades = unidades que el cliente quiere comprar
      let unidadesTotales = 0;
      for (let index = 0; index < this.comprados.length; index++) {
        unidadesTotales += this.comprados[index].unidades;
      }
      return unidadesTotales * 10000;
    },

    ObtenerTotal() {
      let total = 0;
      for (let index = 0; index < this.comprados.length; index++) {
        total +=
          parseInt(this.comprados[index].precio) *
          this.comprados[index].unidades;
      }
      total += this.ObtenerCostoEnvio();
      return total;
    },

    //Retornar un string con los numeros formateados de 3 en 3
    ObtenerPrecioFormateado(precio) {
      //convertir el entero a string
      let integer = 0;
      const formatterPeso = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      });
      try {
        integer = formatterPeso.format(precio);
      } catch (error) {
        console.error("Error: " + error);
      }
      return integer;
    },

    ObtenerPrecioFinal(unidades, precio) {
      return unidades !== undefined ? parseInt(unidades) * parseInt(precio) : 0;
    },

    CorregirUnidades(index, unidades) {
      if (unidades > this.comprados[index].cantidad) {
        this.$set(
          this.comprados[index],
          "unidades",
          this.comprados[index].cantidad
        );
      } else {
        this.$set(this.comprados[index], "unidades", 1);
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 75%;
}
.grid-item1:hover {
  transform: scale(1.1);
}
</style>
