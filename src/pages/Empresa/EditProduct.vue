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
            Editar Producto
          </div>

          <q-separator />

          <q-input
            class="q-pa-md"
            v-model="editedItem.titulo"
            label="Añade un Titulo"
            color="blue-7"
          />

          <q-separator />

          <q-editor
            toolbar-rounded
            class="q-pa-md"
            color="blue-7"
            v-model="editedItem.descripcion"
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
            color="blue-7"
          />

          <q-separator />

          <q-input
            class="q-pa-md"
            v-model="editedItem.cantidad"
            label="Digite la cantidad"
            color="blue-7"
          />

          <q-separator />

          <q-select
            class="q-pa-md"
            filled
            v-model="editedItem.color"
            :options="opcionesColor"
            label="Escoja el Color: "
            stack-label
            :dense="dense"
            :options-dense="denseOpts"
            color="blue-7"
          />

          <q-separator />

          <q-select
            class="q-pa-md"
            filled
            v-model="editedItem.idCategoria"
            :options="opcionesCategoria"
            label="Seleccione la Categoria: "
            stack-label
            :dense="dense"
            :options-dense="denseOpts"
            color="blue"
          />

          <q-separator />

          <q-btn
            @click="EditarItem()"
            class="glossy"
            dark
            rounded
            label="Modificar"
            color="blue-7"
          />

          <q-separator />
        </q-card>
      </div>
    </div>
    <div class="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-0 q-pa-md"></div>
  </div>
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";

export default {
  props: {},
  data() {
    return {
      cantidad: undefined,
      color: "",

      dense: false,
      denseOpts: false,
      descripcion: "",
      producto: {},
      opcionesCategoria: [
        "Tecnologia",
        "Belleza",
        "Farmacia",
        "Moda",
        "Cocina",
        "Deporte",
      ],
      opcionesColor: [
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
      editedItem: {
        idProducto: 0,
        titulo: "",
        descripcion: "",
        precio: 0,
        cantidad: 0,
        color: "",
        IdCategoria: "",
      },
    };
  },
  created() {
    this.UsuarioAccedioCorrectamente();
    this.producto = this.$route.query.producto;
    console.log(this.producto);
    this.editedItem = this.producto;
  },
  methods: {
    async UsuarioAccedioCorrectamente() {
      //const auth = getAuth();

      onAuthStateChanged(this.$store.state.auth, (user) => {
        if (user) {
          //Dejar entrar si esta autenticado solamente como administrador
          //Consultar a usuarioActual desde el backend para saber si es
          //administrador
          this.ObtenerUsuarioActual();
        } else {
          if (this.$route.path !== "/Login") {
            this.$router.replace("/Login");
          }
        }
      });
    },

    async ObtenerUsuarioActual() {
      let url =
        this.$store.state.urlBackendElegida +
        "api/Usuario/ObtenerUsuarioActual";

      let usuarioActual = await this.EnviarPeticionRespuesta(url, "GET");
      if (usuarioActual.idRol !== 2) {
        if (this.$route.path !== "/") {
          this.$router.replace("/");
        }
      }
    },

    ObtenerIdCategoria(categoria) {
      return categoria === "Tecnologia"
        ? "1"
        : categoria === "Belleza"
        ? "2"
        : categoria === "Farmacia"
        ? "3"
        : categoria === "Moda"
        ? "4"
        : categoria === "Cocina"
        ? "5"
        : "6";
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

    EditarItem() {
      let idCategoria = this.ObtenerIdCategoria(this.editedItem.idCategoria);
      this.editedItem.idCategoria = parseInt(idCategoria);

      this.editedItem.descripcion = this.RemoveTags(
        this.editedItem.descripcion
      );
      console.log(this.editedItem);

      let url = this.$store.state.urlBackendElegida + "api/Producto";

      this.EnviarPeticion(url, "PUT", this.editedItem);
    },

    RemoveTags(html) {
      if (html === null || html === "") return false;
      else html = html.toString();
      return html.replace(/(<([^>]+)>)/gi, "");
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

<style scoped>
.cargador {
  width: 100%;
}
</style>
