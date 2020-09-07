var GMap = GMap || {};

GMap.rendererOptions = {
		  draggable: true,
		  preserveViewport: true
		};
GMap.directionsDisplay = new google.maps.DirectionsRenderer(GMap.rendererOptions);
GMap.directionsService = new google.maps.DirectionsService();

GMap.map;

// ----------------------------------------------
GMap.initialize = function()
{

	var clientPosition = new google.maps.LatLng(56.8,35.8);
	var mapOptions =
	  {
	    zoom: 10
	    , mapTypeId: google.maps.MapTypeId.ROADMAP
	    , center: clientPosition
		, draggableCursor: 'crosshair'
		, panControl: false
		, zoomControl: true
		, zoomControlOptions:
		{
			style: google.maps.ZoomControlStyle.SMALL
		}

	  };

	  GMap.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	  GMap.directionsDisplay.setMap(GMap.map);
	  GMap.directionsDisplay.setPanel(document.getElementById('directionsPanel'));
	
		
		if(navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(function(position)
				{
				var pos = new google.maps.LatLng(position.coords.latitude,
                        position.coords.longitude);
	      		GMap.map.setCenter(pos);


			    }, function()
			    {
					GMap.map.setZoom(7);

				}
				 );
        } else {
			  GMap.map.setZoom(7);
	  	}

		


	google.maps.event.addListener(GMap.directionsDisplay, 'directions_changed', function() {
		if (GMap.directionsDisplay.directions == null)
			return;
		Common.overviewPolyline = GMap.getPolyline(
			GMap.directionsDisplay.directions.routes[0].overview_path);
		Common.computeTotalDistance();
	});
	google.maps.event.addListener(GMap.map, 'click', function(event) {
		GMap.addWayPoint(event.latLng);
	});


}

// ----------------------------------------------
GMap.addWayPoint = function(latLng)
{
	if(Common.wayPoints.length == 0)
	{
		Common.markers.push(new google.maps.Marker({position: latLng, map: GMap.map}));
	}
	if(Common.wayPoints.length == 1)
	{
		Common.markers[0].setMap(null);
		Common.markers[0] = null;
		Common.markers = [];
	}
	Common.wayPoints.push(latLng);
	Common.googlePolyline.push(latLng);
	if(Common.wayPoints.length > 1)
	{
		GMap.calcRoute(Common.wayPoints);
	}
}

// ----------------------------------------------
GMap.calcRoute = function(wayPoints)
{

  var directionWayPoints = new Array();
  for(var i = 1; i < wayPoints.length - 1; i++)
  {
	directionWayPoints.push({location: wayPoints[i]});
  }
  var request = {
    origin: wayPoints[0],
    destination: wayPoints[wayPoints.length - 1],
    waypoints: directionWayPoints,
    travelMode: google.maps.DirectionsTravelMode.WALKING
  };

  GMap.directionsService.route(request, function(response, status)
  {
    if (status == google.maps.DirectionsStatus.OK)
	{
      GMap.directionsDisplay.setDirections(response);

    }
	else
	{
		Common.overviewPolyline = status;
	}
  });
};

// ----------------------------------------------
GMap.getPolyline = function(googlePath)
{
	var polyline = [];
	for(var i = 0; i < googlePath.length; i++)
	{
		polyline.push({lat: googlePath[i].lat(), lng: googlePath[i].lng()});
	}
	return polyline;
};

// ----------------------------------------------
GMap.clearMap = function()
{
	GMap.directionsDisplay.set('directions', null);
};
