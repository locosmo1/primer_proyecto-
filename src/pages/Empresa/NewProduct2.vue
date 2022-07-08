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
            color="blue"
          />

          <q-separator />

          <q-field color="blue" class="q-pa-md" rounded outlined stack-label>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                Digite la descripcion
              </div>
            </template>
          </q-field>

          <q-editor
            toolbar-rounded
            color="info"
            class="q-pa-md"
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
            label="Digite el Precio"
            color="blue"
          />

          <q-separator />

          <q-input
            class="q-pa-md"
            v-model="cantidad"
            label="Digite la cantidad"
            color="blue"
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
            color="blue"
          />

          <q-separator />

          <form enctype="multipart/form-data" novalidate v-if="formulario">
            <div class="dropbox">
              <input
                type="file"
                multiple
                accept="image/*"
                class="input-file"
                @change="iniciarCarga($event)"
              />
              <p>
                {{ mensaje }}
              </p>
            </div>
          </form>

          <q-separator />

          <!-- pintar las imagenes cargadas -->
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
                      @click="anadirTarea()"
                      class="glossy"
                      dark
                      rounded
                      color="blue-7"
                      label="x"
                      size="xs"
                    />
                  </q-img>
                </q-card>
              </div>
            </q-card-section>
          </q-card>
          <!-- pintar las imagenes cargadas -->

          <q-btn
            @click="anadirTarea()"
            class="glossy"
            dark
            rounded
            color="blue-7"
            label="Guardar"
          />

          <q-separator />

          <q-separator />
        </q-card>
      </div>
    </div>
    <div class="col-xl-3 col-lg-3 col-md-2 col-sm-2 col-xs-0 q-pa-md"></div>
  </div>
</template>

<script>
import { initializeApp } from "firebase/app";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  props: {},
  data() {
    return {
      files: [{}],
      urlImagen: [],
      editedItem: {
        titulo: "",
        descripcion: "",
        precio: "",
        cantidad: "",
        color: "",
      },
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
      formulario: true,
      mensaje:
        "Arrastra tus archivos aqui para comenzar o haga clic para navegar",
    };
  },
  mounted() {
    this.iniciarFirebase();
  },

  methods: {
    iniciarCarga(evento) {
      this.files = evento.target.files;
      this.pintarImagenes();
    },

    pintarImagenes() {
      for (let index = 0; index < this.files.length; index++) {
        if (this.imagenCumpleRequisitos(index)) {
          const reader = new FileReader();
          reader.readAsDataURL(this.files[index]);
          reader.onload = (e) => {
            this.urlImagen.push(e.target.result);
          };
        }
      }
    },

    pintarImagen(index) {
      if (this.imagenCumpleRequisitos(index)) {
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
    imagenCumpleRequisitos(index) {
      let imagen = this.files[index];
      let valido = false;
      let tamanoMaximo = 2000000; //2 mbs
      let tamanoMinimo = 60000; //60 kb
      if (imagen.type === "image/png") {
        if (imagen.size >= tamanoMinimo && imagen.size <= tamanoMaximo) {
          valido = true;
        }
      }
      return valido;
    },

    subirImagenes() {
      const storage = getStorage();

      let nuevo = [];

      for (let index = 0; index < this.files.length; index++) {
        if (this.imagenCumpleRequisitos(index)) {
          nuevo.push(this.files[index]);
        }
      }

      for (let index = 0; index < nuevo.length; index++) {
        /** @type {any} */
        const metadata = {
          contentType: nuevo.type,
        };

        let direccion = "images/" + index + "/";
        const storageRef = ref(storage, direccion + this.files[index].name);
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
              console.log("Upload is " + progress + "% done");

              switch (snapshot.state) {
                case "paused":
                  console.log("la Carga esta pausada");
                  break;
                case "running":
                  console.log("la Carga se esta ejecutando");
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
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log("File available at", downloadURL);
              });
            }
          );
        } catch (error) {
          console.log(error + ": general");
        }
      }
    },

    /* iniciarFirebase() {
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

    subirCorreoContraseñaFirebase() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
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

    anadirTarea() {
      //Se suben las imagenes al servidor de firebase
      this.subirImagenes();

      /* if (
        this.editedItem.titulo !== "" &&
        this.editedItem.precio != "" &&
        this.url_image != ""
      ) {
        let precio_v = parseInt(this.editedItem.precio);
        const data = {
          Id: this.tasks.length + 1,
          urlImagen: this.url_image,
          nombre: this.editedItem.titulo,
          precio: precio_v,
        };

        fetch("https://localhost:44370/api/prueba", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response) //.json()
          .then((data) => {
            //console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error EN FETCH:", error);
          });

        let nueva = {
          titulo: this.editedItem.titulo,
          precio: precio_v,
          imagen: this.url_image,
        };
        this.tasks.push(nueva);
        this.editar = false;
      } */
    },
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
