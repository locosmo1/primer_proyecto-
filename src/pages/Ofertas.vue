<template>
  <div class="row">
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="row q-pa-md justify-end">
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 q-pa-md">
          <q-separator> </q-separator>
          <div class="text-h5 text-bold">Ofertas</div>
          ¡Encuentra precios increíbles cada día!
          <q-separator> </q-separator>
        </div>
        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
          <q-card bordered>
            <q-card-section>
              <q-tabs v-model="tab" class="q-pa-md bg-blue text-white shadow-2">
                <q-tab
                  name="ofertas"
                  label="Todas las ofertas"
                  icon="local_offer"
                />
                <q-tab name="relampago" label="Ofertas relampago" icon="bolt" />
                <q-tab
                  name="exclusivo"
                  label="Productos exclusivos"
                  icon="location_city"
                />
                <q-tab name="celulares" label="Celulares" icon="smartphone" />
                <q-tab
                  name="internacional"
                  label="Compra Internacional"
                  icon="inventory_2"
                />
                <q-tab name="menor" label="Menos de 40.000" icon="paid" />
              </q-tabs>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row q-pa-md justify-end">
        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 q-pa-md">
          <q-separator> </q-separator>
          <div class="text-bold text-black text-h6">Todas<br /></div>
          <div>70 productos</div>

          <q-card bordered>
            <q-separator> </q-separator>
            <q-card-section>
              <div class="text-italic text-green text-bold">
                <span class="material-icons"> bolt </span>FULL
              </div>
              te ahorra envios con tu carrito de compras
            </q-card-section>
            <q-separator> </q-separator>
          </q-card>

          <div class="text-h6">Categorías</div>
          Celulares y Teléfonos (70)

          <q-separator> </q-separator>

          <div class="text-h6">Costo de envío</div>
          Gratis (70)

          <q-separator> </q-separator>

          <div class="text-h6">Pago</div>
          Cuotas sin interés (16)

          <q-separator> </q-separator>

          <div class="text-h6">Precio</div>
          $80000 a $200000 (12) Más de $200000 (58)

          <q-separator> </q-separator>

          <div class="row items-center text-center">
            <div class="col-4">
              <q-input color="blue" class="q-pa-md" label="Minimo" />
            </div>
            <div class="col-2 text-bold">-</div>
            <div class="col-4">
              <q-input color="blue" class="q-pa-md" label="Maximo" />
            </div>
            <div class="col-2">
              <q-btn round> > </q-btn>
            </div>
          </div>
          <q-separator> </q-separator>
        </div>

        <div class="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
          <div class="row q-pa-md">
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
              <q-card bordered class="q-pa-md">
                <q-card-section>
                  <q-img
                    :src="'https://http2.mlstatic.com/D_Q_NP_2X_840687-MCO47061481598_082021-P.webp'"
                  />
                </q-card-section>
                <q-card-section>
                  <div class="text-h5">$ 85.900</div>
                  <div class="text-green text-bold">14% OFF Envio gratis</div>
                  full Audifonos gamer p36 sonido 9D
                </q-card-section>
              </q-card>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
              <q-card bordered class="q-pa-md">
                <q-card-section>
                  <q-img
                    :src="'https://http2.mlstatic.com/D_Q_NP_2X_815337-MLA46081133225_052021-P.webp'"
                  />
                </q-card-section>
                <q-card-section>
                  <div class="text-h5">$ 85.900</div>
                  <div class="text-green text-bold">14% OFF Envio gratis</div>
                  full Audifonos gamer p36 sonido 9D
                </q-card-section>
              </q-card>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
              <q-card bordered class="q-pa-md">
                <q-card-section>
                  <q-img
                    :src="'https://http2.mlstatic.com/D_Q_NP_2X_677733-MLA47701411912_092021-P.webp'"
                  />
                </q-card-section>
                <q-card-section>
                  <div class="text-h5">$ 85.900</div>
                  <div class="text-green text-bold">14% OFF Envio gratis</div>
                  full Audifonos gamer p36 sonido 9D
                </q-card-section>
              </q-card>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
              <q-card bordered class="q-pa-md">
                <q-card-section>
                  <q-img
                    :src="'https://http2.mlstatic.com/D_Q_NP_2X_637260-MLA46081133699_052021-P.webp'"
                  />
                </q-card-section>
                <q-card-section>
                  <div class="text-h5">$ 85.900</div>
                  <div class="text-green text-bold">14% OFF Envio gratis</div>
                  full Audifonos gamer p36 sonido 9D
                </q-card-section>
              </q-card>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
              <q-card bordered class="q-pa-md">
                <q-card-section>
                  <q-img
                    :src="'https://http2.mlstatic.com/D_Q_NP_2X_842402-MLA46041962871_052021-P.webp'"
                  />
                </q-card-section>
                <q-card-section>
                  <div class="text-h5">$ 85.900</div>
                  <div class="text-green text-bold">14% OFF Envio gratis</div>
                  full Audifonos gamer p36 sonido 9D
                </q-card-section>
              </q-card>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
              <q-card bordered class="q-pa-md">
                <q-card-section>
                  <q-img
                    :src="'https://http2.mlstatic.com/D_Q_NP_2X_629445-MCO46654884953_072021-P.webp'"
                  />
                </q-card-section>
                <q-card-section>
                  <div class="text-h5">$ 85.900</div>
                  <div class="text-green text-bold">14% OFF Envio gratis</div>
                  full Audifonos gamer p36 sonido 9D
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: "mails",
      controlType: "push",
      controlTypeOptions: [
        { value: "regular", label: "regular" },
        { value: "unelevated", label: "unelevated" },
        { value: "flat", label: "flat (default)" },
        { value: "outline", label: "outline" },
        { value: "push", label: "push" },
      ],

      slide: "style",
    };
  },
  methods: {},
};
</script>


