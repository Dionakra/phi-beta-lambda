<template>
  <div class="md:flex md:flex-wrap">
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
import EpisodeCard from "~/components/EpisodeCard";
const PAGE = 6;

export default {
  components: {
    EpisodeCard
  },
  data() {
    return {
      episodes: [],
      searching: true,
      curPage: 1,
      showing: []
    };
  },
  created() {
    fetch("/api/main.json")
      .then(response => response.json())
      .then(episodes => {
        this.episodes = episodes;
        this.searching = true;
        this.showing = this.episodes.slice(0, PAGE * this.curPage);
        this.searching = false;
      });
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
