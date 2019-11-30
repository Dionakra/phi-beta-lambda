<template>
  <div class="flex flex-inline flex-wrap mx-4 sm:-px-1 sm:-px-3">
    <div
      v-for="section in sections"
      :key="section.id"
      class="flex flex-inline mt-10 sm:max-w-full sm:w-full md:w-1/2 sm:px-1 md:px-3"
    >
      <img
        :src="'/images/comedians/'+ section.host.id + '.jpg'"
        :title="section.host.name"
        :alt="section.host.name"
        class="rounded-full h-32 shadow-lg"
      />
      <div class="block ml-2">
        <p class="text-sm text-gray-600">{{section.host.name}}</p>
        <p class="text-lg font-bold text-red">{{section.name}}</p>
        <p class="text-sm text-justify" v-html="section.description"></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  async asyncData() {
    return axios.get("/api/sections.json").then(x => {
      return { sections: x.data };
    });
  },
  data() {
    return {
      sections: []
    };
  }
};
</script>