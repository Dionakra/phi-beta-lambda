<template>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <img :src="'/images/comedians/' + comedian.id + '.jpg'" :alt="comedian.name" />
      </div>
      <div class="column is-9">
        <h1 class="title">{{ comedian.name }}</h1>

        <h2 class="subtitle">
          Aparece en:
          <div v-for="mention in mentions" :key="mention.id">
            Temporada {{ mention.season }} Episodio
            {{ mention.episode }} Nombre: {{ mention.title }}
          </div>
        </h2>

        <div v-if="vip != undefined && vip.length > 0">
          Especiales:
          <div v-for="v in vip" :key="v.id">
            Temporada {{ v.season }} Episodio {{ v.episode }} Nombre:
            {{ v.title }} Seccion: {{ v.section.section }}
            <div v-if="v.section == 'comedian-of-the-day'">Comico del que se presenta el capitulo</div>

            <div v-if="v.section.section == 'thank-you'">
              Especial: {{ v.section.extra.show.name }} Plataforma:
              {{ v.section.extra.show.platform }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  async asyncData({ params }) {
    const [comedians, episodes, sections] = await Promise.all([
      axios.get("/db/comedians.json"),
      axios.get("/db/episodes.json"),
      axios.get("/db/sections.json")
    ]);

    const comedian = comedians.data.find(c => c.id == params.id);

    if (comedian == undefined) {
      // ERROR
    }

    // Episodes that the comedian was mentioned
    const mentions = episodes.data
      .filter(e => e.comedians.includes(comedian.id))
      .map(e => {
        return {
          id: e.id,
          season: e.season,
          episode: e.episode,
          link: e.link,
          title: e.title
        };
      });

    // Episodes that the comedian was part of something special
    const vip = episodes.data
      .filter(e =>
        e.sections
          .flatMap(s => {
            if (!s.extra) {
              return [];
            } else {
              return s.extra.comedians;
            }
          })
          .includes(comedian.id)
      )
      .map(e => {
        return {
          id: e.id,
          season: e.season,
          episode: e.episode,
          link: e.link,
          title: e.title,
          section: e.sections.find(
            s =>
              s.extra &&
              s.extra.comedians &&
              s.extra.comedians.includes(comedian.id)
          )
        };
      });

    return {
      mentions,
      vip,
      comedian
    };
  },
  data() {
    return {
      mentions: [],
      vip: [],
      comedian: {}
    };
  }
};
</script>

<style scoped>
.page-enter-active {
  transition: opacity 0.25s ease-out;
}

.page-leave-active {
  transition: opacity 0.25s ease-in;
}

.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>