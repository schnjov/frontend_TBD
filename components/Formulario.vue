<template>
  <v-form @submit.prevent="submitForm" light>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="formData.id_emergencia" label="ID de Emergencia"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="formData.asunto" label="Asunto"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea v-model="formData.descripcion" label="Descripción"></v-textarea>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="formData.direccion" label="Dirección"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-date-picker v-model="formData.fecha" label="Fecha"></v-date-picker>
        </v-col>
        <v-col cols="12">
          <v-checkbox v-model="formData.activa" label="Activa"></v-checkbox>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="formData.id_institucion" label="ID de Institución"></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-btn type="submit">Guardar</v-btn>
  </v-form>
</template>

<script>
export default {
  name: "Formulario",
  data() {
    return {
      formData: {
        id_emergencia: null,
        asunto: '',
        descripcion: '',
        direccion: '',
        fecha: null,
        activa: false,
        id_institucion: null
      }
    };
  },
  methods: {
    submitForm() {
      // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos al servidor
      console.log(this.formData);
    }
  }
};
</script>
