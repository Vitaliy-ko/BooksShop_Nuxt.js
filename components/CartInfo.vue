<template>
  <div class>
    <b-link
      class="cart-info__link d-flex align-items-center"
      :to="isUserSignIn"
    >
      <span
        v-if="isPurchaseСompleted"
        class="font-weight-bold mr-2"
      >Ваш заказ на сумму {{cartTotalPrice | roundToTwo}} грн успешно оформлен</span>
      <span
        v-if="!isPurchaseСompleted"
        class="cart-info__price"
      >{{cartTotalPrice | roundToTwo}} грн.</span>
      <font-awesome-icon
        class="cart-info__icon"
        :icon="['fas', 'shopping-cart']"
        size="2x"
      />
      <b-badge
        variant="dark"
        v-if="!isPurchaseСompleted"
      >{{cartBooksCount}}</b-badge>
    </b-link>
  </div>
</template>

<script>
import roundToTwo from "~/filters/roundToTwo";

export default {
   filters: {
    roundToTwo
  },
  computed: {
    cartBooksCount() {
      return this.$store.getters["cart/cartBooksCount"];
    },
    cartTotalPrice() {
      return this.$store.getters["cart/cartTotalPrice"];
    },
    isPurchaseСompleted() {
      return this.$store.getters["cart/isPurchaseСompleted"];
    },
    isUserSignIn () {
      return this.$store.getters["user/user"] === null ? '' : '/cart'
    }
  },

};
</script>

<style lang="scss" scoped>
.cart-info__link {
  color: #343a40;
}
</style>
