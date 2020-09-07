var Common = Common||{};

Common.wayPoints = [];
Common.overviewPolyline = [];
Common.googlePolyline = [];
Common.distance = 0;
Common.offset = 0;
Common.elevations = [];
Common.routes = [];
Common.markers = [];
Common.elevationService = new google.maps.ElevationService();
Common.mapService;
Common.tcxDoc;

Common.MapService = {
	GOOGLE: 'google'
	, YANDEX: 'yandex'
};

// ----------------------------------------------
Common.initYandex = function()
{
	Common.clearMap();
	Common.mapService = Common.MapService.YANDEX;

	window.ymaps.ready(YMap.init_ymap);
};

// ----------------------------------------------
Common.initGoogle = function()
{
	Common.clearMap();
	Common.mapService = Common.MapService.GOOGLE;
	
	GMap.initialize();
};

// ----------------------------------------------
Common.removeRoute = function(rowIndex)
{
	var routeIndex = rowIndex - 2;
	Common.routes.splice(routeIndex, 1);
	var table = document.getElementById("routeTable");
	table.deleteRow(rowIndex);
};

// ----------------------------------------------
Common.addPathToRoutes = function()
{
	var offset = + document.getElementById('offset').value;
	if(Common.overviewPolyline.length == 0)
	{
		alert("Route is undefined");	
		return;
	}
	if(isNaN(offset))
	{
		alert("Incorrect offset number");	
		return;
	}
	
	//check overlap
	var distance = Common.distance;
	for(var i = 0; i < Common.routes.length; i++)
	{
		var path = Common.routes[i];
		if(path.offset < offset + distance
				&& (path.offset + path.distance()) > offset)
		{
			if(!confirm("Path overlap other path (" +
					path.distance() + " m, offset: " + path.offset + ").\n" +
					"Add path?"))
			{
				return;
			}
		}
	}
	
	var request =
	{
		path: Common.googlePolyline
		, samples: 500
	};
	Common.elevationService.getElevationAlongPath(request, function(response, status)
		{
			if(status == google.maps.ElevationStatus.OK)
			{
				Common.elevations = response;
				var newPath = new Common.GPSPath(offset, Common.overviewPolyline, Common.elevations);
				Common.routes.push(newPath);
				Common.addRouteToTable();
			}
			else
			{
				Common.elevations = status;
				alert(status);
			}
			
		}
	);
};

// ----------------------------------------------
Common.computeTotalDistance = function()
{
	var distance = 0;

	for (var i = 0; i < Common.overviewPolyline.length-1; i++)
	{
		var p1 = {latLng:Common.overviewPolyline[i]};
		var p2 = {latLng:Common.overviewPolyline[i+1]};
		var dist = Common.getDistance(p1, p2);
		distance += dist;
	}
	var distForShow = Math.round(distance*100)/100;
	document.getElementById('distance').innerHTML=distForShow;
	Common.distance = distance;
}

// ----------------------------------------------
Common.addRouteToTable = function()
{
	Common.routes.sort(Common.compareRoutes);
	var table = document.getElementById('routeTable');
	for(var i = 2; i < table.rows.length - 1;)
	{
		table.rows[i].parentNode.removeChild(table.rows[i]);
	}
	for(var i = 0; i < Common.routes.length; i++)
	{
		var newRow = table.rows[1].cloneNode(true);
		newRow.style.display = "";
		newRow.cells[0].innerHTML = Common.routes[i].offset;
		newRow.cells[1].innerHTML = Math.round(Common.routes[i].distance());
		table.rows[1].parentNode.insertBefore(newRow, table.rows[table.rows.length - 1]);
	}
};

// ----------------------------------------------
Common.compareRoutes = function(r1, r2)
{
	if(r1.offset < r2.offset)
		return -1;
	if(r1.offset > r2.offset)
		return 1;
	return 0;
}

// ----------------------------------------------
Common.clearMap = function()
{
	Common.wayPoints = [];
	Common.distance = 0;
	Common.offset = 0;
	Common.overviewPolyline = [];
	Common.googlePolyline = [];
	Common.markers = [];
	Common.elevations = [];

	if(Common.mapService == Common.MapService.GOOGLE)
	{
		GMap.clearMap();
	}
	if(Common.mapService == Common.MapService.YANDEX)
	{
		YMap.clearMap();
	}
	
	document.getElementById('distance').innerHTML = 0;
};

