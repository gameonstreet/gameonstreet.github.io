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
    map.addSource('battery', {
        type: 'geojson',
        // use a URL for the value for the `data` property.
        data: 'https://raw.githubusercontent.com/gameonstreet/mapbox-geojson/main/battery_location.geojson'
    });
    // for more information about this section please visit the link below. If the link is dead you can email me at gameonstreet@gmail.com
    // https://gis.stackexchange.com/questions/179323/mapbox-studio-how-to-upload-glyphs-or-sprite-for-custom-markers
    map.addLayer({
        'id': 'battery-layer',
        'type': 'symbol',
        'source': 'battery',
        'layout': {
            'icon-image': '{marker-symbol}', // markers are hosted on MapBox Studio
            'icon-allow-overlap': true,
            'icon-size': 0.7
        }
    });
});
