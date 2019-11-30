<template>
  <div>
    <p class="text-center text-5xl mb-4 -mt-4">Invitados</p>
    <div class="px-2">
      <div class="flex flex-wrap -mx-2" v-if="guests != undefined && guests.length != 0">
        <GuestCard :guest="guest" :key="guest.id" v-for="guest in guests" />
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import GuestCard from "~/components/GuestCard";

export default {
  components: {
    GuestCard
  },
  async asyncData() {
    const [episodes, comedians] = await Promise.all([
      axios.get("/db/episodes.json"),
      axios.get("/db/comedians.json")
    ]);

    const guests = episodes.data
      .filter(e => e.guests && e.guests.length > 0)
      .flatMap(e => {
        return e.guests.map(g => {
          const comedian = comedians.data.find(c => c.id == g);

          return {
            id: comedian.id,
            name: comedian.name,
            episode: {
              id: e.id,
              season: e.season,
              episode: e.episode,
              title: e.title
            }
          };
        });
      })
      .sort((a, b) => {
        let res = b.episode.season - a.episode.season;

        if (res == 0) {
          res = b.episode.episode - a.episode.episode;
        }

        return res;
      });

    return {
      guests: guests
    };
  },
  data() {
    return {
      guests: []
    };
  }
};
</script>