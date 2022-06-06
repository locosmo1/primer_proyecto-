<template>
  <div class="row">
    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-12"></div>
    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-12">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="row">&nbsp;&nbsp;&nbsp;</div>
        <div class="row">&nbsp;&nbsp;&nbsp;</div>
        <div class="row">&nbsp;&nbsp;&nbsp;</div>
        <div class="row">&nbsp;&nbsp;&nbsp;</div>

        <q-expansion-item
          group
          label=""
          icon="explore"
          expand-separator
          style="border-radius: 30px"
          class="shadow-1 overflow-hidden"
          :caption="ObtenerRol(task.idRol)"
          v-for="(task, index) in this.usuarios"
          :key="index"
        >
          <q-card>
            <q-card-section>
              IdUsuario: {{ task.idUsuario }}, <br />
              Usuario: {{ task.usuario }}, <br />
              Contraseña: {{ task.contraseña }}, <br />
              Celular: {{ task.celular }} <br />
            </q-card-section>
          </q-card>

          <!-- Obtener Domicilios -->
          <q-expansion-item
            dark
            dense
            icon="explore"
            expand-separator
            style="border-radius: 30px"
            expand-icon-class="text-white"
            class="shadow-1 overflow-hidden"
            caption="Domicilio(s)"
            header-class="bg-blue-8 text-white"
            @click="ObtenerDomicilios(task.idUsuario)"
            v-if="ObtenerRol(task.idRol) !== 'Administrador'"
          >
            <q-table
              :columns="columnsDomicilio"
              :data="domicilios"
              row-key="idDomicilio"
              :selected.sync="selected"
              selection="multiple"
              no-data-label="Sin Domicilios para mostrar"
            />

            <!-- Mostrar Mapa -->
            <q-card>
              <q-card-section>
                <!-- api de google maps
          AIzaSyCOe6XiKYkPA1q3u4v_SVZy5Pw9yIXOnVQ -->
                <GmapMap
                  :center="center"
                  :zoom="14"
                  map-type-id="terrain"
                  style="width: 100%; height: 500px"
                >
                  <GmapMarker
                    v-model="item"
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    :clickable="true"
                    :draggable="true"
                    @dragend="ActualizarCoordenadas($event.latLng)"
                  />
                </GmapMap>
              </q-card-section>
              <q-card-section>
                Latitud Actual {{ latitud }}<br />
                Longitud Actual {{ longitud }}<br />
              </q-card-section>
            </q-card>

            <q-btn-dropdown
              auto-close
              color="blue-8"
              rounded
              no-caps
              label="Opciones"
            >
              <q-list>
                <q-item class="column">
                  <q-btn
                    class="glossy"
                    color="blue-8"
                    label="Añadir Nueva Direccion"
                    no-caps
                  />
                  <q-btn
                    class="glossy"
                    color="blue-8"
                    label="Actualizar este Direccion"
                    no-caps
                  />
                  <q-btn
                    class="glossy"
                    color="blue-8"
                    label="Borrar Seleccionado"
                    no-caps
                  />
                  <q-btn
                    class="glossy"
                    color="blue-8"
                    label="Borrar Todo"
                    no-caps
                  />
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-expansion-item>

          <!-- Obtener Productos -->
          <q-expansion-item
            dark
            dense
            icon="explore"
            expand-separator
            caption="Producto(s)"
            style="border-radius: 30px"
            expand-icon-class="text-white"
            class="shadow-1 overflow-hidden"
            header-class="bg-blue-8 text-white"
            @row-click="ObtenerProductosPrueba(task.idUsuario)"
            @click="ObtenerProductosPrueba(task.idUsuario)"
            v-if="ObtenerRol(task.idRol) === 'Empresa'"
          >
            <q-table
              :data="productos"
              :columns="columnsProducto"
              selection="multiple"
              row-key="idProducto"
              :selected.sync="selected"
              @row-click="ClickProducto"
              no-data-label="Sin Productos para mostrar"
            />

            <!-- Dialogo para mostrar todo el contenido del producto con
            sus imagenes -->
            <q-dialog v-model="dialogoProducto">
              <q-card bordered class="my-card">
                <q-card bordered class="my-card">
                  <!-- <q-img :src="productoSeleccionado.imagen" /> -->
                  <q-img :src="imagenActualProducto" />
                </q-card>

                <div class="row">
                  <div
                    class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"
                  >
                    <div class="text-center">
                      <!-- Crear un boton para ir a la imagen anterior -->
                      <q-btn
                        class="glossy"
                        color="blue-8"
                        icon="arrow_back_ios"
                        size="xs"
                        @click="ImagenAnterior()"
                      />
                      <!-- Crear un boton para ir a la imagen anterior -->
                      <q-btn
                        class="glossy"
                        color="blue-8"
                        icon="arrow_forward_ios"
                        size="xs"
                        @click="ImagenSiguiente()"
                      />
                    </div>
                  </div>
                </div>

                <q-card-section>
                  <div class="row no-wrap items-center">
                    <div class="col text-h6 ellipsis">
                      {{ productoSeleccionado.titulo }} <br />
                      Categoria:
                      {{ ObtenerCategoria(productoSeleccionado.idCategoria) }}
                    </div>
                  </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <div class="text-subtitle1">
                    Precio: {{ productoSeleccionado.precio }}
                  </div>
                  <div class="text-caption text-grey">
                    <!-- Descripcion: {{ productoSeleccionado.descripcion }}<br /> -->
                    Descripcion: Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Iste repudiandae explicabo exercitationem
                    magni. Sint necessitatibus repellat deserunt totam similique
                    culpa sunt hic illum dignissimos voluptatem accusantium
                    debitis, aperiam distinctio magni. Color:
                    {{ productoSeleccionado.color }}
                  </div>
                </q-card-section>
                <q-separator />
              </q-card>
            </q-dialog>

            <div class="self-end">
              <q-btn-dropdown
                auto-close
                color="blue-8"
                rounded
                no-caps
                label="Opciones"
              >
                <q-list>
                  <q-item class="column">
                    <q-btn
                      class="glossy"
                      color="blue-8"
                      label="Añadir Nuevo Producto"
                      no-caps
                    />
                    <q-btn
                      class="glossy"
                      color="blue-8"
                      label="Actualizar este Producto"
                      no-caps
                    />
                    <q-btn
                      class="glossy"
                      color="blue-8"
                      label="Borrar Seleccionado"
                      no-caps
                    />
                    <q-btn
                      class="glossy"
                      color="blue-8"
                      label="Borrar Todo"
                      no-caps
                    />
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
          </q-expansion-item>
        </q-expansion-item>
      </div>
    </div>
    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-12"></div>
  </div>
