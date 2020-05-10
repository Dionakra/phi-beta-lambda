<template>
  <div>
    <!-- TITLE -->
    <h1 class="text-center text-red text-4xl mb-2">{{episode.title}}</h1>
    <!-- END TITLE -->

    <!-- CONTAINER -->
    <div class="flex flex-inline flex-wrap w-full" v-if="episode.link != undefined">
      <!-- PROGRAM INFO -->
      <div class="w-full md:w-1/3 px-2">
        <!-- YOUTUBE -->
        <div class="text-center overflow-hidden my-auto sm:block mb-1">
          <img
            class="w-full"
            :src="'https://i.ytimg.com/vi_webp/' + episode.link + '/mqdefault.webp'"
            :title="episode.title"
            :alt="'Imagen de portada del programa' + episode.title"
            :srcset="'https://i.ytimg.com/vi_webp/' + episode.link + '/mqdefault.webp 480w, https://i.ytimg.com/vi_webp/' + episode.link + '/maxresdefault.webp 800w'"
            sizes="(max-width: 600px) 480px, 800px"
            ref="thumbnail"
          />
        </div>
        <!-- END YOUTUBE -->

        <!-- META -->
        <div class="flex flex-inline justify-around mb-2">
          <div>
            <p>
              <span class="font-bold text-red">Temporada:</span>
              {{episode.season}}
            </p>
            <p>
              <span class="font-bold text-red">Programa:</span>
              {{episode.episode}}
            </p>
          </div>
          <div class="text-center">
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
                class="h-8 md:h-6 block mt-auto inline-block mx-auto text-center"
              >
                <path
                  fill="red"
                  d="M154 18c-1-7-7-12-13-14-13-3-62-3-62-3S31 0 18 4C12 5 5 11 3 18 0 30 0 55 0 55s0 25 3 38c2 6 9 12 15 14 13 3 61 3 61 3s48 0 61-3c6-2 13-8 14-14 4-13 4-38 4-38s0-25-4-37z"
                />
                <path fill="#fff" d="M64 79l39-24-39-24z" />
              </svg>
              <p class="align-middle">Ver en YouTube</p>
            </a>
          </div>
        </div>
        <!-- END META -->

        <!-- PEOPLE IN THE EPISODE -->
        <div class="flex flex-inline flex-wrap">
          <!-- HOSTS -->
          <div class="flex-grow">
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
          <!-- END HOSTS -->

          <!-- GUESTS -->
          <div v-if="episode.guests && episode.guests.length > 0">
            <p class="text-sm text-gray-900 text-center">Invitad@s</p>
            <div class="flex flex-inline justify-center" role="list">
              <ComedianLink v-for="guest in episode.guests" :key="guest.id" :comedian="guest" />
            </div>
          </div>
          <!-- END GUESTS -->
        </div>
        <!-- END PEOPLE IN THE EPISODE -->

        <!-- SECTIONS-->
        <div
          class="flex flex-inline flex-wrap align-top mt-2"
          role="list"
          v-if="episode.sections && episode.sections.length > 0"
        >
          <div
            class="align-top mx-auto text-center"
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
      <!-- END PROGRAM INFO -->

      <!-- COMEDIANS AND CULTURE -->
      <div class="w-full md:w-2/3 md:border-l pl-2">
        <!-- COMEDIANS -->
        <div class v-if="episode.comedians && episode.comedians.length > 0">
          <span class="text-lg text-red">Cómic@s mencionados ({{episode.comedians.length}})</span>
          <div class="flex flex-inline flex-wrap" role="list">
            <div
              v-for="comedian in episode.comedians"
              :key="comedian.id"
              class="w-24 mx-auto sm:mx-0"
            >
              <ComedianLink :comedian="comedian" />
            </div>
          </div>
        </div>
        <!-- END COMEDIANS -->

        <!-- CULTURE -->
        <div v-if="episode.culture && episode.culture.length > 0" class="mt-2">
          <span class="text-lg text-red">Cultura ({{episode.culture.length}})</span>
          <div class="flex flex-inline flex-wrap" role="list">
            <div
              v-for="culture in episode.culture"
              :key="culture.id"
              class="mb-2 relative mx-auto sm:mx-0"
            >
              <Culture :culture="culture" />
            </div>
          </div>
        </div>
        <!-- END CULTURE -->
      </div>

      <!-- END COMEDIANS AND CULTURE -->
    </div>
    <!-- END CONTENT -->
  </div>
</template>

<script>
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
  mounted() {
    fetch(`/api/episodes/${this.$route.params.id}.json`)
      .then(response => response.json())
      .then(episode => (this.episode = episode));
  },
  data() {
    return {
      episode: {}
    };
  }
};
</script>
