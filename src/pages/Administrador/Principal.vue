<template>
  <div class="row">
    <div class="col-xl-0 col-lg-0 col-md-0 col-sm-0 col-xs-0"></div>
    <div class="q-pa-md col-xl-11 col-lg-11 col-md-11 col-sm-12 col-xs-12">
      <!-- Seleccionar usuarios por medio de su usuario o correo -->
      <div class="row">
        <div class="q-pa-md col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <q-select
            color="blue-7"
            v-model="modelUsuarios"
            :options="nombreUsuarios"
            label="Seleccione un usuario"
            @input="CargarDatosUsuario"
          />
        </div>
      </div>

      <div class="row">
        <div class="q-pa-md col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <q-card bordered>
            <!-- Si el objeto no esta vacio entonces
            mostrar los datos del usuario -->
            <div
              class="row"
              v-if="Object.keys(usuarioSeleccionado).length !== 0"
            >
              <div
                class="q-pa-md col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"
              >
                Rol del usuario:
                {{ ObtenerRol(usuarioSeleccionado.idUsuario) }} <br />
                IdUsuario: {{ usuarioSeleccionado.idUsuario }}, <br />
                Usuario: {{ usuarioSeleccionado.usuario }}, <br />
                Celular: {{ usuarioSeleccionado.celular }} <br />
              </div>
            </div>
          </q-card>

          <!-- Mostrar los Domicilios de los usuarios -->
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
            v-if="ObtenerRol(usuarioSeleccionado.idRol) !== 'Administrador'"
          >
            <!-- Mostrar los Domicilios de los usuarios dentro de una tabla -->
            <q-table
              :columns="columnsDomicilio"
              :data="domicilios"
              row-key="idDomicilio"
              :selected.sync="domiciliosSeleccionados"
              selection="multiple"
              no-data-label="Sin Domicilios Por favor seleccione un usuario"
            />

            <!-- Domicilios Seleccionados {{ domiciliosSeleccionados }}<br/> -->
            <!-- Boton para seleccionar las opciones de los domicilios -->
            <q-btn-dropdown
              auto-close
              color="blue-8"
              rounded
              no-caps
              label="Opciones"
            >
              <!-- Lista para representar los botones CRUD -->
              <q-list>
                <q-item class="column">
                  <q-btn
                    class="glossy"
                    color="blue-8"
                    label="Añadir Nueva Direccion"
                    @click="(dialogoDomicilio = true), (crear = true)"
                    rounded
                    no-caps
                  />
                  <q-btn
                    class="glossy"
                    color="blue-8"
                    label="Actualizar esta Direccion"
                    @click="(dialogoDomicilio = true), (crear = false)"
                    rounded
                    no-caps
                  />
                  <q-btn
                    class="glossy"
                    color="blue-8"
                    label="Borrar Seleccionado"
                    @click="BorrarDomicilio()"
                    rounded
                    no-caps
                  />
                  <q-btn
                    class="glossy"
                    color="blue-8"
                    label="Borrar Todo"
                    @click="BorrarTodosDomicilios()"
                    rounded
                    no-caps
                  />
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-expansion-item>

          <!-- Ventana para modificar el domicilio del usuario con mapa -->
          <q-dialog v-model="dialogoDomicilio">
            <q-card class="entrar">
              <!-- Boton de salir(X) -->
              <div class="text-right">
                <!-- crear un nuevo boton para cambiar los colores de la vista -->
                <q-btn
                  no-caps
                  dense
                  class="q-pa-xs"
                  color="black"
                  label="X"
                  @click="dialogoDomicilio = false"
                  size="sm"
                />
              </div>
              <q-select
                class="q-pa-md"
                color="blue-7"
                v-model="modelCiudad"
                :options="ciudadesDisponibles"
                label="Seleccione la ciudad"
                @input="CargarMapaUbicacion"
              >
              </q-select>

              <!-- Mostrar Mapa -->
              <q-card>
                <q-card-section>
                  <!-- api de google maps
                  AIzaSyCOe6XiKYkPA1q3u4v_SVZy5Pw9yIXOnVQ -->
                  <GmapMap
                    :center="center"
                    :zoom="14"
                    map-type-id="terrain"
                    style="width: 700px; height: 500px"
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

              <q-input
                class="q-pa-md justify-center items-center content-center text-center text-white"
                color="black"
                rounded
                outlined
                v-model="nuevaDireccion"
                label="Digite la direccion"
                clearable
                dense
              >
                <template v-slot:append>
                  <q-icon class="cursor-pointer" />
                </template>
              </q-input>

              <div class="row"></div>
              <div class="row"></div>
              <div class="column q-pa-md text-center text-black text-h6">
                <q-btn
                  dense
                  no-caps
                  class="text-center q-pa-xs"
                  color="info"
                  label="Enviar"
                  icon="people_alt"
                  @click="AgregarEditarDomicilio()"
                />
              </div>
            </q-card>
          </q-dialog>

          <!-- Mostrar los Productos de las empresas -->
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
            v-if="ObtenerRol(usuarioSeleccionado.idRol) === 'Empresa'"
          >
            <!-- Mostrar los Productos de las empresas en una tabla -->
            <q-table
              :data="productos"
              :columns="columnsProducto"
              selection="multiple"
              row-key="idProducto"
              :selected.sync="productosSeleccionados"
              @row-click="ClickProducto"
              no-data-label="Sin Productos para mostrar"
            />

            Producto(s) seleccionado(s) {{ productosSeleccionados }}

            <!-- Dialogo para mostrar todo el contenido del producto con
            sus detalles -->
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
                    Descripcion: {{ productoSeleccionado.descripcion }} Color:
                    {{ productoSeleccionado.color }}
                  </div>
                </q-card-section>
                <q-separator />
              </q-card>
            </q-dialog>

            <!-- Opciones para modificar el producto -->
            <div class="self-end">
              <q-btn-dropdown
                auto-close
                color="blue-8"
                rounded
                no-caps
                label="Opciones"
              >
                <!-- Lista para modificar el producto por medio del crud -->
                <q-list>
                  <q-item class="column">
                    <q-btn
                      class="glossy"
                      color="blue-8"
                      label="Añadir Nuevo Producto"
                      no-caps
                      rounded
                    />
                    <q-btn
                      class="glossy"
                      color="blue-8"
                      label="Actualizar este Producto"
                      no-caps
                      rounded
                    />
                    <q-btn
                      class="glossy"
                      color="blue-8"
                      label="Borrar Seleccionado"
                      no-caps
                      rounded
                    />
                    <q-btn
                      class="glossy"
                      color="blue-8"
                      label="Borrar Todo"
                      no-caps
                      rounded
                    />
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
          </q-expansion-item>
        </div>
      </div>

      <!-- graphics than represent the data. -->
      <!-- <div class="row">
        <div class="q-pa-md col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <q-card bordered>
            <q-card-section>
              <div class="row">
                <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10">
                  $ 340234 23% <br />
                  Bitcoin Price
                </div>
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                  <q-icon size="md" color="blue" name="downloading" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="q-pa-md col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <q-card bordered>
            <q-card-section>
              <div class="row">
                <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10">
                  $ 340234 23% <br />
                  Bitcoin Price
                </div>
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                  <q-icon size="md" color="blue" name="downloading" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="q-pa-md col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <q-card bordered>
            <q-card-section>
              <div class="row">
                <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10">
                  $ 340234 23% <br />
                  Bitcoin Price
                </div>
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                  <q-icon size="md" color="blue" name="downloading" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="q-pa-md col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <q-card bordered>
            <q-card-section>
              <div class="row">
                <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10">
                  $ 340234 23% <br />
                  Bitcoin Price
                </div>
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                  <q-icon size="md" color="blue" name="downloading" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div> -->

      <!-- <div class="row">
        <div class="q-pa-md col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <q-card bordered>
            <q-card-section>
              <div class="row">
                <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10">
                  $ 340234 23% <br />
                  Bitcoin Price
                </div>
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                  <q-icon size="md" color="blue" name="downloading" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="q-pa-md col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <q-card bordered>
            <q-card-section>
              <div class="row">
                <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10">
                  $ 340234 23% <br />
                  Bitcoin Price
                </div>
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                  <q-icon size="md" color="blue" name="downloading" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div> -->

      <!-- <div class="row">
        <div class="q-pa-md col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <q-card bordered>
            <q-card-section>
              <div class="row">
                <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10">
                  $ 340234 23% <br />
                  Bitcoin Price
                </div>
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                  <q-icon size="md" color="blue" name="downloading" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="q-pa-md col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <q-card bordered>
            <q-card-section>
              <div class="row">
                <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10">
                  $ 340234 23% <br />
                  Bitcoin Price
                </div>
                <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                  <q-icon size="md" color="blue" name="downloading" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div> -->

      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="row">&nbsp;&nbsp;&nbsp;</div>
        <div class="row">&nbsp;&nbsp;&nbsp;</div>
        <div class="row">&nbsp;&nbsp;&nbsp;</div>
        <div class="row">&nbsp;&nbsp;&nbsp;</div>
      </div>
    </div>
    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-12"></div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";

