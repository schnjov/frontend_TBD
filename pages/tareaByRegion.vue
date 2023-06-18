<template>
  <div>
    <v-select
      v-model="selectedRegion"
      :items="regions"
      item-value="value"
      item-text="label"
      label="Selecciona una Región"
      @change="fetchTasks"
    ></v-select>
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: 600px; width: 100%;"
    >
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker
        v-for="(tarea, index) in tareas"
        :key="index"
        :lat-lng="tarea.ubicacion"
      >
        <l-tooltip>{{ tarea.descripcion }}</l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LTooltip } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import TaskServices from '~/services/TaskServices';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
  },
  data() {
    return {
      tareas: [],
      zoom: 13,
      center: [-33.45694, -70.64827],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      selectedRegion: null,
      regions: [
        {label: 'Arica y Parinacota', value: 15},
        {label: 'Tarapacá', value: 1},
        {label: 'Antofagasta', value: 2},
        {label: 'Atacama', value: 3},
        {label: 'Coquimbo', value: 4},
        {label: 'Valparaíso', value: 5},
        {label: 'Metropolitana de Santiago', value: 13},
        {label: 'Libertador General Bernardo O\'Higgins', value: 6},
        {label: 'Maule', value: 7},
        {label: 'Ñuble', value: 16},
        {label: 'Biobío', value: 8},
        {label: 'La Araucanía', value: 9},
        {label: 'Los Ríos', value: 14},
        {label: 'Los Lagos', value: 10},
        {label: 'Aysén del General Carlos Ibáñez del Campo', value: 11},
        {label: 'Magallanes y de la Antártica Chilena', value: 12},
      ],
    };
  },
  methods: {
    async fetchTasks() {
      const token = localStorage.getItem('token');
      if (!this.selectedRegion) {
        this.tareas = [];
        return;
      }

      try {
        const response = await TaskServices.getTasksByRegion(token,this.selectedRegion.value);
        this.tareas = response.data;
        if (this.tareas.length > 0) {
          // Center the map on the first task
          this.center = this.tareas[0].ubicacion;
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
  },
  async created() {
    try {
      this.fetchTasks();
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  },
};
</script>

<style scoped>
.l-map {
  height: 600px;
  width: 100%;
}
</style>
