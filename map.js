  
require([
	"esri/Map",
	"esri/layers/CSVLayer",
	"esri/views/MapView",
    "dojo/domReady!"
], 
function(Map, MapView, CSVLayer) {
	var map = new Map({
		basemap: "streets",
		layers: [csvLayer],
    });

	var view = new MapView({
    	container: "mapDiv",
    	map: map,
    	zoom: 5,
    	center: [-64, 32]    
    });
    
    var csvLayer = new CSVLayer({
    	url: "http://serenity.ist.rit.edu/~jet7469/384/Final/2017Hurricanes-maria.csv",
    	copyright: "me",
    	
	});
	
	csvLayer.renderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
          type: "point-3d", // autocasts as new PointSymbol3D()
          symbolLayers: [{
            type: "icon", // autocasts as new IconSymbol3DLayer()
            material: {
              color: [238, 69, 0, 0.75]
            },
            outline: {
              width: 0.5,
              color: "white"
            },
            size: "12px"
          }]
        }
      };
      
	map.add(csvLayer);
    
});