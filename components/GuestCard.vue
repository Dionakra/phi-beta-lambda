<template>
  <div class="mx-auto w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/6 px-2 pb-4" role="listitem">
    <div class="max-w-sm rounded overflow-hidden shadow-lg bm--card-equal-height">
      <img
        class="w-full"
        :src="'/images/comedians/' + guest.id + '.jpg'"
        :alt="guest.name"
        :title="guest.name"
        loading="lazy"
      />
      <div class="px-2 pb-2 pt-1">
        <nuxt-link :to="'/comicos/' + guest.id" class="font-bold text-xl block">{{guest.name}}</nuxt-link>
        <nuxt-link
          :to="'/programas/' + guest.episode.split('-')[0].trim().toLowerCase()"
          class="text-sm pl-2"
        >{{guest.episode}}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    guest: Object
  }
};
</script>

<style scoped>
.bm--card-equal-height {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.bm--card-equal-height .card-footer {
  margin-top: auto;
}
</style>