// ----------------------------------------------
Common.getActivityInformation = function(file)
{
	var reader = new FileReader();
	reader.onload = function(event)
		{
			var content = event.target.result;
			var parser = new DOMParser();
			Common.tcxDoc = parser.parseFromString(content, 'text/xml');
			var sport = Common.tcxDoc.getElementsByTagName('Activity')[0].getAttribute('Sport');
			document.getElementById('sportName').innerHTML = sport;
			var dateTime = new Date(Common.tcxDoc.getElementsByTagName('Activity')[0].getElementsByTagName('Id')[0].textContent);
			document.getElementById('activityDate').innerHTML = 
				dateTime.getFullYear() + '-' + Common._2(1+dateTime.getMonth()) + '-' + Common._2(dateTime.getDate())
				+ ' ' + Common._2(dateTime.getHours())+":"+Common._2(dateTime.getMinutes())+":"+Common._2(dateTime.getSeconds());
			var laps = Common.tcxDoc.getElementsByTagName('Activity')[0].getElementsByTagName('Lap');
			var distance = 0;
			var totalTimeSeconds = 0;
			for(var i = 0; i < laps.length; i++)
			{
				var lapTotalTimeSeconds = parseFloat(laps[i].getElementsByTagName('TotalTimeSeconds')[0].textContent);
				var lapDistanceMeters = parseFloat(laps[i].getElementsByTagName('DistanceMeters')[0].textContent);
				distance += lapDistanceMeters;
				totalTimeSeconds += lapTotalTimeSeconds;
			} 
			var t = new Date(0, 0, 0, 0, 0, totalTimeSeconds);
			document.getElementById('activityTime').innerHTML = 
			Common._2(t.getHours())+":"+Common._2(t.getMinutes())+":"+Common._2(t.getSeconds());
			document.getElementById('activityDistance').innerHTML = Math.round(distance) + ' m';
		}
	reader.readAsText(file);
};

// ----------------------------------------------
Common.saveTCX = function()
{
	//check tcxDoc
	if(Common.tcxDoc == undefined)
	{
		alert("Specify TCX file");
		return;
	}
	//check routes
	if (typeof Common.routes[0] === 'undefined' || Common.routes[0] === null)
	{
		alert("Routes are not exist");
		return;
	}
	
	//add routes to tcx
	//laps loop
	var laps = Common.tcxDoc.getElementsByTagName("Lap");
	for(var l = 0; l < laps.length; l++)
	{
		var lap = laps[l];
		// tracks loop
		var tracks = lap.getElementsByTagName("Track");
		for(var t = 0; t < tracks.length; t++)
		{
			var track = tracks[t];
			// trackpoints loop
			var trackpoints = track.getElementsByTagName("Trackpoint");
			for(var p = 0; p < trackpoints.length; p++)
			{
				var trackpoint = trackpoints[p];
				// get distance for trackpoint
				var distanceNode = trackpoint.getElementsByTagName("DistanceMeters")[0];
				var tpDistance = 0;
				if(typeof distanceNode == 'undefined')
				{
					continue;
				}
				
				tpDistance = 0 + parseFloat(distanceNode.firstChild.data);
				// loop for routes
				for(var r = 0; r < Common.routes.length; r++)
				{
					var path = Common.routes[r];
					if(tpDistance >= path.offset
							&& tpDistance <= path.endDistance())
						{
							// trackpoint on path
							var point = path.getPoint(tpDistance);
							if(point == null)
								continue;
							
							var position = Common.tcxDoc.createElement("Position");
							var lat = Common.tcxDoc.createElement("LatitudeDegrees");
							lat.textContent = point.latLng.lat;
							var lng = Common.tcxDoc.createElement("LongitudeDegrees");
							lng.textContent = point.latLng.lng;
							position.appendChild(lat);
							position.appendChild(lng);
							trackpoint.appendChild(position);
							
							if(point.altitude !== 'undefined')
							{
								var alt = Common.tcxDoc.createElement("AltitudeMeters");
								alt.textContent = point.altitude;
								trackpoint.appendChild(alt);
							}	
							
							break;
						}
				}
			}
		}
	}
	
	//save dialog
	window.open('data: application/download; Content-Disposition: attachment; filename=example.tcx; base64,'
							+ btoa((new XMLSerializer()).serializeToString(Common.tcxDoc)
							)
				);
};

