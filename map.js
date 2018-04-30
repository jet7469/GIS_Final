require([
	"esri/map",
	"esri/layers/CSVLayer",
	"esri/symbols/SimpleMarkerSymbol",
	"esri/renderers/UniqueValueRenderer",
	"esri/Color",
	"dojo/domReady!"
], 
function(Map, CSVLayer, SimpleMarkerSymbol, UniqueValueRenderer, Color) {
	
	var map = new Map("mapDiv", {
		basemap: "streets",
		zoom: 5,
    	center: [-64, 32]
	});
	
	var defaultSymbol = new SimpleMarkerSymbol().setColor([150,150,150,0.2]);
	var defaultColor = new Color([0,0,0,0.5]);
	
	var renderer = new UniqueValueRenderer(defaultSymbol, "LEVEL");
	
	renderer.addValue("1", new SimpleMarkerSymbol({size: 6, color: defaultColor}));
	renderer.addValue("2", new SimpleMarkerSymbol({size: 9, color: defaultColor}));
	renderer.addValue("3", new SimpleMarkerSymbol({size: 12, color: defaultColor}));
	renderer.addValue("4", new SimpleMarkerSymbol({size: 15, color: defaultColor}));
	renderer.addValue("5", new SimpleMarkerSymbol({size: 18, color: defaultColor}));
	renderer.addValue("6", new SimpleMarkerSymbol({size: 21, color: defaultColor}));
	renderer.addValue("7", new SimpleMarkerSymbol({size: 24, color: defaultColor}));
	
	var csvLayer = new CSVLayer("2017.csv");
	csvLayer.setRenderer(renderer);
	map.addLayer(csvLayer);

});