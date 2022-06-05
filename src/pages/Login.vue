<template>
  <!-- fontawesomeicons -->
  <div class="row" style="background-color: #283593">
    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12"></div>
    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
      <q-card class="q-pa-md entrar">
        <div class="text-right">
          <!-- crear un nuevo boton para cambiar los colores de la vista -->
          <q-btn
            no-caps
            dense
            class="q-pa-xs"
            color="botones"
            @click="showAllCookies()"
            icon="account_circle"
          />
        </div>

        <div class="row">&nbsp;&nbsp;&nbsp;</div>
        <div class="row">&nbsp;&nbsp;&nbsp;</div>
        <div class="q-pa-md text-center text-white text-h6">
          Bienvenido <br />
        </div>
        <div class="row">&nbsp;&nbsp;&nbsp;</div>
        <div class="row">
          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-0 col-xs-0"></div>
          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <q-input
              class="q-pa-xs"
              color="white"
              rounded
              outlined
              v-model="user"
              label="Usuario"
              clearable
              dense
              type="email"
            />
          </div>
          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-0 col-xs-0"></div>
        </div>

        <div class="row">&nbsp;&nbsp;&nbsp;</div>
        <div class="row">
          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-0 col-xs-0"></div>
          <div
            class="
              col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12
              justify-center
              items-center
              content-center
              text-center
            "
          >
            <q-input
              class="
                q-pa-xs
                justify-center
                items-center
                content-center
                text-center
              "
              color="white"
              rounded
              outlined
              v-model="pass"
              label="Contraseña"
              :type="ispassword ? 'password' : 'text'"
              clearable
              dense
            >
              <template v-slot:append>
                <q-icon
                  :name="ispassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="ispassword = !ispassword"
                />
              </template>
            </q-input>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-0 col-xs-0"></div>
        </div>

        <div class="row">&nbsp;&nbsp;&nbsp;</div>

        <!-- :src="urlImageGoogle"
          style="height: 40px; width: 40px" -->
        <!-- Recordarme y olvide mi contraseña -->
        <div class="row">
          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-0 col-xs-0"></div>

          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <div class="row">
              <div
                class="
                  col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12
                  text-blue text-left
                "
              >
                <q-item-section>
                  <q-item-label>Recordarme</q-item-label>
                  <q-checkbox
                    dense
                    v-model="recordar"
                    val="teal"
                    color="teal"
                  />
                </q-item-section>
              </div>
              <div
                class="
                  col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12
                  text-right
                "
              >
                <q-btn
                  no-caps
                  dense
                  class="q-pa-xs"
                  color="botones"
                  label="Olvide mi contraseña"
                  @click="ingresarConCorreo()"
                  icon="lock_open"
                />
              </div>
            </div>
          </div>

          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-0 col-xs-0"></div>
        </div>

        <div class="row">&nbsp;&nbsp;&nbsp;</div>

        <div class="row">
          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-0 col-xs-0"></div>

          <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <div class="row">
              <div class="row">&nbsp;&nbsp;&nbsp;</div>
              <!-- Entrar -->
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="column">
                  <q-btn
                    dense
                    no-caps
                    class="text-center q-pa-xs"
                    color="info"
                    label="Entrar"
                    @click="ingresarConCorreo()"
                    icon="login"
                  />
                </div>
              </div>

              <div class="row">&nbsp;&nbsp;&nbsp;</div>

              <!-- Entrar como Empresa -->
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="column">
                  <q-btn
                    dense
                    no-caps
                    class="text-center q-pa-xs"
                    color="info"
                    label="Registrarme"
                    @click="modalRegistro = true"
                    icon="people_alt"
                  />
                  <q-dialog v-model="modalRegistro">
                    <q-card class="entrar">
                      <!-- Boton de salir(X) -->
                      <div class="text-right">
                        <!-- crear un nuevo boton para cambiar los colores de la vista -->
                        <q-btn
                          no-caps
                          dense
                          class="q-pa-xs"
                          color="botones"
                          @click="modalRegistro = false"
                          label="X"
                          size="sm"
                        />
                      </div>

                      <div class="q-pa-md text-center text-white text-h6">
                        Registro <br />
                      </div>
                      <q-input
                        class="q-pa-md text-white"
                        v-model="editedItem.correoElectronico"
                        label="Digite su correo electronico"
                        color="white"
                        rounded
                        outlined
                        clearable
                        dense
                      >
                      </q-input>
                      <q-input
                        class="
                          q-pa-md
                          justify-center
                          items-center
                          content-center
                          text-center text-white
                        "
                        color="white"
                        rounded
                        outlined
                        v-model="pass"
                        label="Digite su contraseña"
                        :type="ispassword ? 'password' : 'text'"
                        clearable
                        dense
                      >
                        <template v-slot:append>
                          <q-icon
                            :name="ispassword ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="ispassword = !ispassword"
                          />
                        </template>
                      </q-input>

                      <q-input
                        class="q-pa-md text-white"
                        v-model="editedItem.telefono"
                        label="Digite su numero de telefono"
                        color="white"
                        type="number"
                        rounded
                        outlined
                        dense
                      >
                      </q-input>

                      <div class="row"></div>
                      <div class="row"></div>
                      <div
                        class="column q-pa-md text-center text-black text-h6"
                      >
                        <q-btn
                          dense
                          no-caps
                          class="text-center q-pa-xs"
                          color="info"
                          label="Registrarme"
                          @click="registro()"
                          icon="people_alt"
                        />
                      </div>
                    </q-card>
                  </q-dialog>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-0 col-xs-0"></div>
        </div>

        <div class="row">&nbsp;&nbsp;&nbsp;</div>
        <div class="row">&nbsp;&nbsp;&nbsp;</div>
      </q-card>
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
      <div class="row">&nbsp;&nbsp;&nbsp;</div>
    </div>
    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12"></div>
  </div>
