<template>
  <q-layout view="hHh lpR fFf">
    <div class="row">
      <q-header
        reveal
        bordered
        elevated
        class="text-black q-py-xs"
        height-hint="60"
      >
        <q-toolbar>
          <div class="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-xs-4">
            <q-btn @click="IrHome()" flat no-caps class="q-ml-xs logo">
              <q-icon color="red" size="28px" />
              <q-toolbar-title class="text-bold">
                <q-avatar logo>
                  <img
                    src="https://http2.mlstatic.com/static/org-img/homesnw/mercado-libre.png?v=2"
                  />
                </q-avatar>
                mercado libre
              </q-toolbar-title>
            </q-btn>
          </div>

          <div class="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-xs-4">
            <div class="GPLAY__toolbar-input-container row">
              <q-input
                dense
                outlined
                square
                placeholder="Buscar"
                class="bg-white col buscar"
              />
              <q-btn
                class="YL__toolbar-input-btn buscar"
                color="grey-3"
                text-color="grey-8"
                icon="search"
                unelevated
              />
            </div>
          </div>

          <q-space />

          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-4 col-xs-4">
            <div class="row">
              <!-- Nuevo Codigo de forma horizontal -->
              <div class="row q-pa-md">
                <div class="opciones">
                  <q-btn-dropdown
                    rounded
                    color="blue-7"
                    label="JHONATAN STIWAR"
                  >
                    <div class="column justify-center">
                      <q-btn
                        @click="IrPublicaciones()"
                        rounded
                        color="blue-7"
                        label="Publicaciones"
                        push
                        size="sm"
                        v-close-popup
                      />
                    </div>
                  </q-btn-dropdown>

                  <q-btn
                    class="glossy"
                    dark
                    dense
                    rounded
                    color="blue-7"
                    label="Mis compras"
                    @click="AbrirCompras()"
                  >
                    <q-tooltip>Mis compras</q-tooltip>
                  </q-btn>

                  <q-btn
                    class="glossy"
                    dark
                    dense
                    rounded
                    color="blue-7"
                    label="Favoritos"
                  >
                    <q-tooltip>Favoritos</q-tooltip>
                  </q-btn>

                  <q-btn round color="blue-7" icon="notifications">
                    <q-tooltip>Notificaciones</q-tooltip>
                  </q-btn>

                  <q-btn
                    round
                    color="blue-7"
                    icon="shopping_cart"
                    @click="IrCarrito()"
                  >
                    <q-tooltip>Ir al carrito</q-tooltip>
                  </q-btn>

                  <!-- Boton con icono de cerrar sesion -->
                  <q-btn
                    round
                    color="blue-7"
                    icon="exit_to_app"
                    @click="cerrarSesion()"
                  >
                    <q-tooltip>Cerrar sesion</q-tooltip>
                  </q-btn>
                </div>

                <!-- Forma responsive -->
                <div class="buscar-2">
                  <q-btn-dropdown
                    v-model="BotonResponsive"
                    icon="list"
                    rounded
                    color="blue-7"
                  >
                    <div class="column bg-blue-7">
                      <q-btn-dropdown
                        v-model="BotonResponsive2"
                        rounded
                        color="blue-7"
                        label="JHONATAN STIWAR"
                      >
                        <div class="column justify-center bg-blue-7">
                          <q-btn
                            rounded
                            color="blue-7"
                            label="Publicaciones"
                            push
                            size="sm"
                            v-close-popup
                          >
                            <q-tooltip>Publicaciones</q-tooltip>
                          </q-btn>
                        </div>
                      </q-btn-dropdown>

                      <q-btn class="glossy" dark dense rounded color="blue-7">
                        <span style="size=48dp" class="material-icons">
                          shopping_cart
                        </span>
                        <q-tooltip>Mis compras</q-tooltip>
                      </q-btn>

                      <q-btn
                        class="glossy"
                        icon="favorite"
                        dark
                        dense
                        rounded
                        color="blue-7"
                      >
                        <q-tooltip>Favoritos</q-tooltip>
                      </q-btn>

                      <q-btn
                        class="glossy"
                        icon="notifications"
                        dark
                        dense
                        rounded
                        color="blue-7"
                      >
                        <q-tooltip>Notificaciones</q-tooltip>
                      </q-btn>

                      <q-btn
                        class="glossy"
                        icon="store"
                        dark
                        dense
                        rounded
                        color="blue-7"
                        @click="IrCarrito()"
                      >
                        <q-tooltip>Ir al carrito</q-tooltip>
                      </q-btn>
                    </div>
                  </q-btn-dropdown>
                </div>
                <!-- Forma responsive-->
              </div>
              <!-- Nuevo Codigo de forma horizontal -->
            </div>
          </div>
        </q-toolbar>
      </q-header>
    </div>
    <!-- 
    <header>
      <div class="menu_bar" @click="ocultar()">
        <a href="#" class="bt-menu"><span class="icon-list2"></span>Menu</a>
      </div>

      <nav class="menu">
        <ul>
          <li>
            <a href="#"><span class="icon-house"></span>Inicio</a>
          </li>
          <li>
            <a href="#"><span class="icon-suitcase"></span>Trabajos</a>
          </li>
          <li>
            <a href="#"><span class="icon-rocket"></span>Proyectos</a>
          </li>
          <li>
            <a href="#"><span class="icon-earth"></span>Servicios</a>
          </li>
          <li>
            <a href="#"><span class="icon-mail"></span>Contactos</a>
          </li>
        </ul>
      </nav>
    </header> -->

    <!-- <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header> -->

    <!-- <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="200"
      :breakpoint="500"
      bordered
      class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list padding>

          <q-separator />

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section> Inbox </q-item-section>
          </q-item>

          <q-separator />

          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section> Star </q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>

            <q-item-section> Send </q-item-section>
          </q-item>

          <q-separator />

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="drafts" />
            </q-item-section>

            <q-item-section> Drafts </q-item-section>
          </q-item>

        <q-separator />

        </q-list>
      </q-scroll-area>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "MainLayout",
  data() {
    return {
      BotonResponsive: false,
      BotonResponsive2: false,
      leftDrawerOpen: true,
      drawer: false,
      miniState: true,
      contador: 1,
    };
  },

  created() {
    this.$store.dispatch("iniciarFirebaseAction"); //Inicar Firebase
  },

  methods: {
    borrarCookies() {
      var cookies = document.cookie.split(";");

      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    },

    IrPublicaciones() {
      this.$router.replace({ path: "Publicaciones" });
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

    AbrirCompras() {
      this.$router.replace({ path: "compras" });
    },

    ocultar() {
      if (this.contador == 1) {
        document.querySelector("nav").animate(
          [
            // keyframes
            { transform: "translateX(0%)" },
          ],
          {
            // timing options
            duration: 1000,
            iterations: 1,
          }
        );
        this.contador = 0;
      } else {
        this.contador = 1;
        document.querySelector("nav").animate(
          [
            // keyframes
            { transform: "translateX(-100%)" },
          ],
          {
            // timing options
            duration: 1000,
            iterations: 1,
          }
        );
      }
    },

    toggleLeftDrawer() {
      this.leftDrawerOpen = this.leftDrawerOpen ? false : true;
      return this.leftDrawerOpen;
    },
    IrCarrito() {
      this.$router.replace({ path: "carrito" });
    },
    IrHome() {
      this.$router.replace({ path: "/" });
    },
  },
};
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
}

