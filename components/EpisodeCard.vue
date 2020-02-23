<template>
  <div class="w-full md:w-1/2 lg:w-1/3 mb-4 px-2" role="listitem">
    <nuxt-link :to="'/programas/' + episode.id" :key="episode.id">
      <!-- THUMBNAIL -->
      <div class="w-full bg-cover rounded-t text-center overflow-hidden">
        <img
          class="w-full md:-my-16 lg:-my-10 h-auto"
          :src="'https://i.ytimg.com/vi_webp/' + episode.link + '/sddefault.webp'"
          :title="episode.title"
          :alt="'Portada ' + episode.title"
        />
      </div>
      <!-- END THUMBNAIL -->

      <!-- CONTENT -->
      <div
        class="border-r border-b border-l border-gray-400 border-l-0 border-t border-gray-400 bg-white rounded-b p-2 flex flex-col justify-between leading-normal hover:shadow-lg"
      >
        <div class="inline-block align-top">
          <!-- TITLE -->
          <div class="text-gray-900 font-bold text-red text-xl flex flex-inline">
            <p class="my-auto">{{episode.id.toUpperCase()}} - {{episode.title}}</p>
          </div>
          <!-- END TITLE -->

          <!-- PEOPLE IN THE PROGRAM -->
          <div class="flex flex-inline flex-wrap">
            <!-- HOSTS -->
            <div class="mr-4">
              <p class="text-sm text-gray-900">Presentadores</p>
              <div class="flex flex-inline flex-wrap -ml-1">
                <Comedian
                  v-for="host in episode.hosts"
                  :key="host.id"
                  :comedian="host"
                  :showName="false"
                  :small="true"
                />
              </div>
            </div>
            <!-- END HOSTS -->

            <!-- GUESTS -->
            <div v-if="episode.guests && episode.guests.length > 0">
              <p class="text-sm text-gray-900">Invitad@s</p>
              <div class="flex flex-inline -ml-2">
                <Comedian
                  v-for="guest in episode.guests"
                  :key="guest.id"
                  :comedian="guest"
                  :showName="false"
                  :small="true"
                />
              </div>
            </div>
            <!-- END GUESTS -->
          </div>
          <!-- END PEOPLE IN THE PROGRAM -->

          <!-- SECTIONS -->
          <div class="flex flex-inline flex-wrap justify-around align-top mt-4">
            <div class="align-top" v-for="section in episode.sections" :key="section.id">
              <span class="text-red align-top text-center text-sm">{{section.name}}</span>
              <div class="flex flex-inline mx-auto">
                <div
                  v-for="comedian in section.comedians"
                  :key="comedian.id"
                  class="mx-auto w-full"
                >
                  <Comedian
                    :key="comedian.id"
                    :comedian="comedian"
                    :showName="true"
                    :small="true"
                    :alternateName="section.culture ? section.culture.title : comedian.name"
                  />
                </div>
              </div>
            </div>

            <div v-if="episode.special != undefined">
              <div class="align-top ml-1 -pl-3">
                <div class="pl-4">
                  <p class="text-red align-top text-center">Mención Especial</p>
                  <div class="flex flex-inline mx-auto -pl-1">
                    <div class="mx-auto w-full">
                      <Comedian
                        :key="episode.special.id"
                        :comedian="episode.special"
                        :showName="true"
                        :small="true"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- END SECTIONS -->
        </div>
      </div>
      <!-- END CONTENT -->
    </nuxt-link>
  </div>
</template>

<script>
import Comedian from "~/components/Comedian";

export default {
  components: {
    Comedian
  },
  props: ["episode"]
};
</script>