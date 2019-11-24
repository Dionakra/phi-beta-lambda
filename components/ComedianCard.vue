<template>
  <div class="column is-2-desktop is-4-tablet is-12-mobile">
    <nuxt-link :to="localePath({ path: '/comedians/' + comedian.id })">
      <div class="card bm--card-equal-height">
        <div class="card-image">
          <figure class="image">
            <img
              :src="'/images/comedians/' + comedian.id + '.jpg'"
              :alt="comedian.name"
            />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{{ comedian.name }}</p>
              {{ $t("comedian.appeareances.prefix") }}
              <strong>{{ comedian.appeareances }}</strong>
              {{ $t("comedian.appeareances.suffix") }}
            </div>
          </div>
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
a {
  color: hsl(10, 83%, 31%);
}
.bm--card-equal-height {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.bm--card-equal-height .card-footer {
  margin-top: auto;
}
</style>
