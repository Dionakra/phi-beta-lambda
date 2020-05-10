<template>
  <div>
    <div class="flex flex-inline flex-wrap">
      <chart class="w-full h-64" :options="comediansPerEpisode" autoresize />
      <chart class="w-full h-64 mt-6" :options="culturePerEpisode" autoresize />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ECharts from "vue-echarts";

// import ECharts modules manually to reduce bundle size
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/dataZoom";
import "echarts/lib/component/dataZoomSlider";
import "echarts/lib/chart/line";

const TRANS = {
  documentary: "Documentales",
  "comedy-special": "Especiales de comedia",
  book: "Libros",
  movie: "Películas",
  "tv-show": "Programa TV",
  "radio-show": "Radio / Podcast",
  "tv-show-series": "Series",
  "comic-strip": "Cómic"
};

export default {
  head() {
    return {
      title: "Phi Beta Lambda - Comedia Perpetua | Estadísticas",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Estadísticas sobre menciones a cómicos o elementos culturales por programa"
        }
      ]
    };
  },
  render: {
    resourceHints: false
  },
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
      culturePerEpisode: {}
    };
  },
  mounted() {
    // Comedians
    const comediansSeries = [
      {
        type: "line",
        data: this.stats.comedians.perEpisode
      }
    ];

    this.comediansPerEpisode = this.getChartOptions(
      "Menciones a cómicos por episodio",
      this.stats.axis,
      comediansSeries
    );

    // Culture
    const cultureSeries = this.stats.culture.perEpisode.map(d => {
      return {
        name: TRANS[d.type],
        type: "line",
        stack: "culture",
        areaStyle: {},
        data: d.values
      };
    });

    this.culturePerEpisode = this.getChartOptions(
      "Referencias culturales por episodio",
      this.stats.axis,
      cultureSeries
    );
  },
  methods: {
    getChartOptions(title, legend, series) {
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
          type: "value"
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
        series: series
      };
    }
  }
};
</script>
