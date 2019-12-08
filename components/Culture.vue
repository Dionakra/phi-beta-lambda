<template>
  <div>
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
</template>

<script>
export default {
  props: ["culture"]
}
</script>