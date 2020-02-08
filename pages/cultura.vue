<template>
  <div class="mx-auto">
    <div class="md:w-full lg:w-1/2 mx-auto flex flex-wrap justify-between text-sm mb-3">
      <div
        v-for="category in Object.keys(culture).sort((a, b) => a.localeCompare(b))"
        :key="category"
      >
        <nuxt-link
          :to="{ path: '/cultura', query: { cat: category }}"
          tag="button"
          class="hover:bg-red text-white py-1 px-2 rounded-full"
          :class="selectedCategory == category ? 'bg-red' : 'bg-transparent text-red border border-red hover:text-white'"
        >{{trans[category]}}</nuxt-link>
      </div>
    </div>

    <div
      class="mx-auto"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="200"
    >
      <div class="flex flex-inline flex-wrap mx-4">
        <div
          v-for="culture in showing"
          :key="culture.id"
          class=" mb-2 mt-6 relative"
        >
          <Culture :culture="culture" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Culture from "~/components/Culture";
const PAGE = 30;

export default {
  components: {
    Culture
  },
  watchQuery: ['cat'],
  key: to => to.fullPath,
  async asyncData({ query }) {
    console.log(query.cat || "comedy-special");
    const res = await axios.get("/api/culture.json");
    return {
      culture: res.data,
      selectedCategory: query.cat || "comedy-special"
    };
  },
  data() {
    return {
      culture: [],
      searching: true,
      curPage: 1,
      showing: [],
      selectedCategory: "",
      trans: {
        documentary: "Documentales",
        "comedy-special": "Especiales de comedia",
        book: "Libros",
        movie: "Películas",
        "tv-show": "Programa TV",
        "radio-show": "Radio / Podcast",
        "tv-show-series": "Series",
        "comic-strip": "Cómic"
      }
    };
  },
  mounted() {
    this.showing = this.showCulture().slice(0, PAGE * this.curPage);
  },
  methods: {
    showCulture() {
      this.searching = true;
      const res = this.culture[this.selectedCategory];
      this.searching = false;
      return res;
    },
    loadMore() {
      if (!this.searching) {
        this.curPage++;
        this.showing = this.showCulture().slice(0, PAGE * this.curPage);
      }
    },
    updateList() {
      this.curPage = 1;
      this.showing = this.showCulture().slice(0, PAGE * this.curPage);
    }
  }
};
</script>
