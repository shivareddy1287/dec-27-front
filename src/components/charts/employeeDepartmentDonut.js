import React, { Component } from "react";
import Chart from "react-apexcharts";

class EmployeeDepatmentDonut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "donut-chart",
        },
        labels: ["React Js", "Pega", "HR", "Frontend"],
        colors: ["#008FFB", "#ffa026", "#15dc9f", "#c466e4"],
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
        // legend: {
        //   show: false, // Set to false to hide legend labels
        // },
        // chart: {
        //   margin: 0,
        // },
      },
      series: [44, 55, 22, 32],
    };
  }

  render() {
    return (
      <div className="donut">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          width="320"
        />
      </div>
    );
  }
}

export default EmployeeDepatmentDonut;
