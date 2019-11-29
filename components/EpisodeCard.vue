<template>
  <div class="w-full lg:w-1/2 mt-4 mb-4 pl-2 pr-2">
    <nuxt-link :to="'/programas/' + episode.id" :key="episode.id">
      <div class="w-full bg-cover rounded-t text-center overflow-hidden">
        <img
          class="w-full -mt-16 -mb-16"
          :src="'https://i.ytimg.com/vi_webp/' + episode.link + '/sddefault.webp'"
          :title="'Portada' + episode.title"
          :alt="'Portada' + episode.title"
        />
      </div>
      <div
        class="border-r border-b border-l border-gray-400 border-l-0 border-t border-gray-400 bg-white rounded-b p-4 flex flex-col justify-between leading-normal hover:shadow-lg"
      >
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
                  class="rounded-full h-16 w-16 ml-3"
                  :src="'/images/comedians/' + host.id+ '_128.jpg'"
                  :alt="host.name"
                  :title="host.name"
                />
              </div>
            </div>
            <div v-if="episode.guests && episode.guests.length > 0" class="ml-10">
              <p class="text-sm text-gray-600">Invitados</p>
              <div class="flex flex-inline -ml-2">
                <img
                  v-for="guest in episode.guests"
                  :key="guest.id"
                  class="rounded-full h-16 w-16 ml-3"
                  :src="'/images/comedians/' + guest.id+ '_128.jpg'"
                  :alt="guest.name"
                  :title="guest.name"
                />
              </div>
            </div>
          </div>

          <div class="flex flex-inline align-top mt-4">
            <div
              class="align-top ml-3 -pl-4"
              v-for="section in episode.sections"
              :key="section.section"
            >
              <div class="pl-4">
                <p class="text-red align-top text-center">{{section.section}}</p>
                <div
                  v-if="section.extra && section.extra.comedians && section.extra.comedians.length > 0"
                  class="flex flex-inline mx-auto -pl-4"
                >
                  <div
                    v-for="comedian in section.extra.comedians"
                    :key="comedian.id"
                    class="mx-auto w-full"
                  >
                    <img
                      class="rounded-full h-16 w-16 mx-auto"
                      :src="'/images/comedians/' + comedian.id+ '_128.jpg'"
                      :alt="comedian.name"
                      :title="comedian.name"
                    />
                    <p class="text-sm text-gray-600 text-center">{{comedian.name}}</p>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="episode.special != undefined">
              <div
                class="align-top ml-3 -pl-4"
              >
                <div class="pl-4">
                  <p class="text-red align-top text-center">In Memoriam</p>
                  <div
                    class="flex flex-inline mx-auto -pl-4"
                  >
                    <div
                      class="mx-auto w-full"
                    >
                      <img
                        class="rounded-full h-16 w-16 mx-auto bg-gray-100"
                        :src="'/images/comedians/' + episode.special.id+ '_128.jpg'"
                        :alt="episode.special.name"
                        :title="episode.special.name"
                      />
                      <p class="text-sm text-gray-600 text-center">{{episode.special.name}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ["episode"]
};
</script>