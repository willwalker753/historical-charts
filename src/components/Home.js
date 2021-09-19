import React, { Component } from "react";
import Citations from "./Citations";
import Theme from "./Theme";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import { createSeries, processOver, processOut } from "../util/functions";
import { populationData, cpiInflationData, gdpData } from "../util/constants";
import "../styles/home.css";

let chart;
am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_dark);
am4core.options.autoDispose = true;

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            themeDark: true
        }
    }

    componentDidMount() {
        this.createChart();
    }

    createChart = () => {
        chart = am4core.create("main-line-chart", am4charts.XYChart);

        let xAxis = chart.xAxes.push(new am4charts.ValueAxis());
            xAxis.title.text = "Year"
            xAxis.max = 2020;
            xAxis.renderer.labels.template.adapter.add("text", (text) => {
                if(text) { text = text.replace(",", "") }
                return text;
            });

        let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
            yAxis.title.text = "Percent Value Relative to Current";
            yAxis.min = 0;
            yAxis.max = 110;
            yAxis.renderer.labels.template.adapter.add("text", (text) => {
                return text + "%";
            });

        createSeries(chart, "U.S. Population", populationData);
        createSeries(chart, "CPI Inflation", cpiInflationData);
        createSeries(chart, "GDP", gdpData);

        chart.legend = new am4charts.Legend();
            chart.legend.position = "right";
            chart.legend.scrollable = true;
            chart.legend.markers.template.states.create("dimmed").properties.opacity = 0.3;
            chart.legend.labels.template.states.create("dimmed").properties.opacity = 0.3;
            chart.legend.itemContainers.template.events.on("over", (event) => {
                processOver(chart, event.target.dataItem.dataContext);
            })
            chart.legend.itemContainers.template.events.on("out", (event) => {
                processOut(chart, event.target.dataItem.dataContext);
            })

            // document.getElementById("button").addEventListener("click", () => {
            //     processOver(chart, chart.series.getIndex(3));
            // });
    }

    toggleTheme = () => {
        let themeDark = !this.state.themeDark;
        let body = document.getElementsByTagName("body")[0];
        if(themeDark) {
            am4core.useTheme(am4themes_dark);
            body.classList.remove("light-theme");
        } else {
            am4core.unuseTheme(am4themes_dark);
            body.classList.add("light-theme");
        }
        chart.dispose();
        this.setState({ themeDark: themeDark });
        this.createChart();
    }

    render() {
        return (
            <div>
                <Theme toggleTheme={this.toggleTheme} />
                <div id="main-line-chart-container">
                    <div id="main-line-chart"></div>
                </div>
                <p>Please don't take this chart too seriously. I don't know what I'm doing</p>
                <Citations />  
            </div>
        );
    }
}

export default Home;