import React, { Component } from "react";
import Citations from "./Citations";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { createSeries, processOver, processOut } from "../util/functions";
import { populationData } from "../util/constants";
import "../styles/home.css";

am4core.useTheme(am4themes_animated);

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    componentDidMount() {
        let chart = am4core.create("main-line-chart", am4charts.XYChart);
        let xAxis = chart.xAxes.push(new am4charts.ValueAxis());
        let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
        console.log(populationData)
        createSeries(chart, "U.S. Population", populationData);

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
                {/* <button id="button">I'm a button</button> */}
                <Citations />  
            </div>
        );
    }
}

export default Home;