<template>
  <div class="login">
    <v-container fluid fill-height class="blurBG">
      <v-layout align-center>
        <v-flex md6 offset-md3>
          <v-card elevation="4" class="blurCard" tag="section">
            <v-card-title>
              <v-layout align-center justify-space-between>
                <h3 class="headline font-weight-bold">Sistema de Gestión de <br> Emergencias</h3>
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
              <p>Por favor ingrese sus datos de acceso</p>
              <v-form>
                <v-text-field
                  v-model="formValues.email"
                  outline
                  label="Email"
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="formValues.clave"
                  outline
                  hide-details
                  label="Password"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
              <v-btn @click="goToRegister" color="info" :large="$vuetify.breakpoint.smAndUp">
                Regístrate
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn @click="loginHandler" color="info" :large="$vuetify.breakpoint.smAndUp">
                Ingresar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import UserServices from "~/services/UserServices";
import jwt_decode from 'jwt-decode';

export default {
  name: "LoginPage",
  data() {
    return {
      formValues: {
        clave: '',
        email: ''
      },
    }
  },
  methods: {
    goToRegister() {
      this.$emit('change-form');
    },
    async loginHandler() {
      if (this.formValues.email === '' || this.formValues.clave === '') {
        alert("Complete todos los campos por favor");
      } else {
        try {
          const response = await UserServices.matchUser(this.formValues);

          if (response.status === 200 && response.data.jwtToken) {
            const token = response.data.jwtToken;
            localStorage.setItem("token", token);

            var decoded = jwt_decode(String(token));
            this.$router.push("/emergencias");


          } else {
            console.error('Failed to log in:', response);
          }
        } catch (err) {
          console.error('Error during login:', err);
        }
      }
    }
  }
}
</script>

<style scoped>
.login {
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
