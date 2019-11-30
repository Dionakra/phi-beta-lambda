<template>
  <div class="mx-4">
    {{episode}}
    <div
      class="flex flex-inline flex-wrap"
    >
      <div v-for="comedian in episode.comedians" :key="comedian.id" class=" w-20 -mt-2">
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
  async asyncData({ params }) {
    const [episodes, comedians, sections, culture, hosts] = await Promise.all([
      axios.get("/db/episodes.json"),
      axios.get("/db/comedians.json"),
      axios.get("/db/sections.json"),
      axios.get("/db/culture.json"),
      axios.get("/db/hosts.json")
    ]);

    console.log(params);

    const episode = episodes.data
      .filter(e => e.id == params.id)
      .map(e => {
        e.hosts = e.hosts.map(h => {
          const host = hosts.data.find(x => x.id == h);
          return {
            id: host.id,
            name: host.name
          };
        });
        e.guests = e.guests.map(g => comedians.data.find(c => c.id == g));

        // Sections
        e.sections = e.sections.map(s => {
          s.section = sections.data.find(x => x.id == s.section).name;

          if (s.extra && s.extra.comedians && s.extra.comedians.length > 0) {
            s.extra.comedians = s.extra.comedians.map(c =>
              comedians.data.find(x => x.id == c)
            );

            if (s.extra && s.extra.culture && s.extra.culture.length > 0) {
              s.extra.culture = s.extra.culture.map(c =>
                culture.data.find(x => x.id == c)
              );
            }
          }
          return s;
        });

        // Comedians
        e.comedians = e.comedians.map(c => comedians.data.find(x => x.id == c)).sort((a, b) => a.name.localeCompare(b.name));

        // Culture
        e.culture = e.culture.map(c => culture.data.find(x => x.id == c)).sort((a, b) => a.title.localeCompare(b.title));

        return e;
      })[0];

    return {
      episode: episode
    };
  },
  data() {
    return {
      episode: {}
    };
  }
};
</script>