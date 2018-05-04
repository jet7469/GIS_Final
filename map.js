
require([
	"esri/map",
	"esri/InfoTemplate",
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
function(Map, InfoTemplate, CSVLayer, SimpleMarkerSymbol, UniqueValueRenderer, 
	HeatmapRenderer, Color, LayerList) {
	
	//Create map
	var map = new Map("mapDiv", {
		basemap: "streets",
		zoom: 4,
    	center: [-55, 32]
	});
	
	//Create UniqueValueRenderers for each year(layer)
	var render2017 = new UniqueValueRenderer(new SimpleMarkerSymbol({size: 2}), "LEVEL");
	var render2016 = new UniqueValueRenderer(new SimpleMarkerSymbol({size: 2}), "LEVEL");
	var render2015 = new UniqueValueRenderer(new SimpleMarkerSymbol({size: 2}), "LEVEL");
	var render2014 = new UniqueValueRenderer(new SimpleMarkerSymbol({size: 2}), "LEVEL");
	var render2013 = new UniqueValueRenderer(new SimpleMarkerSymbol({size: 2}), "LEVEL");
	var render2012 = new UniqueValueRenderer(new SimpleMarkerSymbol({size: 2}), "LEVEL");
	
	//Add renderers to an array
	var renderers = [];
	renderers.push(render2017, render2016, render2015, render2014, render2013, render2012);
	
	//Array of colors (one for each year)
	var colors = [
		[178,102,255,0.8],
		[102,102,255,0.8],
		[102,255,102,0.8],
		[255,255,102,0.8],
		[255,178,102,0.8],
		[255,102,102,0.8]
	];
	
	//Add values for all renderers, using a different color for each
	for (var i=0; i < renderers.length; i++) {
		var color = new Color(colors[i]);
		
		renderers[i].addValue("0", new SimpleMarkerSymbol({size: 2, color: color}));
		renderers[i].addValue("1", new SimpleMarkerSymbol({size: 4, color: color}));
		renderers[i].addValue("2", new SimpleMarkerSymbol({size: 6, color: color}));
		renderers[i].addValue("3", new SimpleMarkerSymbol({size: 8, color: color}));
		renderers[i].addValue("4", new SimpleMarkerSymbol({size: 10, color: color}));
		renderers[i].addValue("5", new SimpleMarkerSymbol({size: 12, color: color}));
		renderers[i].addValue("6", new SimpleMarkerSymbol({size: 14, color: color}));
		renderers[i].addValue("7", new SimpleMarkerSymbol({size: 16, color: color}));		
	}
	
	//create InfoTemplate for popups on each layer
	var infoTemp = new InfoTemplate();
	infoTemp.setTitle("Hurricane ${NAME} - ${YEAR}");
	infoTemp.setContent("<div class='row'><div class='col-md-6 text-right'>" +
		"<strong>Date/Time:</strong></div><div class='col-md-6'>${TIME}</div>" +
		"</div><div class='row'><div class='col-md-6 text-right'><strong>Status:</strong>" +
		"</div><div class='col-md-6'>${STAT}</div></div><div class='row'>" +
		"<div class='col-md-6 text-right'><strong>Wind:</strong></div><div class='col-md-6'>" +
		"${WIND} mph</div></div><div class='row'><div class='col-md-6 text-right'>" +
		"<strong>Pressure:</strong></div><div class='col-md-6'>${PR}</div></div>");
						
	//Create CSVLayers
	//2017
	var layer2017 = new CSVLayer("csv/2017.csv");
	layer2017.setRenderer(render2017);
	layer2017.setInfoTemplate(infoTemp);
	map.addLayer(layer2017);
	
	//2016
	var layer2016 = new CSVLayer("csv/2016.csv");
	layer2016.setRenderer(render2016);
	layer2016.setInfoTemplate(infoTemp);
	map.addLayer(layer2016);
	
	//2015
	var layer2015 = new CSVLayer("csv/2015.csv");
	layer2015.setRenderer(render2015);
	layer2015.setInfoTemplate(infoTemp);
	map.addLayer(layer2015)
	
	//2014
	var layer2014 = new CSVLayer("csv/2014.csv");
	layer2014.setRenderer(render2014);
	layer2014.setInfoTemplate(infoTemp);
	map.addLayer(layer2014);
	
	//2013
	var layer2013 = new CSVLayer("csv/2013.csv");
	layer2013.setRenderer(render2013);
	layer2013.setInfoTemplate(infoTemp);
	map.addLayer(layer2013);
	
	//2012	
	var layer2012 = new CSVLayer("csv/2012.csv");
	layer2012.setRenderer(render2012);
	layer2012.setInfoTemplate(infoTemp);
	map.addLayer(layer2012);
	
	
	//Heat map renderer
	var heatmapRenderer = new HeatmapRenderer({
		field: "LEVEL",
		blurRadius: 11
	});
	
	//Heat map layer
	var heatmap = new CSVLayer("csv/all_years.csv");
	heatmap.setRenderer(heatmapRenderer);
	heatmap.setVisibility(false);
	map.addLayer(heatmap);
	
	
	//set layers for the LayerList
	var allLayers = [
		{
			layer: heatmap,
			title: "Heat Map",
			showLegend: false,
			visibility: false
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
		
	//Add LayerList
	var layerlist = new LayerList({
		map: map,
		showLegend: true,
		layers: allLayers
	}, "legend");
	
});
