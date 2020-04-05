<template>
  <div>
    <h1 class="text-center text-red text-4xl -mt-4">Mapa de la Comedia</h1>
    <h6 class="text-center text-red -mt-2 mb-1">Datos provistos por</h6>

    <h6 class="text-center text-red -mt-3">
      <a
        target="_blank"
        rel="noopener"
        href="https://www.instagram.com/RafaelBenzal96/"
        aria-label="Rafael Benzal"
        class="text-center text-red text-xs"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-3 -3 25 25"
          class="instagram h-8 md:h-6 block mt-auto sm:inline-block ml-4 md:ml-1"
        >
          <path
            d="M17.946 5.29c-.015-.747-.156-1.485-.418-2.185a4.41 4.41 0 0 0-1.038-1.594A4.41 4.41 0 0 0 14.895.472C14.196.21 13.457.07 12.71.054L9 0 5.29.054C4.543.07 3.804.21 3.105.472a4.41 4.41 0 0 0-1.594 1.038A4.41 4.41 0 0 0 .472 3.105C.21 3.804.07 4.543.054 5.29L0 9l.054 3.71c.015.747.156 1.485.418 2.185a4.41 4.41 0 0 0 1.038 1.594 4.41 4.41 0 0 0 1.594 1.038c.7.262 1.438.403 2.185.418L9 18l3.71-.054c.747-.015 1.485-.156 2.185-.418a4.6 4.6 0 0 0 2.632-2.632c.262-.7.403-1.438.418-2.185L18 9l-.054-3.71zm-1.62 7.347a4.98 4.98 0 0 1-.31 1.671 2.98 2.98 0 0 1-1.708 1.708 4.98 4.98 0 0 1-1.671.31L9 16.378c-2.403 0-2.688-.01-3.637-.052a4.98 4.98 0 0 1-1.671-.31 2.79 2.79 0 0 1-1.035-.673 2.79 2.79 0 0 1-.673-1.035 4.98 4.98 0 0 1-.31-1.671L1.622 9l.052-3.637a4.98 4.98 0 0 1 .31-1.671 2.79 2.79 0 0 1 .673-1.035 2.79 2.79 0 0 1 1.035-.673 4.98 4.98 0 0 1 1.671-.31L9 1.622l3.637.052a4.98 4.98 0 0 1 1.671.31 2.79 2.79 0 0 1 1.035.673 2.79 2.79 0 0 1 .673 1.035 4.98 4.98 0 0 1 .31 1.671L16.378 9l-.052 3.637zM9 4.378c-2.552 0-4.622 2.07-4.622 4.622S6.448 13.622 9 13.622s4.622-2.07 4.622-4.622S11.552 4.378 9 4.378zM9 12a3 3 0 1 1 0-6 3 3 0 1 1 0 6zm5.884-7.804a1.08 1.08 0 0 1-1.844.764 1.08 1.08 0 0 1 .764-1.844 1.08 1.08 0 0 1 1.08 1.08z"
          />
        </svg>
        <span class="-ml-1">@RafaelBenzal96</span>
      </a>
    </h6>

    <h6 class="text-center mb-2">
      <a
        target="_blank"
        rel="noopener"
        href="https://www.reddit.com/r/StandUpComedy/comments/bp0k0h/i_spent_seven_months_researching_the_comic/"
        aria-label="Fuente en Reddit"
        class="text-center text-red text-xs"
      >Fuente en Reddit</a>
    </h6>
    <h2
      v-if="selectedComedian"
      class="text-center text-red text-2xl -mt-2 mb-1"
    >{{selectedComedian.name}}</h2>
    <div class="flex flex-inline flex-wrap">
      <!-- COMEDIANS LIST -->
      <div class="w-full md:w-1/5 h-32 overflow-auto">
        <div class="w-full">
          <input
            class="transition focus:outline-0 border border-transparent focus:bg-white focus:border-red placeholder-gray-600 rounded-lg bg-gray-200 py-2 pl-2 block w-full appearance-none leading-normal ds-input"
            type="text"
            placeholder="Busca un/a cómico/a"
            autocomplete="off"
            spellcheck="false"
            aria-label="search input"
            v-model="searchTerm"
            @keyup="updateList()"
          />
        </div>
        <div class="w-full">
          <ul class="ml-2">
            <nuxt-link
              :key="comedian.id"
              v-for="comedian in showing"
              :to="{ path: '/mapa', query: { comedian: comedian.id }}"
              tag="li"
              class="hover:bg-gray-200"
            >{{comedian.name}}</nuxt-link>
          </ul>
        </div>
      </div>
      <!-- END COMEDIANS LIST -->

      <!-- GRAPH -->
      <div class="w-full md:w-3/5 h-full" id="graph-container">
        &nbsp;
        <div id="container"></div>
      </div>
      <!-- END GRAPH -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import uniqBy from "lodash/uniqBy";
