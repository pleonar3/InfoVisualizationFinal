# InfoVisualizationFinal Documentation

## Languages
  * HTML
  * CSS
  * Javascript -> overall component, d3
  * JQuery -> element selection 
  * Angular JS -> data binding and routing
	
## Usage
  1. Select a an area on the map using the Square select tool.
  2. Once selected, use the left/right arrow buttons to select a visualization
  
## Visualizations

#### First Donut Pie Chart
	* displays the average speed of routes in 10 mile thresholds
	* shows a donut pie chart telling what % of the routes are in each threshold
	
#### Second Normal Pie Chart
	* top 5 roads traveled by all routes 
	* what % each road is relative to the other top 4
	
#### Third Bar Chart
	* top 5 shortest routes by distance
	* the x axis contains the route's id and the y axis contains the distance traveled
	
#### Fourth Bar Chart
	* top 5 longest routes by distance
	* the x axis contains the route's id and the y axis contains the distance traveled
	
#### Fifth Bubble Chart
	* Displays a route's distance in relation to its average speed and duration
	* The bubble's radius represents the distance (bigger bubble means a longer distance)
	* the x axis tells the average speed, the y axis tells the duration of the route
	* Shows relationship between speed and the duration of the trip 
	* also can see that higher up a bubble is (longer it takes to use route) seems to generally mean a larger bubble (longer distance)