var svg = d3.select("#chart-area").append("svg")
    .attr("width", 800)
    .attr("height", 800);

d3.csv("data/ages.csv").then((data)=> {
    data.forEach((d)=>{
        d.age = +d.age;
    });
    console.log(data);
});

d3.tsv("data/ages.tsv").then((data)=> {
    data.forEach((d)=>{
        d.age = +d.age;
    });
    console.log(data);
});

var separation = 0;

d3.json("data/ages.json").then((data)=> {
    data.forEach((d)=>{
        d.age = +d.age;

        if(d.age>10){
            var color = "green";
        }else{
            var color = "blue";
        }

        svg.append("circle")
            .attr("cx", separation+50)
            .attr("cy", d.age)
            .attr("r", d.age)
            .attr("fill",color);
        separation = separation + d.age + 20;
    });



});


/*


var data = [25, 20, 15, 10, 5];

print(data.length)

for (i = 0;i<data.length;i++){
    svg.append("rect")
        .attr("x", i*(40+20))
        .attr("y", 0)
        .attr("width", 40)
        .attr("height", data[i])
        .attr("fill","red");
}

*/