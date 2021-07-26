mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FtZW9uc3RyZWV0IiwiYSI6ImNrcWY2aHk2djB1MWgydXBlZ2g0YmY4YnEifQ.uJr1PkESet5r94fnNnwOCw';
    var map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/gameonstreet/cknqn5nvm04wk17uf29j4u064', // style URL
        center: [27.854587, 40.453905], // starting position [LNG, LAT]
        zoom: 10 // starting zoom
    });

// Add the geocoder to the map.
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: 'Arama / Search', // placeholder text for the search bar
        language: 'tr-TR' // specify the language as Turkish.
    })
);

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// Add geolocate control to the map.
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
);

map.on('load', function () {
    map.addSource('data', {
        type: 'geojson',
        // use a URL for the value for the `data` property.
        data: 'https://raw.githubusercontent.com/gameonstreet/mapbox-geojson/main/mapdata.geojson'
    });
    // for more information about this section please visit the link below. If the link is dead you can email me at gameonstreet@gmail.com
    // https://gis.stackexchange.com/questions/179323/mapbox-studio-how-to-upload-glyphs-or-sprite-for-custom-markers
    map.addLayer({
        'id': 'battery-layer',
        'type': 'symbol',
        'source': 'data',
        'layout': {
            'icon-image': '{marker-symbol}', // markers are hosted on MapBox Studio
            'icon-allow-overlap': true,
            'icon-size': 0.5
        }
    });
});

// When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
map.on('click', 'battery-layer', function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var title = e.features[0].properties.title;
    var address = e.features[0].properties.address;
    var phone = e.features[0].properties.phone;
    var province = e.features[0].properties.province;
    var city = e.features[0].properties.city;
    var description = '<strong>' + title + '</strong>' + '<p>' + address + ' ' + province +  ' ' + '/' + ' ' + city + '</p>' + '<p>' + phone + '</p>';
     
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
     
    new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
});

// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'battery-layer', function () {
    map.getCanvas().style.cursor = 'pointer';
});
 
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'battery-layer', function () {
    map.getCanvas().style.cursor = '';
});
