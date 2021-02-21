var multiPolygon = [];
var country_bbox = [];
var scaleFactor = 2;
var viewport = [0, 0];
var window_bbox = [-180, 90, 180, -90];
var features;
var dragging = false;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

document.body.style.cursor = 'grab';

document.addEventListener('mousedown', function(event) {
	if (event.button == 0) {
		document.body.style.cursor = 'grabbing';
		dragging = true;
	}
});

document.addEventListener('mousemove', function(event) {
	if (dragging) {
		var oldX = viewport[0];
		var oldY = viewport[1];
		viewport[0] -= event.movementX;
		viewport[1] -= event.movementY;
		if (viewport[0] < 0) {
			viewport[0] = 0;
		}
		if (viewport[0] > ctx.canvas.width) {
			viewport[0] = ctx.canvas.width;
		}
		if (viewport[1] < 0) {
			viewport[1] = 0;
		}
		if (viewport[1] > ctx.canvas.height) {
			viewport[1] = ctx.canvas.height;
		}
		ctx.translate(oldX - viewport[0], oldY - viewport[1]);
		console.log(viewport);
		DrawAll();
	}
});

document.addEventListener('wheel', function(event) {
	scaleFactor -= event.deltaY/10;
	DrawAll();
});

document.addEventListener('mouseup', function(event) {
	if (event.button == 0) {
		document.body.style.cursor = 'grab';
		dragging = false;
	}
});

shp("../mapdata/ne_10m_admin_0_countries").then(function(geojson) {
	features = geojson.features;
	console.log(features);
	DrawAll();
});

function longLatToXY(long, lat) {
	// Mercator
	var radius = ctx.canvas.width / (2*Math.PI);
	var latR = lat * Math.PI / 180;
	var x = scaleFactor * ctx.canvas.width * (long + 180) / 360;
	var y = scaleFactor * (ctx.canvas.height/2 - radius * Math.log(Math.tan(latR/2 + Math.PI/4)));
	return [x, y]; 

	var xy = [scaleFactor * (long - window_bbox[0]) / (window_bbox[2] - window_bbox[0]), scaleFactor * (lat - window_bbox[1]) / (window_bbox[3] - window_bbox[1])];
	return xy;
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	Math.min(windowWidth, windowHeight);
	background("#defeff");
	stroke("#609fbf");
	strokeWeight(1);
	line(1, 1, windowWidth-1, 1);
	line(windowWidth-1, 1, windowWidth-1, windowHeight-1);
	line(windowWidth-1, windowHeight-1, 1, windowHeight-1);
	line(1, windowHeight-1, 1, 1);
}

function DrawCoordinate(coordinate) {
	var coordToDraw = longLatToXY(coordinate[0], coordinate[1]);
	point(coordToDraw[0], coordToDraw[1]);
}

function DrawLinearRing(linearRing) {
	ctx.beginPath();
	var coord = longLatToXY(linearRing[0][0], linearRing[0][1]);
	ctx.moveTo(coord[0], coord[1]);
	for (var i = 0; i < linearRing.length - 1; i++) {
		var coord2 = longLatToXY(linearRing[i+1][0], linearRing[i+1][1]);
		ctx.lineTo(coord2[0], coord2[1]);
		//line(coord1[0], coord1[1], coord2[0], coord2[1]);
	}
	ctx.fill();
}

function DrawPolygon(polygon) {
	for (var i = 0; i < polygon.length; i++) {
		DrawLinearRing(polygon[i]);
	}
}

function DrawMutliPolygon(multiPolygon) {
	for (var i = 0; i < multiPolygon.length; i++) {
		DrawPolygon(multiPolygon[i]);
	}
}

function drawOnce() {
	if (multiPolygon.length > 0) {
		for (var i = 0; i < multiPolygon.length; i++) {
			var polygon = multiPolygon[i][0];
			console.log("POLYGON:");
			console.log(polygon);
			for (var j = 0; j < polygon.length; j++) {
				var coordinate = polygon[j];
				console.log("COORDINATE:");
				console.log(coordinate);
				var coordToDraw = latLongToXY(coordinate[0], coordinate[1]);
				point(coordToDraw[0], coordToDraw[1]);
				console.log(coordToDraw);
			}
		}
	}
}

function DrawCountry(i) {
	var country = features[i];
	if (country.geometry.type == "Polygon") {
		DrawPolygon(country.geometry.coordinates);
	}
	else if (country.geometry.type == "MultiPolygon") {
		DrawMutliPolygon(country.geometry.coordinates);
	}
}

function DrawAll() {
	ctx.clearRect(viewport[0], viewport[1], canvas.width+viewport[0], canvas.height+viewport[1]);
	for (var i = 0; i < features.length; i++) {
		DrawCountry(i);
	}
}