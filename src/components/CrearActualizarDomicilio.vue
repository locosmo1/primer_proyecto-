<template>
  <div class="row">
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="row">
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
      </div>
    </div>
  </div>
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default {
  name: "ComponenteProducto",
  props: {
    //Type control style
    crear: {
      type: Boolean,
    },
    domicilio: {
      type: Object,
    },
  },
  data() {
    return {
      labelProducto: "Undefined",
    };
  },
  created() {
    
  },

  mounted(){
    
  },

  methods: {
    
  },
};
</script>
