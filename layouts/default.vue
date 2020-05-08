<template>
  <div class="mx-auto sm:px-4 md:px-16 font-sans antialiased h-screen">
    <!-- NAVBAR -->
    <nav class="flex items-center justify-between flex-wrap py-2">
      <!-- START LOGO -->
      <div class="items-center text-white">
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
            <title>Menú</title>
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
            class="no-underline block mt-auto sm:inline-block sm:mt-0 text-teal-lighter hover:text-red text-lg md:text-sm ml-1 sm:ml-2"
            v-on:click.native="toggle()"
            v-for="menuItem in menu"
            :key="menuItem.route"
            :to="menuItem.route"
          >{{menuItem.name}}</nuxt-link>
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
              viewBox="0 0 158 110"
              class="h-8 md:h-6 block mt-auto sm:inline-block ml-4 md:ml-1"
            >
              <path
                fill="red"
                d="M154 18c-1-7-7-12-13-14-13-3-62-3-62-3S31 0 18 4C12 5 5 11 3 18 0 30 0 55 0 55s0 25 3 38c2 6 9 12 15 14 13 3 61 3 61 3s48 0 61-3c6-2 13-8 14-14 4-13 4-38 4-38s0-25-4-37z"
              />
              <path fill="#fff" d="M64 79l39-24-39-24z" />
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
              viewBox="0 0 461.8 375.3"
              class="h-8 md:h-6 block mt-auto sm:inline-block ml-4 md:ml-1"
            >
              <path
                fill="#55ACEE"
                d="M462 44c-17 8-35 13-55 15 20-11 35-30 42-52-18 11-39 19-60 23a95 95 0 00-161 86c-79-4-149-41-196-99a95 95 0 0029 127c-15-1-30-5-42-12v1c0 46 32 84 76 93a93 93 0 01-43 2c12 37 47 65 88 66A190 190 0 010 333c42 27 92 42 145 42A268 268 0 00414 93c19-13 35-30 48-49z"
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
              viewBox="0 0 3365 3365"
              class="h-8 md:h-6 block mt-auto sm:inline-block ml-4 md:ml-1"
            >
              <defs>
                <radialGradient
                  id="a"
                  cx="217.8"
                  cy="3291"
                  r="4271.9"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset=".1" stop-color="#fa8f21" />
                  <stop offset=".8" stop-color="#d82d7e" />
                </radialGradient>
                <radialGradient
                  id="b"
                  cx="2330.6"
                  cy="3182.9"
                  r="3759.3"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset=".6" stop-color="#8c3aaa" stop-opacity="0" />
                  <stop offset="1" stop-color="#8c3aaa" />
                </radialGradient>
              </defs>
              <path
                fill="url(#a)"
                d="M853 3353c-200-9-309-43-381-71-96-37-164-81-236-153s-116-140-153-236c-29-72-62-181-71-381-10-217-12-281-12-829s2-613 12-830c9-200 43-308 71-381 37-96 81-164 153-236S376 120 472 83c72-29 181-62 381-71 217-10 282-12 829-12 548 0 613 2 830 12 200 9 308 43 381 71 95 37 164 81 236 153s116 140 153 236c28 72 62 181 71 381 10 217 12 281 12 829s-2 613-12 830c-9 200-43 308-71 381-37 96-82 164-153 236s-141 116-236 153c-73 28-181 62-381 71-217 10-282 12-830 12-547 0-612-2-829-12"
              />
              <path
                fill="url(#b)"
                d="M853 3353c-200-9-309-43-381-71-96-37-164-81-236-153s-116-140-153-236c-29-72-62-181-71-381-10-217-12-281-12-829s2-613 12-830c9-200 43-308 71-381 37-96 81-164 153-236S376 120 472 83c72-29 181-62 381-71 217-10 282-12 829-12 548 0 613 2 830 12 200 9 308 43 381 71 95 37 164 81 236 153s116 140 153 236c28 72 62 181 71 381 10 217 12 281 12 829s-2 613-12 830c-9 200-43 308-71 381-37 96-82 164-153 236s-141 116-236 153c-73 28-181 62-381 71-217 10-282 12-830 12-547 0-612-2-829-12"
              />
              <path
                fill="#fff"
                d="M1269 1690a417 417 0 11834-1 417 417 0 01-834 1m-225 0a642 642 0 101284 0 642 642 0 00-1284 0m1159-668a150 150 0 10150-150 150 150 0 00-150 150M1181 2707c-122-6-188-26-232-43-59-23-100-50-144-93s-71-86-94-144c-17-44-37-110-43-232-6-132-7-172-7-505s1-374 7-506c6-121 26-188 43-232 23-58 50-100 94-144s85-70 144-93c44-17 110-37 232-43 132-6 171-7 505-7s373 1 505 7c122 6 188 26 232 43 58 23 100 50 144 94s71 85 93 143c18 44 38 111 43 232 6 132 8 172 8 506s-2 373-8 505c-5 122-26 188-43 232-22 58-49 100-93 144s-86 70-144 93c-44 17-110 37-232 43-132 6-171 7-505 7s-373-1-505-7m-10-2260c-134 6-224 27-304 58-82 32-152 75-221 144S533 788 501 871c-30 79-52 170-58 303s-7 176-7 516 1 382 7 515 28 224 58 303c32 82 75 152 145 222s139 112 221 144c80 31 170 52 304 58 133 6 175 8 515 8s382-2 515-8 224-27 304-58c82-32 151-75 221-144s112-140 144-222c31-79 52-170 58-303 6-134 8-176 8-515s-2-383-8-516-27-224-58-303c-32-82-75-152-144-222s-139-112-221-144c-80-31-171-52-304-58s-176-7-515-7-382 1-515 7"
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
              viewBox="0 0 409 409"
              class="h-8 md:h-6 block mt-auto sm:inline-block ml-4 md:ml-1"
            >
              <path
                fill="#475993"
                d="M354 0H55C25 0 0 25 0 55v299c0 30 25 55 55 55h147l1-146h-38c-5 0-9-4-9-9v-47c0-5 4-9 8-9h38v-46c0-53 33-81 80-81h38c5 0 9 4 9 9v39c0 5-4 9-9 9h-23c-26 0-31 12-31 30v40h56c6 0 10 4 9 10l-5 47c-1 4-5 8-9 8h-51v146h88c30 0 55-25 55-55V55c0-30-25-55-55-55z"
              />
            </svg>
          </a>
          <!-- END FACEBOOK -->

          <!-- KO-FI LINK -->
          <a
            target="_blank"
            rel="noopener"
            href="https://ko-fi.com/phibetawiki"
            aria-label="Link a Ko-Fi para apoyarme :)"
            class="outline-none focus:shadow-outline focus:bg-blue-100"
          >
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 500 500"
              class="h-8 md:h-6 block mt-auto sm:inline-block ml-4 md:ml-1"
            >
              <path fill="#fff" d="M352 489H148l-28-375h260l-28 375z" />
              <path class="cls-2" d="M333 114l-28 375h47l28-375h-47z" />
              <path fill="#b3814b" d="M374 411H126l-26-253h300l-26 253z" />
              <path class="cls-2" d="M353 158l-26 253h47l26-253h-47z" />
              <path class="cls-4" d="M101 64h298v51H101z" />
              <path class="cls-2" transform="rotate(180 376 89)" d="M352 64h48v51h-48z" />
              <path class="cls-4" d="M362 11H138l-18 53h260l-18-53z" />
              <path class="cls-2" d="M362 11h-47l18 53h47l-18-53z" />
              <circle class="cls-4" cx="250" cy="278.4" r="67.6" />
              <path class="cls-2" d="M282 219a68 68 0 01-91 92 68 68 0 1091-92z" />
              <path
                class="cls-5"
                d="M374 411H126l-26-253h300l-26 253zM101 64h298v51H101zM362 11H138l-18 53h260l-18-53z"
              />
              <circle class="cls-5" cx="250" cy="278.4" r="67.6" />
              <path class="cls-5" d="M377 158l3-44H120l3 44h254zM142 411l6 78h204l6-78H142z" />
            </svg>
          </a>

          <!-- END KO-FI -->
        </div>
        <!-- END SOCIAL NETWORKS -->
      </div>
    </nav>
    <!-- END NAVBAR -->

    <hr />

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
      open: false,
      menu: [
        {
          route: "/presentadores",
          name: "Presentadores"
        },
        {
          route: "/secciones",
          name: "Secciones"
        },
        {
          route: "/invitados",
          name: "Invitad@s"
        },
        {
          route: "/comicos",
          name: "Cómic@s"
        },
        {
          route: "/cultura",
          name: "Cultura"
        },
        {
          route: "/estadísticas",
          name: "Estadísticas"
        },
        {
          route: "/mapa",
          name: "Mapa de la comedia"
        }
      ]
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
/* Page Transitions */
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

/* Ko-fi Icon */
.cls-2 {
  opacity: 0.15;
}
.cls-4 {
  fill: #513b2c;
}
.cls-5 {
  fill: none;
  stroke: #000;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 20px;
}
</style>
