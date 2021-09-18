import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { rawCpiInflationData } from "./constants";

export const createSeries = (chart, name, data) => {
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueX = "year";
    series.dataFields.valueY = "percent";
    
    series.name = name;

    let segment = series.segments.template;
    segment.interactionsEnabled = true;

    let hoverState = segment.states.create("hover");
    hoverState.properties.strokeWidth = 3;

    let dimmed = segment.states.create("dimmed");
    dimmed.properties.stroke = am4core.color("#dadada");

    segment.events.on("over", (event) => {
        processOver(chart, event.target.parent.parent.parent);
    });

    segment.events.on("out", (event) => {
        processOut(chart, event.target.parent.parent.parent);
    });

    for(let i=0; i<data.length; i++) {
        data[i].percent = (data[i].count / data[data.length - 1].count) * 100;
    }
    series.data = data;
    return series;
}

export const processOver = (chart, hoveredSeries) => {
    hoveredSeries.toFront();

    hoveredSeries.segments.each(segment => {
        segment.setState("hover");
    })

    hoveredSeries.legendDataItem.marker.setState("default");
    hoveredSeries.legendDataItem.label.setState("default");

    chart.series.each(function(series) {
        if (series !== hoveredSeries) {
            series.segments.each(function(segment) {
                segment.setState("dimmed");
            })
            series.bulletsContainer.setState("dimmed");
            series.legendDataItem.marker.setState("dimmed");
            series.legendDataItem.label.setState("dimmed");
        }
    });
}

export const processOut = (chart) => {
    chart.series.each(function(series) {
        series.segments.each(function(segment) {
            segment.setState("default");
        })
        series.bulletsContainer.setState("default");
        series.legendDataItem.marker.setState("default");
        series.legendDataItem.label.setState("default");
    });
}

export const printInflationValues = async () => {
    let result = [{
        year: "",
        count: ""
    }];
    let resultIndex = 0;
    let tempString = "";
    let year = true;

    // iterate over all characters in the raw data string
    for(let i=0; i<rawCpiInflationData.length; i++) {
        if(year === true) {
            // if still reading year number then add that character
            if(rawCpiInflationData.charAt(i) !== ",") {
                tempString = tempString + rawCpiInflationData.charAt(i)
            }
            // if reading the "," then save that tempstring the current result index and the go to cpi for next characters
            else if(rawCpiInflationData.charAt(i) === ",") {
                result[resultIndex].year = tempString;
                tempString = "";
                year = false;
            }
        }
        else if(year === false) {
            // if still reading cpi number then add that character
            if((rawCpiInflationData.charAt(i) !== "-") && (rawCpiInflationData.charAt(i) !== "+")) {
                tempString = tempString + rawCpiInflationData.charAt(i)
            }
            // if reading "-" then save that tempstring the current result index and the go to year for next characters
            else if(rawCpiInflationData.charAt(i) === "-") {
                result[resultIndex].count = tempString;
                tempString = "";
                resultIndex++;
                year = true;
                if(i !== rawCpiInflationData.length-1) {
                    result.push({
                        year: "",
                        count: ""
                    });
                }
            }
        }
    }
    console.log(result)
    // {
    //     year: "1910",
    //     count: 92228531
    // }
    
}