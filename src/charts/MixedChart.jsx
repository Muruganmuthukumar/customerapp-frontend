import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class MixedChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Electronics Sales",
          type: "column",
          data: [230, 110, 220, 270, 130, 220, 370, 210, 440, 220, 300],
        },
        {
          name: "Clothing Sales",
          type: "area",
          data: [440, 550, 410, 670, 220, 430, 210, 410, 560, 270, 430],
        },
        {
          name: "Footwear Sales",
          type: "line",
          data: [300, 250, 360, 300, 450, 350, 640, 520, 590, 360, 390],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          stacked: false,
          background: "#fff", // Light background color
        },
        stroke: {
          width: [0, 2, 5],
          curve: "smooth",
        },
        plotOptions: {
          bar: {
            columnWidth: "50%",
          },
        },
        fill: {
          opacity: [0.85, 0.25, 1],
          gradient: {
            inverseColors: false,
            shade: "light",
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100],
          },
        },
        labels: [
          "01/01/2022",
          "02/01/2022",
          "03/01/2022",
          "04/01/2022",
          "05/01/2022",
          "06/01/2022",
          "07/01/2022",
          "08/01/2022",
          "09/01/2022",
          "10/01/2022",
          "11/01/2022",
        ],
        markers: {
          size: 0,
        },
        xaxis: {
          type: "datetime",
          labels: {
            style: {
              colors: "#333", // Dark text color
            },
          },
        },
        yaxis: {
          title: {
            text: "Sales",
            style: {
              color: "#333", // Dark text color
            },
          },
          min: 0,
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + " sales";
              }
              return y;
            },
          },
        },
        responsive: [
          {
            breakpoint: 600,
            options: {
              chart: {
                height: 300,
              },
            },
          },
          {
            breakpoint: 480,
            options: {
              chart: {
                height: 250,
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
          type="line"
        />
      </div>
    );
  }
}

export default MixedChart;
