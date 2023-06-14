<template>
  <v-app light class="register">
    <v-container fluid fill-height class="blurBG">
      <v-layout align-center>
        <v-flex md6 offset-md3>
          <v-card elevation="4" class="blurCard" tag="section">
            <v-card-title>
              <v-layout align-center justify-space-between>
                <h3 class="headline font-weight-bold">Sistema de Gestión de <br> Emergencias - Registro</h3>
                <v-img
                  lazy-src="/logoUsach.png"
                  max-height="150"
                  max-width="250"
                  src="/logoUsach.png"
                ></v-img>
              </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p>Porfavor ingrese sus datos para registrarse</p>
              <v-form class=>
                <v-text-field
                  v-model="formValues.email"
                  outline
                  label="Email"
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="formValues.password"
                  outline
                  hide-details
                  label="Password"
                  type="password"
                ></v-text-field>
                <v-text-field class="mb-2"
                  v-model="formValues.password2"
                  outline
                  hide-details
                  label="Confirm Password"
                  type="password"
                ></v-text-field>
                <v-select class="mt-3"
                  v-model="formValues.role"
                  outline
                  :items="['Institucion', 'Voluntario']"
                  label="Role"
                ></v-select>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
              <v-spacer></v-spacer>
              <v-btn v-on:click="registerHandler" color="info" :large="$vuetify.breakpoint.smAndUp">
                Registrarse
              </v-btn>
              <v-btn v-on:click="goToLogin" color="info" :large="$vuetify.breakpoint.smAndUp">
                Inicia sesión
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import {mapGetters,mapActions} from "vuex";
import UserServices from "~/services/UserServices";
import jwt_decode from 'jwt-decode';

export default {
  name: "register",
  data(){
    return{
      formValues: {
        email: '',
        password: '',
        password2: '',
        role: ''
      }
    }
  },
  methods:{
    goToLogin() {
      this.$emit('change-form');
    },
    async registerHandler() {
      if (this.formValues.email === '' || this.formValues.password === '' || this.formValues.password2 === '' || this.formValues.role === '') {
        alert("Complete todos los campos por favor");
      } else if (this.formValues.password !== this.formValues.password2) {
        alert("Las contraseñas no coinciden");
      } else {
        var json= {
          email: this.formValues.email,
          password: this.formValues.password,
          rol: String(this.formValues.role).toUpperCase()
        }
        try {
          const response = await UserServices.register(json);

          if (response.status === 200 && response.data.jwtToken) {
            const token = response.data.jwtToken;
            localStorage.setItem("token",token);
            // Luego usa `decodedSecret` en lugar de `secret` en `jwt.verify`
            var decoded = jwt_decode(String(token));
            console.log(token)
          } else {
            console.error('Failed to register:', response);
          }
        } catch (err) {
          console.error('Error during register:', err);
        }
      }
    }
  }
}
</script>

<style scoped>
.register {
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
</style>
