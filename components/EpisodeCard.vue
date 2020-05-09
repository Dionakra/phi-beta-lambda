<template>
  <div class="w-full md:w-1/2 lg:w-1/3 mt-2 px-2" role="listitem">
    <nuxt-link :to="'/programas/' + episode.id" :key="episode.id" class="hover:shadow-lg" tag="div">
      <!-- THUMBNAIL -->
      <div class="w-full bg-cover rounded-t text-center">
        <img
          ref="thumbnail"
          class="w-full h-auto rounded-t"
          :title="episode.title"
          :alt="'Portada ' + episode.title"
          loading="lazy"
          :srcset="'https://i.ytimg.com/vi_webp/' + episode.link + '/mqdefault.webp 480w, https://i.ytimg.com/vi_webp/' + episode.link + '/maxresdefault.webp 800w'"
          sizes="(max-width: 600px) 480px, 800px"
        />
      </div>
      <!-- END THUMBNAIL -->

      <!-- CONTENT -->
      <div
        class="border-r border-b border-l border-gray-400 border-l-0 border-t border-gray-400 bg-white rounded-b px-2 py-1 flex flex-col justify-between leading-normal"
      >
        <div class="inline-block align-top">
          <!-- TITLE -->
          <div class="font-bold text-red text-xl flex flex-inline">
            <p class="my-auto">{{episode.id.toUpperCase()}} - {{episode.title}}</p>
          </div>
          <!-- END TITLE -->

          <!-- PEOPLE IN THE EPISODE -->
          <div class="flex flex-inline flex-wrap justify-center">
            <!-- GUESTS -->
            <div v-if="episode.guests && episode.guests.length > 0">
              <p class="text-sm text-gray-900">Invitad@s</p>
              <div class="flex flex-inline">
                <Comedian
                  v-for="guest in episode.guests"
                  :key="guest.id"
                  :comedian="guest"
                  :showName="false"
                  :small="true"
                />
              </div>
            </div>
            <!-- END GUESTS -->

            <!-- SPECIAL MENTION -->
            <div v-if="episode.special != undefined">
              <p class="text-sm text-gray-900">Mención Especial</p>
              <div class="flex flex-inline">
                <Comedian
                  :key="episode.special.id"
                  :comedian="episode.special"
                  :showName="true"
                  :small="true"
                />
              </div>
            </div>
            <!-- END SPECIAL MENTION -->
          </div>
          <!-- END PEOPLE IN THE EPISODE -->

          <!-- SECTIONS -->
          <div class="flex flex-inline flex-wrap justify-around align-top">
            <div class="align-top" v-for="section in episode.sections" :key="section.id">
              <span class="text-red align-top text-center text-sm">{{section.name}}</span>
              <div class="flex flex-inline mx-auto">
                <div
                  v-for="comedian in section.comedians"
                  :key="comedian.id"
                  class="mx-auto w-full"
                >
                  <Comedian
                    :key="comedian.id"
                    :comedian="comedian"
                    :showName="true"
                    :small="true"
                    :alternateName="section.culture ? section.culture.title : comedian.name"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- END SECTIONS -->
        </div>
      </div>
      <!-- END CONTENT -->
    </nuxt-link>
  </div>
</template>

<script>
import Comedian from "~/components/Comedian";

export default {
  components: {
    Comedian
  },
  props: ["episode"],
  created() {
    var img = new Image();
    img.onload = () => {
      if (img.height === 90) {
        this.$refs.thumbnail.srcset = this.$refs.thumbnail.srcset.replace(
          "maxresdefault",
          "mqdefault"
        );
      }
    };
    img.src = `https://i.ytimg.com/vi_webp/${this.episode.link}/maxresdefault.webp`;
  }
};
</script>