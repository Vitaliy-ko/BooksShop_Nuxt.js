export default {
  async fetch({ store }) {
    if(store.getters['booksData/books'].length === 0) {
      await store.dispatch("booksData/getBooks");
    }
  }
}

import fetchBooks from "~/mixins/fetchBooks";
  // mixins: [fetchBooks],