header {
  width: 100%;
}

header nav {
  width: 100%;
  max-width: 1000px;
  margin: 20px auto;
  background: #024959;
}

.menu_bar {
  display: none;
}

header nav ul {
  overflow: hidden;
  list-style: none;
}

header nav ul li {
  float: left;
}

header nav ul li a {
  color: rgb(255, 255, 255);
  padding: 20px;
  display: block;
  text-decoration: none;
}

header nav ul li span {
  margin-right: 10px;
}

header nav ul li a:hover {
  background: #037e8c;
}

section {
  padding: 20px;
}

.logo {
  display: block;
}

.buscar {
  display: block;
}

.buscar-2 {
  display: none;
}

.opciones {
  display: block;
}

@media screen and (max-width: 1025px) {
  .logo {
    display: none;
  }

  .buscar {
    display: none;
  }

  .buscar-2 {
    display: block;
  }

  .opciones {
    display: none;
  }

  header nav {
    width: 80%;
    height: 100%;
    left: -100%;
    margin: 0;
    position: fixed;
  }

  header nav ul li {
    display: block;
    float: none;
    border-bottom: 1px solid rgba(2, 63, 153, 0.3);
  }

  .menu_bar {
    display: block;
    width: 100%;
    background: #ccc;
  }

  .menu_bar .bt-menu {
    display: block;
    padding: 20px;
    background: #095263;
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    font-size: 25px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .menu_bar span {
    float: right;
    font-size: 40px;
  }
}
</style>