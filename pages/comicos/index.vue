<template>
  <div class="mx-auto">
    <div class="md:w-full lg:w-1/2 mx-auto mb-2">
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

    <div class="md:w-full lg:w-1/2 mx-auto flex justify-between md:justify-around text-sm mb-3">
      <div>
        <p class="text-red text-xs -mt-1">Ordenar por</p>
        <button
          class="hover:bg-red text-white py-1 px-2 rounded-full"
          :class="orderByName ? 'bg-red' : 'bg-transparent text-red border border-red hover:text-white'"
          @click="
            orderByName = true;
            updateList();
          "
        >Nombre</button>
        <button
          class="hover:bg-red text-white py-1 px-2 rounded-full"
          :class="!orderByName ? 'bg-red' : 'bg-transparent text-red border border-red hover:text-white'"
          @click="
            orderByName = false;
            updateList();
          "
        >Menciones</button>
      </div>
      <div>
        <p class="text-red text-xs -mt-1">Órden</p>
        <button
          class="hover:bg-red text-white py-1 px-2 rounded-full"
          :class="ascending ? 'bg-red' : 'bg-transparent text-red border border-red hover:text-white'"
          @click="
              ascending = true;
              updateList();
            "
        >Ascendente</button>
        <button
          class="hover:bg-red text-white py-1 px-2 rounded-full"
          :class="!ascending ? 'bg-red' : 'bg-transparent text-red border border-red hover:text-white'"
          @click="
              ascending = false;
              updateList();
            "
        >Descendente</button>
      </div>
    </div>

    <div
      class="mx-auto"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="200"
    >
      <div class="flex flex-inline flex-wrap mx-auto justify-center">
        <ComedianCard :comedian="comedian" :key="comedian.id" v-for="comedian in showing" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ComedianCard from "~/components/ComedianCard";
import countBy from "lodash/countBy";
const PAGE = 30;

export default {
  components: {
    ComedianCard
  },
  async asyncData() {
    return axios.get("/api/comedians.json").then(x => {
      return { comedians: x.data };
    });
  },
  data() {
    return {
      comedians: [],
      ascending: true,
      orderByName: true,
      searchTerm: "",
      searching: true,
      curPage: 1,
      showing: []
    };
  },
  mounted() {
    this.showing = this.showComedians().slice(0, PAGE * this.curPage);
  },
  methods: {
    showComedians() {
      this.searching = true;

      const res = this.comedians
        .filter(x => {
          if (this.searchTerm.trim().length != 0) {
            return x.details.name
              .toLowerCase()
              .includes(this.searchTerm.toLowerCase());
          } else {
            return true;
          }
        })
        .sort((a, b) => {
          if (this.orderByName) {
            if (this.ascending) {
              return a.details.name.localeCompare(b.details.name);
            } else {
              return b.details.name.localeCompare(a.details.name);
            }
          } else {
            if (this.ascending) {
              return a.appeareances - b.appeareances;
            } else {
              return b.appeareances - a.appeareances;
            }
          }
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
