<template>
  <div>
    <b-form @submit.prevent="signIn">
      <h2 class="text-center mb-3">Вход</h2>
      <b-form-group>
        <b-form-input
          type="text"
          class="form-control text-center"
          placeholder="E-mail"
          v-model="inputData.email"
        />
      </b-form-group>
      <b-form-group>
        <b-form-input
          type="password"
          class="form-control text-center"
          placeholder="Password"
          v-model="inputData.password"
        />
      </b-form-group>

      <div class="d-flex justify-content-between mb-3">
        <b-button
          variant="outline-dark"
          to="/signup"
          type="button"
        >Зарегистрироватся</b-button>
        <b-button
          class="px-5"
          variant="dark"
          type="submit"
        >Войти</b-button>
      </div>
      <div
        v-show="isError"
        class="alert alert-danger"
      >
        <p class="mb-0 text-center">{{errorMsg}}</p>
      </div>
    </b-form>
    <b-link class="link text-center" to="/">
      На главную страницу
    </b-link>
    <b-alert
      class="text-center"
      show
      variant="success"
      v-if="isNewUserRegistered"
    >Зарегистрирован новый пользователь</b-alert>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  layout: "empty",
  data() {
    return {
      inputData: {
        email: "",
        password: ""
      },

      isError: false,
      errorMsg: ""
    };
  },
  methods: {
    async signIn() {
      await this.$store.dispatch("user/signIn", this.inputData).catch(error => {
        this.isError = true;
        this.errorMsg = error.message;

        setTimeout(() => {
          this.isError = false;
        }, 5000);
      });
      if (this.$store.getters["user/user"] !== null) {
        this.$router.push("/");
      }
    }
  },
  computed: {
    isNewUserRegistered() {
      return this.$store.getters["user/isNewUserRegistered"];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/veriables.scss";
.link {
  color: $dark;
}
</style>
