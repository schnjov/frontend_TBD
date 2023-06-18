<template>
  <div>
    <v-toolbar color="#00A499" >
      <v-toolbar-title class="font-weight-bold" >EMERGENCIAS</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="secondary" @click="goToMap">Ver Tareas en el Mapa</v-btn>
    </v-toolbar>
    <div class="emergencias">
      <v-container fluid fill-height class="blurBG">
        <v-layout align-center justify-space-around>
          <v-flex md10 offset-md1>
            <v-card elevation="4" class="blurCard" tag="section">
              <v-card-title class="headline font-weight-bold card-title">
                <span>Listado de Emergencias</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text v-if="contentLoaded">
                <v-list>
                  <v-list-item
                    v-for="emergencia in emergencias"
                    :key="emergencia.id_emergencia"
                    class="emergencia-item"
                    @click="goToEmergencia(emergencia.id_emergencia)"
                  >
                    <v-list-item-content>
                      <v-list-item-title class="asunto">Asunto: {{ emergencia.asunto }}</v-list-item-title>
                      <v-list-item-subtitle class="descripcion">Descripcion: {{ emergencia.descripcion }}</v-list-item-subtitle>
                      <v-list-item-subtitle class="direccion">Direccion: {{ emergencia.direccion }}</v-list-item-subtitle>
                      <v-list-item-subtitle class="fecha">Fecha: {{ emergencia.fecha }}</v-list-item-subtitle>
                      <v-list-item-subtitle class="activa">Estado: {{ emergencia.activa }}</v-list-item-subtitle>
                      <v-list-item-subtitle class="institucion">Institucion: {{ emergencia.id_institucion }}</v-list-item-subtitle>
                      <v-list-item-subtitle class="tasks">Cantidad de tareas: {{ emergencia.tasks }}</v-list-item-subtitle>
                      <v-switch
                        v-if="isInstitution"
                        v-model="emergencia.activa"
                        @change="toggleEmergencia(emergencia)"
                        :label="`Emergencia ${emergencia.activa ? 'Activa' : 'Inactiva'}`"
                      ></v-switch>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-divider></v-divider>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>

</template>

<script>
import EmergenciaServices from "~/services/EmergenciaServices";
import jwtDecode from 'jwt-decode';

export default {
  data() {
    return {
      emergencias: [],
      isInstitution: false,
      contentLoaded: false,
    };
  },
  async created() {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      this.isInstitution = decodedToken.roles.authority === 'ROLE_INSTITUCION';
      const response = await EmergenciaServices.findAll(token);
      this.emergencias = response.data;
      for (let i = 0; i < this.emergencias.length; i++) {
        let emergencia = this.emergencias[i];
        const taskResponse = await EmergenciaServices.countTasks(token, emergencia.id_emergencia);
        emergencia.tasks = String(taskResponse.data);
      }
      this.contentLoaded = true;
    } catch (error) {
      console.error('Error fetching emergencias:', error);
    }
  },
  methods: {
    goToEmergencia(id) {
      //
    },
    goToMap() {
      window.location.href='/tareas';
    },
    async toggleEmergencia(emergencia) {
      const token = localStorage.getItem('token');
      try {
        await EmergenciaServices.toggleEmergencia(token, emergencia.id_emergencia);
      } catch (error) {
        console.error('Error changing emergencia status:', error);
        // Revert the switch if the request fails
        emergencia.activa = !emergencia.activa;
      }
    },
  }
};
</script>

<style scoped>
.emergencias {
  background-image: url('../static/diinf.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.blurBG {
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.blurCard {
  opacity: 95%;
}

.card-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #004D40;
}

.emergencia-item {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  transition: background-color 0.2s ease;
}

.emergencia-item:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.1);
}

.asunto {
  font-size: 18px;
  font-weight: bold;
  color: #004D40;
}

.descripcion,
.direccion,
.fecha,
.activa,
.institucion,
.region,
.ubicacion {
  font-size: 14px;
  margin-bottom: 5px;
  color: #212121;
}
</style>
