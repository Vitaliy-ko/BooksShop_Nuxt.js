<template>
  <div>
    <header>
      <nav></nav>
    </header>
    <main>
      <section>
        <books-list></books-list>
      </section>
    </main>
  </div>
</template>

<script>
import BooksList from "~/components/BooksList";

export default {
  components: {
    BooksList
  },
  async fetch({ store }) {
    if (store.getters["booksData/books"].length === 0) {
      await store.dispatch("booksData/getBooks");
    }
  }
};
</script>

<style>
</style>
