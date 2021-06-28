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
