<template>
  <div>
    <div class="w-full h-64">
      <chart class="w-full h-full" :options="comediansPerEpisode" autoresize />
    </div>

    <div class="w-full h-64 mt-12">
      <chart class="w-full h-full" :options="newComediansPerEpisode" autoresize />
    </div>

    <div class="w-full h-64 mt-12">
      <chart class="w-full h-full" :options="culturePerEpisode" autoresize />
    </div>

    <div class="w-full h-64 mt-12">
      <chart class="w-full h-full" :options="newCulturePerEpisode" autoresize />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ECharts from "vue-echarts";

export default {
  components: {
    chart: ECharts
  },
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
        legend: {
          left: "right",
          data: data.map(x => this.trans[x.type])
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
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
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: legend
        },
        yAxis: {
          type: "value"
        },
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
