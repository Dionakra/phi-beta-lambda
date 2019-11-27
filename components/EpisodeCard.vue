<template>
  <div class="sm:w-full lg:w-1/2 mt-4 mb-4 pl-4">
    <div
      class="h-48 lg:h-64 lg:w-auto f bg-cover rounded-t text-center overflow-hidden"
    >
      <iframe
        width="100%"
        height="100%"
        :src="episode.link"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <div
      class="border-r border-b border-l border-gray-400 border-l-0 border-t border-gray-400 bg-white rounded-b p-4 flex flex-col justify-between leading-normal"
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
          <div class="align-top ml-3 -pl-4" v-for="section in episode.sections" :key="section.id">
            <div class="pl-4">
            <p class="text-red align-top text-center">{{section.section.name}}</p>
            <div
              v-if="section.extra && section.extra.comedians && section.extra.comedians.length > 0"
               class="flex flex-inline mx-auto -pl-4"
            >
              <div v-for="comedian in section.extra.comedians" :key="comedian.id" class="mx-auto w-full">
                <img
                  class="rounded-full h-16 w-16 mx-auto"
                  :src="'/images/comedians/' + comedian.id+ '.jpg'"
                  :alt="comedian.name"
                  :title="comedian.name"
                />
                <p class="text-sm text-gray-600 text-center">{{comedian.name}}</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["episode"]
};
</script>