<template>
  <div role="listitem">
    <img
      class="rounded-full mx-auto"
      :class="{ 'h-16 w-16':  small, 'h-20 w-20': !small}"
      :src="'/images/comedians/' + comedian.id+ '_128.jpg'"
      :alt="'Foto de ' + comedian.name"
      :title="comedian.name"
    />
    <p v-if="showName" class="text-sm text-gray-700 text-center">
      {{alternateName ? alternateName : comedian.name}}
      <span
        v-if="comedian.fitness"
        class="text-xs"
      ><br>( {{comedian.fitness }}% )</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    comedian: Object,
    showName: {
      type: Boolean,
      default: true
    },
    alternateName: String,
    small: {
      type: Boolean,
      default: false
    }
  }
};
</script>

