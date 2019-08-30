<template>
  <div>
    <b-form
      class="d-flex"
      @submit.prevent="getBooks"
    >
      <b-input
        class="form-control text-center"
        type="text"
        placeholder="Название книги"
        v-model="bookName"
      />
        <b-button
          class="ml-3"
          type="submit"
          variant="dark"
        >Найти</b-button>
    </b-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bookName: ""
    };
  },
  methods: {
    getBooks() {
      this.$router.push(`/search/${this.bookName}`);
    }
  }
};
</script>
