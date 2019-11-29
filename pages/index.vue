<template>
  <div class="mt-8 lg:flex lg:flex-wrap lg:-pl-2">
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
    const [episodes, comedians, sections, hosts, culture] = await Promise.all([
      axios.get("/db/episodes.json"),
      axios.get("/db/comedians.json"),
      axios.get("/db/sections.json"),
      axios.get("/db/hosts.json"),
      axios.get("/db/culture.json")
    ]);

    const info = episodes.data
      .sort((a, b) => {
        let res = b.season - a.season;

        if (res == 0) {
          res = b.episode - a.episode;
        }

        return res;
      })
      .map(e => {
        // Hosts Info
        const hostsInfo = e.hosts.map(h => {
          const info = hosts.data.find(x => x.id == h);
          return {
            id: info.id,
            name: info.name
          };
        });

        // Guests comedians info
        const guests = e.guests.map(g => comedians.data.find(c => c.id == g));

        // Info about sections
        const sectionsInfo = e.sections
          .filter(
            s => s.extra && s.extra.comedians && s.extra.comedians.length > 0
          )
          .map(s => {
            s.section = sections.data.find(x => x.id == s.section).name;

            if (s.extra && s.extra.comedians && s.extra.comedians.length != 0) {
              s.extra.comedians = s.extra.comedians.map(c => {
                return comedians.data.find(x => x.id == c);
              });
            }

            if (s.extra && s.extra.shows && s.extra.shows.length != 0) {
              s.extra.shows = s.extra.shows.map(s => {
                return culture.data.find(x => x.id == s);
              });
            }

            return s;
          });

        return {
          id: e.id,
          season: e.season,
          episode: e.episode,
          title: e.title,
          link: e.link,
          hosts: hostsInfo,
          special: comedians.data.find(c => c.id == e.special),
          sections: sectionsInfo,
          guests: guests,
        };
      });
    return {
      episodes: info
    };
  },
  data() {
    return {
      episodes: []
    };
  }
};
</script>