/* import {map} from src="https://maps.googleapis.com/maps/api/js?key=MY_API_KEY&callback=initMap"; */

export default {
  data() {
    return {
      urlBase: "https://localhost:44370/api/Prueba/",
      urlBaseDomicilio: "https://localhost:44370/api/Domicilio/",
      urlBaseProducto: "https://localhost:44370/api/Producto/",
      urlBaseUsuario: "https://localhost:44370/api/Usuario/",

      separator: "horizontal",

      imagenes: [],
      imagenActualProducto: "",

      domicilios: [],
      domiciliosSeleccionados: [],
      dialogoProducto: false,
      dialogoDomicilio: false,
      nuevoDomicilio: {},

      productos: [],
      productosSeleccionados: [],
      productoSeleccionado: {},
      indiceImagenActualProducto: 0,

      usuarios: [],
      nombreUsuarios: [],
      modelUsuarios: "Usuarios",
      usuarioSeleccionado: {},

      nuevaCiudad: "",
      nuevaDireccion: "",

      ciudadesDisponibles: ["Bogota", "Medellin", "Cali", "Barranquilla"],
      modelCiudad: "",

      crear: true,

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
    AgregarEditarDomicilio() {
      if (this.crear) {
        this.AgregarDomicilio();
      } else {
        this.ActualizarDomicilio();
      }
    },

    AgregarDomicilio() {
      let nuevoDomicilio = {
        idDomicilio: 1,
        ciudad: this.modelCiudad,
        direccion: this.nuevaDireccion,
        idUsuario: this.usuarioSeleccionado.idUsuario,
        latitud: this.latitud,
        longitud: this.longitud,
      }; //idDomicilio, ciudad, direccion, idUsuario, idUbicacion, latitud, longitud
      //console.log(nuevoDomicilio);
      let url = this.urlBaseDomicilio + "crearDomicilio";
      this.enviarPeticion(url, "POST", nuevoDomicilio);
      this.dialogoDomicilio = false;
    },

    async ActualizarDomicilio() {
      let url = this.urlBaseDomicilio + "ObtenerIdUbicacion";
      if (this.domiciliosSeleccionados.length == 1) {
        let idUbicacionn = await this.enviarPeticionRespuesta(
          url,
          "POST",
          this.domiciliosSeleccionados[0].idDomicilio
        );
        let nuevoDomicilio = {
          idDomicilio: this.domiciliosSeleccionados[0].idDomicilio,
          ciudad: this.modelCiudad,
          direccion: this.nuevaDireccion,
          idUsuario: this.usuarioSeleccionado.idUsuario,
          idUbicacion: idUbicacionn,
          latitud: this.latitud,
          longitud: this.longitud,
        };
        this.enviarPeticion(this.urlBaseDomicilio, "PUT", nuevoDomicilio);
        this.dialogoDomicilio = false;
      } else {
        console.log("Debes seleccionar un solo domicilio");
      }
    },

    async BorrarDomicilio() {
      let url = this.urlBaseDomicilio + "ObtenerIdUbicacion";
      let idDomicilio = this.domiciliosSeleccionados[0].idDomicilio;
      let idUbicacionn = await this.enviarPeticionRespuesta(
        url,
        "POST",
        idDomicilio
      );

      let domicilio = {
        idDomicilio: idDomicilio,
        ciudad: this.modelCiudad,
        direccion: this.nuevaDireccion,
        idUsuario: this.usuarioSeleccionado.idUsuario,
        idUbicacion: idUbicacionn,
        latitud: this.latitud,
        longitud: this.longitud,
      };
      let url2 = this.urlBaseDomicilio + "EliminarDomicilioUbicacion";
      this.enviarPeticion(url2, "DELETE", domicilio);
    },

    BorrarTodosDomicilios() {
      console.log("BorrarTodosDomicilios");
    },

    CargarLatitudLongitud(latitud, longitud, ciudad) {
      this.center = {
        lat: latitud,
        lng: longitud,
      };
      this.markers = [
        {
          position: {
            lat: latitud,
            lng: longitud,
          },
          title: ciudad,
        },
      ];
      this.latitud = latitud;
      this.longitud = longitud;
    },

    GeocodedAddress() {
      var self = this;
      let geocoder = new google.maps.Geocoder();
      let theLocations = this.locations;

      return Promise.all(
        _.map(theLocations, (addr) => {
          var geocoder = new google.maps.Geocoder();

          var locationss = {
            lat: parseFloat(addr.lat),
            lng: parseFloat(addr.lng),
          };

          // var sampleLocation = { lat: 1.39, lng: 103.8 };

          return new Promise(function (resolve, reject) {
            geocoder.geocode(
              { location: locationss },
              function (results, status) {
                if (status === "OK") {
                  if (results[0]) {
                    return results[0].formatted_address;
                  } else {
                    console.log(status);
                    window.alert("No results found");
                    return null;
                  }
                }
              }
            );
          });
        })
      ).then((data) => {
        console.log(data);
        this.formatedAddresses = data;
      });
    },

    CargarMapaUbicacion() {
      let ciudad = this.modelCiudad;
      let latitud, longitud;
      switch (ciudad) {
        case "Bogota":
          latitud = 4.665984005374667;
          longitud = -74.11201953238661;
          this.CargarLatitudLongitud(latitud, longitud, "Bogota");
          break;
        case "Medellin":
          latitud = 6.24381223144814;
          longitud = -75.56822986305791;
          this.CargarLatitudLongitud(latitud, longitud, "Medellin");
          break;
        case "Cali":
          latitud = 3.404300027947404;
          longitud = -76.52189083073294;
          this.CargarLatitudLongitud(latitud, longitud, "Cali");
          break;
        case "Barranquilla":
          latitud = 10.97601594837661;
          longitud = -74.80522932533702;
          this.CargarLatitudLongitud(latitud, longitud, "Barranquilla");
          break;
      }
    },

    CargarDatosUsuario() {
      for (let i = 0; i < this.usuarios.length; i++) {
        if (this.usuarios[i].usuario == this.modelUsuarios) {
          this.usuarioSeleccionado = this.usuarios[i];
          break;
        }
      }

      let esAdministrador = this.usuarioSeleccionado.idRol === 3;
      let idUsuario = this.usuarioSeleccionado.idUsuario;

      if (!esAdministrador) {
        if (this.usuarioSeleccionado.idRol == 1) {
          //Si es cliente cargar los domicilios
          this.ObtenerDomicilios(idUsuario);
        } else if (this.usuarioSeleccionado.idRol == 2) {
          //Si es empresa cargar los domicilios y los productos
          this.ObtenerDomicilios(idUsuario);
          this.ObtenerProductosPrueba(idUsuario);
        }
      }
    },

    async ObtenerDomicilios(id) {
      try {
        let idUsuario = parseInt(id);
        let url = this.urlBaseDomicilio + "ObtenerDomicilioUsuario";
        this.domicilios = await this.EnviarPeticionRespuesta(
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

    async CargarImagenes() {
      let url =
        "https://localhost:44370/api/Imagenes/ObtenerImagenesProducto/" +
        this.productoSeleccionado.idProducto;
      this.imagenes = await this.enviarPeticionRespuesta(url, "GET");
    },

    async ObtenerProductosPrueba(idEmpresa) {
      let url = "https://localhost:44370/api/Producto/" + idEmpresa;
      this.productos = await this.EnviarPeticionRespuesta(url, "GET");
    },

    //Obtener todos los usuarios con todas sus propiedades
    async GetUsuarios() {
      let url = this.urlBaseUsuario + "ObtenerUsuarios";
      this.usuarios = await this.EnviarPeticionRespuesta(url, "GET");
      for (let i = 0; i < this.usuarios.length; i++) {
        this.nombreUsuarios.push(this.usuarios[i].usuario);
      }
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

    async UsuarioAccedioCorrectamente() {
      //const auth = getAuth();

      onAuthStateChanged(this.$store.state.auth, (user) => {
        if (user) {
          //Dejar entrar si esta autenticado solamente como administrador
          //Consultar a usuarioActual desde el backend para saber si es
          //administrador
          this.ObtenerUsuarioActual();
        } else {
          if (this.$route.path !== "/") {
            this.$router.replace("/");
          }
        }
      });
    },

    async ObtenerUsuarioActual() {
      let url = "https://localhost:44370/api/Usuario/ObtenerUsuarioActual";
      let usuarioActual = await this.EnviarPeticionRespuesta(url, "GET");
      if (usuarioActual.idRol !== 3) {
        if (this.$route.path !== "/") {
          this.$router.replace("/");
        }
      }
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
