<template>
  <div class="md:w-1/2 lg:w-1/4 px-2 main mx-auto" role="listitem">
    <div class="max-w-sm rounded overflow-hidden shadow-lg bm--card-equal-height">
      <img class="w-full" :src="'/images/comedians/' + host.id + '.jpg'" :alt="host.name" />
      <div class="px-6 py-4">
        <p class="text-xl mb-2 subpixel-antialiased">{{ host.name }}</p>
        <p class="text-gray-700 text-sm" v-html="host.description"></p>
      </div>

      <div class="card-footer container">
        <a
          :href="'https://www.instagram.com/' + host.instagram"
          class="inline-flex text-sm font-semibold text-gray-700 ml-6 -mt-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            class="instagram h-6 flex sm:inline-flex mr-2"
          >
            <path
              d="M17.946 5.29c-.015-.747-.156-1.485-.418-2.185a4.41 4.41 0 0 0-1.038-1.594A4.41 4.41 0 0 0 14.895.472C14.196.21 13.457.07 12.71.054L9 0 5.29.054C4.543.07 3.804.21 3.105.472a4.41 4.41 0 0 0-1.594 1.038A4.41 4.41 0 0 0 .472 3.105C.21 3.804.07 4.543.054 5.29L0 9l.054 3.71c.015.747.156 1.485.418 2.185a4.41 4.41 0 0 0 1.038 1.594 4.41 4.41 0 0 0 1.594 1.038c.7.262 1.438.403 2.185.418L9 18l3.71-.054c.747-.015 1.485-.156 2.185-.418a4.6 4.6 0 0 0 2.632-2.632c.262-.7.403-1.438.418-2.185L18 9l-.054-3.71zm-1.62 7.347a4.98 4.98 0 0 1-.31 1.671 2.98 2.98 0 0 1-1.708 1.708 4.98 4.98 0 0 1-1.671.31L9 16.378c-2.403 0-2.688-.01-3.637-.052a4.98 4.98 0 0 1-1.671-.31 2.79 2.79 0 0 1-1.035-.673 2.79 2.79 0 0 1-.673-1.035 4.98 4.98 0 0 1-.31-1.671L1.622 9l.052-3.637a4.98 4.98 0 0 1 .31-1.671 2.79 2.79 0 0 1 .673-1.035 2.79 2.79 0 0 1 1.035-.673 4.98 4.98 0 0 1 1.671-.31L9 1.622l3.637.052a4.98 4.98 0 0 1 1.671.31 2.79 2.79 0 0 1 1.035.673 2.79 2.79 0 0 1 .673 1.035 4.98 4.98 0 0 1 .31 1.671L16.378 9l-.052 3.637zM9 4.378c-2.552 0-4.622 2.07-4.622 4.622S6.448 13.622 9 13.622s4.622-2.07 4.622-4.622S11.552 4.378 9 4.378zM9 12a3 3 0 1 1 0-6 3 3 0 1 1 0 6zm5.884-7.804a1.08 1.08 0 0 1-1.844.764 1.08 1.08 0 0 1 .764-1.844 1.08 1.08 0 0 1 1.08 1.08z"
            />
          </svg>
          {{ host.instagram }}
        </a>

        <div class="object-right">
          <a
            :href="'https://www.twitter.com/' + host.instagram"
            class="inline-flex text-sm font-semibold text-gray-700 ml-6 mt-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              class="twitter h-6 flex sm:inline-flex mr-2"
            >
              <path
                d="M17.316 6.246l.01.488c0 5-3.797 10.742-10.74 10.742-2.133 0-4.116-.625-5.787-1.697a7.66 7.66 0 0 0 .9.053c1.77 0 3.397-.604 4.688-1.615a3.78 3.78 0 0 1-3.526-2.621 3.86 3.86 0 0 0 .71.066c.345 0 .68-.045.995-.13a3.78 3.78 0 0 1-3.028-3.703V7.78c.51.283 1.092.453 1.7.473-1.013-.678-1.68-1.832-1.68-3.143a3.75 3.75 0 0 1 .512-1.898C3.942 5.498 6.725 7 9.862 7.158c-.064-.277-.097-.564-.097-.86 0-2.084 1.69-3.773 3.774-3.773a3.77 3.77 0 0 1 2.756 1.191 7.6 7.6 0 0 0 2.397-.916 3.79 3.79 0 0 1-1.66 2.088 7.55 7.55 0 0 0 2.168-.594c-.506.758-1.146 1.422-1.884 1.953z"
              />
            </svg>
            {{ host.twitter }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["host"]
};
</script>

<style scoped>
.main {
  margin-bottom: 15px;
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