import flatMap from "lodash/flatMap";
import G6 from "@antv/g6";

export default {
  head() {
    return {
      title: "Comedia Perpetua - Phi Beta Lambda | Mapa de la Comedia",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Mapa de influencias en la comedia"
        }
      ]
    };
  },
  watchQuery: ["comedian"],
  key: to => to.fullPath,
  async asyncData({ query }) {
    return axios.get("/api/comedy-map.json").then(x => {
      const comedians = uniqBy(
        flatMap(x.data, c => [c.src, c.target]),
        "id"
      );
      return {
        comedyMapData: x.data,
        comedians: comedians,
        selectedComedian: comedians.find(c => c.id == query.comedian)
      };
    });
  },
  data() {
    return {
      comedyMapData: [],
      comedyMap: {},
      searchTerm: "",
      searching: true,
      showing: [],
      selectedComedian: undefined
    };
  },
  methods: {
    getNodes(edges, comedianId) {
      return this.comedians
        .filter(c => {
          return edges.some(e => {
            return e.source == c.id || e.target == c.id;
          });
        })
        .map(c => {
          const size = c.id == comedianId ? 75 : 50;
          return {
            id: c.id,
            img: `/images/comedians/${c.id}_128.jpg`,
            label: c.name,
            size: size,
            type: "image",
            size: size,
            labelAutoRotate: true,
            clipCfg: {
              show: true,
              type: "circle",
              r: size / 2
            }
          };
        });
    },
    getEdges(comedianId = undefined) {
      return this.comedyMapData
        .filter(c => {
          return (
            comedianId == undefined ||
            comedianId == c.src.id ||
            comedianId == c.target.id
          );
        })
        .map(c => {
          const color = c.src.id == comedianId ? "#e74c3c" : "#3498db";
          const arrowColor = c.src.id == comedianId ? "#c0392b" : "#2980b9";
          return {
            source: c.target.id,
            target: c.src.id,
            style: {
              stroke: color,
              endArrow: {
                path: "M 0,0 L 10,5 L 10,-5 Z",
                fill: arrowColor
              },
              active: {
                stroke: arrowColor
              }
            },
            stateStyles: {
              active: {
                opacity: 1
              },
              inactive: {
                opacity: 0.2
              }
            }
          };
        });
    },
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
        .sort((a, b) => a.name.localeCompare(b.name));

      this.searching = false;

      return res;
    },
    updateList() {
      this.showing = this.showComedians();
    },
    showGraph(comedianId) {
      const edges = this.getEdges(comedianId);
      const nodes = this.getNodes(edges, comedianId);
      const data = { nodes, edges };
      const vw = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );
      const vh = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      );

      const container = document.getElementById("graph-container");

      const width = vw - container.offsetLeft - 20;
      const height = vh - container.offsetTop - 20;

      const graph = new G6.Graph({
        fitView: true,
        layout: {
          type: "fruchterman",
          gravity: 3,
          speed: 6,
          preventOverlap: true
        },
        container: "container",
        width,
        height,
        defaultEdge: {
          style: {
            stroke: "#F6BD16",
            endArrow: {
              path: "M 0,0 L 10,5 L 10,-5 Z",
              fill: "#F6BD16"
            }
          }
        },
        modes: {
          default: ["drag-canvas", "activate-relations", "zoom-canvas"]
        },
        nodeStateStyles: {
          active: {
            opacity: 1
          },
          inactive: {
            opacity: 0.2
          }
        },
        edgeStateStyles: {
          active: {
            stroke: "#999"
          }
        }
      });

      graph.on("node:click", ev => {
        const shape = ev.target;
        const node = ev.item;
        if (ev && ev.item && ev.item._cfg && ev.item._cfg.id) {
          this.$router.push({
            path: "/mapa",
            query: { comedian: ev.item._cfg.id }
          });
        }
      });

      graph.data(data);
      graph.render();
    }
  },
  mounted() {
    this.showing = this.showComedians();
    if (this.selectedComedian) {
      this.showGraph(this.selectedComedian.id);
    }
  }
};
</script>
<style scoped>
.echarts {
  height: 85vh;
}
</style>