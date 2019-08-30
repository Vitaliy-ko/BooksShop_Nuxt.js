<template>
  <div>
    <p
      class="attention text-center"
      v-if="cart.length === 0"
    >Корзина пуста</p>
    <ul class="list-unstyled">
      <li
        class="listItem media mb-4"
        v-for="(book, index) in cart"
        :key="index"
      >
        <div class="media-body">
          <img
            class="d-inline float-left shadow-lg mr-3"
            alt="Изображение книги"
            :src="book.volumeInfo.imageLinks.thumbnail"
          />
          <h5 class="mt-0 mb-1">{{book.volumeInfo.title}}</h5>
          <p class="mb-0">{{book.volumeInfo.description}}</p>
        </div>
        <p class="alert alert-warning ml-2">
          Цена:
          <br />
          {{book.saleInfo.retailPrice.amount | roundToTwo}} грн
        </p>
      </li>
    </ul>
    <b-button
      class="mx-auto d-block mb-5 px-5 py-3"
      variant="dark"
      @click="buy"
      v-if="cart.length !== 0"
    >Заказать</b-button>
  </div>
</template>

<script>
import roundToTwo from "~/filters/roundToTwo";

export default {
  computed: {
    cart() {
      return this.$store.getters["cart/cart"];
    }
  },
  filters: {
    roundToTwo
  },
  methods: {
    buy() {
      this.$router.push("/checkout");
    }
  }
};
</script>

<style lang="scss" scoped>
.attention {
  padding-top: 40px;
  font-size: 26px;
}
</style>
