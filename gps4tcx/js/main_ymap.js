var YMap = YMap || {};

YMap.yPolyline = [];
YMap.myMap;

// ----------------------------------------------
YMap.init_ymap = function()
{
	
	// Создаем карту.
    YMap.myMap = new ymaps.Map("map-canvas", {
        center: [56.8,35.8],
        zoom: 10
        , behaviors: ['default', 'scrollZoom']
    });

    var cursor = YMap.myMap.cursors.push('crosshair');

	
		if(navigator.geolocation)
		{
		    navigator.geolocation.getCurrentPosition(function(position)
				{
				var pos = [position.coords.latitude,
                        position.coords.longitude];
	      		YMap.myMap.setCenter(pos);
					

			    }, function()
			    {
					YMap.myMap.setZoom(7);
				     
				}
				 );
		  } else
			{
			  YMap.myMap.setZoom(7); 
		  	}
				
		
  

	YMap.myMap.events.add('click', function (e) {
	    var coords = e.get('coordPosition');
	    var point = {
	    	lat:coords[0]
	    	, lng:coords[1]
	    }
	    YMap.addWayPoint(point);
        
    });


};

// ----------------------------------------------
YMap.addWayPoint = function(latLng)
{
	if(Common.overviewPolyline.length == 0)
	{
		// markers.push(new google.maps.Marker({position: latLng, map: map}));
		var placemark1 = new ymaps.Placemark([latLng.lat, latLng.lng], {
            // Свойства.
            // Содержимое иконки, балуна и хинта.
            id: 'start_marker'
            , iconContent: '1',
            hintContent: 'Start'
        }, {
            // Опции.
            // Стандартная фиолетовая иконка.
            preset: 'twirl#violetIcon'
        });
        Common.markers.push(placemark1);
        YMap.myMap.geoObjects.add(placemark1);
	}
	Common.overviewPolyline.push(latLng);
	YMap.yPolyline.push([latLng.lat, latLng.lng]);
	Common.googlePolyline.push(new google.maps.LatLng(latLng.lat, latLng.lng));
	if(Common.overviewPolyline.length > 1)
	{
		YMap.calcRoute(Common.overviewPolyline);
	}
};

// ----------------------------------------------
YMap.calcRoute = function(wayPoints)
{

  var myPolyline = new ymaps.Polyline(
        // Указываем координаты вершин.
        YMap.yPolyline

    , {}, {
        // Задаем опции геообъекта.
        // Цвет с прозрачностью.
        strokeColor: "#00000088",
        // Ширину линии.
        strokeWidth: 4,
        // Максимально допустимое количество вершин в ломаной.
        editorMaxPoints: 6,
        // Добавляем в контекстное меню новый пункт, позволяющий удалить ломаную.
        editorMenuManager: function (items) {
            items.push({
                title: "Удалить линию",
                onClick: function () {
                    YMap.myMap.geoObjects.remove(myPolyline);
                }
            });
            return items;
        }
    });
  	// Добавляем линию на карту.
  	YMap.myMap.geoObjects.each(function removeAll(object){
  		if(object.properties.get('id') != 'start_marker')
  			YMap.myMap.geoObjects.remove(object);
  	});
    YMap.myMap.geoObjects.add(myPolyline);

    // Включаем режим редактирования.
    // myPolyline.editor.startEditing();

    // calc distance
    Common.computeTotalDistance();
};	

// ----------------------------------------------
YMap.clearMap = function()
{
	YMap.yPolyline = [];
	Common.googlePolyline = [];
	YMap.myMap.geoObjects.each(function removeAll(object){
		YMap.myMap.geoObjects.remove(object);
	});
};

