import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export const createSeries = (chart, name, data) => {
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "count";
    series.dataFields.valueX = "year";
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