</template>




<script>
/* import { initializeApp } from "firebase/app"; */

import { signInWithEmailAndPassword } from "firebase/auth";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import {
  setPersistence,
  inMemoryPersistence,
  signInWithRedirect,
  browserSessionPersistence,
} from "firebase/auth";

import { onAuthStateChanged } from "firebase/auth";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { Cookies } from "quasar";

export default {
  data() {
    return {
      user: "",
      pass: "",
      urlImageGoogle: "https://cdn-icons-png.flaticon.com/512/270/270014.png",
      recordar: "true",
      tienda: {},
      modalRegistro: false,
      ispassword: true,
      contraseñaCifrada: "",
      urlBase: "https://localhost:44370/api/prueba/",
      editedItem: {
        correoElectronico: "",
        contraseña: "",
        telefono: "",
      },
    };
  },
  created() {
    this.$store.dispatch("iniciarFirebaseAction");
    if (this.usuarioAccedioCorrectamente()) {
      this.$router.push("/Index");
    }
  },

  methods: {
    async registro() {
      //cerrar el modal
      this.modalRegistro = false;
      let respuesta;

      let url = this.urlBase + "guardarUsuario";

      const usuario = {
        idUsuario: 0,
        usuario: this.editedItem.correoElectronico,
        contraseña: this.pass,
        celular: this.editedItem.telefono,
        idRol: 1,
      };

      try {
        //Sirve
        fetch(url, {
          method: "POST",
          body: JSON.stringify(usuario),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => (respuesta = res))
          .catch((error) => console.error("Error en fetch:", error))
          .then(function (response) {
            //contraseñaCifrada = response;
          });
      } catch (error) {
        console.log("error en fetch", error);
      }

      console.log("contraseña: ", this.pass);
      let contraseñaCifrada = await this.obtenerContraseñaCifrada(this.pass);
      console.log({ contraseñaCifrada });

      //const auth = getAuth();
      try {
        createUserWithEmailAndPassword(
          this.$store.state.auth,
          this.editedItem.correoElectronico,
          contraseñaCifrada
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            // ..
          });
      } catch (error) {
        console.log(error);
      }
    },

    async obtenerContraseñaCifrada(pass) {
      //Obtener contraseña cifrada
      let url = "https://localhost:44370/api/prueba/obtenerContraseña";

      const informacion = await fetch(url, {
        method: "POST",
        body: JSON.stringify(pass),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const contraseñaCifrada = await informacion.json();
      return contraseñaCifrada;
    },

    async ingresarConCorreo() {
      let contraseñaCifrada = await this.obtenerContraseñaCifrada(this.pass);

      const auth = this.$store.state.auth;
      let promesa;
      try {
        promesa = await setPersistence(auth, browserSessionPersistence)
          .then(() => {
            return signInWithEmailAndPassword(
              auth,
              this.user,
              contraseñaCifrada
            );
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
      } catch (error) {
        console.log("Error general: " + error);
      } finally {
        if (promesa !== undefined) {
          //Diferenciar entre Cliente y Empresa
          let usuario = {
            usuario: this.user,
            contraseña: this.pass,
          };
          let respuesta = await this.enviarPeticionRespuesta(
            "https://localhost:44370/api/prueba/iniciarSesion",
            "POST",
            usuario
          );

          /**
           * ? if the response is 1 then it is a client
           * ? else if it is 2 is a company
           * ? else if it is 3 then it is a admin
           * ? else if it is 4 then it is a employee */

          if (respuesta === 1) {
            console.log("Login as Client");
            this.$router.replace({ path: "/Index" }).catch(() => {});
          } else if (respuesta === 2) {
            console.log("Login as Company");
            this.$router.replace({ path: "/Publicaciones" }).catch(() => {});
          } else if (respuesta === 3) {
            console.log("Login as Admin");
            this.$router.replace({ path: "/Principal" }).catch(() => {});
          } else if (respuesta === 4) {
            console.log("Page Employee In construction");
            //this.$router.replace({ path: "/Index" }).catch(() => {});
          }
        }
      }
      this.user = "";
      this.pass = "";
    },

    async enviarPeticion(url, method, body) {
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

    async enviarPeticionRespuesta(url, method, body) {
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

    async loginGoogle() {
      const auth = this.$store.state.auth;
      let firebase = this.$store.state.app;
      const provider = new GoogleAuthProvider();
      let promesa;

      if (this.usuarioAccedioCorrectamente()) {
        this.$router.replace({ path: "/Index" }).catch(() => {});
      } else {
        try {
          promesa = await setPersistence(auth, browserSessionPersistence)
            .then(() => {
              return signInWithPopup(auth, provider);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorMessage);
            });
        } catch (error) {
          console.log(error);
        } finally {
          if (promesa !== undefined) {
            //displayName, email, photoURL, uid, providerData
            this.$store.state.usuario = promesa.user;

            this.$router.replace({ path: "/Index" }).catch(() => {});
          }
        }
      }
      this.ingresarConApi();
    },

    cerrarSesion() {
      signOut(this.$store.state.auth)
        .then(() => {
          //this.Response.Cookies.Delete("session");
          console.log("Sesion cerrada");
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    },

    usuarioAccedioCorrectamente() {
      //const auth = getAuth();
      let accedio = false;
      onAuthStateChanged(this.$store.state.auth, (user) => {
        if (user) {
          const uid = user.uid;
          accedio = true;
        }
      });
      return accedio;
    },

    showAllCookies() {
      const cookies = process.env.SERVER
        ? Cookies.parseSSR(ssrContext)
        : Cookies.getAll(); // otherwise we're on client
      console.log(process.env.SERVER);
    },

    showNotif() {
      const $q = useQuasar();
      $q.notify({
        message: "Mensaje push",
        color: "blue-6",
      });
    },

    ingresarConApi() {
      //enviar datos con el metodo PUT de fetch
      let data;
      var url = "https://localhost:44370/api/prueba/loginCliente";
      let cliente = {
        correoElectronico: this.user, //gaitan2266@hotmail.com
        contraseña: this.pass, //54784946
      };

      fetch(url, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(cliente), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => (data = res.json()))
        .catch((error) => console.error("Error en la matriz:", error))
        .then((response) => {
          if (response) {
            this.$store.nombre = cliente.usuario;
            //this.$router.push("/Index");
          } else {
            console.log("Usuario o contraseña incorrectos");
          }
        });
    },
  },
};
</script>

<style scoped>
.entrar {
  background: #3f51b5;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 1);
}
</style>
