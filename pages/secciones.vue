<template>
  <div class="flex flex-inline flex-wrap sm:ml-4 sm:mr-4 md:ml-12 md:mr-12 -pl-6">
    <div v-for="section in sections" :key="section.id" class="flex flex-inline mt-10 sm:max-w-full sm:w-full md:w-1/2 pl-6 pr-6">
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
    const [sections, hosts] = await Promise.all([
      axios.get("/db/sections.json"),
      axios.get("/db/hosts.json")
    ]);

    sections.data.forEach(s => (s.host = hosts.data.find(h => h.id == s.host)));

    return {
      sections: sections.data.sort((a, b) => a.name.localeCompare(b.name))
    };
  },
  data() {
    return {
      sections: []
    };
  }
};
</script>