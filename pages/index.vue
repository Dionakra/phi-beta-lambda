<template>
  <div class="md:flex md:flex-wrap">
    <h1 class="text-center text-red text-4xl mb-4 mx-auto">Lista de Programas</h1>
    <div
      class="mx-auto"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="200"
    >
      <div class="flex flex-inline flex-wrap" role="list">
        <EpisodeCard :episode="episode" :key="episode.id" v-for="episode in showing" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EpisodeCard from "~/components/EpisodeCard";
const PAGE = 6;

export default {
  components: {
    EpisodeCard
  },
  async asyncData() {
    return axios.get("/api/main.json").then(x => {
      return { episodes: x.data };
    });
  },
  data() {
    return {
      episodes: [],
      searching: true,
      curPage: 1,
      showing: []
    };
  },
  mounted() {
    this.searching = true;
    this.showing = this.episodes.slice(0, PAGE * this.curPage);
    this.searching = false;
  },
  methods: {
    loadMore() {
      if (!this.searching) {
        this.searching = true;
        this.curPage++;
        this.showing = this.episodes.slice(0, PAGE * this.curPage);
        this.searching = false;
      }
    }
  }
};
</script>
