<template>
  <div class="mx-auto">
    <div class="md:w-full lg:w-4/6 mx-auto mb-2">
      <input
        class="transition focus:outline-0 border border-transparent focus:bg-white focus:border-red placeholder-gray-600 rounded-lg bg-gray-200 py-2 pr-4 pl-10 block w-full appearance-none leading-normal ds-input"
        type="text"
        placeholder="Busca un/a cómico/a"
        autocomplete="off"
        spellcheck="false"
        aria-label="search input"
        v-model="searchTerm"
        @keyup="updateList()"
      />
    </div>

    <div class="md:w-full lg:w-4/6 mx-auto flex justify-between text-sm mb-3">
      <div>
        <p class="text-red text-xs">Mostrar...</p>
        <button
          class="hover:bg-red text-white py-1 px-1 rounded-full"
          :class="comedianOfTheDay ? 'bg-red' : 'bg-transparent text-red border border-red hover:text-white'"
          @click="comedianOfTheDay = !comedianOfTheDay; updateList()"
        >Cómic@ del día</button>
        <button
          class="hover:bg-red text-white py-1 px-1 rounded-full"
          :class="thankYou ? 'bg-red' : 'bg-transparent text-red border border-red hover:text-white'"
          @click="thankYou = !thankYou; updateList()"
        >Thank you...</button>
        <button
          class="hover:bg-red text-white py-1 px-1 rounded-full"
          :class="giraFestivales ? 'bg-red' : 'bg-transparent text-red border border-red hover:text-white'"
          @click="giraFestivales = !giraFestivales; updateList()"
        >Gira de festivales</button>
        <button
          class="hover:bg-red text-white py-1 px-1 rounded-full"
          :class="mostRecent ? 'bg-red' : 'bg-transparent text-red border border-red hover:text-white'"
          @click="mostRecent = !mostRecent; mostMentions = !(!mostRecent || mostMentions); updateList()"
        >Más recientes</button>
        <button
          class="hover:bg-red text-white py-1 px-1 rounded-full"
          :class="mostMentions ? 'bg-red' : 'bg-transparent text-red border border-red hover:text-white'"
          @click="mostMentions = !mostMentions; mostRecent = !(!mostMentions || mostRecent); updateList()"
        >Más menciones</button>
      </div>

      <div>
        <p class="text-red text-xs">Órden alfabético</p>
        <button
          class="hover:bg-red text-white py-1 px-1 rounded-full"
          :class="ascending === true ? 'bg-red' : 'bg-transparent text-red border border-red hover:text-white'"
          @click="ascending = true; updateList()"
        >Ascendente</button>
        <button
          class="hover:bg-red text-white py-1 px-1 rounded-full"
          :class="ascending === false ? 'bg-red' : 'bg-transparent text-red border border-red hover:text-white'"
          @click="ascending = false; updateList()"
        >Descendente</button>
      </div>
    </div>

    <div
      class="mx-auto"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="200"
    >
      <div class="flex flex-inline flex-wrap mx-auto justify-center" role="list">
        <ComedianCard :comedian="comedian" :key="comedian.id" v-for="comedian in showing" />
      </div>
    </div>
  </div>
</template>

<script>
import ComedianCard from "~/components/ComedianCard";
const PAGE = 30;

export default {
  head() {
    return {
      title: "Phi Beta Lambda - Comedia Perpetua | Cómic@s",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Lista de cómic@s mencionados en el programa, indicando su número de menciones en total"
        }
      ]
    };
  },
  components: {
    ComedianCard
  },
  data() {
    return {
      comedians: [],
      searchTerm: "",
      searching: true,
      curPage: 1,
      showing: [],
      ascending: undefined,
      thankYou: false,
      comedianOfTheDay: false,
      mostRecent: true,
      mostMentions: false,
      giraFestivales: false
    };
  },
  mounted() {
    fetch("/api/comedians.json")
      .then(response => response.json())
      .then(comedians => {
        this.comedians = comedians;
        this.showing = this.showComedians().slice(0, PAGE * this.curPage);
      });
  },
  methods: {
    showComedians() {
      this.searching = true;

      const res = this.comedians
        .filter(x => {
          let valid = true;
          if (this.thankYou) {
            valid = valid && x.tags.includes("#ThankYouForThisBeautifulComedy");
          }
          if (this.comedianOfTheDay) {
            valid = valid && x.tags.includes("#Cómic@DelDía");
          }
          if (this.giraFestivales) {
            valid = valid && x.tags.includes("#GiraDeFestivales");
          }
          if (this.searchTerm.trim().length != 0) {
            valid =
              valid &&
              x.name.toLowerCase().includes(this.searchTerm.toLowerCase());
          }

          return valid;
        })
        .sort((a, b) => {
          let order = 0;

          if (this.mostRecent) {
            order = 1;
          } else if (this.mostMentions) {
            order = b.mentions - a.mentions;
          }

          if (order == 0) {
            if (this.ascending == undefined || this.ascending == true) {
              order = a.name.localeCompare(b.name);
            } else {
              order = b.name.localeCompare(a.name);
            }
          }

          return order;
        });
      this.searching = false;

      return res;
    },
    loadMore() {
      if (!this.searching) {
        this.curPage++;
        this.showing = this.showComedians().slice(0, PAGE * this.curPage);
      }
    },
    updateList() {
      this.curPage = 1;
      this.showing = this.showComedians().slice(0, PAGE * this.curPage);
    }
  }
};
</script>
