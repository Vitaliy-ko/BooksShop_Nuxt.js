<template>
  <div>
    <b-form
      @submit.prevent="signUp"
      autocomplete="off"
    >
      <h2 class="text-center mb-3">Регистрация</h2>
      <b-form-group>
        <b-form-input
          class="form-control text-center"
          type="text"
          placeholder="E-mail"
          v-model="inputData.email"
        ></b-form-input>
      </b-form-group>
      <b-form-group description="Длина пароля должна быть не менее 6 символов">
        <b-form-input
          class="form-control text-center"
          type="password"
          placeholder="Password"
          v-model="inputData.password"
        ></b-form-input>
      </b-form-group>
      <b-form-invalid-feedback>Номер телефона не существует</b-form-invalid-feedback>

      <div class="d-flex justify-content-between mb-3">
        <b-button
          type="button"
          variant="outline-dark"
          to="/signin"
        >На страницу входа</b-button>
        <b-button
          type="submit"
          variant="dark"
        >Зарегистрироватся</b-button>
      </div>
      <b-link
        class="link text-center"
        to="/"
      >На главную страницу</b-link>
      <div
        class="alert alert-danger"
        v-show="isError"
      >
        <p class="mb-0 text-center">{{errorMsg}}</p>
      </div>
    </b-form>
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
    async signUp() {
      await this.$store
        .dispatch("user/signUp", this.inputData)
        .then(() => this.$router.push("/signin"))
        .catch(error => {
          this.isError = true;
          this.errorMsg = error.message;

          setTimeout(() => {
            this.isError = false;
          }, 5000);
        });
      setTimeout(() => {
        this.$store.dispatch("user/newUserRegistered", true);
      }, 5000);
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
