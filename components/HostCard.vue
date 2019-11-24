<template>
  <div class="column is-3-desktop is-6-tablet is-12-mobile">
    <div class="card bm--card-equal-height">
      <div class="card-image">
        <figure class="image">
          <img
            :src="'/images/comedians/' + host.id + '.jpg'"
            :alt="host.name"
          />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ host.name }}</p>
          </div>
        </div>
        <div class="content" v-html="$t(host.description)"></div>
      </div>
      <footer class="card-footer">
        <p class="card-footer-item">
          <span>
            <font-awesome-icon
              class="has - text - instagram"
              :icon="['fab', 'instagram']"
            />
            <a :href="'https://www.instagram.com/' + host.instagram">{{
              host.instagram
            }}</a>
          </span>
        </p>
        <p class="card-footer-item">
          <span>
            <font-awesome-icon
              class="has - text - instagram"
              :icon="['fab', 'twitter']"
            />
            <a :href="'https://www.twitter.com/' + host.twitter">{{
              host.twitter
            }}</a>
          </span>
        </p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: ["host"],
  data: {
    host: {
      facebook: '',
      instagram: '',
      twitter: '',
      description: '',
      name: '',
      id: ''
    }
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
