import React, { Component } from "react";
import Chart from "react-apexcharts";

class WorkingFormatDonut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "donut-chart",
        },
        labels: ["WFH", "WFO"],
        colors: ["#008FFB", "#00E396"],
        dataLabels: {
          enabled: false,
          show: false,
        },

        plotOptions: {
          pie: {
            size: 150,
            donut: {
              size: "65%",
              labels: {
                show: true,
                name: {
                  show: true,
                  offsetY: 1,
                  fontSize: "16px",
                },
                value: {
                  show: false,
                },
                total: {
                  show: true,
                  // showAlways: true,
                  // label: "500",
                  label: "Employees:100",

                  color: "#373d3f",
                  fontSize: "10px",
                  offsetY: 0,
                },
              },
            },
          },
        },
        legend: {
          show: false, // Set to false to hide legend labels
        },
        chart: {
          margin: 0,
        },
      },
      series: [44, 55],
    };
  }

  render() {
    return (
      <div className="donut">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          width="200"
        />
      </div>
    );
  }
}

export default WorkingFormatDonut;
