<template>
  <b-container>
    <b-row
      class="align"
      align-h="center"
      align-v="center"
    >
      <b-col
        md="8"
        lg="6"
      >
        <b-form @submit.stop.prevent="onSubmit">
          <b-form-group
            label="Введите имя"
            label-for="name"
          >
            <b-form-input
              id="name"
              type="text"
              placeholder="Имя"
              v-model="inputData.name"
              :state="$v.inputData.name.$dirty ? !$v.inputData.name.$error : null"
            ></b-form-input>
            <b-form-invalid-feedback
              v-if="!$v.inputData.name.minLength"
            >Длина имени должна быть как минимум 2 символа</b-form-invalid-feedback>
            <b-form-invalid-feedback
              v-if="!$v.inputData.name.required"
            >Поле обязательно для заполнения</b-form-invalid-feedback>
            <b-form-invalid-feedback
              v-if="!$v.inputData.name.alpha"
            >Имя должно содежрать только буквы</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            label="Введите Email адресс"
            label-for="email"
          >
            <b-form-input
              id="email"
              placeholder="Email адресс"
              v-model="inputData.email"
              :state="$v.inputData.email.$dirty ? !$v.inputData.email.$error : null"
            ></b-form-input>
            <b-form-invalid-feedback v-if="!$v.inputData.email.email">Email не существует</b-form-invalid-feedback>
            <b-form-invalid-feedback
              v-if="!$v.inputData.email.required"
            >Поле обязательно для заполнения</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            label="Номер телефона"
            label-for="phone"
          >
            <b-form-input
              id="phone"
              type="tel"
              v-model="inputData.phoneNumber"
              :state="$v.inputData.phoneNumber.$dirty ? !$v.inputData.phoneNumber.$error : null"
              v-mask="'+38 (0##) ##-##-###'"
            ></b-form-input>
            <b-form-invalid-feedback>Номер телефона не существует</b-form-invalid-feedback>
          </b-form-group>
          <div class="d-flex justify-content-end">
            <b-button
              class="px-5"
              type="submit"
              variant="dark"
              :disabled="!isDirty"
            >Submit</b-button>
          </div>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>
</template>

<script>
import { setTimeout } from "timers";
import { helpers, required, minLength, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      inputData: {
        name: "",
        email: "",
        phoneNumber: "+38"
      }
    };
  },
  validations: {
    inputData: {
      name: {
        minLength: minLength(2),
        alpha: helpers.regex("alpha", /^[a-zA-Zа-яёА-ЯЁ -]*$/),
        required
      },
      email: {
        email,
        required
      },
      phoneNumber: {
        length: helpers.regex("length", /.{19}/),
        required
      }
    }
  },
  computed: {
    isDirty() {
      return Object.keys(this.inputData).every(
        field => this.inputData[field].length > 1
      );
    }
  },
  methods: {
    onSubmit() {
      this.$v.inputData.$touch();
      if (this.$v.inputData.$anyError) {
        return;
      }
      this.$router.push("/");

      let totalPrice = this.$store.getters["cart/cartTotalPrice"];
      let message = `Ваш заказ на сумму ${totalPrice} успешно оформлен`;
      this.$store.dispatch("cart/checkout");
// TODO:сделать триггер на заказ, изменяется только при заказе
      // setTimeout(() => {
      //   this.$store.dispatch("cart/checkout", "");
      // }, 150);
    },
  }
};
</script>
<style lang="scss" scoped>
.align {
  margin-top: 40px;
}
</style>
