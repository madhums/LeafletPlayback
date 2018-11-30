$(function() {
    // Setup leaflet map
    var map = new L.Map('map');

    var basemapLayer = new L.TileLayer('https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoibm9tYWRkZXYiLCJhIjoiY2pwMzJicmNjMGRoZzNxbW5saGF5d2t2eCJ9.SIa-W0ZxIqU726w6KJAw4Q');
    
    let json = window.trekker.filter(d => d.time).map(d => ({
        time: d.time * 1000,
        lat: Number(d.lat),
        lng: Number(d.lng)
    }))
    // Center map and default zoom level
    map.setView([json[0].lat, json[0].lng], 17);

    // Adds the background layer to the map
    map.addLayer(basemapLayer);

    // =====================================================
    // =============== Playback ============================
    // =====================================================
    
    // Playback options
    var playbackOptions = {
        playControl: true,
        dateControl: true,
        sliderControl: true     
    };
    let coordinates = json.map(coord => [coord.lng, coord.lat]);
    let times = json.map(coord => coord.time);
    const data = {
        "type": "Feature",
        "geometry": {
            "type": "MultiPoint",
            "coordinates": coordinates
        },
        "properties": {
            "time": times
        }
    }    
    // Initialize playback
    var playback = new L.Playback(map, data, null, playbackOptions);   
});
