<template>
  <div class="mx-4">
    {{episode}}
    <div class="flex flex-inline flex-wrap">
      <div v-for="comedian in episode.comedians" :key="comedian.id" class="w-20 -mt-2">
        <img
          class="rounded-full h-16 w-16 mx-auto mt-4"
          :src="'/images/comedians/' + comedian.id+ '_128.jpg'"
          :alt="comedian.name"
          :title="comedian.name"
        />
        <p class="text-sm text-gray-600 text-center">{{comedian.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  asyncData({ params }) {
    return axios.get(`/api/episodes/${params.id}.json`).then(x => {
      return { episode: x.data };
    });
  },
  data() {
    return {
      episode: {}
    };
  }
};
</script>