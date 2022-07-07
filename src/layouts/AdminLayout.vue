<template>
<!-- ctrl+chif+p abrir la consola -->
  <q-layout view="hHh lpR fFf">
    <!-- <div class="row">
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
              <div class="row q-pa-md">
                <div class="opciones">
                  <q-btn-dropdown
                    rounded
                    color="blue-7"
                    label="JHONATAN STIWAR"
                  >
                    <div class="column justify-center">
                      <q-btn
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

                  <q-btn round color="blue-7" icon="shopping_cart">
                    <q-tooltip>Ir al carrito</q-tooltip>
                  </q-btn>

                  <q-btn round color="blue-7" icon="exit_to_app">
                    <q-tooltip>Cerrar sesion</q-tooltip>
                  </q-btn>
                </div>

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
                      >
                        <q-tooltip>Ir al carrito</q-tooltip>
                      </q-btn>
                    </div>
                  </q-btn-dropdown>
                </div>
              </div>
            </div>
          </div>
        </q-toolbar>
      </q-header>
    </div> -->

    <!-- <q-drawer class="q-pa-md" v-model="leftDrawerOpen" show-if-above>
      <div class="q-pa-md" style="max-width: 250px">
        <q-list bordered padding class="rounded-borders text-primary">
          <q-item
            clickable
            v-ripple
            :active="link === 'inbox'"
            @click="link = 'inbox'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>Inbox</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            :active="link === 'outbox'"
            @click="link = 'outbox'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>

            <q-item-section>Outbox</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            :active="link === 'trash'"
            @click="link = 'trash'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="delete" />
            </q-item-section>

            <q-item-section>Trash</q-item-section>
          </q-item>

          <q-separator spaced />

          <q-item
            clickable
            v-ripple
            :active="link === 'settings'"
            @click="link = 'settings'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>

            <q-item-section>Settings</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            :active="link === 'help'"
            @click="link = 'help'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="help" />
            </q-item-section>

            <q-item-section>Help</q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer> -->

    <!-- <q-drawer class="q-pa-md" v-model="leftDrawerOpen" show-if-above>
      <q-list class="q-pa-md">
        <q-separator />
        <q-separator />
        <div class="q-pa-md column">
          <q-btn
            class="q-pa-md"
            align="left"
            label="Productos"
            dark
            icon="web"
            no-caps
          />
        </div>
        <q-separator />
        <q-separator />

        <div class="column">
          <q-btn align="left" label="Dashboard" dark icon="dashboard" no-caps />
        </div>
        <q-separator />
        <q-separator />

        <div class="column">
          <q-btn align="left" label="Edit page" dark icon="article" no-caps />
        </div>
        <q-separator />
        <q-separator />

        <div class="column">
          <q-btn align="left" label="Comunity" dark icon="people" no-caps />
        </div>
        <q-separator />
        <q-separator />

        <div class="column">
          <q-btn align="left" label="Settings" dark icon="settings" no-caps />
        </div>
        <q-separator />
        <q-separator />

        <div class="column">
          <q-btn
            align="left"
            label="Colaboladores"
            dark
            icon="groups"
            no-caps
          />
        </div>
        <q-separator />
        <q-separator />
      </q-list>
      <q-space></q-space>
    </q-drawer> -->

    <!-- @mouseover="miniState = false"
      @mouseout="miniState = true" -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-expansion-item
          dense
          dense-toggle
          expand-separator
          default-opened
          popup
          icon="perm_identity"
          label="Account settings"
        >
          <q-card>
            <q-card-section>
              <q-item @click="CerrarSesion()" clickable active-class="my-menu-link" v-ripple>
                <q-item-section avatar>
                  <q-avatar>
                    <q-icon color="blue-10" name="web" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Cerrar sesion</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-separator />

              <q-item clickable active-class="my-menu-link" v-ripple>
                <q-item-section avatar>
                  <q-avatar>
                    <q-icon name="web" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>My page</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-separator />

              <q-item clickable active-class="my-menu-link" v-ripple>
                <q-item-section avatar>
                  <q-avatar>
                    <q-icon name="web" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>My page</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-separator />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          dense
          popup
          expand-separator
          icon="perm_identity"
          label="Account settings"
        >
          <q-card>
            <q-card-section>
              <q-item clickable active-class="my-menu-link" v-ripple>
                <q-item-section avatar>
                  <q-avatar>
                    <q-icon name="web" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>My page</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-separator />

              <q-item clickable active-class="my-menu-link" v-ripple>
                <q-item-section avatar>
                  <q-avatar>
                    <q-icon name="web" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>My page</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-separator />

              <q-item clickable active-class="my-menu-link" v-ripple>
                <q-item-section avatar>
                  <q-avatar>
                    <q-icon name="web" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>My page</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-separator />

              <q-item clickable active-class="my-menu-link" v-ripple>
                <q-item-section avatar>
                  <q-avatar>
                    <q-icon name="web" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>My page</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-separator />
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
      <q-space></q-space>
    </q-drawer>

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
      contador: 1,
      link: "inbox",
    };
  },

  created(){
    this.$store.dispatch("iniciarFirebaseAction");//Iniciar Firebase
  },

  methods: {
    IrHome() {
      this.$router.replace({ path: "/" });
    },
    CerrarSesion() {
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

  .my-menu-link {
    border-left: 4px solid #2698d6;
  }

  btn-block {
    display: block;
    width: 100%;
    border: none;
    background-color: rgb(19, 0, 105);
    color: white;
    padding: 14px 28px;
    font-size: 36px;
    cursor: pointer;
    text-align: center;
    font-weight: bold;
  }
}
</style>