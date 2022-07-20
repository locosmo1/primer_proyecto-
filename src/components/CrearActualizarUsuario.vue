<template></template>

<script>
import { defineComponent } from "@vue/composition-api";

export default {
  name: "ComponenteUsuario",
  props: {
    //Type control style
    crear: {
      type: Boolean,
    },
    usuario: {
      type: Object,
    },
    usuarioSeleccionado: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
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

<style scoped></style>
