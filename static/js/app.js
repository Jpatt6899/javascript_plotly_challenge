
function buildPlots(itemSelect){   
    d3.json("samples.json").then(function(data) {
        
        
        var sample = data.samples;
        var name = data.names;
        console.log(name);
        var table = data.metadata;
        var otu_ids = sample.map(item => item.otu_ids);
        var sample_values = sample.map(item => item.sample_values);
        var otu_labels = sample.map(item => item.otu_labels);
        console.log(data);
    
        var selectedId = sample.filter(item => item.id == itemSelect)[0];
    
    
    var trace1 = {
        y: selectedId.otu_ids.slice(0, 10).reverse().toString(),
        x: selectedId.sample_values.slice(0, 10).reverse(),
        text: selectedId.otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h"
    };

    var layout = {
        margin: {
            l: 100,
            r: 100,
            b: 100,
            t: 100
        },
        marker: {
            
            width: 2
        },
        title: "Top 10 Bacteria Found"
        

    };


    
    var data = [trace1];
    Plotly.newPlot("bar", data, layout);
    
    var trace2 = {
        y: selectedId.sample_values,
        x: selectedId.otu_ids,
        text: selectedId.otu_labels,
        mode: 'markers',
        marker:{
        size: selectedId.sample_values,
        color: selectedId.otu_ids
    }
 };

    var layout_2 = {

        title: "Bacteria Cultures Per Sample"
    }
        
    var data_1 = [trace2];
    Plotly.newPlot("bubble", data_1, layout_2);
    console.log('bubble')

 });
};






function addTable(dataItem){
    d3.json("samples.json").then(function(data) {
        
        
        var sample = data.samples;
        var name = data.names;
        console.log(name);
        var table = data.metadata;
        var otu_ids = sample.map(item => item.otu_ids);
        var sample_values = sample.map(item => item.sample_values);
        var otu_labels = sample.map(item => item.otu_labels);
        console.log(data);
    
        var selectedId = table.filter(item => item.id == dataItem)[0];
    var tableLoc = d3.select("#sample-metadata");
    tableLoc.html("")
    
        Object.entries(selectedId).forEach(([key, value]) => {
          tableLoc.append("p").text(`${key}:${value}`);
          
        });
      });
    };





function init(){
    var dropDown = d3.selectAll("#selDataset");
    var tbody = d3.select("tbody");

        d3.json("samples.json").then(function(data) {
            
            //console.log(data);
            var sample = data.samples;
            var name = data.names;
            var table = data.metadata;
            var otu_ids = sample.map(item => item.otu_ids);
            var sample_values = sample.map(item => item.sample_values);
            var otu_labels = sample.map(item => item.otu_labels);
            
            console.log(data);
        name.forEach((item)=> {
            dropDown.append("option").text(item).property("value",item);
        
        });
        buildPlots(name[0]);
        addTable(name[0]);
    });
        
    
};

function optionChanged(dataSelect){
    buildPlots(dataSelect);
    addTable(dataSelect);


}


init();

