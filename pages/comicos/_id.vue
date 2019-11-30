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
            {{ v.title }} Seccion: {{ v.section.section.name }}
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
  asyncData({ params }) {
    return axios.get(`/api/comedians/${params.id}.json`).then(x => {
      return x.data;
    });
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