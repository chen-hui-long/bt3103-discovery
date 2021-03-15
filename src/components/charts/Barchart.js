import { Bar } from "vue-chartjs";
import database from "../../firebase.js";

export default {
  extends: Bar,
  data: function() {
    return {
      total_orders: {},
      datacollection: {
        labels: [],
        datasets: [
          {
            label: "Total Number of each dish",
            backgroundColor: [
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
              "#ddeb1c",
            ],
            data: [],
          },
        ],
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: "Total Number of each dish",
        },
        scales: {
          yAxes: [{
            ticks:{
              beginAtZero: true
            }
          }]
        },  
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    fetchItems: function() {
      database
        .collection("orders")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            var curr_order = doc.data().orders;
            for (const [key, value] of Object.entries(curr_order)) {
              if (`${key}` in this.total_orders) {
                this.total_orders[`${key}`] += value;
              } else {
                this.total_orders[`${key}`] = value;
              }
            }
          });
        }).then(() => {
          console.log(this.total_orders)
          for (const [key, value] of Object.entries(this.total_orders)) { 
            this.datacollection.labels.push(key)
            //console.log(this.datacollection.labels)
            this.datacollection.datasets[0].data.push(value)
            //console.log(this.datacollection.datasets[0].data)
          }
          this.renderChart(this.datacollection, this.options);
        })

    },
  },
  created() {
    this.fetchItems();
  },
  
  /*
  mounted() {
    this.renderChart(this.datacollection, this.options);
  },
  */
};
