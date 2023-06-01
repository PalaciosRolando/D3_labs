/*
*    main.js
*/

const svg = d3.select("#chart-area").append("svg")
    .attr('width', 500)
    .attr('height', 500);
  
  d3.json('data/buildings.json').then((data) => {
    const buildingsData = data.map((d) => +d.height);
  
    var x = d3.scaleBand()
      .domain(buildingsData)
      .range([0, 500])
      .paddingInner(0.3)
      .paddingOuter(0.3);
  
    var y = d3.scaleLinear()
      .domain([0, 828])
      .range([0, 500]);

    var color = d3.scaleOrdinal()
      .domain(buildingsData)
      .range(d3.schemeSet3);
  
    var rects = svg.selectAll('rect')
      .data(buildingsData)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d))
      .attr('y', (d) => 500 - y(d))
      .attr('width', 20)
      .attr('height', (d) => y(d))
      .attr('fill', (d) => color(d));
  }).catch((error) => {
    console.log(error);
  });
  