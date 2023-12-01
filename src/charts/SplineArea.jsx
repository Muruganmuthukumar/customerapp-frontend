import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class SplineArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Sales",
          data: [120, 150, 100, 180, 130, 200, 170],
        },
        {
          name: "Orders",
          data: [80, 120, 90, 150, 110, 160, 130],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "area",
          background: "#fff", // Light background color
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          categories: [
            "2022-01-01T00:00:00.000Z",
            "2022-02-01T00:00:00.000Z",
            "2022-03-01T00:00:00.000Z",
            "2022-04-01T00:00:00.000Z",
            "2022-05-01T00:00:00.000Z",
            "2022-06-01T00:00:00.000Z",
            "2022-07-01T00:00:00.000Z",
          ],
          labels: {
            style: {
              colors: "#333", // Dark text color
            },
          },
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
        responsive: [
          {
            breakpoint: 600,
            options: {
              chart: {
                height: 300,
                width: 300, // Adjust the width for smaller screens
              },
            },
          },
          {
            breakpoint: 480,
            options: {
              chart: {
                height: 250,
                width: 250, // Adjust the width for even smaller screens
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
          type="area"
        />
      </div>
    );
  }
}

export default SplineArea;
