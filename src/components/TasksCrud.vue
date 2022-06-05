<template>
  <div class="fit column inline">
    <q-btn-dropdown
      class="fit colum content-end"
      color="blue-10"
      label="Configuraciones de la cuenta"
    >
      <div class="row no-wrap q-pa-md">
        <div class="column items-center">
          <div class="text-h6 q-mb-md">Configuraciones</div>
          <q-toggle label="Usar datos moviles" />
          <q-toggle label="Bluetooth" />
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">
          <q-avatar size="72px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>

          <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

          <q-btn
            color="blue"
            label="Cerrar sesion"
            push
            size="sm"
            v-close-popup
          />
        </div>
      </div>
    </q-btn-dropdown>

    <q-editor
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Guardar tu trabajo',
          icon: 'save',
          label: 'Guardar',
          handler: guardar,
        },
        comenzar: {
          tip: 'Comenzar a procesar',
          icon: 'save',
          label: 'Comenzar la locura',
          handler: ready,
        },
        organizar: {
          tip: 'Ordenar',
          icon: 'save',
          label: 'Ordenar todo',
          handler: ordenar,
        },
        borrar_todo: {
          tip: 'Borrar todo',
          icon: 'delete',
          label: 'Borrar todo',
          handler: borrar_all,
        },
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['save', 'comenzar', 'organizar', 'borrar_todo'],
      ]"
    />

    <q-card
      class="row"
      flat
      bordered
      v-for="(item, index) in tasks"
      :key="index"
      max-width="300px"
    >
      <q-card-section
        class="col"
        v-html="'Posicion: ' + (index + 1) + ', ' + item.texto"
        :class="item.estado ? 'tachar' : ''"
      />
      <q-btn
        class="btn btn-primary pull-right"
        data-toggle="modal"
        color="green"
        @click="editar(index)"
      >
        Editar
      </q-btn>
      <q-btn @click="eliminar(index)" color="red"> Eliminar </q-btn>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editor: "",
      tasks: [
        { texto: "tarea1", estado: false },
        { texto: "tarea2", estado: false },
        { texto: "tarea3", estado: false },
      ],
    };
  },
  methods: {
    guardar() {
      if (this.editor !== "") {
        this.tasks.push({
          texto: this.editor,
          estado: false,
        });
        this.$q.notify({
          message: "guardado correctamente",
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
        });
      } else {
        this.editor = "Por favor escribe algo para guardar";
      }
    },

    ready() {
      let n = 100;
      let ale;
      for (let j = 0; j < this.tasks.length; j++) {
        ale = this.aleatorio();
        if (!this.encontrar_repetido(ale)) {
          this.tasks[j].texto = ale;
        }
      }

      let calculo = 100 - this.tasks.length;
      for (let j = calculo; j > 0; ) {
        ale = this.aleatorio();
        //console.time("t1")
        if (!this.encontrar_repetido(ale)) {
          this.tasks.push({
            texto: ale,
            estado: false,
          });
          j--;
        }
        //console.timeEnd("t1")
      }
    },

    ordenar() {
      let i, j, k;
      for (i = 1; i < this.tasks.length; i++) {
        for (j = 0; j < this.tasks.length - i; j++) {
          if (this.tasks[j].texto > this.tasks[j + 1].texto) {
            k = this.tasks[j + 1].texto;
            this.tasks[j + 1].texto = this.tasks[j].texto;
            this.tasks[j].texto = k;
          }
        }
      }
    },

    borrar_all() {
      for (let i = 0; i < this.tasks.length; i++) {
        this.tasks.splice(i);
      }
    },

    eliminar(index) {
      this.$q
        .dialog({
          title: "Confirmar",
          message: "¿Estas seguro de borrar toda la informacion?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          //console.log('>>>> OK')
          this.tasks.splice(index, 1);
        });
    },
    
    editar(index) {
      this.tasks[index].texto = this.editor;
    },

    aleatorio() {
      return Math.floor(Math.random() * (100 + 1 - 1) + 1);
    },

    encontrar_repetido(ale) {
      let mensaje = false;
      let dato = ale;
      for (let j = 0; j < this.tasks.length; j++) {
        if (this.tasks[j].texto == dato) {
          mensaje = true;
        }
      }
      return mensaje;
    },
    
  },
};
</script>
