
function drawAxes(svg) {
    svg.append("g")
        .attr("id", "xaxis")
        .attr("transform", "translate(0," + y_scale(0) + ")")
        .attr("fill","none")
        .attr("stroke","gray")
        .call(d3.svg.axis().ticks(6).scale(x_scale).orient("bottom").tickFormat(d3.format("d")));

    svg.append("g")
        .attr("id", "yaxis")
        .attr("fill","none")
        .attr("stroke","gray")
        .attr("transform", "translate(" + x_scale(x_domain[0]) + ",0)")
        .call(d3.svg.axis().ticks(4).scale(y_scale).orient("left"));

    svg.append("text")
        .text("Year")
        .attr("fill","black")
        .attr("font-size",22)
        .attr("x",300)
        .attr("y",400);

    svg.append("text")
        .text("Year")
        .attr("fill","black")
        .attr("font-size",22)
        .attr("x",2)
        .attr("y",200)
        .attr("transform","rotate(90)");
}


function loadRangeAnnotations() {
    d3.json("range_annotations.json",function(val){
        range_annotations = val;
        console.log(range_annotations);
        updateRangeAnnotations(range_annotations);
        addRangeEvents();
    });
}

function loadDataPointAnnotations() {
    d3.json("datapoints_with_annotations.json",function(val){
        json_data = val;

        for (i in json_data) {
            createAnnotatableDatapoints(i,json_data[i]);
            //updateDatapointAnnotations(i);
        }


    });

}


function addLegend() {

    for (i in json) {

    }
}

function readFile(filename, x_series) {
    data = []
    d3.csv(filename, function(d){
        data = d;
        all_series = [];
        final_data = {}
        for (i in data[0]) {
            all_series.push(i);
            final_data[i] = [];
        }

        for (i in data) {
            for (j in data[i]) {
                if (data[i][j] != '' && data[i][x_series] != '') {   
                    final_data[j].push({x:data[i][x_series],'value':data[i][j],'annotations':[]});
                }
            }
        }

        json_data = final_data;

        drawGraphElements(x_series);

    });

}


function updateDatapointAnnotations(series_name) {
    elem = svg.select("#series_" + series_name).selectAll(".datapoint")

    elem.data(json_data[series_name]);

    elem.transition().duration(1000)
        .attr("stroke-width",function(d){
            if (d.annotations.length > 0) {
                return stroke_width_with_annotation;
            } else {
                return stroke_width_general;
            }
        })
        .attr("stroke",function(d){
            if (d.annotations.length > 0) {
                return "red";
            } else {
                return line_color;
            }
        })
        .attr("r",function(d){
            if (d.annotations.length > 0) {
                return radius_with_annotation;
            } else {
                return radius_general;
            }
        })
}


function updateRangeAnnotations(range_data) {
    // Adding a rectangle where the user added an annotation
    svg.selectAll(".range_annotation")
        .data(range_data)
        .enter()
        .append("rect")
        .attr("class","range_annotation")
        .attr("opacity",0.2)
        .attr("x",function(d){return x_scale(d.range[0])})
        .attr("y",0)
        .attr("fill","#ccc")
        .attr("cursor","pointer")
        .attr("width",function(d){return x_scale(d.range[1]) - x_scale(d.range[0])})
        .attr("height",y_scale(0))
        .on("mouseover",function(d){
            d3.select(this).attr("fill","#aaa");
        })
        .on("mouseout",function(d){
            d3.select(this).attr("fill","#ccc");
        })

}
