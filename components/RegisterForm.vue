<template>
  <v-form v-if="formValues.role === 'Voluntario'">
    <v-text-field
      v-model="formValues.nombre"
      outline
      label="Nombre"
      type="text"
    ></v-text-field>
    <v-text-field
      v-model="formValues.apellido"
      outline
      label="Apellido"
      type="text"
    ></v-text-field>
    <v-text-field
      v-model="formValues.telefono"
      outline
      label="Telefono"
      type="text"
    ></v-text-field>
    <v-text-field
      v-model="formValues.direccion"
      outline
      label="Direccion"
      type="text"
    ></v-text-field>
    <!-- Implementa la lógica para la ubicación aquí -->
    <v-btn v-on:click="submitVoluntarioForm" color="info" :large="$vuetify.breakpoint.smAndUp">
      Submit
    </v-btn>
  </v-form>

  <v-form v-else>
    <v-text-field
      v-model="formValues.nombre"
      outline
      label="Nombre"
      type="text"
    ></v-text-field>
    <v-text-field
      v-model="formValues.fecha"
      outline
      label="Fecha"
      type="date"
    ></v-text-field>
    <v-text-field
      v-model="formValues.direccion"
      outline
      label="Direccion"
      type="text"
    ></v-text-field>
    <v-text-field
      v-model="formValues.telefono"
      outline
      label="Telefono"
      type="text"
    ></v-text-field>
    <v-btn v-on:click="submitInstitucionForm" color="info" :large="$vuetify.breakpoint.smAndUp">
      Submit
    </v-btn>
  </v-form>
</template>

<script>
import jwt_decode from 'jwt-decode';

export default {
  // ...
  data(){
    return{
      formValues: {
        role: '',
        nombre: '',
        apellido: '',
        telefono: '',
        direccion: '',
        fecha: '',
        // Añade los campos necesarios para la ubicación aquí
      },
      user: 0,
      rol: "",
      id: 0,
      institucion: null
    }
  },
  methods:{
    submitVoluntarioForm() {
      // Implementa la lógica para enviar el formulario de voluntario aquí
    },
    submitInstitucionForm() {
      // Implementa la lógica para enviar el formulario de institución aquí
    },
    decodeToken() {
      const token = localStorage.getItem("token");
      var decoded = jwt_decode(String(token));
      this.user = decoded.id_usuario;
    }
  },
  mounted() {
    this.decodeToken();
  },
}
</script>

