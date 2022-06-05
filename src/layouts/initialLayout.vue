<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>


<script>

import { onAuthStateChanged } from "firebase/auth";

export default {
  created() {
    this.$store.dispatch("iniciarFirebaseAction");
    if (this.usuarioAccedioCorrectamente()) {
      /* this.$router.push("/Index"); */
    }
  },
  data() {
    return {};
  },
  methods: {
    usuarioAccedioCorrectamente() {
      //const auth = getAuth();

      onAuthStateChanged(this.$store.state.auth, (user) => {
        let accedio = false;
        if (user) {
          const uid = user.uid;
          accedio = true;
        }
        return accedio;
      });
    },
  },
};
</script>
