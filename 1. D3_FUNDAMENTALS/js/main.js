var svg = d3.select("#chart-area").append("svg")
    .attr("width", 1600)
    .attr("height", 1000);

var circle = svg.append("circle")
    .attr("cx", 300)
    .attr("cy", 250)
    .attr("r", 120)
    .attr("fill", "blue");

var rect = svg.append("rect")
    .attr("x", 20)
    .attr("y", 20)
    .attr("width", 50)
    .attr("height", 20)
    .attr("fill","red");