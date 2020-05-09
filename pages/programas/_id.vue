<template>
  <div>
    <!-- TITLE -->
    <h1 class="text-center text-red text-4xl mb-4">{{episode.id.toUpperCase()}} - {{episode.title}}</h1>
    <!-- END TITLE -->

    <!-- CONTENT -->
    <div class="sm:flex sm:flex-inline justify-center sm:flex-none">
      <!-- YOUTUBE -->
      <div class="text-center overflow-hidden my-auto sm:block">
        <img
          class="w-full"
          :src="'https://i.ytimg.com/vi_webp/' + episode.link + '/mqdefault.webp'"
          :title="episode.title"
          :alt="'Imagen de portada del programa' + episode.title"
        />
        <div class="mt-4">
          <a
            target="_blank"
            rel="noopener"
            :href="'https://www.youtube.com/watch?v=' + episode.link"
            class="text-red pt-4"
            text
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 158 110"
              class="h-8 md:h-6 block mt-auto inline-block ml-4 md:ml-1"
            >
              <path
                fill="red"
                d="M154 18c-1-7-7-12-13-14-13-3-62-3-62-3S31 0 18 4C12 5 5 11 3 18 0 30 0 55 0 55s0 25 3 38c2 6 9 12 15 14 13 3 61 3 61 3s48 0 61-3c6-2 13-8 14-14 4-13 4-38 4-38s0-25-4-37z"
              />
              <path fill="#fff" d="M64 79l39-24-39-24z" />
            </svg>
            <span class="align-middle">Ver en YouTube</span>
          </a>
        </div>
      </div>
      <!-- END YOUTUBE -->

      <!-- PROGRAM SPECIAL -->
      <div class="px-2 flex leading-normal">
        <div class="inline-block align-top">
          <div class="flex flex-inline flex-wrap">
            <!-- HOSTS -->
            <div class="ml-3">
              <p class="text-sm text-gray-900">Presentado por</p>
              <div class="flex flex-inline" role="list">
                <Comedian
                  v-for="host in episode.hosts"
                  :key="host.id"
                  :comedian="host"
                  :showName="false"
                />
              </div>
            </div>
            <!-- END HOST -->

            <!-- GUESTS -->
            <div v-if="episode.guests && episode.guests.length > 0" class="ml-10">
              <p class="text-sm text-gray-900">Invitad@s</p>
              <div class="flex flex-inline -ml-2" role="list">
                <ComedianLink v-for="guest in episode.guests" :key="guest.id" :comedian="guest" />
              </div>
            </div>
            <!-- END GUESTS -->
          </div>

          <!-- SECTIONS -->
          <div
            class="flex flex-inline flex-wrap align-top mt-4"
            role="list"
            v-if="episode.sections && episode.sections.length > 0"
          >
            <div
              class="align-top ml-3 mx-auto text-center"
              v-for="section in episode.sections"
              :key="section.id"
              role="listitem"
            >
              <p class="text-red align-top text-center">{{section.name}}</p>
              <div role="list">
                <ComedianLink
                  v-for="comedian in section.comedians"
                  :key="comedian.id"
                  :comedian="comedian"
                />
              </div>
            </div>

            <div v-if="episode.special != undefined">
              <div class="align-top ml-3 -pl-4">
                <div class="pl-4">
                  <p class="text-red align-top text-center">Mención Especial</p>
                  <ComedianLink :comedian="episode.special" />
                </div>
              </div>
            </div>
          </div>
          <!-- END SECTIONS -->
        </div>
      </div>

      <!-- END PROGRAM SPECIAL -->
    </div>
    <div class v-if="episode.comedians && episode.comedians.length > 0">
      <span class="text-lg text-red">Cómic@s mencionados ({{episode.comedians.length}})</span>
      <div class="flex flex-inline flex-wrap" role="list">
        <div v-for="comedian in episode.comedians" :key="comedian.id" class="w-24 mx-auto sm:mx-0">
          <ComedianLink :comedian="comedian" />
        </div>
      </div>
    </div>

    <div v-if="episode.culture && episode.culture.length > 0" class="mt-6">
      <span class="text-lg text-red">Cultura ({{episode.culture.length}})</span>
      <div class="flex flex-inline flex-wrap mx-4" role="list">
        <div
          v-for="culture in episode.culture"
          :key="culture.id"
          class="mb-2 relative mx-auto sm:mx-0 mt-1"
        >
          <Culture :culture="culture" />
        </div>
      </div>
    </div>
    <!-- END CONTENT -->
  </div>
</template>

<script>
import axios from "axios";
import Culture from "~/components/Culture";
import ComedianLink from "~/components/ComedianLink";
import Comedian from "~/components/Comedian";

export default {
  head() {
    return {
      title: "Phi Beta Lambda - Comedia Perpetua | " + this.episode.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Detalle del programa " + this.episode.title
        }
      ]
    };
  },
  components: {
    Culture,
    Comedian,
    ComedianLink
  },
  asyncData({ params, error }) {
    return axios
      .get(`/api/episodes/${params.id}.json`)
      .then(x => {
        return {
          episode: x.data
        };
      })
      .catch(e => {
        error({ statusCode: 404, message: "Post not found" });
      });
  },
  data() {
    return {
      episode: {}
    };
  }
};
</script>
