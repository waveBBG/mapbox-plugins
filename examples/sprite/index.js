// import * as Alex from '../../src/index';

    var data = null;
    mapboxgl.accessToken = false;
    var mapCenter = [120.8066, 30.6135];
    // var mapCenter = [13.41, 52.52];
    var map = new mapboxgl.Map({
        style: Alex.Config.default.mapStyles,
        center: mapCenter,
        zoom: 7,
        maxzoom: 8,
        pitch: 15,
        bearing: 0,
        light: {
            'anchor':'viewport',
            'color':'white',
            'intensity':0.7
        },
        container: 'map',
        showCollisionBoxes: true,
    });

    map.on('load', function() {
        console.log("map loaded...");
        Alex.Util.getJSON("https://alex2wong.github.io/mapbox-plugins/assets/countries.geojson")
            .then((res) => {
                console.log("got jsonData..");
                data = res;
                map.addSource("world", {
                    "type": "geojson",
                    "data": data
                });
                map.addLayer({
                    "id": "world",
                    "source": "world",
                    "type": "fill",
                    "paint": {
                        "fill-color": "rgba(0,0,0,0.7)",
                        "fill-outline-color": "#eee"
                    },
                    // "filter": ["==", "$type", "Polygon"]
                });
            });
    });

    function init() {
        var canvasLayer = new Alex.CanvasOverlayer({
            map: map,
            shadow: false,
            keepTrack: true,
            blurWidth: 4,
            lineWidth: 2
        });
        var drone = new Alex.Drone({
            direction: 45,
            icon: "https://alex2wong.github.io/mapbox-plugins/assets/tri2.png"
        });

        Alex.Controllers.gameControl(drone);
        // canvasLayer.initTrackCtx();
        console.log("dom loaded !... register animation...");
        
        function update(){
            drone.updateStatus();
            canvasLayer.redraw([drone]);
            requestAnimationFrame(update);
        }
        update();
    }