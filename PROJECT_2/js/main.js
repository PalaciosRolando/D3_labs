/*
*    main.js
*/

var margin = {top: 10, right: 10,  bottom: 100, left:100};
var width = 600;
var height = 400;

var index = 0;
var maxYears = 0;

var g = d3.select('#chart-area')
    .append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom + 1)
    .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

d3.json("data/data.json").then(function(data){
	var years = data.map ( (d) => d.year);

	const Data = data.map((year) => {
		return year["countries"].filter((country) => {
			var dataExists = (country.income && country.life_exp);
			return dataExists;
		}).map((country) => {
			country.income = +country.income;
			country.life_exp = +country.life_exp;
			return country;
		})
	});

	maxYears = years.length;

	var y = d3.scaleLinear().range([0, height]).domain([90, 0]);
	var leftAxis = d3.axisLeft(y);

	g.append("g")
    	.attr("class", "left axis")
		.call(leftAxis);

	var x = d3.scaleLog().domain([142, 150000]).range([0, width]).base(10);
	var area = d3.scaleLinear().domain([2000, 1400000000]).range([25*Math.PI, 1500*Math.PI]);
    var bottomAxis = d3.axisBottom(x).tickValues([400, 4000, 40000] )
		.tickFormat( d3.format("($d"));

     g.append("g")
		.attr("class", "bottom axis")
		.attr("transform", "translate(0, " + height + ")")
		.call(bottomAxis);

	var xLabel = g.append("text")
        .attr("class", "y axis-label")
        .attr("x", width - 60)
        .attr("y", height - 20)
        .attr("font-size", "28px")
		.attr("font-family", "Lato")
        .attr("text-anchor", "right")
        .style("fill","gray");

	var yLabel = g.append("text")
        .attr("class", "y axis-label")
        .attr("x", -height/2)
        .attr("y", -60)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .style("fill","black")
		.text("Life Expectancy (Years)");

	g.append("text")
        .attr("class", "y axis-label")
        .attr("x", width / 2)
        .attr("y", height + margin.top)
        .attr("transform", "translate(0, " + (40) + ")")
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .style("fill","black")
        .text("GDP Per Capita ($)");


	var continents = ["africa", "americas", "asia", "europe"];

	var legend = g.append("g")
	.attr("transform", "translate(" + (width - 10) + "," + (height - 125) + ")");

	var colors = {asia: "blue", americas: "red", europe: "green", africa: "purple"};

	continents.forEach((continent, i) => {
		var legendRow = legend.append("g")
			.attr("transform", "translate(0, " + (i * 20) + ")");
		legendRow.append("rect")
			.attr("width", 10)
			.attr("height", 10)
			.attr("fill", colors[continent]);
		legendRow.append("text")
			.attr("x", -10)
			.attr("y", 10)
			.attr("text-anchor", "end")
			.style("text-transform", "capitalize")
			.text(continent);
	});

	var t = d3.transition().duration(750);
	update(Data);
	d3.interval( () => {
		index++;
		if (index == maxYears){
			index = 0;
		}
		update(Data);
	}, 500);

	function update(data){
        xLabel.text(years[index]);

		var circles = g.selectAll('circle')
        .data(data[index]);

        circles.exit()
		.transition(t)
			.attr("cx", x(0))
			.attr("cy", y(0))
			.attr("r", 0)
		.remove();

        circles.enter().append("circle")
			.attr("fill", (d) => {return colors[d.continent]})
			.merge(circles)
			.transition(t)
        	.attr("cx", (d) => { return x(d.income); })
        	.attr("cy", (d) => { return y(d.life_exp); })
			.attr("r", (d) => {return Math.sqrt(area(d.population)/ Math.PI)});
	}
})