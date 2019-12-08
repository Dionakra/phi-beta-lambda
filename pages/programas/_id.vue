<template>
  <div class>
    <div class="sm:flex sm:flex-inline justify-center sm:flex-none">
      <div class="rounded-l text-center overflow-hidden my-auto sm:block">
        <img
          class="w-full"
          :src="'https://i.ytimg.com/vi_webp/' + episode.link + '/mqdefault.webp'"
          :title="'Portada ' + episode.title"
          :alt="'Portada ' + episode.title"
        />
      </div>
      <div class="p-2 flex leading-normal">
        <div class="inline-block align-top">
          <div class="text-gray-900 font-bold text-red text-xl flex flex-inline">
            <p class="my-auto">{{episode.id.toUpperCase()}} - {{episode.title}}</p>
          </div>
          <div class="flex flex-inline">
            <div>
              <p class="text-sm text-gray-600">Presentado por</p>
              <div class="flex flex-inline -ml-2">
                <img
                  v-for="host in episode.hosts"
                  :key="host.id"
                  class="rounded-full h-20 w-20 ml-3"
                  :src="'/images/comedians/' + host.id+ '_128.jpg'"
                  :alt="host.name"
                  :title="host.name"
                />
              </div>
            </div>
            <div v-if="episode.guests && episode.guests.length > 0" class="ml-10">
              <p class="text-sm text-gray-600">Invitad@s</p>
              <div class="flex flex-inline -ml-2">
                <nuxt-link
                  :to="'/comicos/' + guest.id"
                  v-for="guest in episode.guests"
                  :key="guest.id"
                >
                  <img
                    class="rounded-full h-20 w-20 ml-3"
                    :src="'/images/comedians/' + guest.id+ '_128.jpg'"
                    :alt="guest.name"
                    :title="guest.name"
                  />
                </nuxt-link>
              </div>
            </div>
          </div>

          <div class="flex flex-inline align-top mt-4">
            <div
              class="align-top ml-3 -pl-4"
              v-for="section in episode.sections"
              :key="section.section.id"
            >
              <div
                class="pl-4"
                v-if="section.extra && section.extra.comedians && section.extra.comedians.length > 0"
              >
                <p class="text-red align-top text-center">{{section.section.name}}</p>
                <p
                  v-if="section.section.id == 'thank-you'"
                  class="text-sm text-red text-center"
                >{{section.extra.culture[0].title}}</p>
                <p v-else>&nbsp;</p>
                <div class="flex flex-inline mx-auto -pl-4">
                  <div
                    v-for="comedian in section.extra.comedians"
                    :key="comedian.id"
                    class="mx-auto w-full"
                  >
                    <nuxt-link :to="'/comicos/' + comedian.id">
                      <img
                        class="rounded-full h-20 w-20 mx-auto"
                        :src="'/images/comedians/' + comedian.id+ '_128.jpg'"
                        :alt="comedian.name"
                        :title="comedian.name"
                      />

                      <p class="text-sm text-gray-600 text-center">{{comedian.name}}</p>
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="episode.special != undefined">
              <div class="align-top ml-3 -pl-4">
                <div class="pl-4">
                  <p class="text-red align-top text-center">In Memoriam</p>
                  <div class="flex flex-inline mx-auto -pl-4">
                    <div class="mx-auto w-full">
                      <nuxt-link :to="'/comicos/' + episode.special.id">
                        <img
                          class="rounded-full h-20 w-20 mx-auto bg-gray-100"
                          :src="'/images/comedians/' + episode.special.id+ '_128.jpg'"
                          :alt="episode.special.name"
                          :title="episode.special.name"
                        />
                        <p class="text-sm text-gray-600 text-center">{{episode.special.name}}</p>
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class v-if="episode.comedians && episode.comedians.length > 0">
      <span class="text-lg text-red">Cómic@s mencionados ({{episode.comedians.length}})</span>
      <div class="flex flex-inline flex-wrap">
        <div
          v-for="comedian in episode.comedians"
          :key="comedian.id"
          class="w-24 -mt-2 mx-auto sm:mx-0"
        >
          <nuxt-link :to="'/comicos/' + comedian.id">
            <img
              class="rounded-full h-20 w-20 mx-auto mt-4"
              :src="'/images/comedians/' + comedian.id+ '_128.jpg'"
              :alt="comedian.name"
              :title="comedian.name"
            />
            <p class="text-sm text-gray-700 text-center">{{comedian.name}}</p>
          </nuxt-link>
        </div>
      </div>
    </div>

    <div v-if="episode.culture && episode.culture.length > 0" class="mt-s">
      <span class="text-lg text-red">Cultura ({{episode.culture.length}})</span>
      <div class="flex flex-inline flex-wrap mx-4">
        <div
          v-for="culture in episode.culture"
          :key="culture.id"
          class="h-auto w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 mb-2 mt-6 relative"
        >
          <div
            v-if="culture.section"
            class="absolute top-0 mx-3 -mt-4 px-1 py-1 bg-red text-xs text-white text-center rounded-full"
          >{{culture.section}}</div>
          <img
            class="h-40 mx-auto mt-px mt-6"
            :src="'/images/culture/' + culture.id+ '.jpg'"
            :alt="culture.title"
            :title="culture.title"
          />
          <p class="text-sm text-gray-700 text-center mt-1">{{culture.title}}</p>
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
