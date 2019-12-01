<template>
  <div class=" md:flex md:flex-wrap md:-pl-2 bm--card-equal-height">
    <template v-for="episode in episodes">
      <EpisodeCard :episode="episode" :key="episode.id" />
    </template>
  </div>
</template>

<script>
import axios from "axios";
import EpisodeCard from "~/components/EpisodeCard";

export default {
  components: {
    EpisodeCard
  },
  async asyncData() {
    return axios.get("/api/main.json").then(x => {
      return {episodes: x.data};
    });
  },
  data() {
    return {
      episodes: []
    };
  }
};
</script>
