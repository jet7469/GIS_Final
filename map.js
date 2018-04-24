  
require([
	"esri/Map",
	"esri/views/MapView",
    "dojo/domReady!"
], 
function(Map, MapView) {
	var map = new Map({
		basemap: "streets",
    });

	var view = new MapView({
    	container: "mapDiv",
    	map: map,
    	zoom: 5,
    	center: [-64, 32]    
    });
    
});