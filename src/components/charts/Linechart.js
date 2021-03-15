import { Line } from "vue-chartjs";
import axios from "axios";

export default {
  extends: Line,
  data: function() {
    return {
      datacollection: {
        labels: [],
        datasets: [
          {
            label: "north",
            data: [],
            fill: false,
            borderColor:"#3e95cd",
          },
          {
            data: [],
            label: "south",
            fill: false,
            borderColor:"#8e5ea2",
          },
          {
            data: [],
            label: "east",
            fill: false,
            borderColor:"#3cba9f",
          },
          {
            data: [],
            label: "west",
            fill: false,
            borderColor:"#e8c3b9",
          },
          {
            data: [],
            label: "central",
            fill: false,
            borderColor:"#c45850",
          },
          {
            data: [],
            label: "national",
            fill: false,
            borderColor:"#ddeb1c",
          },
        ],
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: "PSI Twenty Four Hourly (By region)",
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    fetchItems: function() {
      axios
        .get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then((response) => {
          var data = response.data.items;
          data.forEach((data) => {
            var timestamp = data.timestamp;
            console.log(timestamp);
            var readingsPSI = data.readings.psi_twenty_four_hourly;
            console.log(readingsPSI);
            var central = readingsPSI.central;
            var east = readingsPSI.east;
            var national = readingsPSI.national;
            var north = readingsPSI.north;
            var south = readingsPSI.south;
            var west = readingsPSI.west;
            this.datacollection.datasets[0].data.push(north)
            this.datacollection.datasets[1].data.push(south)
            this.datacollection.datasets[2].data.push(east)
            this.datacollection.datasets[3].data.push(west)
            this.datacollection.datasets[4].data.push(central)
            this.datacollection.datasets[5].data.push(national)
            this.datacollection.labels.push(timestamp)
          });

          this.renderChart(this.datacollection, this.options);
        });
    },
  },

  created() {
    this.fetchItems();
  },
};
