<template>
  <div>
    <h1>Listado de Emergencias</h1>
    <ul>
      <li v-for="emergencia in emergencias" :key="emergencia.id_emergencia">
        <h3>{{ emergencia.asunto }}</h3>
        <p>{{ emergencia.descripcion }}</p>
        <p>{{ emergencia.direccion }}</p>
        <p>{{ emergencia.fecha }}</p>
        <p>{{ emergencia.activa }}</p>
        <p>{{ emergencia.id_institucion }}</p>
        <p>{{ emergencia.region }}</p>
        <p>{{ emergencia.ubicacion }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import EmergenciaServices from "~/services/EmergenciaServices";

export default {
  async asyncData({ $axios }) {
    try {
      const token = localStorage.getItem('token');

      const response = await EmergenciaServices.findAll(token);
      return {
        emergencias: response.data,
      };
    } catch (error) {
      console.error('Error fetching emergencias:', error);
      return {
        emergencias: [],
      };
    }
  },
};
</script>
