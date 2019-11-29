<template>
  <div class="mx-auto sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/5 px-2 py-2">
    <div class="max-w-sm rounded overflow-hidden shadow-lg bm--card-equal-height">
      <img
        class="w-full"
        :src="'/images/comedians/' + comedian.details.id + '.jpg'"
        :alt="comedian.details.name"
        :title="comedian.details.name"
      />
      <div class="px-6 py-2">
        <div class="font-bold text-xl mb-2">{{ comedian.details.name }}</div>
      </div>

      <div class="text-sm pl-8 -mt-4 mb-2">Menciones: {{comedian.appeareances}}</div>

      <div class="px-6 pb-2 text-xs">
        <span
          v-if="comedian.details.day"
          class="inline-block bg-gray-200 rounded-full px-3 py-1 font-semibold text-gray-700 mr-2"
        >#CómicoDelDía</span>
        <span
          v-if="comedian.details.thank"
          class="inline-block bg-gray-200 rounded-full px-3 py-1 font-semibold text-gray-700 mr-2"
        >#ThankYouForThisBeautifulComedy</span>
      </div>
    </div>
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
