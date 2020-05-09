<template>
  <div class="w-32 mx-auto px-1" role="listitem">
    <div
      v-if="culture.section"
      class="absolute top-0 px-1 py-1 bg-red text-xs text-white text-center rounded-full"
    >{{culture.section}}</div>
    <div class="h-48 align-middle">
      <img
        class="max-h-full mx-auto mt-auto"
        :src="'/images/culture/' + culture.id+ '.jpg'"
        :alt="'Portada de ' + culture.title"
        :title="culture.title"
        loading="lazy"
      />
    </div>
    <p class="text-sm text-gray-700 text-center mt-1 break-words">{{culture.title}}</p>
  </div>
</template>

<script>
export default {
  props: ["culture"]
};
</script>