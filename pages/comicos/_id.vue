<template>
  <div>
    <h1 class="text-center text-red text-4xl mb-4 -mt-4">{{name}}</h1>
    <div class="ml-2 sm:ml-4 sm:flex sm:flex-inline mx-auto">
      <div>
        <img
          :src="'/images/comedians/' + id + '.jpg'"
          :alt="name"
          :title="name"
          class="rounded-full mx-auto sm:mx-0"
        />
      </div>

      <div class="ml-1 md:ml-2">
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

export default {
  head() {
    return {
      title: "Comedia Perpetua - Phi Beta Lambda | " + this.name,
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Lista de programas en los que " +
            this.name +
            " es mencionad@"
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
      mentions: []
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