</template>

<script>

import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  
  data() {
    return {
      urlBase: "https://localhost:44370/api/prueba/",
      selected: [],
      separator: "horizontal",
      usuarios: [],
      productos: [],
      domicilios: [],
      imagenes: [],
      dialogoProducto: false,
      productoSeleccionado: {},
      imagenActualProducto: "",
      indiceImagenActualProducto: 0,

      item: {},
      latitud: 1.6236144612112966,
      longitud: -75.60657254557084,
      center: {
        lat: 2.9348758774625936,
        lng: -75.27874052139391,
      },
      markers: [
        {
          position: {
            lat: 1.6162359720398487,
            lng: -75.6024955878682,
          },
          title: "Florencia",
        },
      ],
      columnsDomicilio: [
        {
          idDomicilio: "idDomicilio",
          field: "idDomicilio",
          label: "idDomicilio",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "ciudad",
          field: "ciudad",
          label: "Ciudad",
          width: "50%",
        },
        {
          name: "direccion",
          field: "direccion",
          label: "Direccion",
          width: "50%",
        },
        {
          name: "latitud",
          field: "latitud",
          label: "Latitud",
          width: "50%",
        },
        {
          name: "longitud",
          field: "longitud",
          label: "Longitud",
          width: "50%",
        },
      ],
      columnsProducto: [
        {
          idProducto: "idProducto",
          label: "IdProducto",
          field: "idProducto",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          id: "imagen",
          label: "Imagen",
          field: "imagen",
          sortable: true,
          align: "left",
        },
        {
          id: "titulo",
          label: "Titulo",
          field: "titulo",
          align: "left",
          sortable: true,
        },
        {
          id: "precio",
          label: "Precio",
          field: "precio",
          align: "left",
          sortable: true,
        },
        {
          id: "color",
          label: "Color",
          field: "color",
          align: "left",
          sortable: true,
        },
        {
          id: "cantidad",
          label: "Cantidad",
          field: "cantidad",
          align: "left",
          sortable: true,
        },
        {
          id: "descripcion",
          label: "Descripcion",
          field: "descripcion",
          align: "left",
          sortable: true,
        },
        {
          id: "idEmpresa",
          label: "IdEmpresa",
          field: "idEmpresa",
          align: "left",
          sortable: true,
        },
        {
          id: "idCategoria",
          label: "IdCategoria",
          field: "idCategoria",
          align: "left",
          sortable: true,
        },
        { id: "imagenes", label: "Imagenes", field: "imagenes", align: "left" },
      ],
    };
  },

  created() {
    this.UsuarioAccedioCorrectamente();
    this.GetUsuarios();
  },

  methods: {
    async ObtenerDomicilios(id) {
      try {
        let idUsuario = parseInt(id); 
        let url = this.urlBase + "ObtenerDomicilioUsuario";
        this.domicilios = await this.enviarPeticionRespuesta(
          url,
          "POST",
          idUsuario
        );
        this.center = {
          lat: parseFloat(this.domicilios[0].latitud),
          lng: parseFloat(this.domicilios[0].longitud),
        };
        this.markers = [
          {
            position: {
              lat: parseFloat(this.domicilios[0].latitud),
              lng: parseFloat(this.domicilios[0].longitud),
            },
            title: this.domicilios[0].ciudad,
          },
        ];
      } catch (error) {
        console.log("Error en domicilios: ", error);
      }
    },

    async enviarPeticionRespuesta(url, method, body) {
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

    async CargarImagenes() {
      let url =
        "https://localhost:44370/api/Imagenes/ObtenerImagenesProducto/" +
        this.productoSeleccionado.idProducto;
      this.imagenes = await this.enviarPeticionRespuesta(url, "GET");
    },

    async ObtenerProductosPrueba(idEmpresa) {
      let url = "https://localhost:44370/api/Producto/" + idEmpresa;
      this.productos = await this.enviarPeticionRespuesta(url, "GET");
    },

    //Obtener todos los usuarios con todas sus propiedades
    async GetUsuarios() {
      let url = this.urlBase + "ObtenerUsuarios";
      this.usuarios = await this.enviarPeticionRespuesta(url, "GET");
    },

    async ImagenAnterior() {
      /* Si las imagenes ya han sido cargadas en el lado del cliente */
      if (this.indiceImagenActualProducto == 0) {
        this.indiceImagenActualProducto = this.imagenes.length - 1;
        this.imagenActualProducto =
          this.imagenes[this.indiceImagenActualProducto].direccion;
      } else if (this.indiceImagenActualProducto > 0) {
        this.indiceImagenActualProducto--;
        this.imagenActualProducto =
          this.imagenes[this.indiceImagenActualProducto].direccion;
      }
    },

    async ImagenSiguiente() {
      if (this.indiceImagenActualProducto < this.imagenes.length) {
        this.imagenActualProducto =
          this.imagenes[this.indiceImagenActualProducto].direccion;
        this.indiceImagenActualProducto++;
      } else {
        this.imagenActualProducto = this.productoSeleccionado.imagen;
        this.indiceImagenActualProducto = 0;
      }
    },

    ActualizarCoordenadas(evnt) {
      this.latitud = evnt.lat();
      this.longitud = evnt.lng();
    },

    ClickProducto(evt, row) {
      this.productoSeleccionado = row;
      this.imagenActualProducto = this.productoSeleccionado.imagen;
      this.CargarImagenes();
      this.dialogoProducto = true;
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

    ObtenerRol(id) {
      return id === 1
        ? "Cliente"
        : id === 2
        ? "Empresa"
        : id === 3
        ? "Administrador"
        : "Empleado";
    },

    ObtenerCorreo(id) {
      return this.usuarios[id].usuario;
    },
  },
};
</script>

<style scoped></style>
