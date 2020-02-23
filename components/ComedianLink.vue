<template>
  <nuxt-link :to="'/comicos/' + comedian.id">
    <Comedian :comedian="comedian" :showName="showName" :alternateName="alternateName" />
  </nuxt-link>
</template>

<script>
import Comedian from "./Comedian";

export default {
  components: {
    Comedian
  },
  props: {
    comedian: Object,
    showName: {
      type: Boolean,
      default: true
    },
    alternateName: String
  }
};
</script>