// ----------------------------------------------
Common.GPSPath = function(offset, polyline, elevations)
{
	this.offset = offset;
	this.points = [];
	
	for(var i = 0; i < polyline.length; i++)
	{
		var latLng = polyline[i];
		var p = {
				latLng: latLng
				};
		
		if(i == 0)
			p['distance'] = this.offset;
		else
		{
			var prevPoint = this.points[this.points.length - 1];
			var distance = Common.getDistance(prevPoint, p);
			p['distance'] = prevPoint.distance + distance;
		}
		
		this.points.push(p);
	}
	
	// add altitudes
	var altPoints = [];
	for(var i = 0; i < elevations.length; i++)
	{
		var elevation = elevations[i];
		
		var latLng = {lat: elevation.location.lat()
			, lng: elevation.location.lng()
		};
		
		var alt = elevation.elevation;
		
		var p = {
				latLng: latLng
				, altitude: alt
				
				};
		if (i == 0)
		{
			p['distance'] = offset;
		}
		else
		{
			var prevPoint = altPoints[altPoints.length - 1];
			var distance = Common.getDistance(prevPoint, p);
			p['distance'] = prevPoint.distance + distance;
		}
		altPoints.push(p);
	}
	// add altPoints to points
	this.points.push.apply(this.points, altPoints);

	this.points.sort(function(p1, p2)
		{
			if(p1.distance < p2.distance) return -1;
			if(p1.distance > p2.distance) return 1;
			return 0;
		});
	
	this.getPoint = function(distance)
		{
			var firstPathPoint = false;
			for(var i = 0; i < this.points.length; i++)
			{
				var pathPoint =  this.points[i];
				var pathPointDistance = pathPoint.distance;
				
				if(!pathPoint.hasOwnProperty('altitude') && !firstPathPoint)
					firstPathPoint = true;
				
				if(pathPoint.hasOwnProperty('altitude'))
					continue;
				
				if(!firstPathPoint && pathPointDistance > distance)
				{
					return null;
				}
				
				if(pathPointDistance >= distance && firstPathPoint)
				{
					var point = null;
					var xlat;
					var xlng;
					// get previous path point
					prevPathPoint = null;
					for(var j = 1; i - j >= 0; j++)
					{
						if(!this.points[i-j].hasOwnProperty('altitude'))
						{
							prevPathPoint = this.points[i-j];
							break;
						}
					}
					
					if(prevPathPoint == null)
					{
						xlat = pathPoint.latLng.lat;
						xlng = pathPoint.latLng.lng;
					}
					else
					{
						xlat = prevPathPoint.latLng.lat
							+ (distance - prevPathPoint.distance)
							* ((pathPoint.latLng.lat - prevPathPoint.latLng.lat)
									/ (pathPoint.distance - prevPathPoint.distance)
							  );
						xlng = prevPathPoint.latLng.lng
						+ (distance - prevPathPoint.distance)
						* ((pathPoint.latLng.lng - prevPathPoint.latLng.lng)
								/ (pathPoint.distance - prevPathPoint.distance)
						  );
					}
					point = {latLng: {lat: xlat, lng: xlng}};
					
					//get next altitude point
					var altPoint = null;
					for(var j = 1; i + j < this.points.length; j++)
					{
						if(this.points[i+j].hasOwnProperty('altitude'))
						{
							altPoint = this.points[i+j];
							break;
						}
					}
					
					// get previous altitude point
					var prevAltPoint = null;
					for(var j = 1; i - j >= 0; j++)
					{
						if(this.points[i-j].hasOwnProperty('altitude'))
						{
							prevAltPoint = this.points[i-j];
							break;
						}
					}
					
					if(altPoint == null || prevAltPoint == null)
					{
						if(altPoint != null)
							point['altitude'] = altPoint.altitude;
						if(prevAltPoint != null)
							point['altitude'] = prevAltPoint.altitude;
					}
					else
					{
						var xalt = prevAltPoint.altitude
						+ (distance - prevAltPoint.distance)
						* ( (altPoint.altitude - prevAltPoint.altitude) /
								 (altPoint.distance - prevAltPoint.distance)
						   );
						point['altitude'] = xalt;
					}
					
					return point;
				}
			}
			return null;
		};
		
	this.distance = function()
	{ //lenth of path
		return this.endDistance() - this.offset;
	};
	this.endDistance = function()
	{// distance between end point of path and start of activity (length of path + offset)
		return this.points[this.points.length - 1].distance;
	};
	
	
};

// ----------------------------------------------
Common.getDistance = function(p1, p2)
{
	var lat2 = p2.latLng.lat;
	var lng2 = p2.latLng.lng;
	var lat1 = p1.latLng.lat;
	var lng1 = p1.latLng.lng;
	var dlat = lat2 - lat1;
	var dlng = lng2 - lng1;
	// 6367000
	var radius = Math
			.sqrt((Math.pow(
					Math.pow(6384400, 2)
							* Math.cos(lat2 * Math.PI / 180),
					2) + Math.pow(
					Math.pow(6352800, 2)
							* Math.sin(lat2 * Math.PI / 180),
					2))
					/ (Math.pow(
							6384400 * Math.cos(lat2 * Math.PI
									/ 180), 2) + Math.pow(
							6352800 * Math.sin(lat2 * Math.PI
									/ 180), 2)));

	var dist1 = radius
			* 2
			* Math.asin(Math.sqrt(Math.pow(
					Math.sin(dlat * Math.PI / 180 / 2), 2)
					+ Math.cos(lat1
							* Math.PI / 180)
					* Math.cos(lat2 * Math.PI / 180)
					* Math.pow(Math.sin(dlng * Math.PI / 180
							/ 2), 2)));

	var dist2 = 2
			* radius
			* Math.PI
			/ 360
			* Math.acos(Math.sin(lat1
					* Math.PI / 180)
					* Math.sin(lat2  * Math.PI / 180)
					+ Math.cos(lat1
							* Math.PI / 180)
					* Math.cos(lat2  * Math.PI / 180)
					* Math.cos(dlng * Math.PI / 180))
			/ Math.PI * 180;

	var distance = (dist1 + dist2) / 2;
	return distance;
};

// ----------------------------------------------
Common._2 = function(num){
	var A = num.toString();
	if(A.length > 1) return A;
	else return ("00" + A).slice(-2);
}
