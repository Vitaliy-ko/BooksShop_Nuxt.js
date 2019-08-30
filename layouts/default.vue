<template>
  <b-container>
    <b-row class="main-header pt-4">
      <b-col
        class="mb-3 mb-xl-0"
        cols="2"
      >
        <b-button
          to="/"
          variant="dark"
        >Главная</b-button>
      </b-col>

      <b-col
        class="d-flex justify-content-end"
        cols="10"
      >
        <cart-info class="mt-1 mr-5"></cart-info>
        <div class="mb-3">
          <div v-if="user === null">
            <b-button
              variant="dark"
              to="signin"
            >Вход</b-button>
            <b-button
              variant="dark"
              to="signup"
            >Регистрация</b-button>
          </div>
          <b-button
            v-if="user !== null"
            to="/"
            variant="dark"
            @click="logout"
          >Выход</b-button>
        </div>
      </b-col>
    </b-row>
    <b-row class="main-header pb-4">
      <b-col
        class="d-flex"
        cols="8"
        offset="2"
        offset-md="3"
        md="6"
      >
        <book-search class="w-100 ml-xl-4 ml-0"></book-search>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <nuxt class="w-100"></nuxt>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import BookSearch from "~/components/BookSearch";
import CartInfo from "~/components/CartInfo";
import { auth } from "~/services/firebase";
import Cookie from "js-cookie";
export default {
  components: {
    CartInfo,
    BookSearch
  },
  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$store.dispatch('cart/clearCart');
    }
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/veriables.scss";

.main-header {
  background-color: $primary-color;
}
</style>
