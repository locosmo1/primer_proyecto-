<template>
  <div class="row justify-around q-pa-md">
    <div class="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-0"></div>
    <div class="col-xl-6 col-lg-6 col-md-8 col-sm-8 col-xs-12">
      <div class="row">
        <q-card
          rounded
          class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-md"
        >
          <div class="text-h5 text-bold text-strong text-center q-pa-md">
            Registro de Cliente
          </div>

          <q-separator />

          <q-input
            class="q-pa-md"
            v-model="editedItem.nombre"
            label="Digite su nombre"
            color="blue"
          />

          <q-separator />

          <q-input
            class="q-pa-md"
            v-model="editedItem.apellido"
            label="Digite su apellido"
            color="blue"
          />

          <q-separator />

          <q-input
            class="q-pa-md"
            v-model="editedItem.contraseña"
            :type="isPwd ? 'password' : 'text'"
            label="Digite su Contraseña"
            color="info"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <q-separator />

          <q-input
            class="q-pa-md"
            v-model="editedItem.celular"
            label="Digite su celular"
            color="blue"
          />

          <q-separator />

          <q-input
            class="q-pa-md"
            v-model="editedItem.correoElectronico"
            label="Digite su correo electronico"
            color="blue"
          />

          <q-separator />

          <span class="text-black text-bold text-h6"
            >Arrastre la marca hasta la ubicacion de destino</span
          >

          <q-card>
            <q-card-section>
              <!-- api de google maps
          AIzaSyCOe6XiKYkPA1q3u4v_SVZy5Pw9yIXOnVQ -->
              <GmapMap
                :center="{
                  lat: 1.6158069892853335,
                  lng: -75.60449115137529,
                }"
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
          </q-card>

          <q-separator />

          <q-card>
            <q-card-section>
              <q-btn
                @click="GuardarUsuario()"
                class="glossy"
                dark
                rounded
                color="blue-7"
                label="Guardar"
              />
            </q-card-section>
          </q-card>

          <q-separator />
        </q-card>
      </div>
    </div>
    <div class="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-0 q-pa-md"></div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { initializeApp } from "firebase/app";

export default {
  props: {},
  data() {
    return {
      ventana: false,
      item: {},
      latitud: 1.6236144612112966,
      longitud: -75.60657254557084,
      center: {
        lat: -34.6037,
        lng: -58.3816,
      },
      markers: [
        {
          position: {
            lat: 1.6236144612112966,
            lng: -75.60657254557084,
          },
          title: "Santiago",
        },
      ],

      editedItem: {},
      isPwd: true,
      cantidad: undefined,
      color: "",
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
      dense: false,
      denseOpts: false,
      descripcion: "",
    };
  },
  created() {
    //Iniciar la api de firebase
    this.$store.dispatch("iniciarFirebaseAction");//Inicar Firebase

    //Iniciar la api de google maps
    this.editedItem.nombre = "stiwar";
    this.editedItem.apellido = "pabon";
    this.editedItem.contraseña = "54784946";
    this.editedItem.celular = "3508425462";
    this.editedItem.correoElectronico = "gaitan2266@hotmail.com";
  },

  mounted() {
    //Iniciar la api de google maps
  },

  methods: {
    ActualizarCoordenadas(evnt) {
      this.latitud = evnt.lat();
      this.longitud = evnt.lng();
    },

    RegistroConFirebase() {
      //const auth = getAuth();
      createUserWithEmailAndPassword(
        this.$store.state.auth,
        this.editedItem.correoElectronico,
        this.editedItem.contraseña
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    },

    async GuardarUsuario() {
      //guardar usuario con nombre, apellido, contraseña
      //celular, correo electronico

      this.RegistroConFirebase();

      /* var respuesta;

      let url = this.$store.state.urlBackendElegida + "api/prueba/cliente"

      const cliente = {
        nombre: this.editedItem.nombre,
        apellido: this.editedItem.apellido,
        contraseña: this.editedItem.contraseña,
        celular: this.editedItem.celular,
        correoElectronico: this.editedItem.correoElectronico,
      };

      try {
        this.res = await fetch(url, {
          method: "POST",
          body: JSON.stringify(cliente),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => (respuesta = res))
          .catch((error) => console.error("Error en fetch:", error))
          .then(function (response) {
            //console.log(response);
          });
      } catch (error) {
        console.log(error);
      } */

      //enviar datos del domicilio por metodo post
      /* let url2 = this.$store.state.urlBackendElegida + "api/prueba/domicilio"

      const domicilio = {
        ciudad: "Florencia",
        latitud: this.latitud,
        longitud: this.longitud,
      };

      try {
        this.res = await fetch(url2, {
          method: "POST",
          body: JSON.stringify(domicilio),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => (respuesta = res))
          .catch((error) => console.error("Error en fetch:", error))
          .then(function (response) {
            //console.log(response);
          });
      } catch (error) {
        console.log(error);
      } */
    },
  },
};
</script>

<style scoped>
.cargador {
  width: 100%;
}
</style>
