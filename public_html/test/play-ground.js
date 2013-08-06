/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var pieChartValue = dc.pieChart("#pie-chart-value")
        .width(250)
        .height(250)
        .radius(100)
        .innerRadius(40)
        .dimension(valueDimension)
        .group(valueGroup)
//        .slicesCap(3)
        .label(function(d) {
            return d.data.key;
        })
        .title(function(d) {
            return d.data.key + ": " + d.data.value;
        });

var pieChartCountry = dc.pieChart("#pie-chart-country")
        .width(250)
        .height(250)
        .radius(100)
        .dimension(countryDimension)
        .group(countryGroup)
        .renderTitle(true);

var choroplethChart = dc.geoChoroplethChart("#choropleth-chart")
        .width(990)
        .height(600);

d3.json("json/us-states.json", function(states) {
    d3.json("json/us-counties.json", function(counties) {
        choroplethChart
                .dimension(stateDimension)
                .group(stateValueSumGroup)
                .colors(["#ccc", "#E2F2FF","#C4E4FF","#9ED2FF","#81C5FF","#6BBAFF","#51AEFF","#36A2FF","#1E96FF","#0089FF"])
                .colorDomain([0, 155])
                .overlayGeoJson(states.features, "state", function(d) {
                    return d.properties.name;
                })
                .overlayGeoJson(counties.features, "county")
                .title(function(d) {
                    return d.key + " : " + (d.value ? d.value : 0);
                });

        dc.renderAll();
    });
});

var lineChartDate = dc.lineChart("#line-chart-date");
lineChartDate.width(500)
        .height(150)
        .dimension(dateDimension)
        .group(dateIdSumGroup)
        .stack(dateValueSumGroup)
        .stack(dateValueSumGroup, function(d) {
            return 10;
        })
        .brushOn(false)
        .title(function(d) {
            return d.value;
        })
        .x(d3.time.scale().domain([new Date(2012, 4, 20), new Date(2012, 7, 15)]))
        .xUnits(d3.time.days)
        .y(d3.scale.linear().domain([0, 200]))
        .renderArea(true)
        .xAxis().ticks(5);

var barChartDate = dc.barChart("#bar-chart-date");
barChartDate.width(500)
        .height(150)
        .dimension(dateDimension)
        .group(dateIdSumGroup)
        .stack(dateValueSumGroup)
        .stack(dateValueSumGroup, function(d) {
            return 10;
        })
        .gap(1)
        .x(d3.time.scale().domain([new Date(2012, 4, 20), new Date(2012, 7, 15)]))
        .xUnits(d3.time.days)
        .xAxis().ticks(5);

var compositeChartDate = dc.compositeChart("#composite-chart-date");
compositeChartDate.width(500)
        .height(150)
        .dimension(dateDimension)
        .group(dateIdSumGroup)
        .x(d3.time.scale().domain([new Date(2012, 4, 20), new Date(2012, 7, 15)]))
        .xUnits(d3.time.days)
        .compose([
            dc.barChart(compositeChartDate).group(dateValueSumGroup),
            dc.lineChart(compositeChartDate),
            dc.lineChart(compositeChartDate).group(dateGroup)
        ])
        .renderlet(function(chart){
            dc.events.trigger(function(){
                barChartDate.focus(chart.filter());
                lineChartDate.focus(chart.filter());
            });
        })
        .xAxis().ticks(5);

var bubbleChart = dc.bubbleChart("#bubble-chart");
bubbleChart.width(990)
        .height(150)
        .dimension(statusDimension)
        .group(statusMultiGroup)
        .colors(["#a60000","#ff0000", "#ff4040","#ff7373","#67e667","#39e639","#00cc00"])
        .colorDomain([0, 220])
        .colorAccessor(function(p) {
            return p.value.value;
        })
        .keyAccessor(function(p) {
            return p.key;
        })
        .valueAccessor(function(p) {
            return p.value.count;
        })
        .radiusValueAccessor(function(p) {
            return p.value.count;
        })
        .x(d3.scale.ordinal().domain(["A", "T", "F", "Z"]))
        .xUnits(dc.units.ordinal)
        .y(d3.scale.linear().domain([0, 10]))
        .r(d3.scale.linear().domain([0, 30]))
        .maxBubbleRelativeSize(0.3)
        .elasticY(true)
        .yAxisPadding("50%")
        .elasticX(true)
        .xAxisPadding("10%")
        .renderLabel(true)
        .renderTitle(true)
        .title(function(p) {
            return p.key + ": {count:" + p.value.count + ",value:" + p.value.value + "}"
        });

var ordinalBarChart = dc.barChart("#ordinal-bar-chart");
ordinalBarChart.width(500)
        .height(150)
        .dimension(stateDimension)
        .group(stateGroup)
        .elasticY(true)
        .x(d3.scale.ordinal().domain(["California", "Colorado", "Delaware", "Mississippi", "Oklahoma", "Ontario"]))
        .xUnits(dc.units.ordinal);

var ordinalLineChart = dc.lineChart("#ordinal-line-chart");
ordinalLineChart.width(500)
        .height(150)
        .dimension(stateDimension)
        .group(stateGroup)
        .y(d3.scale.linear().domain([0, 3]))
        .renderArea(true)
        .renderTitle(true)
        .x(d3.scale.ordinal().domain(["California", "Colorado", "Delaware", "Mississippi", "Oklahoma", "Ontario"]))
        .xUnits(dc.units.ordinal);

var linearBarChart = dc.barChart("#linear-bar-chart");
linearBarChart.width(500)
        .height(150)
        .dimension(valueDimension)
        .group(valueGroup)
        .elasticY(true)
        .x(d3.scale.linear().domain([20, 70]))
        .xUnits(dc.units.float.precision(1));

