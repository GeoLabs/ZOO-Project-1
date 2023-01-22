/**
* Author : Gérald Fenoy
*
* Copyright (c) 2015-2017 GeoLabs SARL
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*
* This work was supported by a grant from the European Union's 7th Framework Programme (2007-2013)
* provided for the project PublicaMundi (GA no. 609608).
*/

require(['bootstrap', 'notify']);

define([
    'module', 'jquery', 'zoo', 'xml2json','ol'
], function(module, $, Zoo, X2JS,ol) {
    
    var zoo = new Zoo({
        url: module.config().url,
        delay: module.config().delay,
    });
    
    var mymodal = $('#myModal');
    var mynotify = $('.top-right');
    

    function notify(text, type) {
        mynotify.notify({
            message: { text: text },
            type: type,
        }).show();
    }

    var wm;
    var layer,hover,hover1;
    var basic_counter = 0,
        table_counter = 0,
        form_counter = 0,
        parent_counter = 0,
        child_counter = 0;
    var main_url;
    var hasSimpleChain=false;
    
    var initialize = function() {

	wm = new WindowManager({
            container: "#windowPane",
            windowTemplate: $('#basic_window_template').html()
	});
	window.wm = wm;

		$('.sidebar-left .slide-submenu').on('click',function() {
		  var thisEl = $(this);
		  thisEl.closest('.sidebar-body').fadeOut('slide',function(){
		    $('.mini-submenu-left').fadeIn();
		    applyMargins();
		  });
		});

		$('.mini-submenu-left').on('click',function() {
		  var thisEl = $(this);
		  $('.sidebar-left .sidebar-body').toggle('slide');
		  thisEl.hide();
		  applyMargins();
		});

		$(window).on("resize", applyMargins);


		applyInitialUIState();
		applyMargins();

		map = new ol.Map({
		    layers: new ol.Collection(),
		    target: 'map',
		    view: new ol.View({
			center: ol.proj.transform([-71.057,42.361],"EPSG:4326","EPSG:3857"),
		//center: [260047.557702813,6051682.54296228],
		//extent: [240047.557702813,6234682.54296228,281304.353234602,6267347.78149257],
		zoom: 15
	    })
	});

        layerLS=new ol.layer.Tile({
            opacity: 0.7,
            source: new ol.source.OSM()
        });

	map.addLayer(layerLS);
	
	main_url="http://localhost/cgi-bin/mapserv?map=/var/data/maps/project_WS2016_1.map";
	var wmsSource=new ol.source.TileWMS({
	    url: main_url,
	    ratio: 1,
	    params: {'LAYERS': 'ways',"VERSION":"1.1.1"},
	    serverType: 'mapserver'
	});
	var layer0=new ol.layer.Tile({
	    source: wmsSource
	});
	map.addLayer(layer0);

	var vector = new ol.layer.Vector({
	    source: source,
	    style: new ol.style.Style({
		fill: new ol.style.Fill({
		    color: 'rgba(255, 255, 255, 0.2)'
		}),
		stroke: new ol.style.Stroke({
		    color: '#ffcc33',
		    width: 2
		}),
		image: new ol.style.Circle({
		    radius: 7,
		    fill: new ol.style.Fill({
			color: 'rgba(255, 0, 0, 0.2)'
		    }),
		    stroke: new ol.style.Stroke({
			color: '#ffcc33',
			width: 2
		    })
		})
	    })
	});
	map.addLayer(vector);
	
	layer = new ol.layer.Vector({
	    map: map,
	    source: new ol.source.Vector({
		features: new ol.Collection(),
		useSpatialIndex: false // optional, might improve performance
	    }),
	    //style: style1,
	    updateWhileAnimating: true, // optional, for instant visual feedback
	    updateWhileInteracting: true // optional, for instant visual feedback
	});
	map.addLayer(layer);
 
	var style1 = new ol.style.Style({
	    fill: new ol.style.Fill({
		color: 'rgba(110,110,110,0.5)'
	    }),
	    stroke: new ol.style.Stroke({
		color: 'rgba(110,110,110,0.5)',
		width: 4
	    }),
	    text: new ol.style.Text({
		font: '12px Calibri,sans-serif',
		fill: new ol.style.Fill({
		    color: '#000'
		}),
		stroke: new ol.style.Stroke({
		    color: '#fff',
		    width: 3
		})
	    }),
	    image: new ol.style.Circle({
		radius: 7,
		fill: new ol.style.Fill({
		    color: 'rgba(255, 0, 0, 0.6)'
		}),
		stroke: new ol.style.Stroke({
		    color: 'rgba(255, 255, 255, 0.6)',
		    width: 2
		})
	    })
	});

	hover = new ol.layer.Vector({
	    map: map,
	    source: new ol.source.Vector({
		features: new ol.Collection(),
		useSpatialIndex: false // optional, might improve performance
	    }),
	    style: style1,
	    updateWhileAnimating: true, // optional, for instant visual feedback
	    updateWhileInteracting: true // optional, for instant visual feedback
	});
	map.addLayer(hover);

	hover1 = new ol.layer.Vector({
	    map: map,
	    source: new ol.source.Vector({
		features: new ol.Collection(),
		useSpatialIndex: false // optional, might improve performance
	    }),
	    style: style1,
	    updateWhileAnimating: true, // optional, for instant visual feedback
	    updateWhileInteracting: true // optional, for instant visual feedback
	});
	map.addLayer(hover1);

	var popup = new ol.Overlay.Popup();
	map.addOverlay(popup);
        
	map.on('click', function (evt) {
	    console.log(isDrawing);
	    if(isDrawing)
		return;
	    var feature = null;
	    map.forEachFeatureAtPixel(evt.pixel,function (f, hover1) {
		feature=f;
	    });
	    if (feature) {
		var geometry = feature.getGeometry();
		var coord = geometry.getCoordinates();
		popup.setPosition(coord);
		
		var coords = ol.coordinate.toStringXY(ol.proj.transform(coord, 'EPSG:3857', 'EPSG:4326'),2);
		
		popup.show(evt.coordinate, '<div><h3>' + feature.get('name')
			   +'</h3><p>' + coords +'</p></div>');
	    } else {
		popup.hide();
	    }
	});
	
	map.addInteraction(new ol.interaction.Select({
	    style: (function() {
		
		return function(feature, resolution) {
		    return [new ol.style.Style({
			image: new ol.style.Circle({
			    radius: 10,
			    fill: new ol.style.Fill({
				color: '#FF0000'
			    }),
			    stroke: new ol.style.Stroke({
				color: '#fff',
				width: 5
			    }),
			    text: new ol.style.Text({
				//text: feature.get('name'),
				font: '15px Verdana,sans-serif',
				fill: '#FFFFFFF',
				stroke:'#333333',
				offsetY: 25
			    })
			}),   
			condition: function(e) {
			    return e.originalEvent.type=='mousemove';
			}
		    })];
		};
	    })()
	}));

	zoo.getCapabilities({
	    type: 'POST',
	    success: function(data){
		var processes=data["Capabilities"]["ProcessOfferings"]["Process"];
		for(var i in activatedServices){
		    for(var j=0;j<processes.length;j++)
			if(i==processes[j].Identifier){
			    activateService(i);
			    activatedServices[i]=true;
			    if(activatedServices["BufferRequest"] && activatedServices["BufferMask"] && !hasSimpleChain){
				activateService("SimpleChain2");
				activatedServices["BufferRequestAndMask"]=true;
				hasSimpleChain=true;
			    }
			    if(i=="BufferMask")
				if(activatedServices["BufferRequest"]){
				    activateService("SimpleChain2");
				    activatedServices["BufferRequestAndMask"]=true;
				}
			    break;
			}
		}
	    }
	});

    }

    function activateService(){
	try{
	    $("#buttonBar").append('<li class="navbar-btn">'+
				   '<a href="#" class="btn btn-default btn-sml single-process process processa" title="'+(arguments[0]!="SimpleChain2"?arguments[0]:"BufferRequestAndMask")+'" name="Source" onclick="app.singleProcessing(\''+(arguments[0]!="SimpleChain2"?arguments[0]:"SimpleChain2")+'\');"> <span>'+(arguments[0]!="SimpleChain2" && arguments[0]!="BufferMask" && arguments[0]!="BufferRequest"?arguments[0]:(arguments[0]!="BufferMask" && arguments[0]!="BufferRequest"?"Buffer Request and Mask":arguments[0]!="BufferRequest"?"Buffer Mask":"Buffer Request"))+'</span></a>'+
				   '</li>');
	    elist=$('.processa');
	    for(var i=0;i<elist.length;i++){
		elist[i].style.display='none';
	    }
	    
	}catch(e){
	    alert(e);
	}
    }

    var activatedServices={
	Mask: false,
	BufferMask: false,
	BufferRequest: false,
	BufferRequestAndMask: false
    };

    var System_mapUrl;
    var draw,route_layer,route_layer2;
    var source = new ol.source.Vector({wrapX: false});
    var isDrawing=false;
    function addInteraction() {
	var geometryFunction, maxPoints;
	draw = new ol.interaction.Draw({
	    source: source,
	    type: /** @type {ol.geom.GeometryType} */ "Point",
	    geometryFunction: geometryFunction,
	    maxPoints: maxPoints
	});
	draw.on("drawstart",function(e){
	    isDrawing=true;
	    //clearAll();
	});
	draw.on("drawend",function(e){
	});
	source.on("addfeature",function(e){
	    if(source.getFeatures().length==2){
		isDrawing=false;
		map.removeInteraction(draw);
		runRouting(source);
	    }
	});
	map.addInteraction(draw);
    }

    function clearAll(){
	if(win){
	    win.close();
	    win=null;
	}
	clearAllFeatures();
    }

    function clearAllFeatures(){
	if(layer.getSource().getFeatures().length>0)
	    layer.getSource().removeFeature(layer.getSource().getFeatures()[0]);
	source.clear();
    }

    function deactivateDrawTool(){
	clearAll();
	map.removeInteraction(draw);
    }

    function activateDrawTool(){
	deactivateDrawTool();
	addInteraction();
    };

    var win;

    function singleProcessing(aProcess) {
	notify('Running '+aProcess+' service','info');
	var inputs=Array();
	if(aProcess=='Buffer'){
	    inputs.push({"identifier": "BufferDistance","value":"0.001","dataType":"float"});
	    inputs.push({"identifier": "InputPolygon",
			 "href":System_mapUrl+"&request=GetFeature&service=WFS&version=1.0.0&typename=Result",
			 "mimeType":"text/xml"});
	}else
	    inputs.push({"identifier": "InputData",
			 "href":System_mapUrl+"&request=GetFeature&service=WFS&version=1.0.0&typename=Result",
			 "mimeType":"text/xml"});
	    
	zoo.execute({
	    identifier: (aProcess == "SimpleChain2"?"BufferRequest":aProcess),
            dataInputs: inputs,
            dataOutputs: [{"identifier":"Result","mimeType":"application/json","type":"raw"}],
            type: 'POST',
            storeExecuteResponse: false,
            success: function(data) {
                notify(aProcess+' service run successfully','success');
		console.log(data);
		console.log(aProcess);
		var lHover=(aProcess=="BufferRequest"?hover1:hover);
		if(lHover.getSource().getFeatures().length>0)
		    lHover.getSource().removeFeature(lHover.getSource().getFeatures()[0]);
		notify('Execute succeded', 'success');
		var GeoJSON = new ol.format.GeoJSON();
		var features = GeoJSON.readFeatures(data,
						    {dataProjection: 'EPSG:4326',
						     featureProjection: 'EPSG:3857'});
		lHover.getSource().addFeatures(features);

            },
            error: function(data) {
		notify('Execute failed:' +data.ExceptionReport.Exception.ExceptionText, 'danger');
            }
        });
    }

    function printDiagram(idxs,values,points){
	
	var chart = new Highcharts.Chart({
	    chart: {
		renderTo: 'chart_container',
		zoomType: 'x'
	    },
	    title: {
		text: ''
	    },
	    xAxis: {
		title: { text: 'Points' },
		maxZoom: 10
	    },
	    yAxis: {
		title: { text: null },
		startOnTick: false,
		showFirstLabel: false
	    },
	    legend: {
		enabled: false
	    },
	    plotOptions: {
		area: {
		    cursor: 'pointer',
		    point: {
			events: {
			    mouseOver: function() {
				if(layer.getSource().getFeatures().length>0)
				    layer.getSource().removeFeature(layer.getSource().getFeatures()[0]);
				var tmp=ol.proj.transform([points[this.x][0],points[this.x][1]],'EPSG:4326','EPSG:3857')
				var tmpPoint=new ol.geom.Point([tmp[0],tmp[1]]);
				layer.getSource().addFeatures([new ol.Feature({geometry: tmpPoint,name: "point"})]);
			    }
			}
		    },
		    fillColor: {
			linearGradient: [0, 0, 0, 300],
			stops: [
			    [0, '#FD8F01'],
			    [1, 'rgba(255,255,255,0)']
			]
		    },
		    lineWidth: 1,
		    lineColor: '#FD8F01',
		    marker: {
			enabled: false,
			states: {
			    hover: {
				enabled: true,
				radius: 3
			    }
			}
		    },
		    shadow: false,
		    states: {
			hover: {
			    lineWidth: 1
			}
		    }
		}
	    },
	    tooltip: {
		formatter: function() {
		    return '<b>Altitude</b><br />Value : '+Highcharts.numberFormat(this.y, 0)+'m';
		}
	    },
	    series: [{
		name: 'Altitude',
		type: 'area',
		data: values
	    }]
	});
    }
    
    function applyMargins() {
        var leftToggler = $(".mini-submenu-left");
        if (leftToggler.is(":visible")) {
            $("#map .ol-zoom")
		.css("margin-left", 0)
		.removeClass("zoom-top-opened-sidebar")
		.addClass("zoom-top-collapsed");
        } else {
            $("#map .ol-zoom")
		.css("margin-left", $(".sidebar-left").width())
		.removeClass("zoom-top-opened-sidebar")
		.removeClass("zoom-top-collapsed");
        }
    }
    


      function isConstrained() {
        return $(".sidebar").width() == $(window).width();
      }

      function applyInitialUIState() {
        if (isConstrained()) {
          $(".sidebar-left .sidebar-body").fadeOut('slide');
          $('.mini-submenu-left').fadeIn();
        }
      }

    function runRouting(layer){
	System_routingProfileComputed=false;
	// transform the two geometries from EPSG:900913 to EPSG:4326
	var format=new ol.format.GeoJSON();
	var points=Array();
	for(var i=0;i<2;i++){
	    var fobj=format.writeFeaturesObject([source.getFeatures()[i]],
						{dataProjection: 'EPSG:4326',
						 featureProjection: 'EPSG:3857'});
	    points.push(fobj.features[0]);
	}

	if(route_layer){
	    try{
		map.removeLayer(route_layer);
		map.removeLayer(route_layer1);
		route_layer=false;
		route_layer1=false;
	    }catch(e){}
	}
    
	$("#routingProfile").addClass("hidden");
	$("#routingSave").addClass("hidden");
	requestedProfile=false;
	zoo.execute({
            identifier: "routing.do",
            dataInputs: [
		{"identifier":"startPoint","dataType":"string","value":points[0].geometry.coordinates[0]+","+points[0].geometry.coordinates[1]},
		{"identifier":"endPoint","dataType":"string","value":points[1].geometry.coordinates[0]+","+points[1].geometry.coordinates[1]}
	    ],
            dataOutputs: [{"identifier":"Result","mimeType":"application/json","asReference":"true"}],
	    type: "POST",
	    success: function(data){
		console.log("SUCCESS");
		console.log(data);
		var tmp=data.ExecuteResponse.ProcessOutputs.Output.Reference._href.split("\&");
		var wmsSource=new ol.source.TileWMS({
		    url: tmp[0],
		    ratio: 1,
		    params: {'LAYERS': 'Result',"VERSION":"1.1.1","SRS":"EPSG:900913"},
		    projection: "EPSG:900913",
		    serverType: 'mapserver'
		});
		route_layer=new ol.layer.Tile({
		    source: wmsSource
		});
		map.addLayer(route_layer);
		System_mapUrl=tmp[0];
		elist=$(".processa");
      		for(var i=0;i<elist.length;i++)
         	    elist[i].style.display='block';
		

		System_inputs1=module.config().url+"?service=WPS&version=1.0.0&request=Execute&Identifier=UnionOneGeom&DataInputs=InputEntity=Reference@xlink:href="+encodeURIComponent(tmp[0]+"&service=WFS&version=1.0.0&request=GetFeature&typename=Result")+"&RawDataOutput=Result";

		requestProfile();
		RoutingDisplayStep(tmp[0]);

	    },
            error: function(data) {
		console.log("FAILURE");
		notify('Execute failed:' +data.ExceptionReport.Exception.ExceptionText, 'danger');
            }
        });


    }

    var requestedProfile=false;
    function requestProfile(){
	var inputs=[
	    {"identifier": "Geometry","href": System_inputs1, mimeType: "application/json"},
	    {"identifier": "mult","value": "10",dataTye: "string"},
	    {"identifier": "RasterFile","value": "srtm_22_04.tif",dataType: "string"}
	];

	zoo.execute({
            identifier: "routing.GdalExtractProfile",
            dataInputs: inputs,
            dataOutputs: [{"identifier":"Profile","mimeType":"application/json","asReference":"true"}],
	    type: "POST",
	    success: function(data){
		console.log("SUCCESS");
		console.log(data);
		var tmp=data.ExecuteResponse.ProcessOutputs.Output.Reference._href;
		displayProfile(tmp);
	    },
            error: function(data) {
		console.log("FAILURE");
		notify('Execute failed:' +data.ExceptionReport.Exception.ExceptionText, 'danger');
            }
        });
	
    }

    function displayProfile(){
	var inputs=[
	    {"identifier": "line","href": arguments[0], mimeType: "application/json"}
	];

	zoo.execute({
            identifier: "routing.computeDistanceAlongLine",
            dataInputs: inputs,
            dataOutputs: [{"identifier":"Result","mimeType":"application/json","type":"raw"}],
	    type: "POST",
	    success: function(data){
		console.log("SUCCESS");
		console.log(data);
		var toto=data.features[0].geometry;

		var idxs=new Array();
		var values= new Array();
		points=new Array();
		for(var i=0;i<toto.coordinates.length;i++){
	            //var  reg1=new  RegExp("[,]", "g");
		    //var tmpString=tmp[i]+"";
		    //var tmp1=tmpString.split(reg1);
		    var tmp1=toto.coordinates[i];
		    if(tmp1[0] && tmp1[1] && tmp1[2]){
			idxs[i]=i;
			values[i]=parseInt(tmp1[2]);
			points[i]=[parseFloat(tmp1[0]),parseFloat(tmp1[1])];
		    }
		}
		var titl = '<i class="fa fa-area-chart"></i> Elevation profile';
		if(wm.windows.length==0)
		win=wm.createWindow({
		    title: titl,
		    bodyContent: "<p>Loading diagram ...</p>",
		    footerContent: ''
		});
		else
		    win.show();
		win.$el.on("close",function(e){
		    clearAllFeatures();
		});
		printDiagram(idxs,values,points);

	    },
            error: function(data) {
		console.log("FAILURE");
		notify('Execute failed:' +data.ExceptionReport.Exception.ExceptionText, 'danger');
            }
        });
	
    }


    function RoutingDisplayStep(){
	System_routingCnt=arguments[0]+1;
	
	$("#wfsInfo").empty();
	var featuresExtent = ol.extent.createEmpty(); 
	$.ajax({
            type: "GET",
	    dataType: "xml",
	    url: arguments[0]+"&request=GetFeature&service=WFS&version=1.0.0&typename=Result",
	    success: function(xml){
		var gml = new ol.format.GML2();
		//gml.xy = false;
		console.log(xml);
		var features=gml.readFeatures(xml);

		console.log(features);
		var data=[];
		var j=0;
		var nbkm = 0;
		var tempsParcours = 0;
		System_steps=[];
		System_stepsFDR=[];
		for(var i=0;i<10;i++){
		    $("#_route_"+i).empty();
		}
		for(i=0;i<features.length;i++){
		    ol.extent.extend(featuresExtent, features[i].getGeometry().getExtent()); 
		    console.log(i);
		    features[i].data=features[i].getProperties();
		    console.log();
		    System_stepsFDR[i]=features[i];

		    if(i % 2 == 0)
			classStep = "step_odd";
		    else 
			classStep = "step_even";
		    
		    if(j==0)
			$('<div onclick=\'routingDisplayCurrentStep('+i+');\'><p id="step_'+i+'" class="'+classStep+'"><span class="fdr_etape">Start : '+(features[i].data["name"]?features[i].data["name"]:"voie inconnue")+".</span></p></div>").appendTo($("#wfsInfo"));
		    else if (j==features.length-1) 
			$('<div onclick=\'routingDisplayCurrentStep('+i+');\'><p id="step_'+i+'" class="'+classStep+'"><span class="fdr_etape">Destination : '+(features[i].data["name"]?features[i].data["name"]:"voie inconnue")+".</span></p></div>").appendTo($("#wfsInfo"));
		    else
		    {
			var idEtape = i-1;
			var curPicto="";
			
			var distance = "";

			var tmp=(features[i].data["length"]*111120)+"";
			var tmp1=tmp.split(".");

			console.log(tmp1);

			if (tmp1[0] != undefined){
			    if (tmp1[0] > 1000){
				distance = (Math.round((tmp1[0]/1000)*100)/100)  + " Km ";
			    }else{
				distance = tmp1[0] + " meters ";					
			    }
			}
			var nomRue="Unknown street";
			if (features[i].data["name"] != undefined){
			    nomRue = features[i].data["name"];
			}
			$('<div onclick=\'routingDisplayCurrentStep('+i+');\'><p id="step_'+i+'" class="'+classStep+'"><span class="fdr_etape">Step '+i+" : "+" walk for "+distance+' on '+nomRue+".</span></p></div>").appendTo($("#wfsInfo"));
		    }
		    
		    j++;
		}

		var totoExt1=ol.proj.transform([featuresExtent[1],featuresExtent[0]],"EPSG:4326","EPSG:3857");
		var totoExt2=ol.proj.transform([featuresExtent[3],featuresExtent[2]],"EPSG:4326","EPSG:3857");
		
		var extent = ol.extent.createEmpty();
		ol.extent.extend(extent,[totoExt1[0]-1000,totoExt1[1]-1000,totoExt2[0]+1000,totoExt2[1]+1000]);
		if(totoExt1[0] && totoExt1[1] && totoExt2[0] && totoExt2[1]){
		    map.getView().fit(extent, map.getSize()); 
		}

		nbSteps = features.length;
		nbkm = nbkm.toFixed(2);
		nbkm = 0;
		tempsParcours = 0;
	    }
	});
	
    }
    
    function routingDisplayCurrentStep(){
	if(arguments[0]>=0){
	    routingZoomOnStepsFDR(arguments[0]);
	    previousIdStepDisplayed = currentIdStepDisplayed;
	    $("#step_"+previousIdStepDisplayed).removeClass('step_selected');
	    currentIdStepDisplayed = arguments[0];
	    $("#step_"+currentIdStepDisplayed).addClass('step_selected');
	    $("#step_"+currentIdStepDisplayed).focus();
	}
    }
    
    function routingZoomOnStepsFDR(index){
	if(!route_layer2){
	    route_layer2 = new ol.layer.Vector({
		source: new ol.source.Vector(),
		styleMap: new ol.style.Style({
		    fill: new ol.style.Fill({
			color: 'rgba(0,0,0,0.5)'
		    }),
		    stroke: new ol.style.Stroke({
			color: 'rgba(255,0,0,0.5)',
			width: 4
		    })
		})
	    });
	    map.addLayer(route_layer2);
	}
	else
	    route_layer2.getSource().removeFeature(route_layer2.getSource().getFeatures()[0]);

	console.log(System_stepsFDR[index]);
	route_layer2.getSource().addFeatures(System_stepsFDR[index]);
	//map.setLayerIndex(route_layer2,map.layers.length-6);
	
	alert(route_layer2.getExtent());
	var extent = new ol.View({extent: ol.proj.transform(route_layer2.getExtent(),"EPSG:4326","EPSG:3857")});
	console.log(extent);
	alert(extent);
	var marker = extent.getCenter();
	console.log(extent);
	var extent = new ol.View({center: marker});
	map.setView(extent);
    }


    // Return public methods
    return {
        initialize: initialize,
        singleProcessing: singleProcessing,
        activateDrawTool: activateDrawTool,
        deactivateDrawTool: deactivateDrawTool,
	routingDisplayCurrentStep: routingDisplayCurrentStep
    };


});

