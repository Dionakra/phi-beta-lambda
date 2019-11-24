<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-8">
        <input
          class="input"
          type="text"
          v-model="searchTerm"
          @keyup="updateList()"
          :placeholder="$t('comedian.searchTerm')"
        />
      </div>
    </div>

    <div class="columns">
      <div class="column buttons is-offset-2 is-3">
        <button
          class="button is-small is-rounded"
          @click="
            orderByName = true;
            updateList();
          "
          :class="{ 'is-danger': orderByName }"
        >
          {{ $t("comedian.sort.name") }}
        </button>
        <button
          class="button is-small is-rounded"
          @click="
            orderByName = false;
            updateList();
          "
          :class="{ 'is-danger': !orderByName }"
        >
          {{ $t("comedian.sort.appeareances") }}
        </button>
      </div>
      <div class="column is-3 is-offset-2">
        <div class=" buttons is-pulled-right">
          <button
            class="button is-small is-rounded"
            @click="
              ascending = true;
              updateList();
            "
            :class="{ 'is-danger': ascending }"
          >
            {{ $t("comedian.sort.ascendent") }}
          </button>
          <button
            class="button is-small is-rounded"
            @click="
              ascending = false;
              updateList();
            "
            :class="{ 'is-danger': !ascending }"
          >
            {{ $t("comedian.sort.descendent") }}
          </button>
        </div>
      </div>
    </div>
    <div
      class="columns is-multiline"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="200"
    >
      <template>
          <ComedianCard
            :comedian="comedian"
            :key="comedian.id"
            v-for="comedian in showing"
          />
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ComedianCard from "~/components/ComedianCard";
import countBy from "lodash/countBy";
const PAGE = 42;

export default {
  components: {
    ComedianCard
  },
  async asyncData() {
    const [episodes, comedians] = await Promise.all([
      axios.get(`/db/episodes.json`),
      axios.get(`/db/comedians.json`)
    ]);

    // Get comedians mentioned on each episode
    const comediansOnEpisodes = episodes.data.flatMap(e => {
      return e.sections
        .flatMap(s => {
          if (s.extra != undefined && s.extra.comedians != undefined) {
            return s.extra.comedians;
          } else {
            return [];
          }
        })
        .concat(e.comedians)
        .concat(e.guests);
    });

    // Count occurrences per comedian
    const stats = countBy(comediansOnEpisodes);

    // Turn the comedians collections to a Key-Value for easier indexing
    const keyedComedians = [];
    comedians.data.forEach(comedian => {
      keyedComedians[comedian.id] = comedian.name;
    });

    // Add info with comedian names and appearences
    const comediansInfo = Object.keys(stats).map(k => {
      return {
        id: k,
        name: keyedComedians[k] || k,
        appeareances: stats[k]
      };
    });

    return { comedians: comediansInfo };
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
            return x.name.toLowerCase().includes(this.searchTerm.toLowerCase());
          } else {
            return true;
          }
        })
        .sort((a, b) => {
          if (this.orderByName) {
            if (this.ascending) {
              return a.name.localeCompare(b.name);
            } else {
              return b.name.localeCompare(a.name);
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
