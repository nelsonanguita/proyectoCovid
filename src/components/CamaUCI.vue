<template>
  <v-app>
    <div>
      <v-card elevation="12" class="mx-auto align-items-center">
        <h1>TITUTLO</h1>

        <highcharts
          v-if="loaded"
          class=" chart highcharts-figure"
          :options="chartOptions"
        ></highcharts>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import solidgauge from "highcharts/modules/solid-gauge";
solidgauge(Highcharts);
export default {
  data() {
    return {
      Highcharts: Highcharts,
      chartOptions: {},
      loaded: true,
    };
  },
  methods: {
    grafico() {
      this.chartOptions = {
        chart: {
          type: "solidgauge",
        },

        title: null,

        pane: {
          center: ["50%", "85%"],
          size: "140%",
          startAngle: -90,
          endAngle: 90,
          background: {
            backgroundColor:
              Highcharts.defaultOptions.legend.backgroundColor || "#EEE",
            innerRadius: "60%",
            outerRadius: "100%",
            shape: "arc",
          },
        },

        exporting: {
          enabled: false,
        },

        tooltip: {
          enabled: false,
        },

        // the value axis
        yAxis: {
          stops: [
            [0.1, "#55BF3B"], // green
            [0.5, "#DDDF0D"], // yellow
            [0.9, "#DF5353"], // red
          ],
          lineWidth: 0,
          tickWidth: 0,
          minorTickInterval: null,
          tickAmount: 2,
          title: {
            y: -70,
          },
          labels: {
            y: 16,
          },
        },

        plotOptions: {
          solidgauge: {
            dataLabels: {
              y: 5,
              borderWidth: 0,
              useHTML: true,
            },
          },
        },
      };

      // The speed gauge
      var chartSpeed = Highcharts.chart(
        "container-speed",
        Highcharts.merge(this.chartOptions, {
          yAxis: {
            min: 0,
            max: 200,
            title: {
              text: "Speed",
            },
          },

          credits: {
            enabled: false,
          },

          series: [
            {
              name: "Speed",
              data: [80],
              dataLabels: {
                format:
                  '<div style="text-align:center">' +
                  '<span style="font-size:25px">{y}</span><br/>' +
                  '<span style="font-size:12px;opacity:0.4">km/h</span>' +
                  "</div>",
              },
              tooltip: {
                valueSuffix: " km/h",
              },
            },
          ],
        })
      );

      // The RPM gauge
      var chartRpm = Highcharts.chart(
        "container-rpm",
        Highcharts.merge(this.chartOptions, {
          yAxis: {
            min: 0,
            max: 5,
            title: {
              text: "RPM",
            },
          },

          series: [
            {
              name: "RPM",
              data: [1],
              dataLabels: {
                format:
                  '<div style="text-align:center">' +
                  '<span style="font-size:25px">{y:.1f}</span><br/>' +
                  '<span style="font-size:12px;opacity:0.4">' +
                  "* 1000 / min" +
                  "</span>" +
                  "</div>",
              },
              tooltip: {
                valueSuffix: " revolutions/min",
              },
            },
          ],
        })
      );

      // Bring life to the dials
      setInterval(function() {
        // Speed
        var point, newVal, inc;

        if (chartSpeed) {
          point = chartSpeed.series[0].points[0];
          inc = Math.round((Math.random() - 0.5) * 100);
          newVal = point.y + inc;

          if (newVal < 0 || newVal > 200) {
            newVal = point.y - inc;
          }

          point.update(newVal);
        }

        // RPM
        if (chartRpm) {
          point = chartRpm.series[0].points[0];
          inc = Math.random() - 0.5;
          newVal = point.y + inc;

          if (newVal < 0 || newVal > 5) {
            newVal = point.y - inc;
          }

          point.update(newVal);
        }
      }, 2000);
    },
  },
  created() {
    this.grafico();
  },
};
</script>

<style>
.highcharts-figure .chart-container {
  width: 300px;
  height: 200px;
  float: left;
}

.highcharts-figure,
.highcharts-data-table table {
  width: 600px;
  margin: 0 auto;
}

.highcharts-data-table table {
  font-family: Verdana, sans-serif;
  border-collapse: collapse;
  border: 1px solid #ebebeb;
  margin: 10px auto;
  text-align: center;
  width: 100%;
  max-width: 500px;
}
.highcharts-data-table caption {
  padding: 1em 0;
  font-size: 1.2em;
  color: #555;
}
.highcharts-data-table th {
  font-weight: 600;
  padding: 0.5em;
}
.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
  padding: 0.5em;
}
.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
  background: #f8f8f8;
}
.highcharts-data-table tr:hover {
  background: #f1f7ff;
}

@media (max-width: 600px) {
  .highcharts-figure,
  .highcharts-data-table table {
    width: 100%;
  }
  .highcharts-figure .chart-container {
    width: 300px;
    float: none;
    margin: 0 auto;
  }
}
</style>
