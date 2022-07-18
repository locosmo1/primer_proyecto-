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

            <!-- Domicilios Seleccionados {{ domiciliosSeleccionados }}<br /> -->
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
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-expansion-item>

          <!-- Ventana para modificar el domicilio del usuario con mapa -->
          <q-dialog v-model="dialogoDomicilio">
            <ComponenteDomicilio
              :crear="crear"
              :domicilio="this.domiciliosSeleccionados[0]"
            ></ComponenteDomicilio>
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
                      @click="NuevoProducto()"
                      no-caps
                      rounded
                    />
                    <q-btn
                      class="glossy"
                      color="blue-8"
                      label="Actualizar este Producto"
                      @click="ActualizarProducto()"
                      no-caps
                      rounded
                    />
                    <q-btn
                      class="glossy"
                      color="blue-8"
                      label="Borrar Seleccionado"
                      @click="BorrarProducto()"
                      no-caps
                      rounded
                    />
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>

            <!-- componente para crear y actualizar un producto -->
            <q-dialog v-model="crearActualizarProducto">
              <!-- Enviar informacion del producto que queremos actualizar -->
              <ComponenteProducto
                :crear="crearProducto"
                :producto="this.productosSeleccionados[0]"
              >
              </ComponenteProducto>
            </q-dialog>
          </q-expansion-item>
        </div>
      </div>

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
import { onAuthStateChanged } from "firebase/auth";

import { getAuth, signOut } from "firebase/auth";

import ComponenteProducto from "components/CrearActualizarProducto.vue";

import ComponenteDomicilio from "components/CrearActualizarDomicilio.vue";

/* import {map} from src="https://maps.googleapis.com/maps/api/js?key=MY_API_KEY&callback=initMap"; */

export default {
  name: "Principal",
  components: {
    ComponenteProducto,
    ComponenteDomicilio,
  },
  data() {
    return {
      separator: "horizontal",

      imagenes: [],
      imagenActualProducto: "",

      domicilios: [],
      domiciliosSeleccionados: [],
      dialogoProducto: false,
      dialogoDomicilio: false,
      crearActualizarProducto: false,
      crearProducto: true,
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
      editedItem: {},
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

  /* Atajos de teclado
   *ctrl + shift + n =      nueva ventana
   *ctrl + k + s =          guardar todo
   *ctrl + shift + s =      guardar archivo como
   *ctrl + w =              cerrar pestaña actual
   *ctrl + shift + k =      borrar la linea actual
   *ctrl + shift + enter =  insertar una nueva linea
   *ctrl + f =              buscar en el proyecto
   *ctrl + h =              buscar y reemplazar
   *ctrl + shift + f =      ir a la etiqueta de cierre
   *ctrl + p =              acceder a un archivo del proyecto
   *ctrl + b =              ocultar la barra lateral
   *alt + shift + a =       comentar codigo
   *shift + alt + flecha arriba o abajo = duplicar el codigo
   *alt + flecha arriba o alt flecha abajo = mover codigo
   npm install -g @quasar/cli
   */

  created() {
    this.UsuarioAccedioCorrectamente();
  },

  methods: {

    NuevoProducto() {
      this.crearActualizarProducto = true;
      this.crearProducto = true;
    },

    ActualizarProducto() {
      if (this.productosSeleccionados.length === 1) {
        this.crearActualizarProducto = true;
        this.crearProducto = false;
        //console.log("Producto a enviar: ",this.productosSeleccionados[0])
      }
    },

    BorrarProducto() {
      if (this.productosSeleccionados.length === 1) {
      }
    },

    async BorrarDomicilio() {
      let url =
        this.$store.state.urlBackendElegida +
        "api/Domicilio/ObtenerIdUbicacion";

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
      let url2 =
        this.$store.state.urlBackendElegida +
        "api/Domicilio/EliminarDomicilioUbicacion";
      this.enviarPeticion(url2, "DELETE", domicilio);
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
          this.ObtenerProductos(idUsuario);
        }
      }
    },

    async ObtenerDomicilios(id) {
      try {
        let idUsuario = parseInt(id);
        let url =
          this.$store.state.urlBackendElegida +
          "api/Domicilio/ObtenerDomicilioUsuario";
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
        this.$store.state.urlBackendElegida +
        "api/Imagenes/ObtenerImagenesProducto/" +
        this.productoSeleccionado.idProducto;
      this.imagenes = await this.EnviarPeticionRespuesta(url, "GET");
    },

    async ObtenerProductos(idEmpresa) {
      let url =
        this.$store.state.urlBackendElegida + "api/Producto/" + idEmpresa;
      this.productos = await this.EnviarPeticionRespuesta(url, "GET");
    },

    //Obtener todos los usuarios con todas sus propiedades
    async GetUsuarios() {
      let url =
        this.$store.state.urlBackendElegida + "api/Usuario/ObtenerUsuarios";
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
      let accedio = false;
      onAuthStateChanged(this.$store.state.auth, (user) => {
        if (user) {
          //Dejar entrar si esta autenticado solamente como administrador
          //Consultar a usuarioActual desde el backend para saber si es
          //administrador
          accedio = true;
          this.GetUsuarios();
        } else {
          if (this.$route.path !== "/Login") {
            this.$router.replace("/Login");
          }
        }
      });
      return accedio;
    },

    async ObtenerUsuarioActual() {
      let url =
        this.$store.state.urlBackendElegida +
        "api/Usuario/ObtenerUsuarioActual";
      let usuarioActual = await this.EnviarPeticionRespuesta(url, "GET");
      if (usuarioActual.idRol !== 3) {
        this.CerrarSesion();
      }
    },

    CerrarSesion() {
      signOut(this.$store.state.auth)
        .then(() => {
          //this.Response.Cookies.Delete("session");
          if (this.$route.path !== "/Login") {
            this.$router.replace("/Login");
          }
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
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
