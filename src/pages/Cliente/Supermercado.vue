<template>
  <div class="row">
    <div class="col-xl-1 col-lg-1 col-md-0 col-sm-0 col-xs-0"></div>

    <div class="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-xs-12">
      <div class="row q-pa-md">
        <q-card
          v-for="(task, index) in tasks"
          :key="index"
          bordered
          class="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-xs-6"
        >
          <q-card-section>
            <div class="column q-pa-md">
              <q-img :src="RetornarImagen(index)" />
              <div class="text-bold q-pa-md">
                <div class="text-h6">
                  $ 111.000 <br />
                </div>
                <div class="text-green text-bold text-italic">
                  36 x 3000 sin interes <br />
                  <span class="material-icons"> bolt </span> FULL <br />
                </div>
                Envio Gratis Full <br />
                Pack de coca cola sin azucar<br />
              </div>

              <div class="text-center">
                <q-btn
                  no-caps
                  label="Agregar al carrito"
                  class="glossy"
                  dark
                  rounded
                  color="blue-10"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="row q-pa-md">
        <q-card flat bordered class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <q-card-section>
            <div class="column">
              <q-img
                :src="'https://http2.mlstatic.com/D_NQ_NP_776345-MLA48380834661_112021-OO.webp'"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="row q-pa-md">
        <q-card bordered class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <q-card-section>
            <div class="colum">
              <q-img
                :src="'https://http2.mlstatic.com/D_NQ_NP_990311-MLA48535858147_122021-B.webp'"
              />
            </div>
          </q-card-section>
        </q-card>
        <q-space> </q-space>
        <q-card bordered class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <q-card-section>
            <div class="column">
              <q-img
                :src="'https://http2.mlstatic.com/D_NQ_NP_914180-MLA48535525911_122021-B.webp'"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="row q-pa-md">
        <q-card bordered class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <q-card-section>
            <div class="colum">
              <q-img
                :src="'https://http2.mlstatic.com/D_NQ_NP_769545-MLA48354116037_112021-OO.webp'"
              />
            </div>
          </q-card-section>
        </q-card>
        <q-space> </q-space>
        <q-card class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <q-card-section>
            <div class="column">
              <q-img
                :src="'https://http2.mlstatic.com/D_NQ_NP_949606-MLA48678896399_122021-OO.webp'"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-md">
          <div class="column text-center text-bold">
            BUSCA POR LOS PASILLOS <br />
          </div>
        </div>
      </div>
      <div class="row q-pa-md">
        <q-card bordered class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <q-card-section>
            <div class="colum text-center text-bold">
              <q-img
                :src="'https://http2.mlstatic.com/D_NQ_NP627857-MLA47694800310_092021-B.webp'"
              />
              Cuidado personal
            </div>
          </q-card-section>
        </q-card>
        <q-space> </q-space>
        <q-card bordered class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <q-card-section>
            <div class="column text-center text-bold">
              <q-img
                :src="'https://http2.mlstatic.com/D_NQ_NP948880-MLA47694783370_092021-B.webp'"
              />
              Bebe
            </div>
          </q-card-section>
        </q-card>
        <q-space> </q-space>
        <q-card bordered class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <q-card-section>
            <div class="column text-center text-bold">
              <q-img
                :src="'https://http2.mlstatic.com/D_NQ_NP976293-MLA47694800337_092021-B.webp'"
              />
              Cuidado del hogar
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="row q-pa-md">
        <q-card bordered class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <q-card-section>
            <div class="colum text-center text-bold">
              <q-img
                :src="'https://http2.mlstatic.com/D_NQ_NP857588-MLA47694783435_092021-B.webp'"
              />
              Bebidas
            </div>
          </q-card-section>
        </q-card>
        <q-space> </q-space>
        <q-card bordered class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <q-card-section>
            <div class="column text-center text-bold">
              <q-img
                :src="'https://http2.mlstatic.com/D_NQ_NP759402-MLA47694904006_092021-B.webp'"
              />
              Despensa
            </div>
          </q-card-section>
        </q-card>
        <q-space> </q-space>
        <q-card bordered class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <q-card-section>
            <div class="column text-center text-bold">
              <q-img
                :src="'https://http2.mlstatic.com/D_NQ_NP787456-MLA47694783415_092021-B.webp'"
              />
              Mascotas
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="row q-pa-md">
        <q-card
          v-for="(task, index) in tasks"
          :key="index"
          bordered
          class="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-xs-12"
        >
          <q-card-section>
            <div class="column q-pa-md">
              <q-img :src="RetornarImagen(index)" />
              <div class="text-bold q-pa-md">
                <div class="text-h6">
                  $ 110.000
                </div>
                <div class="text-green text-italic">
                  25% OFF <br> Envio gratis <span class="material-icons"> bolt </span> FULL <br />
                </div>
                Pack de coca cola sin azucar<br />
              </div>

              <div class="text-center">
                <q-btn
                  no-caps
                  label="Agregar al carrito"
                  class="glossy"
                  dark
                  rounded
                  color="blue-10"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-md">
          <div class="column text-center text-bold">
            DESCUBRE LAS MEJORES MARCAS <br />
          </div>
        </div>
      </div>

      <div class="row q-pa-md">
        <q-card bordered class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
          <q-card-section>
            <q-btn
              v-for="(task, index) in imagenes"
              :key="index"
              round
              class="q-pa-md"
            >
              <q-avatar size="60px">
                <q-img :src="RetornarMarca(index)" />
              </q-avatar>
            </q-btn>
            <q-btn @click="MostrarMas()" round>
              <q-avatar size="20px">
                <img
                  src="https://www.seekpng.com/png/small/28-284322_flecha-blanca-png-flechas-de-slider-png.png"
                />
              </q-avatar>
            </q-btn>
          </q-card-section>
        </q-card>
      </div>

      <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-md">
          <div class="column">
            EL EXCESO DE ALCOHOL ES PERJUDICIAL PARA LA SALUD. PROHÍBASE EL
            EXPENDIO DE BEBIDAS EMBRIAGANTES A MENORES DE EDAD. Imágenes de
            referencia. Los productos y ofertas están a cargo y responsabilidad
            de cada usuario vendedor. Unidades sujetas a disponibilidad de los
            productos ofertados según las condiciones establecidas en los
            anuncios publicados en el sitio web. El envío gratis está sujeto al
            peso, precio y la distancia del envío.
          </div>
        </div>
      </div>
    </div>

    <div class="col-xl-1 col-lg-1 col-md-0 col-sm-0 col-xs-0"></div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      tasks: [
        {
          titulo: "Computador portatil",
          subtitulo: "Vendido por: barak team",
          precio: 10,
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_997368-MCO48125435932_112021-P.webp",
        },
        {
          titulo: "Plantas",
          subtitulo: "Plantas",
          precio: 2,
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_669103-MCO48484083433_122021-P.webp",
        },
        {
          titulo: "Escritorio",
          subtitulo: "Escritorio",
          precio: 4,
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_771852-MCO48455502363_122021-P.webp",
        },
        {
          titulo: "Plantas",
          subtitulo: "Plantas",
          precio: 2,
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_910770-MCO47770328187_102021-P.webp",
        },
      ],
      imagenes: [
        {
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_686520-MLA47385034496_092021-G.webp",
        },
        {
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_842497-MLA43251314697_082020-G.webp",
        },
        {
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_821085-MLA46105264603_052021-G.webp",
        },
        {
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_829165-MLA47385097094_092021-G.webp",
        },
        {
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_663818-MLA47385079288_092021-G.webp",
        },
        {
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_709166-MLA46139531028_052021-G.webp",
        },
        {
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_709166-MLA46139531028_052021-G.webp",
        },
        {
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_911926-MLA47385097116_092021-G.webp",
        },
      ],
    };
  },
  methods: {
    RetornarImagen(id) {
      return this.tasks[id].imagen;
    },
    RetornarMarca(id) {
      return this.imagenes[id].imagen;
    },
    MostrarMas() {
      this.$set(
        this.imagenes[0].imagen,
        "https://http2.mlstatic.com/D_Q_NP_911926-MLA47385097116_092021-G.webp"
      );
      this.$set(
        this.imagenes[1].imagen,
        "https://http2.mlstatic.com/D_Q_NP_709166-MLA46139531028_052021-G.webp"
      );
      this.$set(
        this.imagenes[2].imagen,
        "https://http2.mlstatic.com/D_Q_NP_663818-MLA47385079288_092021-G.webp"
      );
      this.$set(
        this.imagenes[3].imagen,
        "https://http2.mlstatic.com/D_Q_NP_829165-MLA47385097094_092021-G.webp"
      );
      this.$set(
        this.imagenes[4].imagen,
        "https://http2.mlstatic.com/D_Q_NP_821085-MLA46105264603_052021-G.webp"
      );
      this.$set(
        this.imagenes[5].imagen,
        "https://http2.mlstatic.com/D_Q_NP_911926-MLA47385097116_092021-G.webp"
      );
      this.$set(
        this.imagenes[6].imagen,
        "https://http2.mlstatic.com/D_Q_NP_911926-MLA47385097116_092021-G.webp"
      );
      this.$set(
        this.imagenes[7].imagen,
        "https://http2.mlstatic.com/D_Q_NP_911926-MLA47385097116_092021-G.webp"
      );
    },
  },
};
</script>

