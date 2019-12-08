<template>
  <div class="ml-2 sm:ml-4 sm:flex sm:flex-inline mx-auto">
    <div>
    <img
      :src="'/images/comedians/' + comedian.id + '.jpg'"
      :alt="comedian.name"
      :title="comedian.name"
      class="rounded-full mx-auto sm:mx-0"
    />
    </div>

    <div class="ml-1 md:ml-2">
      <span class="text-2xl text-red text-bold">{{comedian.name}}</span>

      <div class="ml-1 md:ml-2">
        <span class="text-lg">Programas en que se le menciona</span>
        <div
          v-for="mention in mentions"
          :key="mention.id"
          class="ml-1 md:ml-2"
        >{{mention.id.toUpperCase()}} - {{mention.title}}</div>
      </div>
      <div class="mt-4 ml-1 md:ml-2">
        <div v-if="vip != undefined && vip.length > 0">
          <span class="text-lg">Destacad@</span>
          <div v-for="v in vip" :key="v.id" class="ml-1 md:ml-2">
            {{v.id.toUpperCase()}} - {{v.title}}
            <div v-if="v.special" class="ml-1 md:ml-2">
              Mención especial
            </div>

            <div
              v-else-if="v.section.section.id == 'comedian-of-the-day'"
              class="ml-1 md:ml-2"
            >Cómic@ del día</div>

            <div
              v-else-if="v.section.section.id == 'thank-you'"
              class="ml-1 md:ml-2"
            >{{v.section.section.name}} - {{v.section.extra.culture[0].title}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  asyncData({ params, error }) {
    return axios
      .get(`/api/comedians/${params.id}.json`)
      .then(x => {
        console.log(x.data)
        return x.data;
      })
      .catch(e => {
        error({ statusCode: 404, message: "Post not found" });
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