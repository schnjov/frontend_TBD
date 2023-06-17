<template>
  <v-container class="emergencias-container">
    <h1 class="page-title">Listado de Emergencias</h1>
    <v-list>
      <v-list-item v-for="emergencia in emergencias" :key="emergencia.id_emergencia" class="emergencia-item">
        <v-list-item-content>
          <v-list-item-title class="asunto">{{ emergencia.asunto }}</v-list-item-title>
          <v-list-item-subtitle class="descripcion">{{ emergencia.descripcion }}</v-list-item-subtitle>
          <v-list-item-subtitle class="direccion">{{ emergencia.direccion }}</v-list-item-subtitle>
          <v-list-item-subtitle class="fecha">{{ emergencia.fecha }}</v-list-item-subtitle>
          <v-list-item-subtitle class="activa">{{ emergencia.activa }}</v-list-item-subtitle>
          <v-list-item-subtitle class="institucion">{{ emergencia.id_institucion }}</v-list-item-subtitle>
          <v-list-item-subtitle class="region">{{ emergencia.region }}</v-list-item-subtitle>
          <v-list-item-subtitle class="ubicacion">{{ emergencia.ubicacion }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
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

<style scoped>
.emergencias-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.emergencia-item {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

.asunto {
  font-size: 18px;
  font-weight: bold;
}

.descripcion {
  font-size: 14px;
  margin-bottom: 5px;
}

.direccion,
.fecha,
.activa,
.institucion,
.region,
.ubicacion {
  font-size: 12px;
  margin-bottom: 3px;
}
</style>
