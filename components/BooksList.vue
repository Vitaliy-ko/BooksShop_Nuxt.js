<template>
  <div>
    <!-- <p
      class="error-title text-center"
      v-if="isBookFindError && books.length === 0"
    >По Вашему запросу ничего не найдено</p>-->
    <ul class="list-unstyled">
      <li
        class="listItem media mb-4"
        v-for="book in books"
        :key="book.id"
      >
        <img
          class="d-inline shadow-lg"
          alt="Изображение книги"
          :src="book.volumeInfo.imageLinks.thumbnail"
        />
        <div class="media-body ml-3">
          <div>
            <h5 class="mt-0 mb-3">{{book.volumeInfo.title}}</h5>
            <p
              v-if="book.volumeInfo.publishedDate"
            >Дата выпуска: {{book.volumeInfo.publishedDate | formatDate}}</p>
            <p v-else>Информация о дате выпуска отсутствует</p>
            <div>
              <ul class="list-unstyled list-group-horizontal">
                <span v-if="book.volumeInfo.authors === undefined">Информация об авторах отсутствует</span>
                <span v-else-if="book.volumeInfo.authors.length === 1">Автор:&nbsp;</span>
                <span v-else>Авторы:&nbsp;</span>
                <li
                  class="d-inline"
                  v-for="(author, index) in book.volumeInfo.authors"
                  :key="index"
                >
                  <span v-if="index === book.volumeInfo.authors.length-1">{{author}}</span>
                  <span v-else>{{author}},&nbsp;</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="d-flex align-self-center m-2 h-100">
          <b-button
            class="book__checkout"
            type="button"
            variant="dark"
            v-if="book.saleInfo.isEbook"
            @click="addToCart(book)"
          >Заказать</b-button>
          <b-alert
            v-else
            show
            variant="danger"
            class="book__checkout d-flex align-items-center text-center mb-0"
          >
            <span>Нет в наличии</span>
          </b-alert>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    books() {
      return this.$store.getters["booksData/books"];
    }
  },
  filters: {
    formatDate: function(date) {
      return date
        .split("-")
        .reverse()
        .join(".");
    }
  },
  methods: {
    addToCart(book) {
      if (this.$store.getters["user/user"] !== null) {
        this.$store.dispatch("cart/addToCart", book);
      } else {
        this.$router.push("/signin");
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.book__checkout {
  min-height: 120px;
  width: 120px;
}
</style>
