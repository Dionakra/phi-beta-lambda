<template>
  <div class="flex flex-inline flex-wrap">
    <chart class="w-full md:w-1/2 h-64 mt-6" :options="comediansPerEpisode" autoresize />
    <chart class="w-full md:w-1/2 h-64 mt-6" :options="newComediansPerEpisode" autoresize />
    <chart class="w-full md:w-1/2 h-64 mt-6" :options="culturePerEpisode" autoresize />
    <chart class="w-full md:w-1/2 h-64 mt-6" :options="newCulturePerEpisode" autoresize />
  </div>
</template>

<script>
import axios from "axios";

export default {
  async asyncData() {
    return axios.get("/api/statistics.json").then(x => {
      return {
        stats: x.data
      };
    });
  },
  data() {
    return {
      stats: [],
      comediansPerEpisode: {},
      newComediansPerEpisode: {},
      culturePerEpisode: {},
      newCulturePerEpisode: {},
      trans: {
        documentary: "Documentales",
        "comedy-special": "Especiales de comedia",
        book: "Libros",
        movie: "Películas",
        "tv-show": "Programa TV",
        "radio-show": "Radio / Podcast",
        "tv-show-series": "Series",
        "comic-strip": "Cómic"
      }
    };
  },
  mounted() {
    this.comediansPerEpisode = this.getComediansOptions(
      "Número de cómic@s por programa",
      this.stats.axis,
      this.stats.comedians.perEpisode
    );
    this.newComediansPerEpisode = this.getComediansOptions(
      "Número de nuev@s cómic@s por programa",
      this.stats.axis,
      this.stats.comedians.newPerEpisode
    );
    this.culturePerEpisode = this.getCultureOptions(
      "Referencias culturales por episodio",
      this.stats.axis,
      this.stats.culture.perEpisode
    );
    this.newCulturePerEpisode = this.getCultureOptions(
      "Nuevas referencias culturales por episodio",
      this.stats.axis,
      this.stats.culture.newPerEpisode
    );
  },
  methods: {
    getCultureOptions(title, legend, data) {
      const series = data.map(d => {
        return {
          name: this.trans[d.type],
          type: "line",
          stack: "culture",
          areaStyle: {},
          data: d.values
        };
      });

      return {
        title: {
          text: title
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        dataZoom: [
          {
            type: "inside",
            start: 60,
            end: 100
          },
          {
            start: 60,
            end: 100,
            handleIcon:
              "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "80%",
            handleStyle: {
              color: "#fff",
              shadowBlur: 3,
              shadowColor: "rgba(0, 0, 0, 0.6)",
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }
        ],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: legend
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: series
      };
    },
    getComediansOptions(title, legend, data) {
      return {
        title: {
          text: title
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "15%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: legend
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"]
        },
        dataZoom: [
          {
            type: "inside",
            start: 60,
            end: 100
          },
          {
            start: 60,
            end: 100,
            handleIcon:
              "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "80%",
            handleStyle: {
              color: "#fff",
              shadowBlur: 3,
              shadowColor: "rgba(0, 0, 0, 0.6)",
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }
        ],
        series: [
          {
            type: "line",
            data: data
          }
        ]
      };
    }
  }
};
</script>
