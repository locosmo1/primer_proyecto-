<template>
  <q-card class="entrar">
    <!-- Boton de salir(X) -->
    <div class="text-right">
      <!-- crear un nuevo boton para cambiar los colores de la vista -->
      <q-btn no-caps dense class="q-pa-xs" color="black" label="X" size="sm" />
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
        :label="labelDomicilio"
        icon="people_alt"
        @click="AgregarEditarDomicilio()"
      />
    </div>
  </q-card>
</template>

<script>
/* import {map} from src="https://maps.googleapis.com/maps/api/js?key=MY_API_KEY&callback=initMap"; */

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default {
  name: "ComponenteDomicilio",
  props: {
    //Type control style
    crear: {
      type: Boolean,
    },
    domicilio: {
      type: Object,
    },
    usuarioSeleccionado: {
      type: Object,
    },
  },
  data() {
    return {
      item: {},
      modelCiudad: "",
      nuevaCiudad: "",
      nuevaDireccion: "",
      labelDomicilio: undefined,
      latitud: 2.9348758774625936,
      longitud: -75.27874052139391,
      ciudadesDisponibles: ["Bogota", "Medellin", "Cali", "Barranquilla"],
      center: {
        lat: 2.9348758774625936,
        lng: -75.27874052139391,
      },
      markers: [
        {
          position: {
            lat: 2.9348758774625936,
            lng: -75.27874052139391,
          },
          title: "Florencia",
        },
      ],
    };
  },
  mounted() {
    this.labelDomicilio = this.crear
      ? "Crear Domicilio"
      : "Actualizar Domicilio";
  },

  methods: {
    AgregarEditarDomicilio() {
      if (this.crear) {
        this.labelDomicilio = "Crear Domicilio";
        this.AgregarDomicilio();
      } else {
        if (this.domicilio !== undefined) {
          this.labelDomicilio = "Actualizar Domicilio";
          this.ActualizarDomicilio();
        }
      }
    },

    AgregarDomicilio() {
      //idDomicilio, ciudad, direccion, idUsuario, idUbicacion, latitud, longitud
      let nuevoDomicilio = {
        idDomicilio: 1,
        ciudad: this.modelCiudad,
        direccion: this.nuevaDireccion,
        idUsuario: this.usuarioSeleccionado.idUsuario,
        latitud: this.latitud,
        longitud: this.longitud,
      };
      let url =
        this.$store.state.urlBackendElegida + "api/Domicilio/crearDomicilio";
      this.EnviarPeticion(url, "POST", nuevoDomicilio);
      this.dialogoDomicilio = false;
    },

    async ActualizarDomicilio() {
      let url =
        this.$store.state.urlBackendElegida +
        "api/Domicilio/ObtenerIdUbicacion";
      let idUbicacionn = await this.EnviarPeticionRespuesta(
        url,
        "POST",
        this.domicilio.idDomicilio
      ); //this.domiciliosSeleccionados[0].idDomicilio
      let nuevoDomicilio = {
        idDomicilio: this.domicilio.idDomicilio,
        ciudad: this.modelCiudad,
        direccion: this.nuevaDireccion,
        idUsuario: this.usuarioSeleccionado.idUsuario,
        idUbicacion: idUbicacionn,
        latitud: this.latitud,
        longitud: this.longitud,
      };
      console.log({nuevoDomicilio})
      let url2 = this.$store.state.urlBackendElegida + "api/Domicilio";
      this.EnviarPeticion(url2, "PUT", nuevoDomicilio);
      this.dialogoDomicilio = false;
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

    ActualizarCoordenadas(evnt) {
      this.latitud = evnt.lat();
      this.longitud = evnt.lng();
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
  },
};
</script>
