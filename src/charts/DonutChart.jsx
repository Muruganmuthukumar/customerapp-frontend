import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class Donut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [30, 25, 15, 20, 10],
      options: {
        chart: {
          type: "donut",
        },
        labels: [
          "Electronics",
          "Clothing",
          "Footwear",
          "Accessories",
          "Home Decor",
        ],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 400,
                height: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          height={300}
        />
      </div>
    );
  }
}

export default Donut;
