<template>
  <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/6 px-1 pb-2" role="listitem">
    <nuxt-link :to="'/comicos/' + comedian.id">
      <div class="rounded overflow-hidden shadow-lg bm--card-equal-height">
        <img
          class="w-full"
          :src="'/images/comedians/' + comedian.id + '.jpg'"
          :alt="comedian.name"
          :title="comedian.name"
        />
        <div class="px-2  py-2">
          <div class="font-bold text-xl mb-2">{{ comedian.name }}</div>
        </div>

        <div class="text-sm pl-4 -mt-4 mb-2">Menciones: {{comedian.mentions}}</div>

        <div class=" pb-2 text-xs">
          <p
            v-for="tag in comedian.tags"
            :key="tag"
            class="inline-block bg-gray-200 rounded-full px-1 py-1 text-gray-700 sm:ml-1"
          >{{tag}}</p>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    comedian: Object
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
