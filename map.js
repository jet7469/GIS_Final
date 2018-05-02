
require([
	"esri/map",
	"esri/layers/CSVLayer",
	"esri/symbols/SimpleMarkerSymbol",
	"esri/renderers/UniqueValueRenderer",
	"esri/renderers/HeatmapRenderer",
	"esri/Color",
	"esri/dijit/LayerList",
	"dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
	"dojo/domReady!"
], 
function(Map, CSVLayer, SimpleMarkerSymbol, UniqueValueRenderer, 
	HeatmapRenderer, Color, LayerList) {
	
	//Create map
	var map = new Map("mapDiv", {
		basemap: "streets",
		zoom: 4,
    	center: [-55, 32]
	});
	
	//Create default symbol for renderer
	var defaultSymbol = new SimpleMarkerSymbol({size: 1});
	var defaultColor = new Color([0,0,0,0.5]);
	
	//Create unique value renderer
	var renderer = new UniqueValueRenderer(defaultSymbol, "LEVEL");
	
	//Add unique values for renderer
	renderer.addValue("1", new SimpleMarkerSymbol({size: 3, color: defaultColor}));
	renderer.addValue("2", new SimpleMarkerSymbol({size: 6, color: defaultColor}));
	renderer.addValue("3", new SimpleMarkerSymbol({size: 9, color: defaultColor}));
	renderer.addValue("4", new SimpleMarkerSymbol({size: 12, color: defaultColor}));
	renderer.addValue("5", new SimpleMarkerSymbol({size: 15, color: defaultColor}));
	renderer.addValue("6", new SimpleMarkerSymbol({size: 18, color: defaultColor}));
	renderer.addValue("7", new SimpleMarkerSymbol({size: 21, color: defaultColor}));
	
	//Create CSVLayers
	//2017
	var layer2017 = new CSVLayer("csv/2017.csv");
	layer2017.setRenderer(renderer);
	map.addLayer(layer2017);
	
	//2016
	var layer2016 = new CSVLayer("csv/2016.csv");
	layer2016.setRenderer(renderer);
	map.addLayer(layer2016);
	
	//2015
	var layer2015 = new CSVLayer("csv/2015.csv");
	layer2015.setRenderer(renderer);
	map.addLayer(layer2015)
	
	//2014
	var layer2014 = new CSVLayer("csv/2014.csv");
	layer2014.setRenderer(renderer);
	map.addLayer(layer2014);
	
	//2013
	var layer2013 = new CSVLayer("csv/2013.csv");
	layer2013.setRenderer(renderer);
	map.addLayer(layer2013);
	
	//2012	
	var layer2012 = new CSVLayer("csv/2012.csv");
	layer2012.setRenderer(renderer);
	map.addLayer(layer2012);
	
	
	//Heat map renderer
	var heatmapRenderer = new HeatmapRenderer({
		field: "LEVEL"
	});
	
	//Heat map layer
	var heatmap = new CSVLayer("csv/all_years.csv");
	heatmap.setRenderer(heatmapRenderer);
	map.addLayer(heatmap);
	
	//TODO: clip for heat map so its just over land/US?
	
	//set layers for the LayerList
	var allLayers = [
		{
			layer: heatmap,
			title: "Heat Map",
			showLegend: false,
		}, {
			layer: layer2017,
			title: "2017",
			showLegend: false
		}, {
			layer: layer2016,
			title: "2016",
			showLegend: false
		}, {
			layer: layer2015,
			title: "2015",
			showLegend: false
		}, {
			layer: layer2014,
			title: "2014",
			showLegend: false,
		}, {
			layer: layer2013,
			title: "2013",
			showLegend: false,
		}, {
			layer: layer2012,
			title: "2012",
			showLegend: false,
		}
	];
	
	//TODO: Set it so only 2017 shows on startup
	
	//Add LayerList
	var layerlist = new LayerList({
		map: map,
		showLegend: true,
		layers: allLayers
	}, "legend");
	
});
