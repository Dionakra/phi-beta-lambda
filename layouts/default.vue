<template>
  <div class="mx-auto sm:px-4 md:px-16 font-sans antialiased">
    <!-- NAVBAR -->
    <nav class="flex items-center justify-between flex-wrap py-2">
      <!-- START LOGO -->
      <div class="items-center text-white mr-3">
        <nuxt-link to="/">
          <img
            src="/icons/logo-desc-min.webp"
            class="h-12"
            title="Comedia Perpetua"
            alt="Logo de Comedia Perpetua / Phi Beta Lambda"
          />
        </nuxt-link>
      </div>
      <!-- END LOGO -->

      <!-- START BURGER -->
      <div class="block sm:hidden">
        <button
          @click="toggle"
          class="flex items-center px-3 py-2 mr-3 border rounded text-teal-lighter border-teal-light hover:text-red hover:border-red"
        >
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <!-- END BURGER -->

      <!-- START LINKS -->
      <div
        :class="open ? 'block' : 'hidden'"
        class="w-full flex-grow sm:flex sm:items-center sm:w-auto"
      >
        <!-- START LOCAL PAGES -->
        <div class="text-sm md:flex-grow">
          <nuxt-link
            class="no-underline block mt-auto sm:inline-block sm:mt-0 text-teal-lighter hover:text-red my-1 text-lg md:my-0 md:text-sm ml-4 md:ml-1"
            to="/presentadores"
            v-on:click.native="toggle()"
          >Presentadores</nuxt-link>
          <nuxt-link
            class="no-underline block mt-auto sm:inline-block sm:mt-0 text-teal-lighter hover:text-red my-1 text-lg md:my-0 md:text-sm ml-4 md:ml-1"
            to="/secciones"
            v-on:click.native="toggle()"
          >Secciones</nuxt-link>
          <nuxt-link
            class="no-underline block mt-auto sm:inline-block sm:mt-0 text-teal-lighter hover:text-red my-1 text-lg md:my-0 md:text-sm ml-4 md:ml-1"
            to="/invitados"
            v-on:click.native="toggle()"
          >Invitad@s</nuxt-link>
          <nuxt-link
            class="no-underline block mt-auto sm:inline-block sm:mt-0 text-teal-lighter hover:text-red my-1 text-lg md:my-0 md:text-sm ml-4 md:ml-1"
            to="/comicos"
            v-on:click.native="toggle()"
          >Cómic@s</nuxt-link>
          <nuxt-link
            class="no-underline block mt-auto sm:inline-block sm:mt-0 text-teal-lighter hover:text-red my-1 text-lg md:my-0 md:text-sm ml-4 md:ml-1"
            to="/cultura"
            v-on:click.native="toggle()"
          >Cultura</nuxt-link>
          <nuxt-link
            class="no-underline block mt-auto sm:inline-block sm:mt-0 text-teal-lighter hover:text-red my-1 text-lg md:my-0 md:text-sm ml-4 md:ml-1"
            to="/estadisticas"
            v-on:click.native="toggle()"
          >Estadísticas</nuxt-link>
        </div>
        <!-- END LOCAL PAGES -->

        <!-- START SOCIAL NETWORKS -->
        <div>
          <!-- YOUTUBE -->
          <a
            target="_blank"
            rel="noopener"
            href="https://www.youtube.com/channel/UCFKcIYyLxfQBAD4r0Bq1RfA"
            aria-label="Link al canal de YouTube"
            class="outline-none focus:shadow-outline focus:bg-blue-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              class="youtube h-8 md:h-6 block mt-auto sm:inline-block ml-4 md:ml-1"
            >
              <path
                d="M10 2.3C.172 2.3 0 3.174 0 10s.172 7.7 10 7.7 10-.874 10-7.7-.172-7.7-10-7.7zm3.205 8.034l-4.5 2.096c-.393.182-.715-.022-.715-.456V8.026c0-.433.322-.638.715-.456l4.5 2.096c.393.184.393.484 0 .668z"
              />
            </svg>
          </a>
          <!-- END YOUTUBE -->

          <!-- TWITTER -->
          <a
            target="_blank"
            rel="noopener"
            href="https://twitter.com/ComediaPerpetua"
            aria-label="Link a Twitter"
            class="outline-none focus:shadow-outline focus:bg-blue-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              class="twitter h-8 md:h-6 block mt-auto sm:inline-block ml-4 md:ml-1"
            >
              <path
                d="M17.316 6.246l.01.488c0 5-3.797 10.742-10.74 10.742-2.133 0-4.116-.625-5.787-1.697a7.66 7.66 0 0 0 .9.053c1.77 0 3.397-.604 4.688-1.615a3.78 3.78 0 0 1-3.526-2.621 3.86 3.86 0 0 0 .71.066c.345 0 .68-.045.995-.13a3.78 3.78 0 0 1-3.028-3.703V7.78c.51.283 1.092.453 1.7.473-1.013-.678-1.68-1.832-1.68-3.143a3.75 3.75 0 0 1 .512-1.898C3.942 5.498 6.725 7 9.862 7.158c-.064-.277-.097-.564-.097-.86 0-2.084 1.69-3.773 3.774-3.773a3.77 3.77 0 0 1 2.756 1.191 7.6 7.6 0 0 0 2.397-.916 3.79 3.79 0 0 1-1.66 2.088 7.55 7.55 0 0 0 2.168-.594c-.506.758-1.146 1.422-1.884 1.953z"
              />
            </svg>
          </a>
          <!-- END TWITTER -->

          <!-- INSTAGRAM -->
          <a
            target="_blank"
            rel="noopener"
            href="https://www.instagram.com/phi.beta.lambda/"
            aria-label="Link a Instagram"
            class="outline-none focus:shadow-outline focus:bg-blue-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              class="instagram h-8 md:h-6 block mt-auto sm:inline-block ml-4 md:ml-1"
            >
              <path
                d="M17.946 5.29c-.015-.747-.156-1.485-.418-2.185a4.41 4.41 0 0 0-1.038-1.594A4.41 4.41 0 0 0 14.895.472C14.196.21 13.457.07 12.71.054L9 0 5.29.054C4.543.07 3.804.21 3.105.472a4.41 4.41 0 0 0-1.594 1.038A4.41 4.41 0 0 0 .472 3.105C.21 3.804.07 4.543.054 5.29L0 9l.054 3.71c.015.747.156 1.485.418 2.185a4.41 4.41 0 0 0 1.038 1.594 4.41 4.41 0 0 0 1.594 1.038c.7.262 1.438.403 2.185.418L9 18l3.71-.054c.747-.015 1.485-.156 2.185-.418a4.6 4.6 0 0 0 2.632-2.632c.262-.7.403-1.438.418-2.185L18 9l-.054-3.71zm-1.62 7.347a4.98 4.98 0 0 1-.31 1.671 2.98 2.98 0 0 1-1.708 1.708 4.98 4.98 0 0 1-1.671.31L9 16.378c-2.403 0-2.688-.01-3.637-.052a4.98 4.98 0 0 1-1.671-.31 2.79 2.79 0 0 1-1.035-.673 2.79 2.79 0 0 1-.673-1.035 4.98 4.98 0 0 1-.31-1.671L1.622 9l.052-3.637a4.98 4.98 0 0 1 .31-1.671 2.79 2.79 0 0 1 .673-1.035 2.79 2.79 0 0 1 1.035-.673 4.98 4.98 0 0 1 1.671-.31L9 1.622l3.637.052a4.98 4.98 0 0 1 1.671.31 2.79 2.79 0 0 1 1.035.673 2.79 2.79 0 0 1 .673 1.035 4.98 4.98 0 0 1 .31 1.671L16.378 9l-.052 3.637zM9 4.378c-2.552 0-4.622 2.07-4.622 4.622S6.448 13.622 9 13.622s4.622-2.07 4.622-4.622S11.552 4.378 9 4.378zM9 12a3 3 0 1 1 0-6 3 3 0 1 1 0 6zm5.884-7.804a1.08 1.08 0 0 1-1.844.764 1.08 1.08 0 0 1 .764-1.844 1.08 1.08 0 0 1 1.08 1.08z"
              />
            </svg>
          </a>
          <!-- END INSTAGRAM -->

          <!-- FACEBOOK -->
          <a
            target="_blank"
            rel="noopener"
            href="https://www.facebook.com/PhiBetaLambda.Comedy/"
            aria-label="Link a Facebook"
            class="outline-none focus:shadow-outline focus:bg-blue-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              class="facebook h-8 md:h-6 block mt-auto sm:inline-block ml-4 md:ml-1"
            >
              <path
                d="M17 1H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h7v-7H8V9.525h2v-2.05c0-2.164 1.212-3.684 3.766-3.684l1.803.002v2.605h-1.197c-.994 0-1.372.746-1.372 1.438v1.7h2.568L15 12h-2v7h4c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2z"
              />
            </svg>
          </a>
          <!-- END FACEBOOK -->
        </div>
        <!-- END SOCIAL NETWORKS -->
      </div>
    </nav>
    <!-- END NAVBAR -->

    <!-- CONTENT -->
    <main>
      <nuxt />
    </main>
    <!-- END CONTENT -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    }
  }
};
</script>

<style>
.twitter {
  fill: hsl(197, 100%, 47%);
}
.youtube {
  fill: hsl(2, 64%, 47%);
}
.facebook {
  fill: hsl(221, 44%, 41%);
}
.instagram {
  fill: hsl(27, 42%, 57%);
}

.page-enter-active {
  transition: opacity 0.25s ease-out;
}

.page-leave-active {
  transition: opacity 0.25s ease-in;
}

.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>
