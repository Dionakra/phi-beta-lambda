<template>
  <div>
    <h1 class="text-center text-red text-4xl mb-4 -mt-4">{{name}}</h1>
    <div class="ml-2 sm:ml-4 sm:flex sm:flex-inline mx-auto">
      <div class="w-full sm:w-1/3">
        <img
          :src="'/images/comedians/' + id + '.jpg'"
          :alt="name"
          :title="name"
          class="rounded-full mx-auto sm:mx-0 mx-auto"
        />
        <div v-if="genres && genres.length > 0">
          <span class="text-lg">Estilo</span>
          <div class="pb-2 text-xs">
            <p
              v-for="genre in genres"
              :key="genre"
              class="inline-block bg-gray-200 rounded-full px-1 py-1 text-gray-700 sm:ml-1"
            >{{genre}}</p>
          </div>
        </div>

        <div v-if="subjects && subjects.length > 0">
          <span class="text-lg">Temáticas</span>
          <div class="pb-2 text-xs">
            <p
              v-for="subject in subjects"
              :key="subject"
              class="inline-block bg-gray-200 rounded-full px-1 py-1 text-gray-700 sm:ml-1"
            >{{subject}}</p>
          </div>
        </div>
      </div>

      <div class="ml-1 md:ml-2">
        <div v-if="recommended.length > 0" class="l-1 md:ml-2">
          <span class="text-lg">Si te gusta {{name}}, pueden gustarte...</span>
          <div class="flex flex-inline flex-wrap" role="list">
            <div v-for="comedian in recommended" :key="comedian.id" class="w-24 mx-auto sm:mx-0">
              <ComedianLink :comedian="comedian" />
            </div>
          </div>
        </div>

        <div class="ml-1 md:ml-2" role="list">
          <span class="text-lg">Programas en que se le menciona</span>
          <div
            v-for="mention in mentions"
            :key="mention"
            class="ml-1 md:ml-2"
            role="listitem"
          >{{mention}}</div>
        </div>

        <div class="mt-4 ml-1 md:ml-2">
          <div v-if="vip != undefined && vip.length > 0" role="list">
            <span class="text-lg">Destacad@</span>
            <div v-for="v in vip" :key="v" class="ml-1 md:ml-2" role="listitem">{{v}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ComedianLink from "~/components/ComedianLink";

export default {
  components: {
    ComedianLink
  },
  head() {
    return {
      title: "Comedia Perpetua - Phi Beta Lambda | " + this.name,
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Lista de programas en los que " + this.name + " es mencionad@"
        }
      ]
    };
  },
  asyncData({ params, error }) {
    return axios
      .get(`/api/comedians/${params.id}.json`)
      .then(x => {
        return x.data;
      })
      .catch(e => {
        error({ statusCode: 404, message: "Post not found" });
      });
  },
  data() {
    return {
      id: "",
      name: "",
      vip: [],
      mentions: [],
      recommended: [],
      genres: [],
      subjects: []
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