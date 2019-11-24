<template>
  <div class="container">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" :to="localePath('index')">
          <img src="/icons/logo-desc.png" height="100%" />
        </nuxt-link>

        <a
          role="button"
          class="navbar-burger burger"
          :class="{ 'is-active': isActive }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          @click="isActive = !isActive"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': isActive }">
        <div class="navbar-start">
          <nuxt-link class="navbar-item" :to="localePath('hosts')">{{ $t('menu.hosts')}}</nuxt-link>
          <nuxt-link class="navbar-item" :to="localePath('sections')">{{ $t('menu.sections')}}</nuxt-link>
          <nuxt-link class="navbar-item" :to="localePath('guests')">{{ $t('menu.guests')}}</nuxt-link>
          <nuxt-link class="navbar-item" :to="localePath('comedians')">{{ $t('menu.comedians')}}</nuxt-link>
        </div>

        <div class="navbar-end">
          <a
            class="navbar-item has-text-youtube"
            target="_blank"
            href="https://www.youtube.com/channel/UCFKcIYyLxfQBAD4r0Bq1RfA"
          >
            <font-awesome-icon class="has-text-youtube" :icon="['fab', 'youtube']" />
          </a>
          <a class="navbar-item" target="_blank" href="https://twitter.com/ComediaPerpetua">
            <font-awesome-icon class="has-text-twitter" :icon="['fab', 'twitter']" />
          </a>
          <a class="navbar-item" target="_blank" href="https://www.instagram.com/phi.beta.lambda/">
            <font-awesome-icon class="has-text-instagram" :icon="['fab', 'instagram']" />
          </a>
          <a
            class="navbar-item"
            target="_blank"
            href="https://www.facebook.com/PhiBetaLambda.Comedy/"
          >
            <font-awesome-icon class="has-text-facebook" :icon="['fab', 'facebook']" />
          </a>
          <div class="navbar-item">
            <nuxt-link v-if="$i18n.locale !== 'en'" :to="switchLocalePath('en')">
              <button class="button is-danger">
                <font-awesome-icon :icon="['fas', 'globe']" />
                <span>&nbsp;EN</span>
              </button>
            </nuxt-link>

            <nuxt-link v-if="$i18n.locale !== 'es'" :to="switchLocalePath('es')">
              <button class="button is-danger">
                <font-awesome-icon :icon="['fas', 'globe']" />
                <span>&nbsp;ES</span>
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </nav>
    <hr>
    <nuxt />
  </div>
</template>


<script>
export default {
  data() {
    return {
      isActive: false
    };
  }
};
</script>

<style>
.pbl-red {
  color: hsl(2, 64%, 47%);
}
.fa-twitter {
  color: hsl(197, 100%, 47%);
}
.fa-youtube {
  color: hsl(2, 64%, 47%);
}
.fa-facebook {
  color: hsl(221, 44%, 41%);
}
.fa-instagram {
  color: hsl(27, 42%, 57%);
}
</style>
