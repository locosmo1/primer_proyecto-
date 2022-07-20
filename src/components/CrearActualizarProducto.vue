<template>
  <div class="row">
    <div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-0"></div>
    <div class="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-12">
      <div class="row">
        <q-card
          rounded
          class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-md"
        >
          <q-separator />

          <q-input
            class="q-pa-md"
            v-model="editedItem.titulo"
            label="Añade un Titulo"
            color="blue"
          />

          <q-separator />

          <q-editor
            toolbar-rounded
            color="blue"
            class="q-pa-md"
            v-model="editedItem.descripcion"
            label="Añade una descripcion"
          />

          <q-separator />

          <q-input
            class="q-pa-md"
            v-model="editedItem.precio"
            label="Digite el Precio"
            color="blue"
          />

          <q-separator />

          <q-input
            class="q-pa-md"
            v-model="editedItem.cantidad"
            label="Digite la cantidad"
            color="blue"
          />

          <q-separator />

          <q-select
            class="q-pa-md"
            filled
            v-model="editedItem.color"
            :options="opcionesColor"
            label="Seleccione el Color: "
            stack-label
            :dense="dense"
            :options-dense="denseOpts"
            color="blue"
          />

          <q-separator />

          <q-select
            class="q-pa-md"
            filled
            v-model="editedItem.categoria"
            :options="opcionesCategoria"
            label="Seleccione la Categoria: "
            stack-label
            :dense="dense"
            :options-dense="denseOpts"
            color="blue"
          />

          <q-separator />

          <form v-if="this.crear" enctype="multipart/form-data" novalidate>
            <div class="dropbox">
              <input
                type="file"
                multiple
                accept="image/*"
                class="input-file"
                @change="IniciarCarga($event)"
              />
              <p>
                {{ mensaje }}
              </p>
            </div>
          </form>

          <q-separator />

          <q-card bordered>
            <q-card-section>
              <div class="row items-star q-pa-md">
                <q-card
                  bordered
                  v-for="(task, index) in urlImagen"
                  :key="index"
                  class="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-xs-12 q-pa-md"
                >
                  <q-img :src="task">
                    <q-btn
                      class="glossy"
                      dark
                      rounded
                      color="blue-7"
                      label="x"
                      size="xs"
                      @click="EliminarImagen(index)"
                    />
                  </q-img>
                </q-card>
              </div>
            </q-card-section>
          </q-card>

          <q-btn
            @click="AñadirTarea()"
            class="glossy"
            dark
            rounded
            color="blue-7"
            :label="labelProducto"
            no-caps
          />

          <q-separator />

          <q-separator />
        </q-card>
      </div>
    </div>
    <div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-0"></div>
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
    producto: {
      type: Object,
    },
    usuarioSeleccionado: {
      type: Object,
    },
  },
  data() {
    return {
      labelProducto: "Undefined",
      valor: false,
      files: [{}],
      promesa: {},
      urlImagen: [],
      urlDescarga: [],
      imagenes: [],
      editedItem: {
        titulo: "",
        descripcion: "",
        precio: "",
        cantidad: "",
        color: "",
        categoria: "Tecnologia",
      },
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
      opcionesCategoria: [
        "Tecnologia",
        "Belleza",
        "Farmacia",
        "Moda",
        "Cocina",
        "Deporte",
      ],
      dense: false,
      denseOpts: false,
      formulario: true,
      indice: 0,
      mensaje:
        "Arrastra tus archivos aqui para comenzar o haga clic para navegar. Las imagenes deben ser mayores a 60 Kilobytes y menores a 3 Mbs",
    };
  },
  created() {
    if (this.crear) {
      this.labelProducto = "Crear Producto";
    } else {
      this.labelProducto = "Actualizar Producto";
    }
    //this.labelProducto = this.crear ? "Crear Producto" : "Actualizar Producto";
  },

  mounted() {
    if (this.producto !== undefined) {
      this.editedItem = this.producto;
    }
  },

  methods: {
    EliminarImagen(index) {
      this.urlImagen.splice(index, 1);
    },

    IniciarCarga(evento) {
      this.files = evento.target.files;
      this.PintarImagenes();
    },

    PintarImagenes() {
      for (let index = 0; index < this.files.length; index++) {
        if (this.ImagenCumpleRequisitos(index)) {
          const reader = new FileReader();
          reader.readAsDataURL(this.files[index]);
          reader.onload = (e) => {
            this.urlImagen.push(e.target.result);
          };
        }
      }
    },

    PintarImagen(index) {
      if (this.ImagenCumpleRequisitos(index)) {
        const reader = new FileReader();
        reader.readAsDataURL(this.files[index]);
        reader.onload = (e) => {
          this.urlImagen.push(e.target.result);
        };
      }
    },

    //Este metodo es para saber si una imagen es valida
    //la imagen debe tener una anchura de 1200px y una altura de 600px
    //Su peso debe ser mayor a 60kb y menor a 2mbs
    ImagenCumpleRequisitos(index) {
      let imagen = this.files[index];
      let valido = false;
      let tamanoMaximo = 3100000; //3 mbs
      let tamanoMinimo = 60000; //60 kb
      if (imagen.type === "image/png") {
        if (imagen.size >= tamanoMinimo && imagen.size <= tamanoMaximo) {
          valido = true;
        }
      }
      return valido;
    },

    async ObtenerUsuarioActual() {
      let url =
        this.$store.state.urlBackendElegida +
        "api/Usuario/ObtenerUsuarioActual";

      let usuarioActual = await this.EnviarPeticionRespuesta(url, "GET");

      /* if (usuarioActual.idRol !== 2) {
        if (this.$route.path !== "/Login") {
          this.$router.replace("/Login");
        }
      } */
      return usuarioActual;
    },

    async SubirImagenes() {
      const storage = getStorage();

      let nuevo = [];

      for (let index = 0; index < this.files.length; index++) {
        if (this.ImagenCumpleRequisitos(index)) {
          nuevo.push(this.files[index]);
        }
      }

      let usuarioActual = await this.ObtenerUsuarioActual();
      let idUsuario = usuarioActual.idUsuario;

      let direccionNube = "images/" + idUsuario + "/";
      let indice = 1;

      for (let index = 0; index < nuevo.length; index++) {
        /** @type {any} */
        const metadata = {
          contentType: nuevo.type,
        };

        //this.files[index].name = "Imagen" + (indice+1) + ".png";
        const storageRef = ref(storage, direccionNube + this.files[index].name);
        const uploadTask = uploadBytesResumable(
          storageRef,
          nuevo[index],
          metadata
        );

        try {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Imagen ", index + 1, " Progreso:", progress, "%");

              switch (snapshot.state) {
                case "paused":
                  console.log("la Carga esta pausada");
                  break;
                case "running":
                  //console.log("la Carga se esta ejecutando");
                  break;
              }
            },
            (error) => {
              switch (error.code) {
                case "storage/unauthorized":
                  console.log(error + ": unauthorized");
                  break;
                case "storage/canceled":
                  console.log(error + ": canceled");
                  break;
                case "storage/unknown":
                  console.log(error + ": unknown");
                  break;
              }
            },
            () => {
              let archivo = getDownloadURL(uploadTask.snapshot.ref);

              const promesa = archivo.then((downloadURL) => {
                this.urlDescarga.push(downloadURL);
                this.AnadirImagenApi(downloadURL, nuevo.length);
              });
            }
          );
        } catch (error) {
          console.log(error + ": general");
        }
      }
    },

    async AnadirImagenApi(downloadURL, tamano) {
      let imagen = {
        direccion: downloadURL,
      };
      try {
        if (this.indice > 0) {
          let url =
            this.$store.state.urlBackendElegida + "api/Imagenes/recibirImagen";

          fetch(url, {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(imagen),
          })
            .then((response) => response) //.json()
            .then((data) => {
              //console.log("Success:", data);
            })
            .catch((error) => {
              console.error("Error EN FETCH:", error);
            });
        }
      } catch (error) {
        console.log("Error general: ", error);
      }

      this.indice++;
      if (this.indice == tamano) {
        this.CrearProducto();
        this.indice = 0;
      }
    },

    CrearProducto() {
      const Producto = {
        idProducto: 0,
        imagen: this.urlDescarga[0],
        titulo: this.editedItem.titulo,
        precio: this.editedItem.precio,
        color: this.editedItem.color,
        cantidad: this.editedItem.cantidad,
        descripcion: this.editedItem.descripcion,
        idEmpresa: this.usuarioSeleccionado.idUsuario, //Revisar antes = 0
        idCategoria: this.ObtenerIdCategoria(),
        imagenes: this.urlDescarga,
      };

      //Quitar la primera imagen del array
      //this.urlDescarga.shift();
      let url =
        this.$store.state.urlBackendElegida + "api/Producto";

      this.EnviarPeticion(url, "POST", Producto);
    },

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

    ObtenerIdCategoria() {
      return this.editedItem.categoria === "Tecnologia"
        ? "1"
        : this.editedItem.categoria === "Belleza"
        ? "2"
        : this.editedItem.categoria === "Farmacia"
        ? "3"
        : this.editedItem.categoria === "Moda"
        ? "4"
        : this.editedItem.categoria === "Cocina"
        ? "5"
        : "6";
    },

    async AñadirTarea() {
      //Enlazar la url de cada imagen con el id del usuario que ah ingresado
      //Este enlace debe ser llamado mediante la api fetch
      //Necesitamos el id del usuario que esta logueado
      //El id del usuario se obtiene se obtiene a traves de la store de vue
      if (this.crear) {
        //Crear Producto
        this.SubirImagenes();
      } else {
        //Actualizar producto falta
        this.EditarItem();
      }
    },

    EditarItem() {
      let idCategoria = this.ObtenerIdCategoria(this.editedItem.idCategoria);
      this.editedItem.idCategoria = parseInt(idCategoria);

      let url = this.$store.state.urlBackendElegida + "api/Producto";

      this.EnviarPeticion(url, "PUT", this.editedItem);
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

    /* IniciarFirebase() {
      const firebaseConfig = {
        apiKey: "AIzaSyCzVaDxudQnk2wzAe4m8pF5BtdgGKVsxso",
        authDomain: "buy-online-7b548.firebaseapp.com",
        projectId: "buy-online-7b548",
        storageBucket: "buy-online-7b548.appspot.com",
        messagingSenderId: "472565836098",
        appId: "1:472565836098:web:b1ef86075a6ded313a80db",
        measurementId: "G-M27HCV275E",
      };
      const app = initializeApp(firebaseConfig);
    }, */
  },
};
</script>

<style lang="scss">
.cargador {
  width: 100%;
}

.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
