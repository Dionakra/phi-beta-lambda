<template>
  <div class="w-full text-center my-24">
    <img src="/images/nothing.gif" class="mx-auto" />
    <span class="block text-red text-2xl">Nada que ver por aquí...</span>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "blog" // you can set a custom layout for the error page
};
</script>