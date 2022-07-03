<template>
  <div class="row">
    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-0 col-xs-0 q-pa-md"></div>

    <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pa-md">
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
      <q-card bordered class="row q-pa-md">
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pa-md">
          <!-- imagen y datos del producto -->
          <div class="row">
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-pa-md">
              <!-- imagen del producto -->
              <q-img
                :src="'https://http2.mlstatic.com/D_658008-MCO43829659522_102020-I.jpg'"
              />
            </div>
            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pa-md">
              <!-- datos del producto -->
              <div class="text-bold text-green">Entregado</div>
              <div class="text-bold text-black">Llegó el 24 de abril</div>
              <br />
              Celular Xiaomi Poco X3 / 64gb / 6ram / 64mp / + Forro <br />
              1 u. | Color: Azul cobalto
            </div>
          </div>
        </div>

        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-pa-md text-bold">
          CRISTHIAN JAVIER BOLIVAR FUQUENE
          <q-btn
            label="Ver mensajes"
            class="glossy"
            dark
            dense
            rounded
            color="blue-7"
          />
        </div>
        <!-- datos del vendedor -->
        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
          <div class="column">
            <q-btn
              label="Ver compra"
              class="glossy"
              dark
              dense
              rounded
              color="blue-10"
            />
            <q-btn
              label="Volver a comprar"
              class="glossy"
              dark
              dense
              rounded
              color="blue-7"
            />
          </div>
        </div>
      </q-card>

      <q-card bordered class="row q-pa-md">
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 q-pa-md">
          <!-- imagen y datos del producto -->
          <div class="row">
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-pa-md">
              <!-- imagen del producto -->
              <q-img
                :src="'https://http2.mlstatic.com/D_658008-MCO43829659522_102020-I.jpg'"
              />
            </div>
            <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 q-pa-md">
              <!-- datos del producto -->
              <div class="text-bold text-green">Entregado</div>
              <div class="text-bold text-black">Llegó el 24 de abril</div>
              <br />
              Celular Xiaomi Poco X3 / 64gb / 6ram / 64mp / + Forro <br />
              1 u. | Color: Azul cobalto
            </div>
          </div>
        </div>

        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 q-pa-md text-bold">
          CRISTHIAN JAVIER BOLIVAR FUQUENE
          <q-btn
            label="Ver mensajes"
            class="glossy"
            dark
            dense
            rounded
            color="blue-7"
          />
        </div>
        <!-- datos del vendedor -->
        <div class="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
          <div class="column">
            <q-btn
              label="Ver compra"
              class="glossy"
              dark
              dense
              rounded
              color="blue-10"
            />
            <q-btn
              label="Volver a comprar"
              class="glossy"
              dark
              dense
              rounded
              color="blue-7"
            />
          </div>
        </div>
      </q-card>

      <!-- boton de ver compra y volver a comprar -->
    </div>
    <div class="col-xl-2 col-lg-2 col-md-2 col-sm-0 col-xs-0"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
</style>