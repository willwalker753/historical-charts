import React, { Component } from "react";
import Citations from "./Citations";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { createSeries, processOver, processOut, printInflationValues } from "../util/functions";
import { populationData, cpiInflationData } from "../util/constants";
import "../styles/home.css";

am4core.useTheme(am4themes_animated);
am4core.options.autoDispose = true;

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    componentDidMount() {
        let chart = am4core.create("main-line-chart", am4charts.XYChart);

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
            yAxis.max = 100;
            yAxis.renderer.labels.template.adapter.add("text", (text) => {
                return text + "%";
            });

        createSeries(chart, "U.S. Population", populationData);
        createSeries(chart, "CPI Inflation", cpiInflationData);


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

    render() {
        return (
            <div>
                <div id="main-line-chart"></div>
                <p>Please don't take this chart too seriously. I don't know what I'm doing</p>
                <Citations />  
            </div>
        );
    }
}

export default Home;