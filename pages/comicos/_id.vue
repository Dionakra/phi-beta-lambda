<template>
  <div class="md:flex md:flex-inline mx-auto">
    <!-- COMEDIAN INFO -->
    <div class="w-full lg:w-1/3">
      <!-- NAME AND PHOTO -->
      <div class="mx-auto">
        <img
          :src="'/images/comedians/' + id + '.jpg'"
          :alt="name"
          :title="name"
          class="rounded-full mx-auto shadow-lg h-56"
        />
        <h1 class="text-center text-red text-3xl">{{name}}</h1>
      </div>
      <!-- END NAME AND PHOTO -->

      <!-- GENRES -->
      <div v-if="genres && genres.length > 0" class="mb-2">
        <span class="text-lg">Estilo</span>
        <div class="text-xs">
          <p
            v-for="genre in genres"
            :key="genre"
            class="inline-block bg-gray-200 rounded-full px-1 py-1 text-gray-700 sm:ml-1"
          >{{genre}}</p>
        </div>
      </div>
      <!-- END GENRES -->

      <!-- SUBJECTS -->
      <div v-if="subjects && subjects.length > 0" class="mb-2">
        <span class="text-lg">Temáticas</span>
        <div class="pb-2 text-xs">
          <p
            v-for="subject in subjects"
            :key="subject"
            class="inline-block bg-gray-200 rounded-full px-1 py-1 text-gray-700 sm:ml-1"
          >{{subject}}</p>
        </div>
      </div>
      <!-- END SUBJECTS -->

      <!-- RECOMMENDED -->
      <div v-if="recommended.length > 0" class>
        <span class="text-lg">
          Si te gusta
          <span class="font-bold">{{name}}</span>, pueden gustarte...
        </span>
        <div class="flex flex-inline flex-wrap" role="list">
          <div v-for="comedian in recommended" :key="comedian.id" class="w-24 mx-auto sm:mx-0">
            <ComedianLink :comedian="comedian" />
          </div>
        </div>
      </div>
      <!-- END RECOMMENDED -->
    </div>
    <!-- END COMEDIAN INFO -->

    <!-- APPEAREANCES -->
    <div class="w-full lg:w-2/3 lg:border-l pl-2">
      <!-- SPECIAL -->
      <div v-if="vip != undefined && vip.length > 0">
        <span class="text-lg text-red">Destacad@</span>
        <div role="list" class="flex flex-inline flex-wrap mb-2">
          <nuxt-link
            :to="'/programas/' + v.episodeId"
            tag="div"
            class="px-1 w-56 text-center hand"
            role="listItem "
            v-for="v in vip"
            :key="v.episodeId"
          >
            <img
              :src="'https://i.ytimg.com/vi_webp/' + v.ytID + '/mqdefault.webp'"
              :alt="v.episodeTitle"
              :title="v.episodeTitle"
              loading="lazy"
            />
            <p
              class="inline-block bg-gray-200 rounded-full px-1 py-1 text-gray-700 text-xs pl-1"
            >{{v.section}}</p>
            <p class="pl-1 text-sm text-left">{{v.episodeId.toUpperCase() + " - " + v.episodeTitle}}</p>
          </nuxt-link>
        </div>
        <hr class="mb-2" />
      </div>
      <!-- END SPECIAL -->

      <!-- MENTIONS -->
      <div>
        <span class="text-lg text-red">Mencionad@ en...</span>
        <div role="list" class="flex flex-inline flex-wrap justify-around">
          <nuxt-link
            :to="'/programas/' + mention.episodeId"
            tag="div"
            class="px-1 w-56 text-center mb-2 hand"
            role="listItem "
            v-for="mention in mentions"
            :key="mention.episodeId"
          >
            <img
              :src="'https://i.ytimg.com/vi_webp/' + mention.ytID + '/mqdefault.webp'"
              :alt="mention.episodeTitle"
              :title="mention.episodeTitle"
              loading="lazy"
            />
            <p
              class="pl-1 text-sm text-left"
            >{{mention.episodeId.toUpperCase() + " - " + mention.episodeTitle}}</p>
          </nuxt-link>
        </div>
      </div>
      <!-- END MENTIONS -->
    </div>
    <!-- END APPEAREANCES -->
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
      title: "Phi Beta Lambda - Comedia Perpetua | " + this.name,
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
  mounted() {
    fetch(`/api/comedians/${this.$route.params.id}.json`)
      .then(response => response.json())
      .then(comedian => {
        this.id = comedian.id;
        this.name = comedian.name;
        this.vip = comedian.vip;
        this.mentions = comedian.mentions;
        this.recommended = comedian.recommended;
        this.genres = comedian.genres;
        this.subjects = comedian.subjects;
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
.hand {
  cursor: pointer;
}
</style>