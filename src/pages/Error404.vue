<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">
        {{ name }}
      </div>

      <q-btn
        @click="GoHome()"
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Houston, tenemos un problema, ERROR 404",
    };
  },
  methods: {
    GoHome() {
      this.$router.replace({ path: "/" });
    },
  },
};
</script>
