<template>
  <div class="row q-pa-md">
    <div class="col-1"></div>
    <div class="col-10">
      <div class="row q-pa-md">
        <div class="col-12 q-pa-md">
          <div class="text-bold text-latin text-h5">TIENDAS OFICIALES</div>
        </div>
      </div>

      <div class="row q-pa-md">
        <q-card bordered class="col text-center q-pa-md">
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
            <q-btn round>
              <q-avatar size="20px">
                <img
                  src="https://www.seekpng.com/png/small/28-284322_flecha-blanca-png-flechas-de-slider-png.png"
                />
              </q-avatar>
            </q-btn>
          </q-card-section>
        </q-card>
      </div>

      <div class="row q-pa-md">
        <q-card bordered class="col-6">
          <q-card-section>
            <div class="column">
              <q-img
                :src="'https://http2.mlstatic.com/D_NQ_NP994471-MLA47051563953_082021-B.webp'"
              />
            </div>
          </q-card-section>
        </q-card>
        <q-card bordered class="col-6">
          <div class="q-card-section">
            <div class="column">
              <q-img
                :src="'https://http2.mlstatic.com/D_NQ_NP844900-MLA47051612768_082021-B.webp'"
              />
            </div>
          </div>
        </q-card>
      </div>

      <div class="row q-pa-md">
        <q-card bordered class="col-4">
          <q-card-section>
            <div class="column text-bold text-center">
              <q-img
                :src="'https://http2.mlstatic.com/D_NQ_NP987051-MLA46979197031_082021-B.webp'"
              />
              <br />Niños
            </div>
          </q-card-section>
        </q-card>
        <q-card bordered class="col-4">
          <q-card-section>
            <div class="column text-bold text-center">
              <q-img
                :src="'https://http2.mlstatic.com/D_NQ_NP707971-MLA46978667791_082021-B.webp'"
              />
              <br />
              Niñas
            </div>
          </q-card-section>
        </q-card>
        <q-card bordered class="col-4">
          <q-card-section>
            <div class="column text-bold text-center">
              <q-img
                :src="'https://http2.mlstatic.com/D_NQ_NP795183-MLA46978667234_082021-B.webp'"
              />
              <br />
              Bebes
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="row q-pa-md">
        <div class="col-12">
          <div class="text-bold text-latin text-h5">BUSCA POR CATEGORIAS</div>
        </div>
      </div>

      <div class="row q-pa-md">
        <q-card
          v-for="(task, index) in imagenes"
          :key="index"
          bordered
          class="col-2 text-center q-pa-md"
        >
          <q-card-section>
            <q-btn round class="q-pa-md" :label="RetornarTitulo(index)">
              <q-avatar size="60px">
                <q-img :src="RetornarCategoria(index)" />
              </q-avatar>
            </q-btn>
          </q-card-section>
        </q-card>
      </div>

      <div class="row q-pa-md">
        <q-card bordered class="col-12">
          <q-card-section>
            <div class="column">
              <q-img
                :src="'https://http2.mlstatic.com/D_NQ_NP_794109-MLA46517661499_062021-OO.webp'"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="row q-pa-md">
        <q-card bordered class="col-12">
          <q-card-section>
            <div class="column">
              <q-img
                :src="'https://http2.mlstatic.com/D_NQ_NP_640625-MLA46304849209_062021-OO.webp'"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="row q-pa-md">
        <q-card bordered class="col-6">
          <q-card-section>
            <div class="column">
              <q-img
                :src="'https://http2.mlstatic.com/D_NQ_NP_669309-MLA46441280957_062021-OO.webp'"
              />
            </div>
          </q-card-section>
        </q-card>
        <q-card bordered class="col-6">
          <q-card-section>
            <div class="column">
              <q-img
                :src="'https://http2.mlstatic.com/D_NQ_NP_905528-MLA46441380758_062021-OO.webp'"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="row q-pa-md">
        <q-card bordered class="col-12">
          <q-card-section>
            <div class="column">
              <q-img
                :src="'https://http2.mlstatic.com/D_NQ_NP_726861-MLA46182834169_052021-OO.webp'"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="row q-pa-md">
        <q-card bordered class="col-6">
          <q-card-section>
            <div class="column">
              <q-img
                :src="'https://http2.mlstatic.com/D_NQ_NP_938152-MLA48427742912_122021-OO.webp'"
              />
            </div>
          </q-card-section>
        </q-card>
        <q-card bordered class="col-6">
          <q-card-section>
            <div class="column">
              <q-img
                :src="'https://http2.mlstatic.com/D_NQ_NP_793191-MLA46991135539_082021-OO.webp'"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="row q-pa-md">
        <q-card bordered class="col-6">
          <q-card-section>
            <div class="column">
              <q-img
                :src="'https://http2.mlstatic.com/D_NQ_NP_649400-MLA43196387834_082020-OO.webp'"
              />
            </div>
          </q-card-section>
        </q-card>
        <q-card bordered class="col-6">
          <q-card-section>
            <div class="column">
              <q-img
                :src="'https://http2.mlstatic.com/D_NQ_NP_837433-MLA48427742926_122021-OO.webp'"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="row q-pa-md">
        <q-card bordered class="col-12">
          <q-card-section>
            <q-img
              :src="'https://http2.mlstatic.com/D_NQ_NP_725145-MLA46981791993_082021-OO.webp'"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="col-1"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imagenes: [
        {
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_878169-MLA44999098186_022021-G.webp",
        },
        {
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_744785-MLA48125889916_112021-G.webp",
        },
        {
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_642977-MLA46850704547_072021-G.webp",
        },
        {
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_902375-MLA43653171307_102020-G.webp",
        },
        {
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_868176-MLA43761512816_102020-G.webp",
        },
        {
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_839843-MLA46819948732_072021-G.webp",
        },
        {
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_652903-MLA46850887090_072021-G.webp",
        },
        {
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_981507-MLA46850760528_072021-G.webp",
        },
      ],

      categorias: [
        {
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_625743-MLA46977850015_082021-G.webp",
          titulo: "Camisetas",
        },
        {
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_649234-MLA46977586995_082021-G.webp",
          titulo: "Pantalones",
        },
        {
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_942729-MLA46977924311_082021-G.webp",
          titulo: "Chaquetas",
        },
        {
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_709279-MLA46977924336_082021-G.webp",
          titulo: "Botas y Botines",
        },
        {
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_943287-MLA46978257041_082021-G.webp",
          titulo: "Tenis",
        },
        {
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_700813-MLA46977924379_082021-G.webp",
          titulo: "Sandalias",
        },
        {
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_902467-MLA47005602227_082021-G.webp",
          titulo: "Moda Intima",
        },
        {
          imagen:
            "https://http2.mlstatic.com/D_Q_NP_895975-MLA46989188519_082021-G.webp",
          titulo: "Joyas y Relojes",
        },
      ],
    };
  },
  methods: {
    RetornarMarca(id) {
      return this.imagenes[id].imagen;
    },
    RetornarCategoria(id) {
      return this.categorias[id].imagen;
    },
    RetornarTitulo(id) {
      return this.categorias[id].titulo;
    },
  },
};
</script>

