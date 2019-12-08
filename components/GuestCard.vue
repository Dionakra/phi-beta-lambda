<template>
  <div class="mx-auto w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/6 p-2">
    <div class="max-w-sm rounded overflow-hidden shadow-lg bm--card-equal-height">
      <img
        class="w-full"
        :src="'/images/comedians/' + guest.id + '.jpg'"
        :alt="guest.name"
        :title="guest.name"
      />
      <div class="px-6 py-2">
        <div class="font-bold text-xl mb-2">{{ guest.name }}</div>
      </div>

      <div
        class="text-sm pl-6 -mt-4 mb-2"
      >{{guest.episode.id.toUpperCase()}} - {{guest.episode.title}}</div>
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
