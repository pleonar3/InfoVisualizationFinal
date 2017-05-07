$(".navButton").hide();

function updateViews(results){
	updateView1(results);
	updateView2(results);
	updateView3(results);
	updateView4(results);
	updateView5(results);
}

const PIE_WIDTH = 400;
const PIE_HEIGHT = 400;
const BUBBLE_HEIGHT = 450;
function updateView1(results){

	if (results != null && results != undefined){
		let STEP_VALUE = 10;
		let MAX_THRESHOLD = 12;
		let LABEL = "avgspeed < ";
		var fastest = 0;
		
		var counts = [];

		for(var i = 1; i < MAX_THRESHOLD; ++i){
			var obj = {thresh: LABEL + i * STEP_VALUE, count: 0};
			
			counts[i - 1] = obj;
		}
	
		for(var i = 0; i < results.length; ++i){
			var result = results[i];
			
			console.log(result);
			
			var j = 1;
			
			while(j * STEP_VALUE < result.avspeed)++j;
			
			var obj = counts[j - 1];
			
			var count = obj.count;
			
			obj.count = ++count;
				
			if (result.avspeed > fastest)
				fastest = result.avspeed;
		}
		
		nv.addGraph(function() {
			var chart = nv.models.pieChart()
				.x(function(d) { return d.thresh })
				.y(function(d) { return d.count })
				.width(PIE_WIDTH)
				.height(PIE_HEIGHT)
				.labelType('percent')
				.valueFormat(d3.format('%'))
				.donut(true)
				.showTooltipPercent(true);

			d3.select("#view1")
				.datum(counts)
				.transition().duration(1200)
				.attr('width', PIE_WIDTH)
				.attr('height', PIE_HEIGHT)
				.call(chart);

			return chart;
		});
	}
}

function StreetName(name, count){
	this.name = name;
	this.count = count;
}

function updateView2(results){

	//console.log(results);

	if (results != null && results != undefined){
		var streets = [];
		
		for(var i = 0; i < results.length; ++i){
			var result = results[i];
			for(var j = 0; j < result.streetnames.length; ++j){
				var streetName = result.streetnames[j];
				
				if (typeof streets[streetName] !== 'undefined') {
					streets[streetName].count = streets[streetName].count + 1;
				}
				else{
					streets[streetName] = new StreetName(streetName, 1);;
				}
			}
		}
		
		var streetsIndexed = [];
		
		
		var keys = Object.keys(streets);
		
		for(var i = 0; i < keys.length; ++i){
			streetsIndexed.push(streets[keys[i]]);
		}
		
		streetsIndexed.sort(function(a, b){ return b.count - a.count;});
		
		var top5Streets = [];
		
		for(var i = 0; i < 5; ++i)
			top5Streets.push(streetsIndexed[i]);
		
		nv.addGraph(function() {
			var chart = nv.models.pieChart()
				.x(function(d) { return d.name })
				.y(function(d) { return d.count })
				.width(PIE_WIDTH)
				.height(PIE_HEIGHT)
				.labelType('percent')
				.valueFormat(d3.format('%'))
				.donut(false)
				.showTooltipPercent(true);

			d3.select("#view2")
				.datum(top5Streets)
				.transition().duration(1200)
				.attr('width', PIE_WIDTH)
				.attr('height', PIE_HEIGHT)
				.call(chart);

			return chart;
		});
	}
}

function TripDistance(tripId, distance){
		this.tripId = tripId;
		this.distance = distance;
	}

function updateView3(results){

	if (results != null && results != undefined){
		var trips = [];
		
		for(var i = 0; i < results.length; ++i){
			var result = results[i];
			
			trips.push(new TripDistance(result.tripid, result.distance));
		}
		
		trips.sort(function(a, b){ return a.distance - b.distance;});
		
		var top5Trips = [];
		
		for(var i = 0; i < 5; ++i){
			top5Trips.push(trips[i]);
		}
		
		var tripInfo = [{
				key: "Top 5 Trips",
				
				values: top5Trips
				
				}];
		
		console.log(top5Trips);
		
		nv.addGraph(function() {
			var chart = nv.models.discreteBarChart()
				.x(function(d) { return d.tripId })
				.y(function(d) { return d.distance })
				.staggerLabels(true)
				//.staggerLabels(historicalBarChart[0].values.length > 8)
				.showValues(true)
				.duration(250)
				;

			d3.select('#view3')
				.attr('width', PIE_WIDTH)
				.attr('height', PIE_HEIGHT)
				.datum(tripInfo)
				.call(chart);

			nv.utils.windowResize(chart.update);
			return chart;
		});
	}
}

function updateView4(results){

	if (results != null && results != undefined){
		var trips = [];
		
		for(var i = 0; i < results.length; ++i){
			var result = results[i];
			
			trips.push(new TripDistance(result.tripid, result.distance));
		}
		
		trips.sort(function(a, b){ return b.distance - a.distance;});
		
		var top5Trips = [];
		
		for(var i = 0; i < 5; ++i){
			top5Trips.push(trips[i]);
		}
		
		var tripInfo = [{
				key: "Top 5 Trips",
				
				values: top5Trips
				
				}];
		
		console.log(top5Trips);
		
		nv.addGraph(function() {
			var chart = nv.models.discreteBarChart()
				.x(function(d) { return d.tripId })
				.y(function(d) { return d.distance })
				.staggerLabels(true)
				//.staggerLabels(historicalBarChart[0].values.length > 8)
				.showValues(true)
				.duration(250)
				;

			d3.select('#view4')
				.attr('width', PIE_WIDTH)
				.attr('height', PIE_HEIGHT)
				.datum(tripInfo)
				.call(chart);

			nv.utils.windowResize(chart.update);
			return chart;
		});
	}
}

function Bubble(x, y, size){
	this.x = x;
	this.y = y;
	this.size = size;
	this.shape = 'circle';
}

function updateView5(results){

	if (results != null && results != undefined){
		var bubbles = [];
		
		for(var i = 0; i < results.length; ++i){
			var result = results[i];
			
			bubbles.push(new Bubble(result.avspeed, result.duration/10, result.distance/1000));
			
		}
		
		var bubbleData = [{
			key: "Bubble Data",
			values: bubbles
		}
		];
		
		nv.addGraph(function() {
			  var chart = nv.models.scatterChart()
							.showDistX(true)    //showDist, when true, will display those little distribution lines on the axis.
							.showDistY(true)
							//.transitionDuration(350)
							.color(d3.scale.category10().range());

			  //Axis settings
			  chart.xAxis.tickFormat(d3.format('.02f'));
			  chart.yAxis.tickFormat(d3.format('.02f'));

			  d3.select('#view5')
				  .attr('width', PIE_WIDTH)
				  .attr('height', BUBBLE_HEIGHT)
				  .datum(bubbleData)
				  .call(chart);

			  nv.utils.windowResize(chart.update);

			  return chart;
			});
	}
}