var barSwitchChart = dc.barChart("#bar-chart-switch");
barSwitchChart.width(500)
        .height(150)
        .dimension(dateDimension)
        .group(dateValueSumGroup)
        .gap(1)
        .renderHorizontalGridLines(true)
        .x(d3.time.scale().domain([new Date(2012, 4, 20), new Date(2012, 7, 15)]))
        .xUnits(d3.time.days)
        .elasticY(true)
        .xAxis().ticks(5);

var negativeBarChart = dc.barChart("#negative-bar-chart");
negativeBarChart.width(1100)
        .height(200)
        .margins({top: 30, right: 50, bottom: 30, left: 30})
        .dimension(dateDimension)
        .group(dateNegativeValueSumGroup)
        .stack(dateNegativeValueSumGroup)
        .stack(dateNegativeValueSumGroup)
        .yAxisPadding(5)
        .elasticY(true)
        .x(d3.time.scale().domain([new Date(2012, 4, 20), new Date(2012, 7, 15)]))
        .renderHorizontalGridLines(true)
        .xUnits(d3.time.days);

var negativeLineChart = dc.lineChart("#negative-line-chart");
negativeLineChart.width(1100)
        .height(200)
        .margins({top: 30, right: 50, bottom: 30, left: 30})
        .dimension(dateDimension)
        .group(dateNegativeValueSumGroup)
        .renderArea(true)
        .stack(dateNegativeValueSumGroup)
        .stack(dateNegativeValueSumGroup)
        .yAxisPadding(5)
        .elasticY(true)
        .x(d3.time.scale().domain([new Date(2012, 4, 20), new Date(2012, 7, 15)]))
        .renderHorizontalGridLines(true)
        .xUnits(d3.time.days);

var rowChart = dc.rowChart("#row-chart");
rowChart.width(1100)
        .height(200)
        .margins({top: 30, left: 10, right: 30, bottom: 30})
        .dimension(valueDimension)
        .group(valueGroup)
        .renderTitle(true)
        .renderLabel(true)
        .title(function(d){return d.value;})
        .colors(d3.scale.category20b());

dc.dataCount(".dc-data-count")
        .dimension(data)
        .group(groupAll);

dc.dataTable(".dc-data-table")
        .dimension(dateDimension)
        .group(function(d) {
            return dateFormat(d3.time.day(d.dd));
        })
        .size(3)
        .sortBy(function(d) {
            return d.dd.getTime();
        })
        .columns([
    function(d) {
        return d.id;
    },
    function(d) {
        return d.date;
    },
    function(d) {
        return d.status;
    },
    function(d) {
        return d.countrycode;
    },
    function(d) {
        return d.value;
    }
]);

var lineChartDateB = dc.lineChart("#line-chart-dateB", "groupB");
lineChartDateB.width(500)
        .height(150)
        .margins({top: 50, right: 50, bottom: 30, left: 30})
        .dimension(dateDimension)
        .group(dateIdSumGroup)
        .stack(dateValueSumGroup)
        .stack(dateValueSumGroup, function(d) {
            return 10;
        })
        .x(d3.time.scale().domain([new Date(2012, 4, 20), new Date(2012, 07, 15)]))
        .xUnits(d3.time.days)
        .y(d3.scale.linear().domain([0, 200]))
        .elasticX(true)
        .xAxisPadding(50)
        .renderArea(true)
        .renderHorizontalGridLines(true)
        .xAxis().ticks(5);

var barChartDateB = dc.barChart("#bar-chart-dateB", "groupB");
barChartDateB.width(500)
        .height(150)
        .dimension(dateDimension)
        .group(dateIdSumGroup)
        .stack(dateValueSumGroup)
        .stack(dateValueSumGroup, function(d) {
            return 10;
        })
        .brushOn(false)
        .title(function(d) {
            return d.value;
        })
        .x(d3.time.scale().domain([new Date(2012, 4, 20), new Date(2012, 07, 15)]))
        .xUnits(d3.time.days)
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
        .gap(0)
        .xAxis().tickValues([new Date(2012, 3, 1), new Date(2012, 6, 1), new Date(2012, 9, 1)]);
barChartDateB.yAxis().tickValues([0, 75, 140]);

var compositeChartDateB = dc.compositeChart("#composite-chart-dateB", "groupB");
compositeChartDateB.width(500)
        .height(150)
        .dimension(dateDimension)
        .group(dateIdSumGroup)
        .x(d3.time.scale().domain([new Date(2012, 4, 20), new Date(2012, 07, 15)]))
        .xUnits(d3.time.days)
        .renderVerticalGridLines(true)
        .compose([
            dc.barChart(compositeChartDateB).gap(0).group(dateValueSumGroup).title(function(d) {
                return "Bar key: " + d.key + "\nBar value: " + d.value;
            }),
            dc.lineChart(compositeChartDateB),
            dc.lineChart(compositeChartDateB).group(dateGroup)
        ])
        .brushOn(false)
        .renderlet(function(chart) {
            chart.selectAll("rect.bar").attr("width", function(d) {
                return Math.round(d.value / 10);
            });
        })
        .xAxis().ticks(5);

dc.renderAll("groupB");

var bubbleOverlay = dc.bubbleOverlay("#bubble-overlay")
        .svg(d3.select("#bubble-overlay svg"))
        .width(600)
        .height(450)
        .dimension(stateDimension)
        .group(stateValueSumGroup)
        .r(d3.scale.linear().domain([0, 300]))
        .title(function(d) {
            return "Title: " + d.key;
        })
        .point("California", 100, 120)
        .point("Colorado", 300, 120)
        .point("Delaware", 500, 220)
        .point("Ontario", 180, 90)
        .point("Mississippi", 120, 220)
        .point("Oklahoma", 200, 350);