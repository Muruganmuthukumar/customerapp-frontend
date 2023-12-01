import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class BarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Orders",
          data: [120, 200, 150, 300, 180, 250, 200],
        },
        {
          name: "Customers",
          data: [80, 150, 100, 200, 120, 180, 150],
        },
        {
          name: "Sales",
          data: [2000, 3500, 2500, 5000, 3000, 4500, 4000],
        },
      ],
      options: {
        chart: {
          type: "bar",
          background: "#ffffff", // Light background color
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: "12px",
            colors: ["#333"], // Dark text color
          },
        },
        colors: ["#67a3d4", "#84c67f", "#ffbb44"], // Custom color scheme
        stroke: {
          show: true,
          width: 1,
          colors: ["#333"], // Dark border color
        },
        tooltip: {
          shared: true,
          intersect: false,
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          labels: {
            style: {
              colors: "#333", // Dark text color
            },
          },
        },
        yaxis: {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#333", // Dark border color
          },
          title: {
            text: "Values",
            style: {
              color: "#333", // Dark text color
            },
          },
        },
        title: {
          text: "Website Analytics",
          align: "center",
          style: {
            color: "#333", // Dark text color
          },
        },
        subtitle: {
          text: "Monthly Data",
          align: "center",
          style: {
            color: "#333", // Dark text color
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
          type="bar"
        />
      </div>
    );
  }
}

export default BarChart;
