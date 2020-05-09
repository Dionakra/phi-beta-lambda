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
            viewBox="0 0 3365 3365"
            class="h-6 flex sm:inline-flex mr-2"
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
          {{ host.instagram }}
        </a>

        <div class="object-right">
          <a
            :href="'https://www.twitter.com/' + host.twitter"
            class="inline-flex text-sm font-semibold text-gray-700 ml-6 mt-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 461.8 375.3"
              class="h-6 flex sm:inline-flex mr-2"
            >
              <path
                fill="#55ACEE"
                d="M462 44c-17 8-35 13-55 15 20-11 35-30 42-52-18 11-39 19-60 23a95 95 0 00-161 86c-79-4-149-41-196-99a95 95 0 0029 127c-15-1-30-5-42-12v1c0 46 32 84 76 93a93 93 0 01-43 2c12 37 47 65 88 66A190 190 0 010 333c42 27 92 42 145 42A268 268 0 00414 93c19-13 35-30 48-49z"
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
