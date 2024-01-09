import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Hours",

          data: [...this.props.reportdata],
        },
      ],
      options: {
        chart: {
          height: 350,
          with: 1,
          type: "bar",
        },
        plotOptions: {
          bar: {
            borderRadius: 5,

            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            console.log(val);

            const hours = Math.floor(val / 3600);
            const minutes = Math.floor((val % 3600) / 60);

            return hours + ":" + minutes + "hrs";
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
        },

        xaxis: {
          categories: this.props.reportCategories,
          position: "top",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              const hours = Math.floor(val / 3600);
              const minutes = Math.floor((val % 3600) / 60);

              return hours + ":" + minutes + "hrs";
            },
          },
        },
        title: {
          text: "Last 10 Days Report",
          floating: true,
          offsetY: 330,
          align: "center",
          style: {
            color: "#444",
            fontWeight: "500",
          },
        },
      },
    };
  }

  render() {
    return (
      <div id="chart" className="bl_att_weekly-chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={350}
          width={850}
        />
      </div>
    );
  }
}
export default ApexChart;
