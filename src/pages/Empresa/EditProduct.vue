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
          Publicacion de un Nuevo Producto
        </div>

        <q-separator />
        
          <q-input
            class="q-pa-md"
            v-model="editedItem.titulo"
            label="Añade un Titulo"
          />

          <q-separator />

          <q-field class="q-pa-md" rounded outlined stack-label>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">Digite la descripcion</div>
            </template>
          </q-field>

          <q-editor toolbar-rounded
          class="q-pa-md"
          color="blue-7"
            v-model="descripcion"
            label="Añade una descripcion"
            :definitions="{
              bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' },
            }"
          />

          <q-separator />

          <q-input
            class="q-pa-md"
            v-model="editedItem.precio"
            label="Añade el Precio"
          />

          <q-separator />

          <q-input
            class="q-pa-md"
            v-model="cantidad"
            label="Digite la cantidad"
          />

          <q-separator />

          <q-select
            class="q-pa-md"
            filled
            v-model="color"
            :options="options"
            label="Escoja el Color: "
            stack-label
            :dense="dense"
            :options-dense="denseOpts"
          />

          <q-separator />

          <q-uploader
            bordered
            class="q-pa-md cargador"
            url="http://localhost:4444/upload"
            multiple
            accept=".jpg, .png, image/*"
            max-files="3"
          />

          <q-separator />

          <q-btn
            @click="EditarItem()"
            class="glossy"
            dark
            rounded
            color="primary"
            label="Modificar"
          />

          <q-separator />

        </q-card>
      </div>
    </div>
    <div class="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-0 q-pa-md"></div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      editedItem: {},
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
  created() {},
  methods: {
    EditarItem() {
      let precio_v;
      let new_item;

      precio_v = parseInt(this.editedItem.precio);
      new_item = {
        titulo: this.editedItem.titulo,
        precio: precio_v,
        imagen: this.url_image,
      };
      Object.assign(this.tasks[this.indice_editar], new_item);
      let indice = this.indice_editar + 1;

      const data = {
        Id: indice,
        urlImagen: this.url_image,
        nombre: this.editedItem.titulo,
        precio: precio_v,
      };

      let url = this.$store.state.urlBackendElegida + "api/prueba"

      fetch(url, {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response) //.json()
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error EN FETCH:", error);
        });
      this.tab = "consultar";
    },
  },
};
</script>

<style scoped>
.cargador {
  width: 100%;
}
</style>
