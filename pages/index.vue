<template>
  <login v-if="isLogin" @change-form="changeForm"></login>
  <register v-else  @change-form="changeForm"></register>
</template>

<script>
import Login from "~/pages/login.vue";
import Register from "~/pages/register.vue";

export default {
  name: 'IndexPage',
  components: { Login, Register },
  data() {
    return {
      isLogin: true,
    };
  },
  methods: {
    changeForm() {
      this.isLogin = !this.isLogin;
    },
  },
}
</script>
